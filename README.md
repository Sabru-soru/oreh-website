# 🌰 Orehi Urbas – Spletna stran

Profesionalna spletna stran kmetije **Orehi Urbas** iz Štajerske.

## 🚀 Deployment na GitHub Pages

1. Ustvari nov repozitorij na GitHubu (npr. `oreh-urbas`)
2. Naloži vse datoteke v repozitorij
3. V nastavitvah repozitorija (Settings → Pages) nastavi:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `(root)`
4. Stran bo dostopna na: `https://<tvoje-ime>.github.io/oreh-urbas/`

## 📁 Struktura projekta

```
oreh-website/
├── index.html          ← Domov
├── o-nas.html          ← O nas
├── orehi.html          ← Sorte & Lastnosti
├── pridelava.html      ← Pridelava
├── recepti.html        ← Recepti
├── kontakt.html        ← Kontakt
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/             ← Tukaj dodaj prave slike
├── .nojekyll           ← Potrebno za GitHub Pages
└── README.md
```

## 🖼️ Zamenjava slik

Placeholder slike so naložene iz `picsum.photos`. Ko boste imeli lastne slike:

1. Dodajte slike v mapo `images/`
2. V vsaki HTML datoteki poiščite `https://picsum.photos/seed/...` 
3. Zamenjajte z relativno potjo, npr. `images/nasad-jeseni.jpg`

## 🎨 Barvna shema

| Spremenljivka | Vrednost | Opis |
|---|---|---|
| `--bg-dark` | `#0b170b` | Ozadje |
| `--bg-medium` | `#162416` | Sekundarno ozadje |
| `--accent` | `#c9a84c` | Zlata – gumbi, naslovi |
| `--text-primary` | `#f0e8d0` | Besedilo |

## 📧 Kontaktni obrazec

Obrazec trenutno simulira pošiljanje (toast sporočilo). Za pravo funkcionalnost povežite z:
- [Formspree](https://formspree.io/) – brezplačno, enostavno
- [EmailJS](https://www.emailjs.com/) – pošiljanje brez backend-a
- Lasten PHP/Node.js backend
