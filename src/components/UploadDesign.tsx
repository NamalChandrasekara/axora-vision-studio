import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Info, CheckCircle } from "lucide-react";

// Configuration - Change this for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const UploadDesign = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [designUnit, setDesignUnit] = useState<string>("mm");
  const [color, setColor] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [specifications, setSpecifications] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const services = [
    {
      id: "cnc",
      title: "CNC machining",
      subtitle: "Milling (3-axis, 5-axis), Turning",
      image: "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=100&h=100&fit=crop"
    },
    {
      id: "sheet-metal",
      title: "Sheet metal",
      subtitle: "Laser cutting, Bending",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=100&h=100&fit=crop"
    },
    {
      id: "3d-printing",
      title: "3D printing",
      subtitle: "FDM, SLA, SLS, MJF, DMLS, Polyjet",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=100&fit=crop"
    },
    {
      id: "injection-molding",
      title: "Injection molding",
      subtitle: "Vacuum casting",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100&h=100&fit=crop"
    }
  ];

  const materialConfig: Record<string, { types: string[], colors: string[] }> = {
    aluminum: {
      types: ["Aluminum 5052", "Aluminum 6061", "Aluminum 7075"],
      colors: ["Silver", "Black Anodized", "Blue Anodized", "Red Anodized", "Natural"]
    },
    "stainless-steel": {
      types: ["304 Stainless Steel", "316 Stainless Steel", "17-4 PH Stainless Steel"],
      colors: ["Brushed", "Polished", "Bead Blasted"]
    },
    "mild-steel": {
      types: ["A36 Mild Steel", "1018 Mild Steel", "1045 Carbon Steel"],
      colors: ["Black Oxide", "Zinc Plated", "Powder Coated Black", "Powder Coated White"]
    },
    copper: {
      types: ["C110 Copper", "C145 Copper", "Brass C360"],
      colors: ["Natural Copper", "Polished", "Antiqued"]
    },
    "pmma-acrylic": {
      types: ["Cast Acrylic", "Extruded Acrylic"],
      colors: ["Clear", "White", "Black", "Red", "Blue", "Green", "Yellow"]
    },
    "carbon-fiber": {
      types: ["3K Carbon Fiber", "6K Carbon Fiber", "12K Carbon Fiber"],
      colors: ["Matte", "Glossy"]
    },
    abs: {
      types: ["Standard ABS", "High Impact ABS", "Flame Retardant ABS"],
      colors: ["White", "Black", "Red", "Blue", "Yellow", "Green", "Natural"]
    }
  };

  const materials = [
    "Aluminum",
    "Stainless Steel",
    "Mild Steel",
    "Copper",
    "PMMA (Acrylic)",
    "Carbon Fiber",
    "ABS"
  ];

  const [selectedMaterialType, setSelectedMaterialType] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    setSelectedMaterialType("");
    setColor("");
  };

  const resetForm = () => {
    setSelectedService("");
    setSelectedMaterial("");
    setSelectedMaterialType("");
    setQuantity(1);
    setDesignUnit("mm");
    setColor("");
    setFiles(null);
    setSpecifications("");
    setEmail("");
    setMobile("");
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Validation
    if (!selectedService) {
      alert("Please select a service type.");
      return;
    }

    if (!files || files.length === 0) {
      alert("Please upload at least one design file.");
      return;
    }

    if (!selectedMaterial) {
      alert("Please select a material.");
      return;
    }

    if (!color) {
      alert("Please select a color.");
      return;
    }

    if (!email || !mobile) {
      alert("Please provide your email and mobile number.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please provide a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();
      
      // Append all form fields
      formData.append('selectedService', selectedService);
      formData.append('quantity', quantity.toString());
      formData.append('designUnit', designUnit);
      formData.append('selectedMaterial', selectedMaterial);
      formData.append('selectedMaterialType', selectedMaterialType || '');
      formData.append('color', color);
      formData.append('specifications', specifications);
      formData.append('email', email);
      formData.append('mobile', mobile);
      
      // Append all files
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      // Send request to backend
      const response = await fetch(`${API_BASE_URL}/api/quote/submit-quote`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        console.log('Quote submitted successfully:', data.messageId);
      } else {
        throw new Error(data.message || 'Failed to submit request');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      
      let errorMessage = 'Failed to submit request. ';
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage += 'Unable to connect to server. Please ensure the backend is running.';
      } else if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please try again or contact us directly at info@fonovalabs.com';
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="upload-design" className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="mb-6">
              <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Request Submitted Successfully!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your quote request. Our team will review your requirements and contact you within 24 hours at the provided email and mobile number.
            </p>
            <Button
              onClick={resetForm}
              size="lg"
              className="bg-accent hover:bg-accent-glow text-accent-foreground px-12 py-6 text-lg font-semibold rounded-xl shadow-glow hover:scale-105 transition-all duration-300"
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="upload-design" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 space-y-4">
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">
            Get A Quote
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Upload Design and Configure Parts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your CAD files and get an instant quote for manufacturing
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Service Selection */}
          <div className="mb-8">
            <Label className="text-lg font-semibold mb-4 block">
              Select Service: <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service.id)}
                  className={`p-4 border-2 rounded-xl transition-all duration-300 text-left hover:shadow-medium ${
                    selectedService === service.id
                      ? "border-accent bg-accent/5"
                      : "border-border bg-card hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{service.title}</h3>
                      <p className="text-xs text-muted-foreground">{service.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload Area */}
          {selectedService && (
            <div className="mb-8">
              <Label className="text-lg font-semibold mb-4 block">
                Upload Design Files: <span className="text-destructive">*</span>
              </Label>
              <div className="border-2 border-dashed border-accent/50 rounded-xl p-12 text-center bg-accent/5 hover:bg-accent/10 transition-all duration-300">
                <Upload className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold text-accent mb-2">
                  Drag and drop here or select files
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  File size &lt; 200 MB (3D CAD: *.step, *.stp, *.x_t, *.iges, *.igs, *.sldprt 2D Drawing: *.dwg, *.dxf, *.pdf)
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".step,.stp,.x_t,.iges,.igs,.sldprt,.dwg,.dxf,.pdf"
                />
                <label htmlFor="file-upload">
                  <Button type="button" variant="outline" className="cursor-pointer" asChild>
                    <span>Select Files</span>
                  </Button>
                </label>
                {files && files.length > 0 && (
                  <div className="mt-4 text-sm text-foreground">
                    <p className="font-semibold mb-2">Selected files:</p>
                    <ul className="text-left max-w-md mx-auto">
                      {Array.from(files).map((f, idx) => (
                        <li key={idx} className="truncate">
                          • {f.name} ({(f.size / (1024 * 1024)).toFixed(2)} MB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  Note: By default, 1. the recessed corners of the part are made in round corners(fillets), 2. sharp edges and burrs would be removed.
                </p>
              </div>
            </div>
          )}

          {/* Form Fields */}
          {files && files.length > 0 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Quantity: <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Design Units:</Label>
                    <div className="flex gap-3">
                      {["mm", "inch", "cm"].map((unit) => (
                        <Button
                          key={unit}
                          type="button"
                          variant={designUnit === unit ? "default" : "outline"}
                          onClick={() => setDesignUnit(unit)}
                          className="flex-1"
                        >
                          {unit}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Material: <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {materials.map((material) => (
                        <Button
                          key={material}
                          type="button"
                          variant={selectedMaterial === material.toLowerCase().replace(/\s+/g, '-').replace(/\(|\)/g, '') ? "default" : "outline"}
                          onClick={() => handleMaterialChange(material.toLowerCase().replace(/\s+/g, '-').replace(/\(|\)/g, ''))}
                          size="sm"
                        >
                          {material}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {selectedMaterial && materialConfig[selectedMaterial] && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Type of {materials.find(m => m.toLowerCase().replace(/\s+/g, '-').replace(/\(|\)/g, '') === selectedMaterial)}
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {materialConfig[selectedMaterial].types.map((type) => (
                          <Button
                            key={type}
                            type="button"
                            variant={selectedMaterialType === type ? "default" : "outline"}
                            onClick={() => setSelectedMaterialType(type)}
                            size="sm"
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {selectedMaterial && materialConfig[selectedMaterial] && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Color: <span className="text-destructive">*</span>
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {materialConfig[selectedMaterial].colors.map((clr) => (
                          <Button
                            key={clr}
                            type="button"
                            variant={color === clr ? "default" : "outline"}
                            onClick={() => setColor(clr)}
                            size="sm"
                          >
                            {clr}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Additional Specifications
                    </Label>
                    <Textarea
                      value={specifications}
                      onChange={(e) => setSpecifications(e.target.value)}
                      placeholder="Enter any additional specifications, tolerances, finishing requirements, or special instructions..."
                      className="min-h-32 resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Email Address: <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Mobile Number: <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+1 234 567 8900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-8">
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-accent hover:bg-accent-glow text-accent-foreground px-12 py-6 text-lg font-semibold rounded-xl shadow-glow hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Your request will be sent to info@fonovalabs.com
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadDesign;