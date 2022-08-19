 import "./Admin.css";
 import {Link, useLocation} from "react-router-dom";
 import { useState } from "react";
 import actionPromise from "./ActionPromise";
 import store from "./Store";
 function AdminCategoriesMenu({ categories }) {
   const location = useLocation();
   const [name, setName] = useState("");
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
         "createCategory",
         gql(
           "http://shop-roles.node.ed.asmer.org.ua/graphql",
           `mutation changeDetails($category:CategoryInput){
              CategoryUpsert(category:$category){
              name,_id
              }
            }`,
           {
             category: {
               name: name
             },
           }
         )
       )
     );
     window.location.reload();
   }
   return (
     <>
       <div className="categories--list">
         {categories &&
           categories.data.CategoryFind.map((category) => {
             return (
               <Link
                 className="categories--list__item"
                 key={"cat" + category._id}
                 to={location.pathname + "/" + category._id}
               >
                 {category.name}
               </Link>
             );
           })}
       </div>
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
           value="Create new category"
           className="main__form__submit"
         />
       </form>
     </>
   );
 }
export default AdminCategoriesMenu;