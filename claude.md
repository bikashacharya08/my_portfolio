# Portfolio Project Overview

This project is a modern, high-performance portfolio website for Bikash Acharya, a Cybersecurity Enthusiast & Designer.

## Core Architecture
- **Tech Stack:** Vanilla HTML, CSS, JavaScript.
- **Physics Engine:** Matter.js (via CDN).
- **Build Tools:** None required (runs natively in browser or simple static server like `npx serve`).

## Key Features & Themes
- **Cyberpunk Hacker Aesthetic:** Deep black backgrounds, neon green/magenta accents, monospace terminal typography, and CRT scanlines.
- **Matrix Digital Rain:** An HTML5 `<canvas>` background rendering classic falling matrix code (pending implementation).
- **The "Exploit" Physics Engine:** A hidden terminal button (`> ./exploit.sh`) that acts as a "chaos engineering" trigger. When clicked, it initializes Matter.js. All major DOM elements (project cards, headers, footers) disconnect from the document flow and fall to the bottom of the screen. Users can then drag, toss, and bounce these elements around the viewport.

## File Structure
- `index.html`: Contains the structural semantic layout and the physics target wrappers.
- `styles.css`: Contains all visual styling, neon effects, and animations.
- `script.js`: Contains the Matter.js physics logic that maps DOM bounding client rects to physics bodies.
