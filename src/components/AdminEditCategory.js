import actionPromise from "./ActionPromise";
import store from "./Store";
import AdminCategoriesMenu from "./AdminCategoriesMenu";
import { connect } from "react-redux";
 import { useLocation } from "react-router-dom";
import AdminCategoryInfo from "./AdminCategoryInfo";
function AdminEditCategory() {
    let gql = (url, query, variables) =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: "Bearer " + localStorage.authToken,
          Accept: "application/json",
        },
        body: JSON.stringify({ query, variables }),
      }).then((res) => res.json());
  store.dispatch(
    actionPromise(
      "categories",
      gql(
        "http://shop-roles.node.ed.asmer.org.ua/graphql",
        `query orders($q:String){
            CategoryFind(query:$q){
                _id, name, createdAt, goods{_id, name, description, price, categories{_id, name}},owner{login},parent{name}
            }
            }`,
        { q: JSON.stringify([{}]) }
      )
    )
  );
  const Categories = connect((state) => ({
    categories: state.promise.categories.payload,
  }))(AdminCategoriesMenu);
  const CategoryInfo = connect((state) => ({
    categories: state.promise.categories.payload,
  }))(AdminCategoryInfo);
  const location = useLocation();
  if (
    location.pathname === "/editCategories" ||
    location.pathname === "/editCategories/"
  ) {
    return <Categories />;
  }
  else{
    return <CategoryInfo />;
  }
}

export default AdminEditCategory;
