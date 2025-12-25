const API_URL = "https://script.google.com/macros/s/AKfycbxu5UrYrzUi49Pj6mG2ZT4Ajah7G7R5KPmkkcD9FJD5n1m0jOC8EYK_mldam80rDTBz/exec";
const list = document.getElementById("list");
const SLOT = 9;

async function loadProducts() {
  list.innerHTML = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "getItems" })
    });

    const data = await res.json();
    const items = Array.isArray(data) ? data : [];

    /* Render produk */
    items.forEach(item => {
      list.appendChild(createCard(item));
    });

    /* Tambah slot kosong sampai 9 */
    const kosong = Math.max(0, SLOT - items.length);
    for (let i = 0; i < kosong; i++) {
      list.appendChild(createEmptyCard());
    }

  } catch (e) {
    list.innerHTML = `<div class="card empty"><div class="card-body">Gagal memuat produk</div></div>`;
    console.error(e);
  }
}

/* CARD PRODUK */
function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${item.gambar || ""}">
    <div class="card-body">
      <div class="nama">${item.nama || "-"}</div>
      <div class="harga">Rp ${item.harga || 0}</div>
      <div class="stok">Stok: ${item.stok || 0}</div>
    </div>
    <button class="btn">Beli</button>
  `;

  return card;
}

/* CARD KOSONG */
function createEmptyCard() {
  const card = document.createElement("div");
  card.className = "card empty";

  card.innerHTML = `
    <div class="card-body">
      SLOT KOSONG
    </div>
  `;

  return card;
}

loadProducts();
