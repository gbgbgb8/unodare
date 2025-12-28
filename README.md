# 🃏💥 UNO Dare! Online

### The Chaotic Card Game That Makes Family Game Night Dangerous Again

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PeerJS](https://img.shields.io/badge/Powered%20by-PeerJS-blue)](https://peerjs.com/)
[![Vanilla JS](https://img.shields.io/badge/Built%20with-Vanilla%20JS-f7df1e)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Backend](https://img.shields.io/badge/Backend-None%20Needed-green)](https://en.wikipedia.org/wiki/Peer-to-peer)

---

**UNO Dare!** is an open-source, browser-based, peer-to-peer multiplayer implementation of the beloved (and feared) card game where you either **play cards** or **perform ridiculous dares**. No app downloads. No accounts. No servers to maintain. Just pure, unadulterated chaos delivered straight to your browser.

One player hosts a room, shares a 4-letter code (or a clickable link), and within seconds, you and up to 9 friends are locked in a battle of wits, luck, and the willingness to embarrass yourselves.

```
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║     🔴 UNO     "Talk like a pirate until your next turn."    ║
    ║     🟡 DARE!                                                  ║
    ║     🟢         Do it. Or draw 2 cards. Your choice. 🏴‍☠️       ║
    ║     🔵                                                        ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
```

---

## 🌟 Features

- **🎮 Real P2P Multiplayer** — WebRTC-powered connections via PeerJS. No server costs, no accounts, no bullshit.
- **🔗 Room Codes & Invite Links** — Generate a 4-letter code or copy a direct join URL to share with friends.
- **👥 2-10 Players** — Intimate duels or chaotic free-for-alls. Your call.
- **🎭 4 Dare Categories** — Family (mild), Show-Off (performative), Daredevil (physical), and House Rules (absolute chaos).
- **📱 Responsive Design** — Works beautifully on phones, tablets, and desktops.
- **🎨 Beautiful UI** — Dark theme with vibrant UNO colors, smooth animations, and that satisfying card-game feel.
- **🔊 Full Game Rules** — Reverse, Skip, Dare, Wild Dare, UNO calls, penalties, and scoring to 500.
- **🛠️ Pure Vanilla Stack** — HTML, CSS, JavaScript. No frameworks. Easy to understand, fork, and hack.

---

## 🚀 Quick Start

### Playing Online (Recommended)

1. **Host a Game**: Click **Host Game**, enter your name, and create a room.
2. **Share the Code**: Copy the 4-letter room code or click **Copy Invite Link**.
3. **Wait for Friends**: Watch players join in real-time.
4. **Choose Dare Category**: Pick from Family, Show-Off, Daredevil, or House Rules.
5. **Start the Chaos**: Once 2+ players are in, click **Start Game**.

### Running Locally

```bash
# Clone the repository
git clone https://github.com/gbgbgb8/unodare.git
cd unodare

# Start a local server (Python 3)
python3 -m http.server 8080

# Or with Node.js
npx serve

# Or with PHP
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

> **Note**: A web server is required because PeerJS loads from a CDN and needs proper CORS headers. Opening the HTML file directly (`file://`) won't work.

---

# 🎮 FOR PLAYERS

## How to Play UNO Dare!

If you've played regular UNO, you're 90% there. The twist? Instead of boring "+2" cards, you have **Dare cards** that force the next player to either perform a dare or suffer the consequences.

### The Setup

1. Each player starts with **7 cards**.
2. One card is flipped face-up to start the **discard pile**.
3. Players take turns going **clockwise** (unless someone plays a Reverse).

### On Your Turn

**Match the top card** by either:
- **Color** (Red, Yellow, Green, Blue)
- **Number** (0-9)
- **Symbol** (Skip, Reverse, Dare)

**If you can play a card**: Click it! It goes on the discard pile.

**If you can't (or don't want to)**: Click **Draw Card**. If the drawn card is playable, you can play it immediately. If not, click **Pass Turn**.

### Action Cards

| Card | Effect |
|------|--------|
| **⇄ Reverse** | Reverses play direction. In 2-player games, acts like Skip. |
| **⊘ Skip** | The next player loses their turn. Brutal. |
| **🎭 Dare** | Next player must choose: **Do the dare** or **Draw 2 cards**. The dare number on the card tells you which dare to perform. |
| **🎭 Wild Dare** | Same as Dare, but you also get to **choose the color**. Maximum power move. |

### The Dare System

When a Dare or Wild Dare is played against you:

1. A modal appears showing the **dare number** and **dare text**.
2. You choose:
   - **✅ Do the Dare!** — Attempt the dare. The group decides if you succeeded.
   - **❌ Draw 2 Cards** — Chicken out. Take two cards and skip your turn.
3. If you attempt the dare and **fail** (or refuse mid-dare), you still draw 2 cards.

Dares are meant to be **fun and silly**. Set boundaries before playing. If someone's uncomfortable with a dare, they can always draw cards instead.

### Calling UNO

When you have **one card left**, you must call UNO before playing your second-to-last card:

1. Click the pulsing red **UNO!** button.
2. If you forget, other players can catch you!
3. Getting caught = **+2 penalty cards**.

### Winning

- **The round ends** when someone plays their last card.
- The winner scores points based on cards left in opponents' hands:
  - Number cards: **Face value** (0-9 points)
  - Skip, Reverse, Dare: **20 points** each
  - Wild Dare: **50 points** each
- First player to **500 points** wins the game!

### Controls Cheat Sheet

| Action | How |
|--------|-----|
| Play a card | Click a glowing (playable) card |
| Draw a card | Click **Draw Card** or the deck |
| Pass turn | Click **Pass Turn** (after drawing) |
| Call UNO | Click the red **UNO!** button |
| View scores | Click 📊 in the header |
| Choose color | Click the color buttons when prompted |

---

## 🎭 Dare Categories

Choose your poison at the start of each game:

### 👨‍👩‍👧‍👦 Family (Mild & Silly)
Perfect for all ages. Expect silly voices, funny faces, and gentle embarrassment.

*Examples:*
- "Talk like a sports announcer and narrate the game until your next turn."
- "Sing instead of talk until your next turn."
- "Act like a cat until your next turn."

### 💃 Show-Off (Performative)
For the hams and drama queens. Expect impersonations, runway walks, and theatrical flair.

*Examples:*
- "Do a runway model walk across the room."
- "Impersonate your favorite singer."
- "Talk like a super villain until your next turn."

### 🏋️ Daredevil (Physical Challenges)
Get off your butt. Expect balancing, hopping, and mild athletic feats.

*Examples:*
- "Balance one card on your head until your next turn."
- "Do 10 push-ups in 10 seconds."
- "Stand on 1 foot until your next turn."

### 🏠 House Rules (Absolute Chaos)
User-submitted madness. Expect the unexpected.

*Examples:*
- "Beatbox 'Boots and Cats' until the next player completes their turn."
- "Impersonate a T-Rex (tiny arms!) until your next turn."
- "Strike a superhero pose and declare your powers before playing."

---

## 💡 Tips & Strategy

1. **Save your Wild Dares** — They're worth 50 points if you're caught holding them. Play them early or strategically.
2. **Watch the card counts** — When someone has 2 cards, be ready to catch them forgetting UNO.
3. **Embrace the dares** — Drawing 2 cards is safe, but doing dares is way more fun.
4. **Color strategy** — If you have lots of one color, try to keep the pile that color.
5. **Reverse psychology** — In 2-player games, Reverse is basically Skip. Use it wisely.

---

# 💻 FOR DEVELOPERS

## Tech Stack

This project is intentionally minimal and hackable:

| Component | Technology |
|-----------|------------|
| **Frontend** | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| **Networking** | [PeerJS](https://peerjs.com/) (WebRTC abstraction) |
| **Backend** | None! Pure P2P architecture |
| **Hosting** | Any static file server (GitHub Pages, Netlify, Vercel, etc.) |
| **Build Tools** | None! No webpack, no bundlers, no npm install |

### File Structure

```
unodare/
├── index.html          # Complete HTML structure with all screens and modals
├── style.css           # All styling (~1200 lines of pure CSS)
├── script.js           # Game logic, networking, and UI (~1700 lines)
├── README.md           # You are here
├── howtoplay.md        # Official UNO Dare! rules reference
└── uno_dare_*.json     # Dare data files (reference, not loaded at runtime)
```

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                          HOST (Game Czar)                        │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                     GameState (Authoritative)               │ │
│  │  • Full deck array                                          │ │
│  │  • All player hands                                         │ │
│  │  • Current turn, direction, scores                          │ │
│  │  • Pending dare/color state                                 │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│              ┌───────────────┼───────────────┐                   │
│              ▼               ▼               ▼                   │
│         [Connection]    [Connection]    [Connection]             │
│              │               │               │                   │
└──────────────┼───────────────┼───────────────┼───────────────────┘
               │               │               │
               ▼               ▼               ▼
        ┌──────────┐    ┌──────────┐    ┌──────────┐
        │ Player 2 │    │ Player 3 │    │ Player 4 │
        │          │    │          │    │          │
        │ LocalState│    │ LocalState│    │ LocalState│
        │ • myHand │    │ • myHand │    │ • myHand │
        │ • isMyTurn│    │ • isMyTurn│    │ • isMyTurn│
        └──────────┘    └──────────┘    └──────────┘
```

**Host-Authoritative Model**: The host maintains the complete game state and broadcasts updates to all connected players. Players can only see their own cards and public game information. All game actions are validated by the host before being applied.

### Message Protocol

Communication happens via PeerJS data channels. Messages are JSON objects with a `type` field:

```javascript
// Lobby Messages
{ type: 'join_request', name: 'Alice', peerId: 'abc123' }
{ type: 'join_accepted', playerId: 'abc123', players: [...] }
{ type: 'lobby_update', players: [...], settings: {...} }
{ type: 'game_starting' }

// Game Actions
{ type: 'play_card', cardId: 42 }
{ type: 'draw_card' }
{ type: 'pass_turn' }
{ type: 'color_chosen', color: 'blue' }
{ type: 'dare_choice', choice: 'do' | 'skip' }
{ type: 'dare_result', completed: true | false }
{ type: 'call_uno' }

// State Sync
{ type: 'game_state', myHand: [...], isMyTurn: true, ... }
{ type: 'round_end', winnerId: '...', points: 42, scores: [...] }
{ type: 'game_over', winnerId: '...', scores: [...] }
```

### Key Functions Reference

| Function | Purpose |
|----------|---------|
| `createRoom()` | Initialize PeerJS as host, generate room code |
| `joinRoom()` | Connect to host's PeerJS peer |
| `broadcastGameState()` | Send personalized state to each player |
| `handlePlayCardRequest()` | Validate and process card plays |
| `triggerDare()` | Initiate dare modal flow |
| `startRound()` | Shuffle deck, deal cards, begin new round |
| `renderGame()` | Update all UI elements based on current state |

### Customizing Dares

Dares are stored in the `DARES` object at the top of `script.js`. Each category has exactly **16 dares** (matching the dare numbers 1-16 on cards):

```javascript
const DARES = {
    "Family": [
        "Dare text for #1",
        "Dare text for #2",
        // ... up to 16
    ],
    "Daredevil": [...],
    "Show-Off": [...],
    "House Rules": [...]
};
```

To add your own dare category:
1. Add it to the `DARES` object
2. Add a button in the lobby HTML
3. Update the `selectDareCategory()` function

### Running Tests

There's no automated test suite (yet). To manually test multiplayer:

1. Start a local server: `python3 -m http.server 8080`
2. Open `http://localhost:8080` in Browser 1 → Host a game
3. Open `http://localhost:8080?room=XXXX` in Browser 2 → Join
4. Open in additional browsers/tabs as needed
5. Play through scenarios: card plays, dares, UNO calls, round ends

### Common Development Tasks

**Add a new card type:**
1. Update `createDeck()` to include the new card type
2. Add rendering logic in `createCardElement()`
3. Add CSS styling for `.uno-card.your-type`
4. Handle the action in `handleCardAction()`

**Modify scoring:**
1. Update `calculateRoundScore()` (values are hardcoded)
2. Optionally change `WINNING_SCORE` in `GameState`

**Add sound effects:**
1. Load audio files (or use Web Audio API)
2. Trigger sounds in `showToast()`, `handleCardClick()`, `handleUnoCall()`, etc.
3. Add volume controls to the UI

**Add animations:**
1. CSS animations are in `style.css` (`@keyframes` blocks)
2. Add classes to elements dynamically
3. Use `setTimeout` or `animationend` events for sequencing

### Deployment

This is a static site. Deploy anywhere:

**GitHub Pages:**
```bash
git push origin main
# Enable GitHub Pages in repo settings
```

**Netlify/Vercel:**
```bash
# Just connect your repo - it auto-deploys
```

**Your own server:**
```bash
# Copy files to any web root
scp -r * user@server:/var/www/html/unodare/
```

### Contributing

Pull requests are welcome! Priority areas:

- [ ] **Card animations** — Flip, fly-to-discard effects
- [ ] **Sound effects** — UNO yell, card plays, dare buzzer
- [ ] **Mobile optimizations** — Better touch scrolling for large hands
- [ ] **Reconnection handling** — Rejoin if temporarily disconnected
- [ ] **Spectator mode** — Watch without playing
- [ ] **Chat system** — Text chat between players
- [ ] **Custom dare editor** — UI for creating house rules
- [ ] **Game history** — Log of plays for disputes

---

# 🤓 FOR UNO DARE ENTHUSIASTS

## The Beautiful Chaos of UNO Dare

### A Brief History

UNO Dare was released by Mattel as a variant of the classic UNO game, taking the time-honored tradition of making your friends angry and adding public humiliation into the mix. Because apparently, screaming "UNO!" and slapping cards on a table wasn't enough drama for modern families.

The genius of UNO Dare lies in its simplicity: it takes the exact same addictive gameplay loop of regular UNO and injects it with low-stakes performance art. Suddenly, that competitive uncle who always wins isn't just playing cards—he's also barking like a dog for the next 3 minutes while trying to maintain his dignity.

### The Dare Philosophy

UNO Dare dares are carefully designed to walk the razor's edge between "hilarious" and "actually impossible to refuse." The best dares share these qualities:

1. **Immediate and Public** — Everyone can see if you're doing it
2. **Duration-Based** — "Until your next turn" creates ongoing comedy
3. **Escalating Awkwardness** — Gets funnier the longer it goes
4. **Achievable** — No one actually gets hurt
5. **Interruptible** — If you talk like a pirate, others can test you

The four official dare categories represent a beautiful spectrum:

- **Family** leans into gentle absurdity
- **Show-Off** rewards the naturally theatrical
- **Daredevil** punishes the uncoordinated
- **House Rules** is where you put the dares your aunt thinks are "too much"

### Why This Game Exists

Commercial UNO Dare is great, but it has limitations:

- **Physical cards get lost** (especially those tiny dare list cards)
- **You need everyone in the same room** (what is this, 2019?)
- **The dare lists can't be customized** without crossing things out
- **No one remembers whose turn it is** after dare chaos erupts

This digital version solves all of that:

- ✅ Always have all 108 cards
- ✅ Play with friends across the world
- ✅ Customize dare lists infinitely
- ✅ The computer tracks turns, scores, and UNO violations
- ✅ It's free, open source, and nobody's monetizing your family bonding time

### The 16 Sacred Numbers

Every Dare and Wild Dare card has a number from 1-16 on it. This isn't random—it corresponds to the 16 dares in each category. When a dare card is played, the victim looks at the number, finds that dare on the list, and faces their fate.

This creates beautiful moments:

- **The Hopeful Draw**: "Please be #7, please be #7..." (It's #15)
- **The Collective Memory**: "Oh no, #4 is the ballerina one"
- **The Strategic Save**: Playing your #12 dare because you know the next player can't do accents
- **The Mercy Play**: "I'll take the Wild Dare knowing #8 is easy"

### House Rules: The True Endgame

The best UNO Dare players eventually graduate to House Rules—the category where you write your own dares. This is where the game transcends its commercial origins and becomes a canvas for your group's inside jokes, personal challenges, and escalating nonsense.

Popular house rule themes include:

- **Pop Culture**: "Recite the opening crawl of Star Wars"
- **Physical Comedy**: "Walk like you desperately need the bathroom"
- **Personal Attacks**: "Compliment the player who most recently insulted you"
- **Meta Gaming**: "Give strategic advice to the player currently losing"
- **Chaos**: "Everyone else draws 1 card" (yes, this exists)

### The Social Contract

UNO Dare works because everyone implicitly agrees to:

1. **Actually do the dares** (or accept the penalty)
2. **Not be weird about it** (it's a game, relax)
3. **Judge fairly** (don't fail someone who tried)
4. **Remember who's doing what** (test their accents, catch their smiles)
5. **Not stack the deck** (no memorizing card positions)
6. **Have fun** (that's literally the point)

If someone isn't comfortable with a dare, they draw cards. No explanation needed. The game continues.

### Competitive UNO Dare

For those who take their chaos seriously:

**Tournament Format:**
1. Play to 500 points (standard rules)
2. Rotate dare categories each round
3. Failed dares count double (draw 4 instead of 2)
4. UNO violations count double (draw 4 instead of 2)
5. Time limit: 2 hours or someone flips the table

**Scoring Strategies:**
- Wild Dares are high-risk, high-reward. Play them early or get stuck with 50 penalty points.
- Dare cards are worth 20 points. Don't hoard them.
- Going out on a dare card is the ultimate power move.

**Psychological Warfare:**
- Make eye contact while doing dares. Assert dominance.
- If someone forgets their ongoing dare, catch them loudly.
- Compliment good dare performances. Demoralize bad ones with silence.

### The Perfect UNO Dare Session

After extensive research (playing this game way too much), we've identified the conditions for transcendent UNO Dare:

1. **4-6 players** — Enough for chaos, few enough for strategy
2. **Everyone knows each other** — Inside jokes make dares funnier
3. **Adults only** OR **all ages** (not mixed) — Keeps dare selection appropriate
4. **Someone competitive** — Raises the stakes
5. **Someone theatrical** — Sets the performance bar
6. **Ambient beverages** — Optional but historically significant
7. **No phones** — Except the ones running this game

### Famous Dares in History

*These have not been verified but we choose to believe them:*

- A CEO reportedly negotiated a multi-million dollar deal while speaking only in questions (Dare #3, House Rules)
- A wedding was delayed 20 minutes because the best man couldn't stop singing every word (Dare #14, Family)
- A physics professor proved you CAN balance cards on each shoulder while lecturing (Dare #9, Daredevil)
- Someone's grandmother, age 78, did 10 pushups in 8 seconds (Dare #7, Daredevil)

### A Love Letter to the Game

UNO Dare takes something we all know—a simple card game—and transforms it into a vehicle for connection. In an age of infinite entertainment options, there's something magical about sitting around (physically or virtually) and watching your friends make fools of themselves.

The dares aren't the point. The point is the laughter. The shared absurdity. The memories you'll bring up at every future gathering: "Remember when you had to bark like a dog for three full turns?"

This digital version exists because that experience shouldn't require everyone being in the same room. Because your long-distance friends deserve to see you freeze perfectly still. Because your college buddies scattered across the country need to hear you baby-talk your way through a crucial play.

UNO Dare is, at its core, permission to be silly. And we could all use a little more of that.

---

## 📜 License

MIT License — Do whatever you want with this code. Make it better. Make it weirder. Make money (somehow). Just don't sue us when someone sprains an ankle during a Daredevil dare.

---

## 🙏 Credits

- **Original UNO Dare** — Mattel, for the game design
- **PeerJS** — For making WebRTC not terrible
- **Google Fonts** — Bangers and Nunito typefaces
- **The Open Source Community** — For everything else

---

## 🔗 Links

- **Play Now**: *[Deploy your own instance!]*
- **GitHub**: [github.com/gbgbgb8/unodare](https://github.com/gbgbgb8/unodare)
- **Report Bugs**: Open an issue on GitHub
- **Request Features**: Open an issue or PR

---

<div align="center">

**Go forth and dare.** 🃏💥

*Made with ❤️ and questionable life choices*

</div>
