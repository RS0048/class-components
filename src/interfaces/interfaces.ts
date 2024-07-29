export interface ProductsApiResponse {
  products: Product[];
}

export default interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  images?: string[];
}
