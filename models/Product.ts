class Product {
   id: number;
   name: string;
   price: number;

   constructor(data: object) {
      this.id = data.id;
      this.name = data.name;
      this.price = data.price;
   }
}

export default Product;
