import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const UploadDesign = () => {
  const [selectedService, setSelectedService] = useState<string>("cnc");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("aluminum");
  const [quantity, setQuantity] = useState<number>(1);
  const [designUnit, setDesignUnit] = useState<string>("mm");
  const [color, setColor] = useState<string>("silver-white");
  const [thickness, setThickness] = useState<string>("subject-to-3d");
  const [files, setFiles] = useState<FileList | null>(null);

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

  const materials = [
    "Aluminum",
    "Stainless steel",
    "Mild steel",
    "Copper",
    "PMMA (Acrylic)",
    "Carbon Fiber"
  ];

  const aluminumTypes = ["Aluminum 5052", "Aluminum 6061"];
  const colors = ["Silver white"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one design file.",
        variant: "destructive"
      });
      return;
    }

    // Prepare form data
    const formData = {
      service: selectedService,
      quantity,
      designUnit,
      material: selectedMaterial,
      color,
      thickness,
      files: Array.from(files).map(f => f.name).join(", ")
    };

    console.log("Form submitted:", formData);

    // Note: Email sending requires backend setup
    toast({
      title: "Request Received",
      description: "Your design quote request has been submitted. We'll contact you soon at info@fonovalabs.com",
    });

    // Reset form
    setQuantity(1);
    setFiles(null);
  };

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

        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          {/* Service Selection */}
          <div className="mb-8">
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
          <div className="mb-8">
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
                  Selected: {Array.from(files).map(f => f.name).join(", ")}
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

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
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
                      variant={selectedMaterial === material.toLowerCase().replace(/\s+/g, '-') ? "default" : "outline"}
                      onClick={() => setSelectedMaterial(material.toLowerCase().replace(/\s+/g, '-'))}
                      size="sm"
                    >
                      {material}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedMaterial === "aluminum" && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">Type of Aluminum</Label>
                  <div className="flex gap-2">
                    {aluminumTypes.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant="outline"
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
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Color: <span className="text-destructive">*</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((clr) => (
                    <Button
                      key={clr}
                      type="button"
                      variant={color === clr.toLowerCase().replace(/\s+/g, '-') ? "default" : "outline"}
                      onClick={() => setColor(clr.toLowerCase().replace(/\s+/g, '-'))}
                      size="sm"
                    >
                      {clr}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Thickness: <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="thickness-3d"
                    checked={thickness === "subject-to-3d"}
                    onChange={() => setThickness("subject-to-3d")}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="thickness-3d" className="cursor-pointer">
                    Subject to 3D file
                  </Label>
                </div>
              </div>

              {/* Summary Panel */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">Subtotal (0 part)</h3>
                <p className="text-sm text-muted-foreground mb-2">VAT and freight excluded</p>
                <div className="text-2xl font-bold mb-4">RFQ</div>
                <div className="mb-4">
                  <p className="font-medium mb-1">Lead Time</p>
                  <div className="flex items-center gap-2">
                    <input type="radio" checked readOnly className="w-4 h-4" />
                    <span className="font-semibold text-accent">3-5 Business Days</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Estimated shipment: 2025/11/8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-accent hover:bg-accent-glow text-accent-foreground px-12 py-6 text-lg font-semibold rounded-xl shadow-glow hover:scale-105 transition-all duration-300"
            >
              Submit Request
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Your request will be sent to info@fonovalabs.com
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadDesign;
