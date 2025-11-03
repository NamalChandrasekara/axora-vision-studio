const teamMembers = [
  {
    name: "Dr. Alex Chen",
    role: "Chief Technology Officer",
    description: "PhD in Mechanical Engineering with 15+ years of experience in product development and manufacturing systems.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "Sarah Martinez",
    role: "IoT Solutions Lead",
    description: "Expert in embedded systems and IoT architecture, specializing in Industry 4.0 implementations.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "Michael Thompson",
    role: "Senior Mechanical Engineer",
    description: "Specializes in rapid prototyping and CAD design with extensive experience in manufacturing processes.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    name: "Lisa Wong",
    role: "ERP Integration Specialist",
    description: "Leads our ERP implementation team with expertise in streamlining manufacturing operations and workflows.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  }
];

const About = () => {
  return (
    <section id="about" className="section-padding bg-gradient-subtle overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Meet The Experts Behind
            <span className="bg-gradient-tech bg-clip-text text-transparent block mt-2">
              Fonova Labs
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our multidisciplinary team brings together decades of experience in mechanical engineering, IoT, and advanced manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 hover-lift border border-border group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-accent uppercase tracking-wide">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
