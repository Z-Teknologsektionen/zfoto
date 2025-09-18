export const adminCardsInfo = [
  {
    title: "/admin",
    description:
      'Denna sida är en "dashboard" där det finns lite statistik bland annat hur många bilder och album som finns på hemsidan.',
    content:
      'De funktioner som finns på denna sidan är "Dölj mottagningsalbum" och "Visa mottagnings album". Dessa används för att snabbt kunna dölja alla gamla mottagningsalbum inför årets mottagning. Förslagsvis döljer man alla mottagningsalbum innan första antagningsbeskedet och börjar visa alla album måndag MV3 efter revelen.',
    canOpen: true,
  },
  {
    title: "/admin/albums",
    description: "Denna sida ger en sökbar tabell på alla album som finns.",
    content:
      "Genom att klicka på de 3 prickarna på en rad ger dig möjlighet att snabbt dölja/visa ett album på hemsidan men också möjlighet att öppna upp det som admin eller som användare.",
    canOpen: true,
  },
  {
    title: "/admin/albums/:id",
    description:
      "Denna sida ger möjlighet att redigera titel, datum för albumet samt om det ska visas för användare och om det är ett album från mottagningen.",
    content:
      "Det finns också en sökbar tabell med alla bilder som finns i albumet. Genom att klicka på de 3 prickarna på en rad kan du snabbt välja om bilden ska visas i albumet samt om bilden ska vara omslagsbild till albumet. OBS det går att ha flera bilder valda som omslagsbild men enbart den första (tidsbaserat) kommer att visas som omslagsbild.",
    canOpen: false,
  },
  {
    title: "/admin/users",
    description:
      "Denna sida ger möjlighet att se vilka som har loggat in på hemsidan med sitt Google-konto.",
    content:
      "Genom att klicka på de 3 prickarna på en rad ger dig möjlighet att ge/ta bort admin behörighet till den användaren.",
    canOpen: true,
  },
  {
    title: "/admin/images",
    description: "Denna sida ger en sökbar tabell på alla bilder som finns.",
    content:
      "Genom att klicka på de 3 prickarna på en rad ger dig möjlighet att snabbt dölja/visa ett bild på hemsidan men också möjlighet att öppna upp det som admin eller som användare.",
    canOpen: true,
  },
  {
    title: "/admin/images/:id",
    description: "",
    content:
      "Denna sida ger möjlighet att redigera fotograf, datum, om det är omslagsbild samt om bilden ska visas på hemsidan eller inte",
    canOpen: false,
  },
  {
    title: "/studio",
    description:
      "Tanken är att detta i framtiden skall flyttas till en “/admin” sida men fram tills det är skapat kan man redigera innehållet här.",
    content:
      "Här kan du logga in med ditt Google-konto för att redigera texterna som visas på /policy och /about. ",
    canOpen: true,
  },
];
