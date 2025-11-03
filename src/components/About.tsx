import { useEffect, useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const scrollPosition = window.scrollY;
      const offset = scrollPosition - sectionTop + window.innerHeight / 2;

      imageRefs.current.forEach((img, index) => {
        if (img) {
          const speed = 0.05 + (index * 0.02);
          const yPos = offset * speed;
          img.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-gradient-subtle overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Images with parallax */}
          <div className="relative h-[600px] order-2 lg:order-1">
            {/* Image 1 */}
            <div
              ref={(el) => imageRefs.current[0] = el}
              className="absolute top-0 left-0 w-72 h-48 rounded-2xl overflow-hidden shadow-large border border-border transition-transform duration-100"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop"
                alt="Modern architectural exterior"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2 */}
            <div
              ref={(el) => imageRefs.current[1] = el}
              className="absolute top-24 right-0 w-80 h-56 rounded-2xl overflow-hidden shadow-large border border-border transition-transform duration-100"
            >
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop"
                alt="Interior design visualization"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 3 */}
            <div
              ref={(el) => imageRefs.current[2] = el}
              className="absolute bottom-24 left-12 w-64 h-44 rounded-2xl overflow-hidden shadow-large border border-border transition-transform duration-100"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop"
                alt="Architectural blueprint"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 4 */}
            <div
              ref={(el) => imageRefs.current[3] = el}
              className="absolute bottom-0 right-8 w-72 h-48 rounded-2xl overflow-hidden shadow-large border border-border transition-transform duration-100"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=400&fit=crop"
                alt="3D rendering visualization"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-block">
              <span className="text-sm font-semibold tracking-widest uppercase text-accent">
                About Us
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Engineering Innovation,
              <span className="bg-gradient-tech bg-clip-text text-transparent block mt-2">
                From Concept to Reality
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              At Fonova Labs, we transform innovative ideas into working prototypes and production-ready systems. With expertise in mechanical engineering, IoT solutions, ERP systems, and advanced manufacturing, we help businesses bring cutting-edge products to market faster and more efficiently.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-accent">200+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-accent">ISO</div>
                <div className="text-sm text-muted-foreground">Certified</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-accent">Smart</div>
                <div className="text-sm text-muted-foreground">IoT Solutions</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
