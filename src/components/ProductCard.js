import classes from './Products.module.css'
 import {Link, useLocation} from "react-router-dom";
 import { forwardRef } from "react";
const ProductCard = forwardRef(( props, ref) => {
  const location = useLocation();
  const data = props.data;
  return (
    <div className={classes.productWrapper} ref={ref}>
      <Link to={location.pathname + "/" + data._id}>
        <div className={classes.productImgWrapper}>
          {data.images && (
            <img
              src={
                "http://shop-roles.node.ed.asmer.org.ua/" + data.images[0].url
              }
              alt={data.name}
              className={classes.productImg}
            />
          )}
        </div>
        <div className={classes.productName}>{data.name}</div>
        <div className={classes.price}>{data.price} $</div>
      </Link>
      <button
        className="addToCart"
        onClick={() => {
          let cart = [];
          if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }
          if (cart.filter((el) => el.good._id === data._id).length !== 0) {
            cart = cart.map((i) => {
              if (i.good._id === data._id) {
                return { good: data, amount: i.amount + 1 };
              } else return i;
            });
          } else cart.push({ good: data, amount: 1 });
          localStorage.setItem("cart", JSON.stringify(cart));
        }}
      >
        Add to cart
      </button>
    </div>
  );
});
export default ProductCard;