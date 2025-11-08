import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import logoImage from '../assets/log-removebg-preview.png';

const Hero = () => {
  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-primary">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span>Expert Engineering Solutions</span>
          </div>

          {/* Main heading */}
          {/* <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Engineering Innovation From
            <span className="block bg-gradient-tech bg-clip-text text-white mt-2">
              Concept to Reality
            </span>
          </h1> */}
  <div className="flex flex-col items-center md:items-center gap-4">
  <img 
    src={logoImage} 
    alt="Fonova Labs Logo" 
    //className="w-96 h-auto md:w-64 lg:w-80"
     className="w-96 h-auto md:w-[32rem] lg:w-[40rem]"
  />
  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-center">
    <span className="block bg-gradient-tech bg-clip-text text-white mt-2">
      Concept to Reality
    </span>
  </h1>
</div>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Advanced mechanical engineering, rapid prototyping, IoT solutions, and ERP systems to power your next-generation products and operations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent-glow text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-glow hover:shadow-glow transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('contact')}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-black/30 text-black hover:bg-white/10 backdrop-blur-lg px-8 py-6 text-lg rounded-xl transition-all duration-300"
              onClick={() => scrollToSection('services')}
            >
              Our Services
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 flex flex-wrap justify-center gap-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span>Rapid Prototyping</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span>IoT Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span>End-to-End Solutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
