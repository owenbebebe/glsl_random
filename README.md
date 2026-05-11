# Project 52 — 01: Randomness

**Project 52** is a personal series of 52 creative coding projects, one per week, each exploring a distinct concept through GLSL, generative art, and interactive media.

---

## 01 — Randomness

You can access the website [here](https://owenbebebe.github.io/glsl_random/)*

<img width="544" height="306" alt="radom_week1" src="https://github.com/user-attachments/assets/8d8d42f8-2d7e-4fa2-950d-ebe3f54f7496" />

*Inspired by audio-visual artist [Ryoji Ikeda](https://www.ryojiikeda.com/)*

This project explores the nature of randomness as both a visual language and a philosophical statement. Drawing from Ikeda's signature aesthetic — high-frequency, data-driven imagery that feels simultaneously mechanical and sublime — the shader generates a field of scrolling binary noise where every attribute is determined by chance.




### What's random

- **Number of rows** — recomputed every second, the canvas splits into anywhere between 2 and 100 horizontal bands
- **Speed** — each row scrolls at its own velocity, sampled independently
- **Direction** — each row independently scrolls left or right
- **Frequency** — each row has its own block density, producing fine grain or coarse chunks at random
- **Color channels** — R, G, and B are offset from each other per-row to generate a chromatic glitch

### Interaction

Hovering over a row temporarily widens its blocks — a brief moment of visual calm carved out of the noise. The effect lingers for a few seconds across up to 5 rows simultaneously before dissolving back into chaos.

This tension between control and surrender is the core statement of the piece: *you can reach out and touch the noise, but the next second it resets, and nothing you did leaves a mark.* A meditation on the feeling that nothing matters in a world of chaos.

### Stack

- GLSL fragment shader
- [GlslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) for WebGL rendering
- Vanilla JS for mouse tracking and uniform injection
