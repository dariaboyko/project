import { useState } from "react";
import actionPromise from "./ActionPromise";
import store from "./Store";
function AdminEditItem({ item, categories }) {
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [price, setPrice] = useState(item.price);
    let selectedCategories = item.categories;
    function checkSelectedCategories(list, categoryName){
        return list.filter((c) => c.name === categoryName)[0] ? true : false;
    }
    let gql = (url, query, variables) =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.authToken ,
            Accept: "application/json",
        },
        body: JSON.stringify({ query, variables }),
      }).then((res) => console.log(res.json()));

    function handleSubmit(event) {
        console.log(item._id);
      event.preventDefault();
      store.dispatch(
        actionPromise(
          "changeDetails",
          gql(
            "http://shop-roles.node.ed.asmer.org.ua/graphql",
            `mutation changeDetails($good:GoodInput){
              GoodUpsert(good:$good){
              name, price, categories{name}
              }
            }`,
            {
              good: {
                _id: item._id,
                name: name,
                description: description,
                price: Number(price),
                categories: selectedCategories.map((e) => {
                  return { name: e.name, _id: e._id };
                }),
              },
            }
          )
        )
      );
    }
    function deleteItem(event) {
      event.preventDefault();
      store.dispatch(
        actionPromise(
          "deleteGood",
          gql(
            "http://shop-roles.node.ed.asmer.org.ua/graphql",
            `mutation changeGoodDetails($good:GoodInput){
              GoodDelete(good:$good){
              name
              }
            }`,
            {
              good: {
                _id: item._id
              },
            }
          )
        )
      );
    }
  return (
    <div className="edit__good">
      <form onSubmit={handleSubmit} className="main__form">
        <div className="main__form__input">
          <label>Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
          />
        </div>
        <div className="main__form__input main__form__description">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            type="text"
          />
        </div>
        <div className="main__form__input">
          <label>Price</label>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            type="text"
          />
        </div>
        <legend>Categories</legend>
        {categories &&
          categories.data.CategoryFind.map((category) => {
            return (
              <div key={"checkbox" + Math.random()}>
                <input
                  type="checkbox"
                  name="category"
                  value={category.name}
                  defaultChecked={checkSelectedCategories(
                    selectedCategories,
                    category.name
                  )}
                  onChange={(e) => {
                    if (
                      !checkSelectedCategories(
                        selectedCategories,
                        category.name
                      )
                    ) {
                      selectedCategories.push(category);
                      e.target.checked = true;
                    } else {
                      {
                        selectedCategories = selectedCategories.filter((i) => {
                          return i.name !== category.name;
                        });
                        e.target.checked = false;
                      }
                    }
                  }}
                />
                <label>{category.name}</label>
              </div>
            );
          })}
        <input
          disabled={name.length >= 1 ? false : true}
          type="submit"
          value="Save changes"
          className="main__form__submit"
        />
        <button
          className="main__form__delete main__form__submit"
          onClick={(e) => deleteItem(e)}
        >
          Delete item
        </button>
      </form>
    </div>
  );
}
export default AdminEditItem;
