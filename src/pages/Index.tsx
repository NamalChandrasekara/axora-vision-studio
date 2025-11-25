import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import UploadDesign from "@/components/UploadDesign";
import Advantages from "@/components/Advantages";
import {ProjectsSection} from "@/components/ProjectSection";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <UploadDesign />
      <Advantages />
      <ProjectsSection />
      {/* <ProjectShowcase /> */}
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
