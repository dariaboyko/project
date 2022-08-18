import classes from "./Products.module.css";
import ProductCard from "./ProductCard";
import { createRef, useRef } from "react";
import { useEffect,useState } from "react";
function Products({ data }) {
  let products = []
  const [maxIndex, setMaxIndex] = useState(6);
  if(data){
  if (data.data.CategoryFindOne) {
      products = data.data.CategoryFindOne.goods
    }
    if (data.data.CategoryFind) {
      data.data.CategoryFind.forEach((category) => {
        if (category.goods) {
          category.goods.forEach((product) => {
            products.push(product);
          });
        }
      });
    }
  }
  const lastItem = createRef();
  const observerLoader = useRef();
  const actionInSight = (entries) => {
    if (entries[0].isIntersecting && maxIndex+1<products.length) {
      setTimeout(() => {
        setMaxIndex(maxIndex + 4);
      }, 1000);
    }
  };
  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }

    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) {
      observerLoader.current.observe(lastItem.current);
    }
  }, [lastItem]);
  return (
    <section>
      <div className={classes.products}>
        {data&&products.slice(0,maxIndex).map((product,index) => {if (index + 1 === products.slice(0,maxIndex).length) {
          return <ProductCard data={product} key={product._id+Math.random()} ref={lastItem} />;
        }else return <ProductCard data={product} key={product._id+Math.random()} />})}
      </div>
    </section>
  );
}
export default Products;
