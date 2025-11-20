// // Importing React to create the component
// import React from "react";

// // Importing Carousel component from the react-responsive-carousel library
// import { Carousel } from "react-responsive-carousel";

// // Importing default Carousel styles (required for proper appearance)
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// // Importing a list of image URLs from a local data file
// import imgList from "./img/data.js"; // Default import – you can name it anything

// // Importing custom styles for this component (optional usage)
// import "./Carousel.module.css";
// import classes from "./Carousel.module.css"; // Importing CSS module for custom styles

// // Functional component that renders an image carousel
// function MyCarousel() {
//   return (
//     // Container div for the carousel, useful for custom layout or styling
//     <div className="carousel-wrapper">
//       <Carousel
//         autoPlay={true} // Automatically scrolls through images
//         infiniteLoop={true} // Loops back to the start when it reaches the end
//         showStatus={true} // Shows slide number/status
//         showIndicators={false} // Hides the indicator dots
//         showThumbs={false} // Hides thumbnail previews
//         interval={3000} // Delay between slides in milliseconds (3 seconds)
//       >
//         {/* Mapping through the image list to display each image in the carousel */}
//         {imgList?.map((image, index) => (
//           <div key={index}>
//             <img
//               src={image}
//               alt={`Slide ${index}`} // Descriptive alt text for accessibility
//               style={{
//                 maxHeight: "500px", // Limits image height
//                 objectFit: "cover", // Ensures the image covers the space proportionally
//                 width: "100%", // Makes image span full width
//               }}
//             />
//           </div>
//         ))}
//       </Carousel>
//       <div className={classes.hero_img}></div>
//     </div>
//   );
// }

// // Exporting the component so it can be used elsewhere in the application
// export default MyCarousel;





































































































































// ⚙️ Importing React to create the component
import React from "react"; 

// 🖼️ Importing Carousel component from the react-responsive-carousel library
import { Carousel } from "react-responsive-carousel"; 

// 🎨 Importing default Carousel styles (required for proper appearance)
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

// 🍎 Importing a list of image URLs from a local data file
import imgList from "./img/data.js"; 

// ⚠️ Importing the DisclaimerBanner component
import DisclaimerBanner from "../Disclaimer/DisclaimerBanner.jsx"; 

// Importing custom styles for this component
// import "./Carousel.module.css"; 
import classes from "./Carousel.module.css"; // Importing CSS module for custom styles

/**
 * Functional component that renders an image carousel along with a disclaimer banner.
 */
function MyCarousel() {
  return (
    // Container div for the entire component (Banner + Carousel)
    <div className="component-wrapper">
      
      {/* ⚠️ RENDER DISCLAIMER BANNER: This will appear above the carousel */}
      <DisclaimerBanner /> 
      
      {/* Container div for the carousel, useful for custom layout or styling */}
      <div className="carousel-wrapper">
        <Carousel
          autoPlay={true}      // Automatically scrolls through images
          infiniteLoop={true}  // Loops back to the start when it reaches the end
          showStatus={true}    // Shows slide number/status
          showIndicators={false} // Hides the indicator dots
          showThumbs={false}   // Hides thumbnail previews
          interval={3000}      // Delay between slides in milliseconds (3 seconds)
        >
          {/* Mapping through the image list to display each image in the carousel */}
          {imgList?.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Slide ${index}`} // Descriptive alt text for accessibility
                style={{
                  maxHeight: "500px", // Limits image height
                  objectFit: "cover", // Ensures the image covers the space proportionally
                  width: "100%",      // Makes image span full width
                }}
              />
            </div>
          ))}
        </Carousel>
        {/* This div is likely used for another image or styling background, referencing the CSS module */}
        <div className={classes.hero_img}></div> 
      </div>
    </div>
  );
}

// Exporting the component so it can be used elsewhere in the application
export default MyCarousel;