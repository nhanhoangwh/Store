import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5281/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])
   
    return (
      <>
        <ProductList products = {products} />
      </>
    )
}