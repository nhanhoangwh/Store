import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading,setLoading] = useState(true);

  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, status} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   agent.Catalog.list()
  //     .then((products) => setProducts(products))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }, []);
   
  // if(loading) return <LoadingComponent message="Loading products..."/>

  useEffect(() => {
    if(!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch])
  
  if(status.includes('pending')) return <LoadingComponent message="Loading products..."/>

  return (
    <>
      <ProductList products={products} />
    </>
  );
}