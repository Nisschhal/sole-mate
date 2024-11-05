import { CategoriesSelection } from "../components/storeFront/CategoriesSelection";
import FeaturedProducts from "../components/storeFront/FeaturedProducts";
import Hero from "../components/storeFront/Hero";

const IndexPage = () => {
  return (
    <div>
      <Hero />
      <CategoriesSelection />
      <FeaturedProducts />
    </div>
  );
};

export default IndexPage;
