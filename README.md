# Aayush Pandey: Portfolio

Personal developer portfolio built with HTML5, CSS3 and vanilla JavaScript. No frameworks, no build step.

## Run locally
Open `index.html` in a browser, or use VS Code's Live Server extension.

## Structure
- `index.html`: page structure
- `css/style.css`: design tokens (colours, fonts) and component styles
- `css/animations.css`: scroll-reveal and reduced-motion rules
- `css/responsive.css`: breakpoint overrides
- `js/main.js`: starts all features
- `js/navigation.js`: sticky header, mobile menu, active-link highlighting
- `js/typing.js`: hero typewriter
- `js/contact.js`: form validation + Formspree sending
- `js/animations.js`: scroll-reveal observer
- `assets/`: images, icons and `documents/resume.pdf` (add your own)

## Build progress
- [x] All sections built (hero to footer)
- [x] Phase 2: Hero







## Things to personalise
- **Project screenshots:** add `snake-ai.png`, `file-sorter.png`, `cinejoy.png`, `airsketch.png` (about 800x500) to `assets/images/projects/`. Until then, cards show a placeholder.
- **Resume:** replace `assets/documents/resume.pdf`.
- **Favicon:** replace `assets/icons/favicon.svg` (or update the `<link rel="icon">` in `index.html`).
- **Social preview image:** uncomment the `og:image` line in `index.html` and set a 1200x630 image URL.
- **AirSketch GitHub link:** add a GitHub button to its card in `index.html` once the repo exists.
- **Live demos:** a commented "Live Demo" button template sits in each project card.
- **Add a skill:** copy one `<li class="tech-tile">` in the Skills section, add its logo to `assets/icons/`.
- **Contact form:** uses Formspree. The first submission triggers a confirmation email to the account owner.
