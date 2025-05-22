import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
    {loading? (<Loader/>) : (<section className={classes.products_container}>
        {products &&
          products?.map((singleProduct) => {
            return (
              <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true} />
            );
          })}
      </section>)}
    </>
  );
}

export default Product;
