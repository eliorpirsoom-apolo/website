export type NavChild = { title: string; href: string };
export type NavItem = { title: string; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    title: "התקנת מצלמות אבטחה",
    href: "/security-cameras/",
    children: [
      { title: "מצלמות אבטחה לבית כולל התקנה", href: "/security-cameras/home-cameras-with-installation/" },
      { title: "התקנת מצלמות אבטחה לבית", href: "/security-cameras/home-installation/" },
      { title: "מצלמות אבטחה לעסק", href: "/security-cameras/business/" },
      { title: "מצלמות אבטחה מתקדמות", href: "/security-cameras/advanced/" },
      { title: "התקנות ותיקונים", href: "/security-cameras/installation-and-repair/" },
    ],
  },
  {
    title: "התקנת אינטרקום לבית פרטי או לעסק",
    href: "/intercom/",
    children: [
      { title: "תיקון אינטרקום", href: "/intercom/repair/" },
      { title: "התקנת אינטרקום לבית", href: "/intercom/home-installation/" },
    ],
  },
  {
    title: "התקנת מערכות אזעקה",
    href: "/alarms/",
    children: [
      { title: "מערכות אזעקה לעסק", href: "/alarms/business-systems/" },
      { title: "התקנת אזעקה לעסק", href: "/alarms/business-installation/" },
      { title: "טכנאי אזעקות לבית", href: "/alarms/home-technician/" },
      { title: "תיקון אזעקות לבית", href: "/alarms/home-repair/" },
      { title: "התקנת אזעקה לבית", href: "/alarms/home-installation/" },
      { title: "מערכות אבטחה לעסקים", href: "/alarms/business-security-systems/" },
      { title: "התקנת מערכות אבטחה", href: "/alarms/security-installation/" },
      { title: "אזעקה אלחוטית לבית", href: "/alarms/wireless-home/" },
      { title: "מערכות אבטחה לבית", href: "/alarms/home-security-systems/" },
    ],
  },
  { title: "מידע מקצועי", href: "/info/" },
  { title: "אודות", href: "/about/" },
  { title: "צור קשר", href: "/contact/" },
];
