import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGS, useI18n } from "@/hooks/useI18n";

const LangSwitcher = () => {
  const { lang, setLang } = useI18n();
  const current = LANGS.find(l => l.code === lang) ?? LANGS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={`Language: ${current.label}`}
          className="h-9 gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-2.5 text-xs uppercase tracking-[0.2em] text-foreground/80 hover:bg-foreground/10 hover:text-foreground sm:gap-2 sm:px-3"
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="hidden md:inline">{current.flag} {current.code.toUpperCase()}</span>
          <span className="md:hidden text-base leading-none">{current.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        collisionPadding={8}
        className="glass-strong max-h-[min(70svh,28rem)] w-[min(90vw,18rem)] overflow-y-auto border-foreground/10"
      >
        {LANGS.map(l => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code)}
            className="cursor-pointer gap-2 py-2.5 text-sm focus:bg-foreground/10"
          >
            <span className="text-base">{l.flag}</span>
            <span className="flex-1 truncate">{l.label}</span>
            {l.code === lang && <Check className="h-3.5 w-3.5 shrink-0 text-gold-soft" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSwitcher;
