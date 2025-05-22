import React from 'react'
import Carousel from "../../Components/Carousel/Carousel.jsx";
import Category from '../../Components/Category/Category.jsx';
import Product from '../../Components/Product/Product.jsx';
import LayOut from '../../Components/LayOut/LayOut.jsx';

function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing