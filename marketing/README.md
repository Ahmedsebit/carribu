# Carribu marketing materials

The two-page brochure and one-page flyer use the landing page's Outfit and
Playfair Display typography, warm palette, Kente-inspired stripe and illustrated
school-run theme. These are separate A4 portrait print documents, not changes to
the public website application.

## Deliverables

- `exports/carribu-brochure.pdf`: two A4 pages, suitable as front/back of a sheet.
- `exports/carribu-flyer.pdf`: one A4 page.
- `exports/carribu-brochure-page-1.png` and `carribu-brochure-page-2.png`: page previews.
- `exports/carribu-flyer.png`: image version for digital sharing.
- `brochure.html`, `flyer.html`, `styles.css` and `assets/`: editable source.
- `exports/carribu-explainer-75s.mp4`: 75-second, 1080p landscape explainer with
  British female neural narration, subtle original instrumental music and
  on-screen captions.
- `video/index.html`: video preview and transcript; see `video/README.md` for
  the animation source, narration, captions and poster.

The PDFs use RGB colour, embedded fonts and vector QR/illustration artwork.
They have no crop marks or bleed; ask a commercial printer about its own bleed,
colour-profile and finishing requirements. Important text has an inset margin.

## Contact and claims

The confirmed contact is `hello@carribu.app`; no phone number is included.
This is the approved planned address for the artwork, not a verified live mailbox.
The owner will configure the mailbox before distribution. Send and receive a
test enquiry before printing or sharing the materials publicly.
The website address is intentionally omitted pending the website launch.
The QR codes contain:

```text
mailto:hello@carribu.app?subject=Carribu%20school%20demo%20enquiry
```

They prepare an email enquiry; the reader still sends it from their own email app.
The visible email address provides an alternative to scanning.

The school-run artwork is illustrative. The admin screenshot is the actual admin
interface rendered with synthetic demonstration data, cropped for the brochure.
There are no customer endorsements, invented adoption figures, prices,
certification claims or guaranteed safety / notification / arrival promises.

## Editing and printing

Edit the HTML copy and shared CSS. Fonts, artwork, screenshot and QR assets are
included locally, so the print documents do not require external network assets.
With the existing website development server running, open
`http://127.0.0.1:5173/marketing/brochure.html` or
`http://127.0.0.1:5173/marketing/flyer.html`.

Use the document's **Print / save PDF** button. Select A4, portrait, 100% scale,
no margins, background graphics on, and browser headers/footers off.
For a two-sided brochure, use long-edge duplex printing. Update the PDF and PNG
exports after editing; they do not automatically regenerate when HTML changes.

## Font licences

Outfit and Playfair Display are bundled under the SIL Open Font License.
The unmodified variable fonts and licence notices are in `assets/fonts/`.
For conventional PDF text-font embedding, the print styles use static weight
instances derived with FontTools and renamed **Carribu Print Sans** (400, 500,
600, 700) and **Carribu Print Serif** (700, 800, 900). The serif derivative's name
avoids the upstream reserved font name; original copyright and licence metadata
are retained. These print instances reproduce the landing page's type styles.
Source: `google/fonts`, revision
`7af0d90b4d532ffa4b041937b560c6df4e7b1e95`, directories `ofl/outfit` and
`ofl/playfairdisplay`.
