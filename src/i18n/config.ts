export const languages = ["en", "ar"] as const;
export type Lang = typeof languages[number];

export const dictionary: Record<Lang, Record<string, string>> = {
  en: {
    title: "Voices of Palestine",
    hero: "Stories of courage, solidarity, and resistance",
    submit: "Share a testimonial",
    browse: "Browse testimonials",
    latest: "Latest testimonials",
  },
  ar: {
    title: "أصوات فلسطين",
    hero: "قصص الشجاعة والتضامن والمقاومة",
    submit: "أضف شهادة",
    browse: "استعرض الشهادات",
    latest: "أحدث الشهادات",
  },
};

export function t(lang: Lang, key: string) {
  return dictionary[lang]?.[key] ?? dictionary.en[key] ?? key;
}


