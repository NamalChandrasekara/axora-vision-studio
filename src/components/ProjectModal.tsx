import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const getYouTubeVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
};

interface ProjectMedia {
  type: "image" | "video";
  url: string;
}

interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    name: string;
    client: string;
    request: string;
    difficulties: string;
    media: ProjectMedia[];
  } | null;
}

export const ProjectModal = ({ open, onOpenChange, project }: ProjectModalProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  if (!project) return null;

  const hasMultipleMedia = project.media.length > 1;
  const currentMedia = project.media[currentMediaIndex];

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % project.media.length);
  };

  const previousMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + project.media.length) % project.media.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl font-bold text-foreground">
                {project.name}
              </DialogTitle>
              <p className="text-lg text-muted-foreground mt-2">{project.client}</p>
            </DialogHeader>

            {/* Media Display */}
            <div className="relative mb-6 rounded-lg overflow-hidden bg-muted">
  {currentMedia?.type === "video" ? (
    currentMedia.url.includes("youtube.com") || currentMedia.url.includes("youtu.be") ? (
      <iframe
        src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentMedia.url)}`}
        className="w-full aspect-video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    ) : (
      <video
        src={currentMedia.url}
        controls
        className="w-full aspect-video"
        autoPlay
      >
        Your browser does not support the video tag.
      </video>
    )
  ) : (
    <img
      src={currentMedia?.url}
      alt={project.name}
      className="w-full aspect-video object-cover"
    />
  )}

              {/* Navigation Arrows */}
              {hasMultipleMedia && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={previousMedia}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.media.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentMediaIndex
                            ? "bg-accent w-8"
                            : "bg-background/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Client Request</h3>
                <p className="text-muted-foreground leading-relaxed">{project.request}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Difficulties Faced</h3>
                <p className="text-muted-foreground leading-relaxed">{project.difficulties}</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
