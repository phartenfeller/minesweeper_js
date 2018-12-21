# minesweeper_js

## Minesweeper with JavaScript, CSS and HTML.

In this Project I am trying to rebuild the original MS Minesweeper game with JavaScript, CSS and HTML. The only libary used is JQuery.

You can play this project here: https://phartenfeller.github.io/minesweeper_js/

## Browser problems

- ~~**IE**: Currently not supported. I'm planning to use babel in the future to add support.~~
- **Edge and IE**: Doesn't support style `image-rendering: pixelated`. But with Edge changing the engine to Chromium this should be supported in the future.  Can I use Link: [https://caniuse.com/#feat=css-crisp-edges](https://caniuse.com/#feat=css-crisp-edges)
- **Edge and IE**: Sprites have ugly edges
- **Firefox** doesn't support css zoom. Style `transform: scale()` could be the solution. Can I use Link: [https://caniuse.com/#feat=css-zoom](https://caniuse.com/#feat=css-zoom)


## AI Concept

  1. When a tile has x bombs around and only x unclicked tiles => flag all.
  2. When a tile has x bombs around and x flagged => click all others
