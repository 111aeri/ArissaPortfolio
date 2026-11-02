ARISSA PORTFOLIO - LOCAL SETUP

No installation, npm, framework, database, or build step is needed.

FILES
index.html               All eight sections and resume-based content
style.css                Colors, retro typography, layouts, and animations
script.js                Mobile menu, project filters, and email copying
assets/arissa-cv.pdf      Recreated public-facing CV, without home address/phone
assets/arissa-portrait.jpg  Portrait extracted from the supplied resume
assets/lemon.svg         Original decorative lemon artwork and favicon

PREVIEW WITH LARAGON
1. Copy this entire arissa_portfolio folder into Laragon's document root.
   The usual destination is C:\laragon\www\arissa_portfolio\
   If Laragon is elsewhere, use its configured www/document-root folder.
2. Open Laragon and click Start All (or start Apache).
3. Visit http://localhost/arissa_portfolio/
   index.html should sit directly inside arissa_portfolio, not a nested folder.
   Laragon must serve HTTP on port 80 for that exact URL.

You can also open index.html directly in a browser. The main website and CV
links work without a server. Email copying is offered only when supported
in a secure context such as localhost; the email link always remains available.

EDITING
Open index.html in a text editor to change content. Update the color variables
at the top of style.css to change the palette. Keep the assets folder beside
index.html and preserve the CV filename so the download links keep working.
No external fonts, analytics, remote images, or dependencies are used.

CONTENT AND PRIVACY
Source: InternshipResumeNurArissa.pdf supplied by the owner.
The CV is a reformatted summary, not the original PDF. The original PDF is not
included because it contains a home address and phone number.
No GitHub, LinkedIn, demo, or source-code links were supplied, so none are invented.
The project artwork is labeled as concept illustration, not actual screenshots.
Only MySQL is named as a specific technology for the sunglasses project because
the source does not specify its programming language or full technology stack.
The portrait comes from the supplied resume. The updated visual design follows
the supplied screenshot: pink header, yellow centered hero, large serif headline,
pink name accent, rounded buttons, and floating flower and sparkle details.

ACCESSIBILITY AND BEHAVIOR
Semantic sections, skip link, keyboard-friendly native project details,
visible focus states, mobile navigation, reduced-motion preferences, and
screen-reader announcements for filters and email copying are included.
All content and expandable project details remain usable without JavaScript.

VERIFICATION
JavaScript syntax, local file references, section anchors, privacy checks,
and menu/filter/copy behavior were checked using local checks.
The generated CV was rendered and visually inspected.
Live browser and Laragon verification could not be completed in the authoring
environment because local socket access was blocked. Please preview in Laragon
using the steps above and check the layout on your own desktop and phone.

ANIMATIONS
Hero text enters in sequence; cards appear on scroll with a short stagger.
Flowers float, sparkles gently pulse, and the lemon sways. Buttons, navigation,
and project artwork respond to hover or focus. Project details animate on opening.
System reduced-motion preferences disable movement, including scroll animations.

LATEST LAYOUT
Skills use open columns and plain lists. Projects use alternating illustration
and text rows. Experience and achievements sit directly on the page without
card backgrounds. Existing filters, downloads, and animations are preserved.
