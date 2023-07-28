interface Attribute {
   id: number;
   name: string;
   slug: string;
}

interface AttributeTerm {
   id: number;
   name: string;
}

interface CartItem {
   key: string;
   id: number;
   quantity: number;
   name: string;
   sku: string;
   image: string | undefined;
   price: number;
}

interface Category {
   id: number;
   name: string;
   slug: string;
   description: string;
   parent: number;
}

interface PaymentMethod {
   id: string;
   name: string;
   description: string;
}

interface Product {
   id: number;
   name: string;
   slug: string;
   description: string;
   price: number;
   regularPrice: number;
   onSale: boolean;
   inStock: boolean;
   categories: {
      id: number;
      name: string;
      slug: string;
   }[];
   images: string[];
   attributes: {
      id: number;
      name: string;
      options: string[];
   }[];
}

interface ProductSummary {
   id: number;
   name: string;
   slug: string;
   price: number;
   regularPrice: number;
   onSale: boolean;
   image: string | undefined;
}
