import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DICT, LANGS, type Dict, type Lang } from "@/data/i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = "purple-capsule-lang";

function detect(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (saved && DICT[saved]) return saved;
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("ko")) return "ko";
  if (nav.startsWith("fr")) return "fr";
  if (nav.startsWith("de")) return "de";
  if (nav.startsWith("es")) {
    const latam = ["mx","ar","co","cl","pe","ve","uy","py","bo","ec","gt","cr","do","hn","ni","pa","sv","pr","cu"];
    if (latam.some(c => nav.includes("-" + c))) return "es-419";
    return "es";
  }
  return "en";
}

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => { setLangState(detect()); }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  };
  return (
    <I18nCtx.Provider value={{ lang, setLang, t: DICT[lang] }}>
      {children}
    </I18nCtx.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
};

export { LANGS };
