interface Category {
   id: number;
   name: string;
   slug: string;
   parent: number;
   image: string;
}

interface Product {
   id: number;
   name: string;
   slug: string;
   price: number;
   images: Array<string>;
}
