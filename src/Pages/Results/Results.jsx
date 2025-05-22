import React from 'react'
import classes from './Results.module.css'
import LayOut from './../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from  "./../../Components/Product/ProductCard"
// import { productUrl } from "./../../API/endPoints.js"
import { productUrl } from "../../API/endPoints.js";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
    setLoading(true);
    // console.log(categoryName);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        // console.log(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, [categoryName]);
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        {
          loading? (<Loader/>) : (
            <div className={classes.products_container}>
          {results?.map((product) => (
            <ProductCard key={product.id} product={product} renderDesc={false} renderAdd ={true}/>
          ))}
        </div>
          )
        }
      </section>
    </LayOut>
  );
}

export default Results