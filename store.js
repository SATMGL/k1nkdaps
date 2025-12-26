const API_URL = 'https://script.google.com/macros/s/AKfycbxu5UrYrzUi49Pj6mG2ZT4Ajah7G7R5KPmkkcD9FJD5n1m0jOC8EYK_mldam80rDTBz/exec';

const grid = document.querySelector('.grid');

function showLoading() {
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.opacity = '0.3';
    grid.appendChild(card);
  }
}

function renderItems(items) {
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const card = document.createElement('div');
    card.className = 'card';

    if (items[i]) {
      card.innerHTML = `<div style="padding:10px;font-size:12px">
        <strong>${items[i].nama}</strong><br>
        ${items[i].harga || ''}<br>
        ${items[i].rarity || ''}
      </div>`;
    }

    grid.appendChild(card);
  }
}

async function loadItems() {
  showLoading();
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'getItems' })
    });
    const data = await res.json();
    renderItems(data);
  } catch (e) {
    console.error(e);
  }
}

loadItems();
