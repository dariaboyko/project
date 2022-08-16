import Products from "./Products";
import { connect } from "react-redux";
 import { useLocation } from "react-router-dom";
 import ProductInfo from "./ProductInfo";
 import actionPromise from "./ActionPromise";
 import store from "./Store";
function IphoneProducts() {
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
      "iphoneData",
      gql(
        "http://shop-roles.node.ed.asmer.org.ua/graphql",
        `query catById($q:String){
      CategoryFindOne(query:$q){
        _id name 
        goods{
          _id name images{
            url
          }
          description price 
        }
      }
    }`,
        { q: JSON.stringify([{ _id: "62c9472cb74e1f5f2ec1a0d4" }]) }
      )
    )
  );
  const ProductsIphone = connect((state) => ({
    data: state.promise.iphoneData.payload,
  }))(Products);
  const ProductsIphoneInfo = connect((state) => ({
    data: state.promise.iphoneData.payload,
  }))(ProductInfo);
  const location = useLocation();
  if (location.pathname === "/iphone") {
    return (
        <ProductsIphone />
    );
  }
  return (
      <ProductsIphoneInfo />
  );
}
export default IphoneProducts;