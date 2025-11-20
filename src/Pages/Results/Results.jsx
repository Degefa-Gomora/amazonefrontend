// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";

// // import classes from "./Results.module.css";
// // import LayOut from "../../Components/LayOut/LayOut";
// // import ProductCard from "../../Components/Product/ProductCard";
// // import Loader from "../../Components/Loader/Loader"; // ✅ Missing import
// // import { productUrl } from "../../Api/endPoints";

// // function Results() {
// //   const { categoryName } = useParams(); // Get category from URL
// //   const [results, setResults] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     const fetchCategoryProducts = async () => {
// //       setLoading(true); // Show loading while fetching

// //       try {
// //         const response = await axios.get(
// //           // `${productUrl}/products/category/${categoryName}`
// //           `${productUrl}/products/category/${encodeURIComponent(categoryName)}`
// //         );
// //         setResults(response.data); // Store results
// //       } catch (error) {
// //         console.error("Error fetching category products:", error);
// //       } finally {
// //         setLoading(false); // Always reset loading
// //       }
// //     };

// //     fetchCategoryProducts();
// //   }, [categoryName]);

// //   return (
// //     <LayOut>
// //       <section>
// //         <h1 style={{ padding: "30px" }}>Results</h1>
// //         <p style={{ padding: "30px" }}>Category / {categoryName}</p>
// //         <hr />
// //         {loading ? (
// //           <Loader />
// //         ) : (
// //           <div className={classes.products_container}>
// //             {results?.map((product) => (
// //               <ProductCard
// //                 key={product.id}
// //                 product={product}
// //                 renderDesc={false}
// //                 renderAdd={true}
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </section>
// //     </LayOut>
// //   );
// // }

// // export default Results;







































































































































// // // import React from 'react'
// // // import classes from './Results.module.css'
// // // import LayOut from './../../Components/LayOut/LayOut'
// // // import { useParams } from 'react-router-dom'
// // // import axios from 'axios'
// // // import { useEffect, useState } from 'react'
// // // import ProductCard from  "./../../Components/Product/ProductCard"

// // // import { productUrl } from "../../Api/endPoints.js";

// // // function Results() {
// // //   const [results, setResults] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const { categoryName } = useParams();

// // //   useEffect(() => {
// // //     setLoading(true); //improve user experience and communicate application state during asynchronous operations like:fetching data,Submitting Forms,Routing Transitions,Delays in Payment/Authentication

// // //     console.log(categoryName);
// // //     axios
// // //       .get(`${productUrl}/products/category/${categoryName}`)
// // //       .then((res) => {
// // //         setResults(res.data);
// // //         console.log(res.data);
// // //       })
// // //       .catch((err) => {
// // //         console.log(err);
// // //       });
// // //     setLoading(false);
// // //   }, [categoryName]);
// // //   return (
// // //     <LayOut>
// // //       <section>
// // //         <h1 style={{ padding: "30px" }}>Results</h1>
// // //         <p style={{ padding: "30px" }}>Category / {categoryName}</p>
// // //         <hr />
// // //         {
// // //           loading? (<Loader/>) : (
// // //             <div className={classes.products_container}>
// // //           {results?.map((product) => (
// // //             <ProductCard key={product.id} product={product} renderDesc={false} renderAdd ={true}/>
// // //           ))}
// // //         </div>
// // //           )
// // //         }
// // //       </section>
// // //     </LayOut>
// // //   );
// // // }

// // // export default Results


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// import classes from "./Results.module.css";
// import LayOut from "../../Components/LayOut/LayOut";
// import ProductCard from "../../Components/Product/ProductCard";
// import Loader from "../../Components/Loader/Loader";
// import { productUrl } from "../../Api/endPoints";

// function Results() {
//   const { categoryName } = useParams(); // Get category from URL
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       setLoading(true);

//       try {
//         const response = await axios.get(
//           `${productUrl}/products/category/${encodeURIComponent(categoryName)}`
//         );

//         // Normalize response for both APIs
//         const data = response.data.products || response.data;
//         const normalized = data.map((p) => ({
//           ...p,
//           image: p.image || p.thumbnail,
//           rating: {
//             rate: p.rating?.rate ?? p.rating ?? 0,
//             count: p.rating?.count ?? p.stock ?? 0,
//           },
//         }));

//         setResults(normalized);
//       } catch (error) {
//         console.error("Error fetching category products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryProducts();
//   }, [categoryName]);

//   return (
//     <LayOut>
//       <section>
//         <h1 style={{ padding: "30px" }}>Results</h1>
//         <p style={{ padding: "30px" }}>
//           Category / {decodeURIComponent(categoryName)}
//         </p>
//         <hr />
//         {loading ? (
//           <Loader />
//         ) : (
//           <div className={classes.products_container}>
//             {results.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 renderDesc={false}
//                 renderAdd={true}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     </LayOut>
//   );
// }

// export default Results;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../Api/axios"; // Assuming you have this set up

import classes from "./Results.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);

      try {
        // ✅ Update this line to call your backend
        const response = await axiosInstance.get(
          `/products/category/${categoryName}`
        );

        // No need for complex data normalization now, as your backend will return clean data
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching category products:", error);
        setResults([]); // Clear results on error
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>
          Category / {decodeURIComponent(categoryName)}
        </p>
        <hr />
        {loading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;