// Phase 1: UI Mock – No networking yet
document.addEventListener('DOMContentLoaded', () => {
  const screens = {
    entry: document.getElementById('entry'),
    lobby: document.getElementById('lobby'),
    game: document.getElementById('game')
  };

  // Hardcoded dares from our master JSON
  const DARES = {
    Family: ["Talk like a sports announcer...", /* 15 more */],
    "Show-Off": ["Act like a dog...", /* 15 more */],
    Daredevil: ["Put a card between your knees...", /* 15 more */],
    "House Rules": ["Yodel like a mountain goat...", /* 15 more */]
  };

  // Mock data for testing
  let isHost = false;
  let myName = '';
  let currentScreen = 'entry';

  function showScreen(id) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[id].classList.add('active');
    currentScreen = id;
  }

  // Entry handlers
  document.getElementById('hostBtn').onclick = () => {
    myName = document.getElementById('playerName').value.trim() || 'Host';
    isHost = true;
    showScreen('lobby');
    document.getElementById('roomIdDisplay').textContent = 'ABC123XYZ'; // mock
    document.querySelectorAll('.host-only').forEach(el => el.style.display = 'block');
    updateLobby();
  };

  document.getElementById('joinBtn').onclick = () => {
    myName = document.getElementById('playerName').value.trim() || 'Guest';
    showScreen('lobby');
    updateLobby();
  };

  document.getElementById('copyRoom').onclick = () => {
    navigator.clipboard.writeText('ABC123XYZ');
    alert('Room code copied!');
  };

  // Lobby mock updates
  function updateLobby() {
    const players = [
      {name: myName, ready: false, vote: null},
      {name: 'Player2', ready: true, vote: 'Family'},
      {name: 'Player3', ready: false, vote: 'Daredevil'}
    ];
    const list = document.getElementById('playerList');
    list.innerHTML = '';
    players.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name} ${p.ready ? '✓' : ''} ${p.vote ? '('+p.vote+')' : ''}`;
      list.appendChild(li);
    });

    const tally = {};
    players.forEach(p => p.vote && (tally[p.vote] = (tally[p.vote]||0)+1));
    document.getElementById('voteTally').textContent = Object.entries(tally).map(([k,v])=>`${k}: ${v}`).join(' | ') || 'No votes yet';
  }

  // Dare vote buttons
  document.querySelectorAll('.dare-votes button').forEach(btn => {
    btn.onclick = () => alert(`Voted for ${btn.dataset.cat}`);
  });

  document.getElementById('readyBtn').onclick = () => alert('Ready toggled');
  document.getElementById('startBtn').onclick = () => {
    showScreen('game');
    renderMockGame();
  };

  // Mock game UI
  function renderMockGame() {
    document.getElementById('drawCount').textContent = '68';
    renderCard(document.getElementById('topCard'), {color:'yellow', type:'num', value:7});

    const hand = document.getElementById('hand');
    hand.innerHTML = '';
    const mockHand = [
      {color:'red', type:'num', value:5},
      {color:'blue', type:'skip'},
      {color:'wild', type:'wild_dare'},
      {color:'green', type:'num', value:0},
      {color:'yellow', type:'dare'}
    ];
    mockHand.forEach(card => {
      const el = document.createElement('div');
      el.className = 'uno-card';
      renderCard(el, card);
      el.onclick = () => {
        if (card.type.includes('wild')) showModal('colorModal');
        else if (card.type.includes('dare')) showModal('dareModal', card);
        else alert('Played card!');
      };
      hand.appendChild(el);
    });
  }

  function renderCard(el, card) {
    el.className = 'uno-card ' + (card.color || 'wild');
    if (card.type === 'num') el.textContent = card.value;
    else if (card.type === 'rev') el.textContent = '↺';
    else if (card.type === 'skip') el.textContent = '⏭';
    else if (card.type === 'dare' || card.type === 'wild_dare') el.textContent = 'DARE!';
    else el.textContent = 'WILD';
  }

  function showModal(id, card = null) {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    const modal = document.getElementById(id);
    modal.classList.add('active');
    if (id === 'dareModal' && card) {
      document.getElementById('dareNum').textContent = '7';
      document.getElementById('dareText').textContent = 'Do 10 push ups in 10 seconds.';
    }
  }

  // Close modals on click outside
  document.querySelectorAll('.modal').forEach(m => {
    m.onclick = e => { if (e.target === m) m.classList.remove('active'); };
  });

  // Color choice mock
  document.querySelectorAll('#colorModal button').forEach(btn => {
    btn.onclick = () => {
      alert(`Chose ${btn.dataset.color}`);
      document.getElementById('colorModal').classList.remove('active');
    };
  });

  showScreen('entry');
});
