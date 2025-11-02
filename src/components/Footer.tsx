import { Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-light border-t border-white/10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Axora <span className="text-accent">Engineering</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Transforming ideas into precise, visual, and build-ready solutions for architects, builders, and developers across Australia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-white/60 hover:text-accent transition-colors duration-300 text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-white/60 hover:text-accent transition-colors duration-300 text-sm"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-white/60 hover:text-accent transition-colors duration-300 text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>CAD Drafting</li>
              <li>3D Modeling</li>
              <li>Rendering & Walkthroughs</li>
              <li>BOQ & Estimating</li>
              <li>Structural Analysis</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:info@axoraengineering.com"
                className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors duration-300 text-sm"
              >
                <Mail className="w-4 h-4" />
                info@axoraengineering.com
              </a>
              <a
                href="tel:+61400000000"
                className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors duration-300 text-sm"
              >
                <Phone className="w-4 h-4" />
                +61 400 000 000
              </a>
            </div>
            <div className="flex gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-accent border border-white/10 hover:border-accent flex items-center justify-center transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {currentYear} Axora Engineering. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/40 hover:text-accent transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-white/40 hover:text-accent transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
