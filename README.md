# UNO Dare! Online - Open Source Web Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PeerJS Powered](https://img.shields.io/badge/Powered%20by-PeerJS-blue)](https://peerjs.com/)

An open-source, browser-based multiplayer version of **UNO Dare!** – the chaotic family card game where you either play cards or perform ridiculous dares.

Play with friends anywhere, no app install needed. Host a room, share the code, vote on dare intensity, and unleash mayhem.

## Live Demo
*(Coming soon)*

## Features

- **Real P2P multiplayer** via PeerJS (no server, no accounts)
- Room codes for easy joining
- Lobby with player list, dare category voting (Family / Show-Off / Daredevil / custom House Rules), and ready checks
- Full UNO Dare! rules: Reverse, Skip, Dare, Wild Dare
- Dare prompts with choice: do it or draw 2 + skip
- Responsive UI – works great on phone, tablet, desktop
- Pure vanilla JS/HTML/CSS – easy to hack on
- Customizable dares via JSON

## Dare Lists (included)

All official + custom dares transcribed and structured:

- `dares_family.json` – Red card (mild, family-friendly)
- `dares_showoff.json` – Yellow card (performative)
- `dares_daredevil.json` – Blue card (physical challenges)
- `dares_house.json` – Green card (custom house rules – currently loaded with chaotic user-submitted ones)

Files: https://github.com/gbgbgb8/unodare/tree/main

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- [PeerJS](https://peerjs.com/) for WebRTC signaling (free cloud broker)
- No backend, no database, no bullshit

## Project Deets

- Fully working lobby
- Real-time player sync
- Vote + ready system
- Host/join via room code

**Next Phases** 
1. Deck generation & dealing
2. Turn-based gameplay logic
3. Card playing, action resolution (Reverse/Skip/Dare)
4. Wild color picker & dare choice modals
5. UNO call + penalty
6. Scoring & multi-round to 500 points
7. Animations & sound effects (optional but fun as fuck)
8. Mobile touch optimizations
9. Deploy live demo


## Contributing

This shit is meant to be fun and chaotic. Fork it, break it, make it better.

Top priorities:
- Finish the goddamn game logic
- Add card animations (flip, fly to discard)
- Sound effects (UNO yell, dare fail buzzer)
- Better mobile hand scrolling
- QR code for room sharing
- Dark/light mode toggle

## License

MIT – do whatever the fuck you want with it.

Let's make family game night dangerous again. 🃏💥

**Go forth and dare.**
