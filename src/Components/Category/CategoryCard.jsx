import classes from "./Category.module.css";
import { Link } from "react-router-dom";
const CategoryCard = ({ data }) => {
  // console.log(data);
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt={data.title} />
        <p>shop now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;

















































// CategoryCard.jsx
// import React from "react";

// const CategoryCard = ({ title, imgLink }) => {
//   return (
//     <div className="w-60 bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
//       <img
//         src={imgLink}
//         alt={title}
//         className="w-full h-40 object-contain mb-3"
//       />
//       <h3 className="text-lg font-semibold text-center">{title}</h3>
//     </div>
//   );
// };

// export default CategoryCard;
