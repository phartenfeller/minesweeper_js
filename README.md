# Minesweeper PWA with vanilla JavaScript, CSS and HTML.

Original MS Minesweeper game with vanilla JavaScript, CSS and HTML. No Library or Framework used.

You can play the game here: https://minesweepergame.de/

![Desktop Screenshot](assets/screenshots/Desktop-Screenshot.png)

## Features

- Full offline support
- Installable
- No JavaScript Framework used for the Minesweeper part
- Responsive UI with [TailwindCSS](https://github.com/tailwindcss/tailwindcss)
- Statistics tracked with IndexDB and [Dexie](https://github.com/dfahlander/Dexie.js)
- Customizable gamesettings

## Todo

- Save gamestate when closing / refreshing midgame

## Browser problems

**IE** is not supported!

Only Chromium **Edge** is supported

- **Firefox** doesn't support css zoom. Style `transform: scale()` could be the solution. Can I use Link: [https://caniuse.com/#feat=css-zoom](https://caniuse.com/#feat=css-zoom)
- **Safari** has shitty PWA support, apple...
