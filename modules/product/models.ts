interface ProductProps {
   id: number;
   name: string;
   slug: string;
   price: number;
   images: Array<string>;
}

export class Product {
   id: number;
   name: string;
   slug: string;
   price: number;
   images: Array<string>;

   constructor({ id, name, slug, price, images }: ProductProps) {
      this.id = id;
      this.name = name;
      this.slug = slug;
      this.price = price;
      this.images = images;
   }

   get url(): string {
      return `/products/${this.slug}/${this.id}`;
   }
}
