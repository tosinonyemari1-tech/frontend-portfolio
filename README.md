# Frontend Developer Portfolio Ecosystem

A complete, premium frontend developer portfolio built with **HTML5, CSS3, and Vanilla JavaScript**. This ecosystem includes a main personal portfolio and five professional project websites demonstrating different frontend capabilities.

---

## 🎯 Project Overview

This portfolio is designed to help frontend developers get hired by companies and win freelance clients. Every website looks professionally designed and developed, showcasing real-world skills across different industries.

### Main Portfolio
- **Theme:** Black + Orange + Dark Premium
- **Style:** Cinematic, modern, interactive
- **Features:** Custom cursor, scroll animations, case study modals, responsive design

### Five Professional Projects

| Project | Industry | Skills Demonstrated |
|---------|----------|-------------------|
| **Nexa Finance** | Fintech/Banking | Dashboard UI, data visualization, glass morphism |
| **Velora** | E-Commerce/Fashion | Product UI, filtering, cart, wishlist, quick view |
| **TaskFlow** | B2B SaaS | Pricing toggle, FAQ accordion, tabbed interfaces |
| **Haven** | Real Estate | Search/filter, property cards, modal details |
| **Noir Digital** | Creative Agency | Advanced animations, bold typography, scroll effects |
| **Essence By Gem** | Luxury E-Commerce | Fragrance UI, product details, luxury branding, quick view |

---

## 🛠 Technologies

- **HTML5** — Semantic markup, accessibility
- **CSS3** — Custom properties, Grid, Flexbox, animations, gradients
- **Vanilla JavaScript** — ES6+, Intersection Observer, DOM manipulation
- **No external dependencies** — Zero libraries, maximum performance

---

## ✨ Features

### Main Portfolio
- Custom cursor with hover effects (desktop only)
- Page loader animation
- Sticky navigation with scroll state changes
- Animated hamburger mobile menu
- Hero section with floating elements and particle effects
- Scroll reveal animations throughout
- Animated statistics counters
- Skill cards with hover glow effects
- Professional timeline
- Project case study modals
- Contact form with validation
- Smooth scrolling navigation

### Projects
- Responsive design (320px to 1440px+)
- Mobile-first approach
- Accessible (semantic HTML, ARIA, keyboard navigation)
- `prefers-reduced-motion` support
- Professional micro-interactions
- All relative paths for GitHub Pages deployment

---

## 📁 Project Structure

```
frontend-portfolio/
├── index.html              # Main portfolio
├── README.md               # This file
├── .gitignore              # Git ignore rules
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── css/
│   └── style.css           # Main portfolio styles
│
├── js/
│   └── script.js           # Main portfolio scripts
│
└── projects/
    ├── nexa-finance/       # Fintech banking platform
    │   ├── index.html
    │   ├── css/style.css
    │   └── js/script.js
    │
    ├── velora/             # Premium e-commerce
    │   ├── index.html
    │   ├── css/style.css
    │   └── js/script.js
    │
    ├── taskflow/           # B2B SaaS platform
    │   ├── index.html
    │   ├── css/style.css
    │   └── js/script.js
    │
    ├── haven/              # Real estate platform
    │   ├── index.html
    │   ├── css/style.css
    │   └── js/script.js
    │
    ├── noir-digital/       # Creative agency
    │   ├── index.html
    │   ├── css/style.css
    │   └── js/script.js
    │
    └── essence-by-gem/     # Luxury perfume store
        ├── index.html
        ├── css/style.css
        └── js/script.js
```

---

## 🚀 How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/YOURUSERNAME/frontend-portfolio.git
cd frontend-portfolio
```

2. Open `index.html` in your browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using VS Code
# Install "Live Server" extension → Right-click index.html → Open with Live Server
```

3. Navigate to `http://localhost:8000`

---

## 🌐 Deploy to GitHub Pages

1. Push your code to a GitHub repository
2. Go to **Settings → Pages**
3. Under **Source**, select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Click **Save**

Your site will be available at:
```
https://YOURUSERNAME.github.io/frontend-portfolio/
```

Individual projects:
```
https://YOURUSERNAME.github.io/frontend-portfolio/projects/nexa-finance/
https://YOURUSERNAME.github.io/frontend-portfolio/projects/velora/
https://YOURUSERNAME.github.io/frontend-portfolio/projects/taskflow/
https://YOURUSERNAME.github.io/frontend-portfolio/projects/haven/
https://YOURUSERNAME.github.io/frontend-portfolio/projects/noir-digital/
https://YOURUSERNAME.github.io/frontend-portfolio/projects/essence-by-gem/
```

---

## ✏️ Customization Guide

### Replace Your Name
The name is currently set to "Tosin Ndidi". Search in `index.html` and replace with your name if needed.

### Replace Profile Photo
Add your photo to `assets/images/` and update the `<img>` tag in the About section of `index.html`.

### Replace CV/Resume
Add your CV to `assets/` and update the "Download CV" link in the hero section.

### Update Contact Info
- Email: Search for "hello@alexmorgan.dev" in `index.html`
- Social links: Update the `href` attributes in the contact and footer sections

### Update Skills
Edit the skills section in `index.html` to match your actual skills.

### Update Experience
Edit the timeline section in `index.html` with your real work experience.

### Update Projects
- Replace project descriptions in the projects section
- Update the case study data in `js/script.js` (the `caseStudies` object)
- Replace project images in each project's `assets/` folder

### Update Testimonials
Edit the testimonials section in `index.html` with real client feedback.

### Change Colors
Edit the CSS custom properties in `css/style.css`:
```css
:root {
    --bg: #050505;
    --bg-secondary: #0D0D0D;
    --cards: #111111;
    --orange: #FF6A00;    /* Change this for a different accent */
    --white: #FFFFFF;
    --muted: #A1A1A1;
    --border: #222222;
}
```

### Update Project URLs
All links use relative paths. To change project names, update both the folder names and all references in `index.html`.

---

## 📋 Accessibility

- Semantic HTML5 throughout
- ARIA labels on interactive elements
- Keyboard navigable
- Focus states visible
- Color contrast meets WCAG standards
- `prefers-reduced-motion` respected
- Alt text on all images

---

## ⚡ Performance

- Zero external dependencies
- CSS animations (GPU-accelerated)
- Intersection Observer for lazy loading
- Optimized SVG icons
- Minimal JavaScript footprint
- No render-blocking resources

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ and vanilla code.
