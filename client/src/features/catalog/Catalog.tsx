import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { FormLabel, Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckBoxButton from "../../app/components/CheckBoxButton";
import AppPagination from "../../app/components/AppPagination";

const sortOpsions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to low'},
  {value: 'price', label: 'Price - Low to high'}
]


export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading,setLoading] = useState(true);

  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog);
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
  }, [productsLoaded ,dispatch])

  useEffect(() => {
    if(!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [filtersLoaded, dispatch])
  
  if(!filtersLoaded) return <LoadingComponent message="Loading products..."/>

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormLabel id="sortByFormLabel">Sort By</FormLabel>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOpsions}
            onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormLabel id="brandsFormLabel">Brands</FormLabel>
          <CheckBoxButton 
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => dispatch(setProductParams({brands: items})) }
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormLabel id="typesFormLabel">Types</FormLabel>
          <CheckBoxButton 
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => dispatch(setProductParams({types: items})) }
          />
        </Paper>

      </Grid>

      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      
      <Grid item xs={3}></Grid>
      <Grid item xs={9} sx={{mb:2}}>
        {metaData &&
        <AppPagination 
          metaData={metaData}
          onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
        />}
      </Grid>

    </Grid>
  );
}