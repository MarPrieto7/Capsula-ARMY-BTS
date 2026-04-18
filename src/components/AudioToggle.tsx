import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAmbientAudio } from "@/hooks/useAmbientAudio";

const AudioToggle = () => {
  const { enabled, toggle } = useAmbientAudio();
  return (
    <Button
      onClick={toggle}
      variant="ghost"
      size="sm"
      aria-label={enabled ? "Mute ambient music" : "Play ambient music"}
      title={enabled ? "Mute ambient music" : "Play ambient music"}
      className="h-9 w-9 rounded-full border border-foreground/15 bg-foreground/5 p-0 text-foreground/80 hover:bg-foreground/10 hover:text-foreground"
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </Button>
  );
};

export default AudioToggle;
