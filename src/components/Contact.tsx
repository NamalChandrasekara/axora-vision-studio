import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    toast.success("Thank you! We'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section-padding bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-sm font-semibold tracking-widest uppercase text-accent">
                  Get In Touch
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  Let's Build Something
                  <span className="bg-gradient-tech bg-clip-text text-transparent block mt-2">
                    Amazing Together
                  </span>
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  Ready to turn your ideas into reality? Contact us for a consultation and discover how we can bring your innovative product to life.
                </p>
              </div>

              <div className="space-y-6 pt-8">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 backdrop-blur-lg border border-accent/20">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm mb-1">Email</div>
                    <a href="mailto:info@fonovalabs.com" className="text-white hover:text-accent transition-colors duration-300 text-lg font-medium">
                      info@fonovalabs.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 backdrop-blur-lg border border-accent/20">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm mb-1">Phone</div>
                    <a href="tel:+61385001234" className="text-white hover:text-accent transition-colors duration-300 text-lg font-medium">
                      +94 767510070
                    </a>
                  </div>
                </div>

                {/* <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 backdrop-blur-lg border border-accent/20">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm mb-1">Location</div>
                    <div className="text-white text-lg font-medium">
                      Fonova Labs, Kuruwita<br />
                      Sri Lanka
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-white text-sm font-medium mb-2 block">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-white text-sm font-medium mb-2 block">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="text-white text-sm font-medium mb-2 block">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                      placeholder="+61 400 000 000"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="text-white text-sm font-medium mb-2 block">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-white text-sm font-medium mb-2 block">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent min-h-[150px]"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent-glow text-white font-semibold py-6 text-lg rounded-xl shadow-glow hover:shadow-glow transition-all duration-300 hover:scale-105"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
