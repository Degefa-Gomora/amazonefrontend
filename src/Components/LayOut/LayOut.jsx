

// Importing the Header component which will appear at the top of every page
import Header from "./../Header/Header";

// Layout component acts as a wrapper to provide consistent page structure
// Props: 'children' represents the dynamic content passed between <Layout> ... </Layout>
function Layout({ children }) {
  return (
    <div>
      {/* Always display the Header at the top */}
      <Header />

      {/* Render any nested page content below the header */}
      {children}
    </div>
  );
}

// Exporting the Layout component to be used in routing or main App component
export default Layout;
