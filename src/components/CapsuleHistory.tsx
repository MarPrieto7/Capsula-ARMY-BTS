import { History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger, DrawerFooter, DrawerClose,
} from "@/components/ui/drawer";
import { useI18n } from "@/hooks/useI18n";
import type { Capsule } from "@/data/capsule";

interface Props {
  history: Capsule[];
  onOpen: (c: Capsule) => void;
  onClear: () => void;
}

const CapsuleHistory = ({ history, onOpen, onClear }: Props) => {
  const { t } = useI18n();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={t.historyTitle}
          className="h-9 w-9 rounded-full border border-foreground/15 bg-foreground/5 p-0 text-foreground/80 hover:bg-foreground/10 hover:text-foreground"
        >
          <History className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-foreground/10 bg-background">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle className="font-serif text-2xl">{t.historyTitle}</DrawerTitle>
            <DrawerDescription>{t.historySub}</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-2">
            {history.length === 0 ? (
              <p className="rounded-xl border border-dashed border-foreground/15 p-8 text-center text-sm text-foreground/55">
                {t.historyEmpty}
              </p>
            ) : (
              <ul className="space-y-2">
                {history.map(c => (
                  <li key={c.id}>
                    <DrawerClose asChild>
                      <button
                        onClick={() => onOpen(c)}
                        className="flex w-full items-center gap-4 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4 text-left transition hover:border-gold-soft/40 hover:bg-foreground/[0.06]"
                      >
                        <span className="text-2xl">{c.mood.emoji}</span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-serif text-base text-foreground/95 truncate">
                            “{c.song.line}”
                          </span>
                          <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                            {c.date} · #{c.id}
                          </span>
                        </span>
                      </button>
                    </DrawerClose>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <DrawerFooter>
            {history.length > 0 && (
              <Button variant="ghost" onClick={onClear} className="text-foreground/60 hover:text-foreground">
                <Trash2 className="mr-2 h-4 w-4" /> {t.historyClear}
              </Button>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CapsuleHistory;
