import React from 'react'
import classes from './ProductDetail.module.css'
import LayOut from './../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import { productUrl } from "./../../API/EndPoints.js"
import ProductCard from  "./../../Components/Product/ProductCard"
import { useEffect, useState } from 'react'
import Loader from '../../Components/Loader/Loader.jsx'
// import {productUrl} from "../../Api/endPoints.js"


function ProductDetail() {
  const { productID } = useParams();
  console.log(productID)
  const [product, setProduct] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${productUrl}/products/${productID}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [productID]);
  return (
    <LayOut>
      {loading? (<Loader/>) : (<ProductCard product={product} flex = {true} renderDesc ={true} renderAdd={true} />)}
    </LayOut>
  )
}

export default ProductDetail