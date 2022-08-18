import { Route, Routes, useNavigate } from "react-router-dom";
import actionPromise from "./ActionPromise";
import store from "./Store";
import { useState } from "react";
import AdminEditItem from "./AdminEditItem";
import AddNewItem from "./AddNewItem";


function CategoryInfo({category,list}){
    const [name, setName] = useState(category.name);
    const navigate = useNavigate();

    let gql = (url, query, variables) =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.authToken,
          Accept: "application/json",
        },
        body: JSON.stringify({ query, variables }),
      }).then((res) => console.log(res.json()));

    function handleSubmit(event) {
      event.preventDefault();
      store.dispatch(
        actionPromise(
          "changeCategoryDetails",
          gql(
            "http://shop-roles.node.ed.asmer.org.ua/graphql",
            `mutation changeDetails($categor:CategoryInput){
              CategoryUpsert(category:$categor){
              name, goods {name}
              }
            }`,
            {
              categor: {
                _id: category._id,
                name: name
              },
            }
          )
        )
      );
    }
     function deleteCategory(event) {
       event.preventDefault();
       store.dispatch(
         actionPromise(
           "deleteCategory",
           gql(
             "http://shop-roles.node.ed.asmer.org.ua/graphql",
             `mutation delete($category:CategoryInput){
              CategoryDelete(category:$category){
              name
              }
            }`,
             {
               category: {
                 _id: category._id,
                 name: name,
               },
             }
           )
         )
       );
       navigate(-1);
     }

    return (
      <div className="category__edit">
        <div>
          <h1 className="main__form__title">Category</h1>
          <form onSubmit={handleSubmit} className="main__form">
            <div className="main__form__input">
              <label>Name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
              />
            </div>
            <input
              disabled={name.length >= 1 ? false : true}
              type="submit"
              value="Save changes"
              className="main__form__submit"
            />
            <button
              className="main__form__delete main__form__submit"
              onClick={(e) => deleteCategory(e)}
            >
              Delete category
            </button>
          </form>
        </div>
        <div>
          {category.goods && (
            <>
              <h1 className="main__form__title">Goods</h1>
              {category.goods.map((i) => (
                <AdminEditItem
                  categories={list}
                  item={i}
                  key={"good" + Math.random()}
                />
              ))}
              <h1 className="main__form__title">Add new good</h1>
              <AddNewItem categories={list} />
            </>
          )}
        </div>
      </div>
    );
}
function AdminCategoryInfo({ categories }) {
  return (
    <Routes>
      {categories ?
        categories.data.CategoryFind.map((category) => {
          return (
            <Route
              path={category._id}
              element={<CategoryInfo category={category} list={categories} />}
              key={"route" + category._id}
            />
          );
        }):<>Wait...</>}
    </Routes>
  );
}
export default AdminCategoryInfo;
