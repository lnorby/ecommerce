interface Attribute {
   id: string;
   name: string;
   slug: string;
   choices: AttributeChoice[];
}

interface AttributeChoice {
   id: string;
   name: string;
   slug: string;
}

interface Category {
   id: string;
   name: string;
   slug: string;
   description: string;
}

interface Checkout {
   id: string;
   lines: CheckoutLine[];
   subtotal: number;
   total: number;
   availablePaymentGateways: {
      id: string;
      name: string;
   }[];
}

interface CheckoutLine {
   id: string;
   product: {
      id: string;
      name: string;
      slug: string;
      image: string | undefined;
   };
   quantity: number;
   unitPrice: number;
   totalPrice: number;
}

interface PaymentMethod {
   id: string;
   name: string;
   description: string;
}

interface Product {
   id: string;
   name: string;
   slug: string;
   description: string;
   variantId: string;
   price: number;
   regularPrice: number;
   onSale: boolean;
   inStock: boolean;
   category: {
      id: string;
      name: string;
      slug: string;
   };
   images: string[];
   attributes: {
      id: string;
      name: string;
      values: string[];
   }[];
}

interface ProductSummary {
   id: string;
   name: string;
   slug: string;
   variantId: string;
   price: number;
   regularPrice: number;
   onSale: boolean;
   image: string | undefined;
}
