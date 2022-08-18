import SimpleImageSlider from "react-simple-image-slider";
import classes from "./Products.module.css";
function ProductInfoWindow({ data }) {
  return (
    <div className={classes.infoWindow}>
      <SimpleImageSlider
        width={600}
        height={504}
        images={data.images?data.images.map((i) => {
          return { url: "http://shop-roles.node.ed.asmer.org.ua/" + i.url };
        }):{}}
        showBullets={true}
        showNavs={true}
        bgColor={"#FFFF"}
      />
      <div className={classes.description}>
        <h2 className={classes.productName}>{data.name}</h2>
        <p className={classes.price}>{data.price} $</p>
        <p>{data.description}</p>
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
    </div>
  );
}
export default ProductInfoWindow;
