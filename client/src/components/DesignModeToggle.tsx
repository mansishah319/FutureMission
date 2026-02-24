import { useDesignMode, DesignMode } from "@/contexts/DesignModeContext";
import { Button } from "@/components/ui/button";
import { Monitor, Layout, Box } from "lucide-react";
import { cn } from "@/lib/utils";

export function DesignModeToggle() {
  const { mode, setMode } = useDesignMode();

  const modes: { id: DesignMode; label: string; icon: any }[] = [
    { id: "normal", label: "Normal", icon: Monitor },
    { id: "low-fidelity", label: "Lo-Fi", icon: Box },
    { id: "wireframe", label: "Wireframe", icon: Layout },
  ];

  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20">
      {modes.map((m) => {
        const Icon = m.icon;
        const isSelected = mode === m.id;
        return (
          <Button
            key={m.id}
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 px-3 gap-2 text-[10px] uppercase tracking-wider font-bold rounded-full transition-all",
              isSelected 
                ? "bg-brand-bright-green text-brand-navy shadow-[0_0_15px_rgba(38,208,124,0.4)]" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
            onClick={() => setMode(m.id)}
            data-testid={`button-design-mode-${m.id}`}
          >
            <Icon className="w-3 h-3" />
            <span className="hidden lg:inline">{m.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
