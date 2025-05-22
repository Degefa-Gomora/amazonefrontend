import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img from "./img/data.js"; // Now using default import
import "./Carousel.module.css"; // Import your CSS file for styling

function MyCarousel() {
  return (
    <div className="carousel-wrapper">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000} 
      >
        {img?.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              style={{
                maxHeight: "500px",
                objectFit: "cover",
                width: "100%",
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default MyCarousel;

// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // Don't forget the styles
// import img  from "./img/data.js"; // Adjust the path as necessary

// function MyCarousel() {
//   // Renamed to avoid conflict with imported Carousel
//   return (
//     <div>
//       <Carousel
//         autoPlay={true}
//         infiniteLoop={true}
//         showStatus={false}
//         showIndicators={false}
//         showThumbs={false} // Changed to false since you probably don't want thumbs
//       >
//         {img.map((image, index) => (
//           <div key={index}>
//             <img src={image} alt={`Slide ${index}`} />
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// }

// export default MyCarousel;

// // import React from 'react'
// // import { Carousel } from "react-responsive-carousel";
// // import {img} from "./img/data.js";

// // function Carousel() {
// //   return (
// //     <div>
// //         <Carousel
// //         autoPlay={true}
// //         infiniteLoop={true}
// //         // showStatus={false}
// //         showIndicators={false}
// //         showThumbs={true}>
// //             {img.map((image, index) => (
// //                 <div key={index}>
// //                     <img src={image} alt={`Slide ${index}`} />

// //         </Carousel>
// //     </div>
// //   )
// // }

// // export default Carousel
