import { apiRequest } from '@/app/(common)/lib/api';
import { convertDescriptionToHtml } from '@/app/(common)/utils/convert-description-to-html';

export async function fetchProductBySlug(slug: string): Promise<Product> {
   const {
      data: { product },
   } = await apiRequest(
      `query GetProductBySlug($slug: String) {
         product(slug: $slug) {
            id
            name
            slug
            description
            variants {
               id
               pricing {
                  onSale
                  price {
                     gross {
                        amount
                        currency
                     }
                  }
                  priceUndiscounted {
                     gross {
                        amount
                        currency
                     }
                  }
               }
            }
            media {
               url
            }
            category {
               id
               name
               slug
            }
            isAvailableForPurchase
            attributes {
               values {
                  name
               }
               attribute {
                  id
                  name
               }
            }
         }
      }`,
      {
         slug,
      },
      300
   );

   return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: convertDescriptionToHtml(product.description),
      variantId: product.variants[0].id,
      price: product.variants[0].pricing.price.gross.amount,
      regularPrice: product.variants[0].pricing.priceUndiscounted.gross.amount,
      onSale: product.variants[0].pricing.onSale,
      inStock: product.isAvailableForPurchase,
      category: {
         id: product.category.id,
         name: product.category.name,
         slug: product.category.slug,
      },
      images: product.media.map((media: any) => media.url),
      attributes: product.attributes.map((attribute: any) => ({
         id: attribute.attribute.id,
         name: attribute.attribute.name,
         values: attribute.values.map((value: any) => value.name),
      })),
   };
}

interface FetchProductsProps {
   filters?: {
      query?: string;
      category?: string;
   };
   orderBy?: 'NAME' | 'RANK' | 'PRICE' | 'RATING';
   order?: 'ASC' | 'DESC';
   cursor?: string;
   perPage?: number;
}

interface FetchProductsResponse {
   products: ProductSummary[];
   cursor: string;
   hasNextPage: boolean;
}

// TODO: filters
export async function fetchProducts({
   filters,
   orderBy,
   order,
   cursor,
   perPage,
}: FetchProductsProps = {}): Promise<FetchProductsResponse> {
   const response = await apiRequest(
      `query GetProducts($perPage: Int, $cursor: String, $orderBy: ProductOrderField, $order: OrderDirection!) {
         products(first: $perPage, after: $cursor, sortBy: {field: $orderBy, direction: $order}) {
            edges {
               node {
                  id
                  name
                  slug
                  variants {
                     id
                  }
                  pricing {
                     onSale
                     priceRange {
                        start {
                           gross {
                              amount
                              currency
                           }
                        }
                     }
                     priceRangeUndiscounted {
                        start {
                           gross {
                              amount
                              currency
                           }
                        }
                     }
                  }
                  media {
                     url
                  }
               }
            }
            pageInfo {
               endCursor
               hasNextPage
            }
         }
      }`,
      {
         perPage: perPage ?? 20,
         cursor: cursor ?? '',
         orderBy: orderBy ?? 'NAME',
         order: order ?? 'ASC',
      }
   );

   return {
      products: response.data.products.edges.map(({ node: productData }: any) => ({
         id: productData.id,
         name: productData.name,
         slug: productData.slug,
         variantId: productData.variants[0].id,
         price: productData.pricing.priceRange.start.gross.amount,
         regularPrice: productData.pricing.priceRangeUndiscounted.start.gross.amount,
         onSale: productData.pricing.onSale,
         image: productData.media[0]?.url,
      })),
      cursor: response.data.products.pageInfo.endCursor,
      hasNextPage: response.data.products.pageInfo.hasNextPage,
   };
}

export async function fetchAttributes(): Promise<Attribute[]> {
   const response = await apiRequest(
      `query GetAttributes {
         attributes(first: 10) {
            edges {
               node {
                  id
                  name
                  slug
                  choices(first: 100) {
                     edges {
                        node {
                           id
                           name
                           slug
                        }
                     }
                  }
               }
            }
         }
      }`,
      {},
      3600
   );

   return response.data.attributes.edges.map(({ node: attributeData }: any) => ({
      id: attributeData.id,
      name: attributeData.name,
      slug: attributeData.slug,
      choices: attributeData.choices.edges.map(({ node: choiceData }) => ({
         id: choiceData.id,
         name: choiceData.name,
         slug: choiceData.slug,
      })),
   }));
}
