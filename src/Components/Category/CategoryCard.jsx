// Importing scoped CSS module styles specific to the CategoryCard component
import classes from "./Category.module.css";

// Importing Link from react-router-dom to navigate to the category page on click
import { Link } from "react-router-dom";

// Functional component that displays a single category card
// Props: `data` contains the information for each category (name, title, imgLink)
const CategoryCard = ({ data }) => {
  // console.log(data); // Example structure: { imgLink: "...", name: "...", title: "..." }

  return (
    // Container div with CSS module class for styling
    <div className={classes.category}>
      {/* Wrapping the card in a <Link> to make it navigable to the category's page */}
      <Link to={`/category/${data.name}`}>
        {/* Title of the category */}
        <span>
          <h2>{data.title}</h2>
        </span>

        {/* Displaying the category image */}
        <img src={data.imgLink} alt={data.title} />

        {/* CTA text below the image */}
        <p>shop now</p>
      </Link>
    </div>
  );
};

// Exporting the component so it can be used in the Categories list or elsewhere
export default CategoryCard;