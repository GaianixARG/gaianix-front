import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import Footer from "../components/Landing/Footer";
import PublicLayout from "../layouts/PublicLayout";

const Landing = () => {
  return (
    <PublicLayout>
      <Hero />
      <Features />
      <Footer />
    </PublicLayout>
  );
};

export default Landing;
