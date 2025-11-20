// // Importing React and hooks to manage component state and lifecycle
// import React, { useEffect, useState } from "react";

// // Importing axios for making HTTP requests
// import axios from "axios";

// // Importing child component to render individual product details
// import ProductCard from "./ProductCard";

// // Importing CSS module for scoped styling
// import classes from "./Product.module.css";

// // Importing Loader component to show loading spinner while data is fetched
// import Loader from "../Loader/Loader";

// function Product() {
//   // State to hold the fetched products data
//   const [products, setProducts] = useState();

//   // State to track loading status; initially false (not loading)
//   const [loading, setLoading] = useState(false);

//   // useEffect runs once on component mount to fetch product data from API
//   useEffect(() => {
//     setLoading(true); // Start loading before making the API call

//     axios
//       .get("https://fakestoreapi.com/products") // Fetch products from Fake Store API
//       .then((res) => {
//         // On success, store product data into state
//         setProducts(res.data);
//         console.log(res.data); // Log the fetched data for debugging
//         setLoading(false); // Stop loading after data is fetched
//       })
//       .catch((err) => {
//         // Log any errors encountered during fetch
//         console.log(err);
//         setLoading(false); // Stop loading even if fetch fails
//       });
//   }, []); // Empty dependency array ensures this runs only once on mount

//   return (
//     <>
//       {/* Conditionally render Loader while loading, otherwise show product list */}
//       {loading ? (
//         <Loader />
//       ) : (
//         <section className={classes.products_container}>
//           {/* Render ProductCard for each product if products data is available */}
//           {products &&
//             products.map((singleProduct) => (
//               <ProductCard
//                 product={singleProduct}
//                 key={singleProduct.id}
//                 renderAdd={true} // Prop to control add button rendering inside ProductCard
//               />
//             ))}
//         </section>
//       )}
//     </>
//   );
// }

// // Exporting Product component to be used in the app
// export default Product;







// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import ProductCard from "./ProductCard";
// // import classes from "./Product.module.css";
// // import Loader from "../Loader/Loader";

// // function Product() {
// //   const [products, setProducts] = useState();
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     axios
// //       .get("https://fakestoreapi.com/products")
// //       .then((res) => {
// //         // console.log(res)
// //         setProducts(res.data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   return (
// //     <>
// //     {loading? (<Loader/>) : (<section className={classes.products_container}>
// //         {products &&
// //           products?.map((singleProduct) => {
// //             return (
// //               <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true} />
// //             );
// //           })}
// //       </section>)}
// //     </>
// //   );
// // }

// // export default Product;

// // Importing React and hooks to manage component state and lifecycle
// import React, { useEffect, useState } from "react";

// // Importing axios for making HTTP requests
// import axios from "axios";

// // Importing child component to render individual product details
// import ProductCard from "./ProductCard";

// // Importing CSS module for scoped styling
// import classes from "./Product.module.css";

// // Importing Loader component to show loading spinner while data is fetched
// import Loader from "../Loader/Loader";

// function Product() {
//   // State to hold the fetched products data
//   const [products, setProducts] = useState();

//   // State to track loading status; initially false (not loading)
//   const [loading, setLoading] = useState(false);

//   // useEffect runs once on component mount to fetch product data from API
//   useEffect(() => {
//     setLoading(true); // Start loading before making the API call

//     axios
//       .get("https://amazone.degefagomora.com/products") // ✅ Update this line to call your backend!
//       .then((res) => {
//         // On success, store product data into state
//         setProducts(res.data);
//         console.log(res.data); // Log the fetched data for debugging
//         setLoading(false); // Stop loading after data is fetched
//       })
//       .catch((err) => {
//         // Log any errors encountered during fetch
//         console.log(err);
//         setLoading(false); // Stop loading even if fetch fails
//       });
//   }, []); // Empty dependency array ensures this runs only once on mount

//   return (
//     <>
//       {/* Conditionally render Loader while loading, otherwise show product list */}
//       {loading ? (
//         <Loader />
//       ) : (
//         <section className={classes.products_container}>
//           {/* Render ProductCard for each product if products data is available */}
//           {products &&
//             products.map((singleProduct) => (
//               <ProductCard
//                 product={singleProduct}
//                 key={singleProduct.id}
//                 renderAdd={true} // Prop to control add button rendering inside ProductCard
//               />
//             ))}
//         </section>
//       )}
//     </>
//   );
// }

// // Exporting Product component to be used in the app
// export default Product;


// ddddd
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";
import { axiosInstance } from "../../Api/axios"; // ✅ New import

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // ✅ Update this line to use your custom axios instance
    axiosInstance
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => (
            <ProductCard
              product={singleProduct}
              key={singleProduct.id}
              renderAdd={true}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;