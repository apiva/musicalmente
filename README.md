# Musicalmente Latina – sito statico

Sito di [musicalmentelatina.it](https://www.musicalmentelatina.it/), generato con [Hugo](https://gohugo.io/).

- `src/` – sorgenti del sito (contenuti in Markdown, template, stili, immagini)
- `build/` – sito generato, da pubblicare così com'è su qualsiasi web server statico
- `hugo.exe` – Hugo 0.168.0

## Generare il sito

```sh
cd src
../hugo.exe --gc --minify      # genera il sito in ../build
../hugo.exe server             # anteprima con ricarica automatica su http://localhost:1313
```

## Dove modificare cosa

| Cosa | File |
|---|---|
| Telefono, indirizzo, orari, link social, link iscrizione, voci di menu | `src/hugo.toml` |
| Testi delle pagine | `src/content/*.md` (home: `src/content/_index.md`) |
| Docenti (un file per docente, ordinati per `weight`) | `src/content/docenti/*.md` |
| Elenco corsi (pagina Corsi e schede scorrevoli) | `src/data/corsi.yaml` |
| Loghi dei marchi | `src/data/marchi.yaml` |
| Articoli del blog | `src/content/blog/*.md` |
| Immagini | `src/assets/images/` (vengono ridimensionate e convertite in WebP automaticamente) |
| Stili | `src/assets/css/main.css` |

### Nuovo articolo del blog

Crea `src/content/blog/titolo-articolo.md`:

```markdown
---
title: Titolo dell'articolo
date: 2026-03-01T10:00:00+01:00
categories: [Novità]
image: 2026/03/foto.jpg        # in src/assets/images/
---

Testo dell'articolo in Markdown. Le immagini si inseriscono così:

![Descrizione](2026/03/altra-foto.jpg)
```

### Blocchi di pagina (shortcode)

Le pagine sono composte da blocchi riutilizzabili. Quelli che contengono testo
Markdown usano `{{% ... %}}`, gli altri `{{< ... >}}`. Ogni file in
`src/layouts/_shortcodes/` documenta i propri parametri in cima.

| Shortcode | Uso |
|---|---|
| `split` | immagine + testo affiancati, con etichetta e titolo |
| `intro` | intestazione centrata (etichetta rossa + titolo) |
| `features` / `feature` | sezione scura con griglia di icone |
| `checklist` | elenco con spunte rosse |
| `stats` / `stat` | numeri in evidenza ("dal 2010") |
| `btn` | pulsante (`href="iscrizione"` porta al modulo di iscrizione online) |
| `cards` / `card`, `gallery`, `media-cards` / `media-card` | griglie di schede e immagini |
| `course-scroller`, `course-grid` | corsi da `data/corsi.yaml` |
| `faq` / `faq-item` | domande frequenti numerate |
| `cta-band`, `contact`, `map`, `social`, `phone`, `hours`, `tag`, `image` | altri elementi |

## Modulo di contatto

Il sito è statico, quindi il modulo nella pagina Contatti non ha un server a cui
inviare i dati: alla pressione di "Invia" apre WhatsApp con il messaggio già
compilato, indirizzato al numero in `hugo.toml`. Per ricevere i messaggi via
email, impostare in `hugo.toml` l'indirizzo di un servizio di gestione moduli
(es. Formspree):

```toml
[params.contactForm]
action = "https://formspree.io/f/xxxxxxx"
```
