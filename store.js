const API_URL = "https://script.google.com/macros/s/AKfycbxu5UrYrzUi49Pj6mG2ZT4Ajah7G7R5KPmkkcD9FJD5n1m0jOC8EYK_mldam80rDTBz/exec";
const list = document.getElementById("list");
const SLOT = 9;

showLoading();
loadItems();

function showLoading() {
  list.innerHTML = "";
  for (let i = 0; i < SLOT; i++) {
    const c = document.createElement("div");
    c.className = "card loading";
    list.appendChild(c);
  }
}

async function loadItems() {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "getItems" })
    });

    const items = await res.json();
    list.innerHTML = "";

    items.forEach(item => {
      list.appendChild(createCard(item));
    });

    for (let i = items.length; i < SLOT; i++) {
      list.appendChild(createEmpty());
    }

  } catch (err) {
    list.innerHTML = "";
    for (let i = 0; i < SLOT; i++) {
      list.appendChild(createEmpty("ERROR"));
    }
  }
}

function createCard(item) {
  const c = document.createElement("div");
  c.className = "card";
  c.innerHTML = `
    <img src="${item.gambar || ""}">
    <div class="card-body">
      <div class="nama">${item.nama}</div>
      <div class="harga">Rp ${item.harga}</div>
      <div class="stok">Stok: ${item.stok}</div>
    </div>
    <button class="btn">Beli</button>
  `;
  return c;
}

function createEmpty(text = "KOSONG") {
  const c = document.createElement("div");
  c.className = "card empty";
  c.innerHTML = `<div class="card-body">${text}</div>`;
  return c;
}
