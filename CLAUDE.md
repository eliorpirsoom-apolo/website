# CLAUDE.md

הנחיות עבודה ל-Claude Code עבור הפרויקט הזה. יש לקרוא לפני כל משימה ולהתעדכן כשמתקבלות החלטות חדשות.

## מטרת הפרויקט

אתר תדמית + לידים לעסק מערכות אבטחה. תחומי שירות:

- מצלמות אבטחה (CCTV, IP, NVR)
- אינטרקום (וידאו/אודיו, שערים)
- קודנים ובקרת כניסה
- תקשורת ורשתות (כבילה, ראוטרים, סוויצ׳ים)
- התקנות והתאמות מקצועיות

קהל יעד: לקוחות פרטיים ועסקיים בישראל. שפת ממשק: עברית בלבד, RTL.
מטרה מרכזית: יצירת לידים (טופס, ווטסאפ, טלפון).

## החלטות טכנולוגיות

| תחום | בחירה | הערות |
|------|--------|--------|
| מסגרת | Astro | סטטי, מהיר, אפס JS כברירת מחדל |
| עיצוב | Tailwind CSS | טוקנים בקובץ `tailwind.config.mjs` |
| שפה | עברית בלבד | `<html lang="he" dir="rtl">` בכל עמוד |
| CMS | Decap או Sanity | בחירה סופית בעת ההטמעה (אחרי הגדרת מבנה התוכן) |
| טפסים | Formspree או Web3Forms | בחירה סופית בעת ההטמעה |
| יצירת קשר נוספת | כפתורי ווטסאפ + טלפון צפים (sticky) | זמינים בכל גלילה במובייל ובדסקטופ |
| פריסה | להחליט (Cloudflare Pages / Netlify / Vercel) | סטטי בלבד |

## עקרונות עיצוב

- מינימליסטי אבל מובחן — לא טמפלייט גנרי.
- טיפוגרפיה עברית בולטת (Heebo / Rubik / Assistant — לבחור פונט אחד מוביל).
- רשת לא-קונבנציונלית: שבירת סימטריה, hero א-סימטרי, sections עם מקצב משתנה.
- פלטה מצומצמת: לכל היותר 1 צבע מותג + ניטרליים + צבע הדגשה אחד.
- מיקרו-אינטראקציות: hover, focus, scroll-reveal — עדינות, בלי להעמיס.
- ללא stock-photos גנריים. אם אין תמונות אמיתיות — להשתמש בגרפיקה / טיפוגרפיה.

## תקני איכות

### ביצועים
- יעד Lighthouse: 95+ בכל ארבעת התחומים (Performance / Accessibility / Best Practices / SEO).
- תמונות: `astro:assets` עם WebP/AVIF, `loading="lazy"`, `decoding="async"`.
- אפס JS לקוח כברירת מחדל. רכיבים אינטראקטיביים: `client:visible` או `client:idle`.
- פונטים: `font-display: swap`, preload לפונט המוביל בלבד.

### נגישות
- תקן AA לפחות.
- ניווט מקלדת מלא, focus-visible ברור.
- ARIA נכון (landmarks, labels, live regions לטופס).
- ניגודיות צבעים נבדקת.
- `prefers-reduced-motion` מכובד.

### SEO + GEO (חיפוש AI)
- `sitemap.xml` ו-`robots.txt` אוטומטיים.
- `llms.txt` בשורש עם תקציר על העסק לאינדוקס ע״י מנועי AI.
- Schema.org: `LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage` היכן שרלוונטי.
- Open Graph + Twitter Card לכל עמוד.
- כותרות, תיאורים וטקסטים אלטרנטיביים — בעברית, ייחודיים לכל עמוד.

## מוסכמות קוד

- `src/components/` — רכיבי Astro לשימוש חוזר.
- `src/layouts/` — layouts (לפחות `BaseLayout.astro` אחד).
- `src/pages/` — עמודים, file-based routing.
- `src/content/` — content collections (אם נשתמש ב-Decap נכוון לכאן).
- `src/styles/` — קבצי CSS גלובליים. רוב הסגנון inline ב-Tailwind.
- שמות קבצים: PascalCase לרכיבים, kebab-case לעמודים ול-assets.
- טקסטים — בעברית בקבצי תוכן, לא hardcoded בתוך JSX/Astro אלא אם זה רכיב חד-פעמי.

## אבטחה ופרטיות

- לא לשמור סודות בריפו. `.env` ב-deny ב-`.claude/settings.json`.
- אין מעקב פולשני. אם נכניס analytics — Plausible/Cloudflare Web Analytics (cookie-less), לא GA4 כברירת מחדל.
- טופס לידים: validation בצד שרת (ע״י ספק הטפסים), CAPTCHA רק אם נראה ספאם.

## תהליך עבודה ב-Git

- ענף פיתוח: `claude/security-company-website-UM9FE`.
- לא לדחוף ל-`main` ללא בקשה מפורשת של המשתמש.
- לא להשתמש ב-force push / reset --hard / amend על קומיטים שכבר נדחפו.
- כל קומיט: הודעה ממוקדת ב״למה״, לא ב״מה״.

## מבנה אחיד לעמוד תוכן

כל עמוד שירות (תחת `/security-cameras/*`, `/intercom/*`, `/alarms/*`) נבנה
על `ContentPage.astro` ויקבל אוטומטית:

1. פירורי לחם
2. כותרת ראשית `H1` (מתוך ה-prop `title`)
3. תוכן עניינים אוטומטי שנוצר מ-`H2`-ים שבתוכן (Sidebar בדסקטופ, accordion במובייל)
4. גוף התוכן — `H2` / `H3` / פסקאות / רשימות עם סגנון `prose-he`
5. בלוק הנעה לפעולה (CTA) בתחתית

**אופן הכתיבה בדף בודד:**

```astro
---
import ContentPage from "../../layouts/ContentPage.astro";
const title = "שם העמוד";
const parent = { title: "שם הקטגוריה", href: "/category/" };
---
<ContentPage
  title={title}
  description="תיאור meta של עד 160 תווים."
  eyebrow="תווית עליונה קצרה"
  intro="פסקת פתיחה קצרה (אופציונלית) שנכנסת ב-hero מתחת ל-H1."
  crumbs={[parent, { title }]}
>
  <p>פסקת פתיחה של גוף התוכן.</p>

  <h2>כותרת משנית 1</h2>
  <p>טקסט...</p>
  <ul>
    <li>פריט</li>
    <li>פריט</li>
  </ul>

  <h2>כותרת משנית 2</h2>
  <p>טקסט...</p>
</ContentPage>
```

כללי תוכן:
- כותרת `H1` באה מה-prop `title` — אין לכתוב `<h1>` בגוף.
- כל `H2` בגוף נכנס אוטומטית לתוכן העניינים. עדיף ≥ 3 כותרות `H2` בדף.
- `description` עד 160 תווים, יחודי לכל עמוד (SEO).
- TOC לא מוצג אם יש פחות מ-2 כותרות `H2`.

## מצב הפרויקט

- [x] הגדרת ענף פיתוח + הרשאות Claude
- [x] CLAUDE.md ראשוני
- [ ] תשריט היררכיית האתר (מהמשתמש)
- [ ] תכנים (מהמשתמש)
- [ ] איתחול פרויקט Astro + Tailwind
- [ ] עיצוב מערכת (טוקנים, פלטה, טיפוגרפיה)
- [ ] בניית עמודים
- [ ] חיבור CMS
- [ ] חיבור טפסים + ווטסאפ
- [ ] SEO/GEO/נגישות — בדיקות
- [ ] Lighthouse audit
- [ ] פריסה
