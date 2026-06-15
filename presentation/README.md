# Agentic Engineering — presentation

A [reveal.js](https://revealjs.com) deck on agentic engineering and the spec-driven
development (SDD) loop built in this repo, themed in the **trstd** brand colours
(navy `#03113A`, cyan `#0DBEDC`, gold `#FFDC0F`).

## Run it

```bash
cd presentation
npm install     # fetches reveal.js + http-server
npm start       # serves on http://localhost:8000 and opens a browser
```

If you prefer not to install a server, any static server works (e.g.
`python3 -m http.server 8000`) — just run it from this `presentation/` folder so the
`node_modules/reveal.js/...` paths resolve. `npm install` is still required to fetch
reveal.js into `node_modules/`.

## Controls

- **→ / Space** next, **←** previous, **Esc** slide overview, **F** fullscreen, **S** speaker notes.

## Structure

- `index.html` — the slides
- `theme/trstd.css` — the brand theme (overrides reveal.js variables)
- `package.json` — reveal.js + a static server

## Outline

1. Title
2. Agenda
3. Status quo → 4. What changes → 5. How development changes
6. Coding → specification (the attention shift)
7. Why split product refinement from implementation
8. The loop (overview)
9–18. One slide per skill: briefing, epic, refine, reconcile, tech-stack, tech-refine,
   breakdown, implement, verify, + the architecture-guardian subagent
19–20. Beyond greenfield: brownfield & iteration
21. The loop mechanics & anchors · 22. What to watch out for · 23. Takeaways · 24. End
