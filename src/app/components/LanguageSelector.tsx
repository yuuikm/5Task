"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (language: string) => void;
}

export default function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
  const languages = [
    { label: "English (US)", value: "en_US" },
    { label: "German (Germany)", value: "de_DE" },
    { label: "French (France)", value: "fr_FR" },
  ];

  return (
    <div className="max-w-xs">
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
