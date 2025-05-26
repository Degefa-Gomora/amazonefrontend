
// Importing categoryImage array which contains data for each category card (e.g., name, image URL)
import { categoryImage } from "./categoryImage";

// Importing the reusable component that renders each individual category card
import CategoryCard from "./CategoryCard";

// Importing CSS module for scoped styling of the Categories section
import classes from "./Category.module.css";

// Functional component to display a grid/list of category cards
const Categories = () => {
  return (
    // Wrapper section with a custom class for styling the category layout
    <section className={classes.category_container}>
      {/* Mapping through the categoryImage array to render a CategoryCard for each item */}
      {categoryImage?.map((item) => {
        // Passing each category object as props to CategoryCard
        return <CategoryCard data={item} key={item.name} />;
      })}
    </section>
  );
};

// Exporting the component so it can be used in other parts of the app
export default Categories;



























































































































// import { categoryImage } from "./categoryImage";
// import CategoryCard from "./CategoryCard";
// import classes from "./Category.module.css";

// const Categories = () => {
//   return (
//     <section className={classes.category_container}>
//       {categoryImage?.map((item) => {
//        return <CategoryCard data={item} key={item.name} />;
//       })}
//     </section>
//   );
// };

// export default Categories;
