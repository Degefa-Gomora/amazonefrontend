// Categories.jsx
// import React from "react";
// import { categoryImage } from "./categoryImage";
// import CategoryCard from "./CategoryCard";

// const Categories = () => {
//   return (
//     <div className="flex flex-wrap justify-center gap-6 mt-10">
//       {categoryImage.map((cat, index) => (
//         <CategoryCard key={index} title={cat.title} imgLink={cat.imgLink} />
//       ))}
//     </div>
//   );
// };

// export default Categories;

import { categoryImage } from "./categoryImage";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

const Categories = () => {
  return (
    <section className={classes.category_container}>
      {categoryImage?.map((infos) => {
       return <CategoryCard data={infos} key={infos.name} />;
      })}
    </section>
  );
};

export default Categories;
