// Importing React to create the component
import React from "react";

// Importing Carousel component from the react-responsive-carousel library
import { Carousel } from "react-responsive-carousel";

// Importing default Carousel styles (required for proper appearance)
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Importing a list of image URLs from a local data file
import imgList from "./img/data.js"; // Default import – you can name it anything

// Importing custom styles for this component (optional usage)
import "./Carousel.module.css";

// Functional component that renders an image carousel
function MyCarousel() {
  return (
    // Container div for the carousel, useful for custom layout or styling
    <div className="carousel-wrapper">
      <Carousel
        autoPlay={true} // Automatically scrolls through images
        infiniteLoop={true} // Loops back to the start when it reaches the end
        showStatus={true} // Shows slide number/status
        showIndicators={false} // Hides the indicator dots
        showThumbs={false} // Hides thumbnail previews
        interval={3000} // Delay between slides in milliseconds (3 seconds)
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
                width: "100%", // Makes image span full width
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

// Exporting the component so it can be used elsewhere in the application
export default MyCarousel;

// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import imgList from "./img/data.js"; // default import, Name can be anything
// import "./Carousel.module.css";

// function MyCarousel() {
//   return (
//     <div className="carousel-wrapper">
//       <Carousel
//         autoPlay={true}
//         infiniteLoop={true}
//         showStatus={true}
//         showIndicators={false}
//         showThumbs={false}
//         interval={3000}
//       >
//         {imgList?.map((image, index) => (
//           <div key={index}>
//             <img
//               src={image}
//               alt={`Slide ${index}`}
//               style={{
//                 maxHeight: "500px",
//                 objectFit: "cover",
//                 width: "100%",
//               }}
//             />
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// }

// export default MyCarousel;
