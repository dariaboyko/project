import Products from "./Products";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import ProductInfo from "./ProductInfo";
import actionPromise from "./ActionPromise";
import store from "./Store";
function AllProducts() {

  let gql = (url, query, variables) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());
  store.dispatch(
    actionPromise(
      "data",
      gql(
        "http://shop-roles.node.ed.asmer.org.ua/graphql",
        `query cats($q:String){
            CategoryFind(query:$q){
                _id name
                goods{
                     _id name images{
                    url
                }
                description price 
            }
        }}`,
        { q: JSON.stringify([{}]) }
      )
    )
  );
  const AllProducts = connect((state) => ({
    data: state.promise.data.payload,
  }))(Products);
  const AllProductsInfo = connect((state) => ({
    data: state.promise.data.payload,
  }))(ProductInfo);
  const location = useLocation();
  if (location.pathname === "/all") {
    return (
        <AllProducts />
    );
  }
  return <AllProductsInfo />;
}
export default AllProducts;
