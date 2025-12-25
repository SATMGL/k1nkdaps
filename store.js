const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxu5UrYrzUi49Pj6mG2ZT4Ajah7G7R5KPmkkcD9FJD5n1m0jOC8EYK_mldam80rDTBz/exec";

let PRODUCTS = [];

fetch(GAS_URL, {
  method: "POST",
  body: JSON.stringify({ action: "getItems" })
})
  .then(res => res.json())
  .then(data => {
    if (!Array.isArray(data)) {
      throw new Error("Invalid response");
    }
    PRODUCTS = data;
    render(data);
  })
  .catch(err => {
    console.error(err);
    document.getElementById("list").innerHTML =
      "<p>Gagal memuat produk</p>";
  });

function render(items) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  if (items.length === 0) {
    list.innerHTML = "<p>Belum ada produk</p>";
    return;
  }

  items.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}">
      <div class="card-body">
        <div class="nama">${p.nama}</div>
        <div class="harga">Rp ${format(p.harga)}</div>
        <div class="stok">Stok: ${p.stok}</div>
      </div>
      <button class="btn"
        onclick="order('${safe(p.nama)}','${safe(p.harga)}')">
        Order
      </button>
    `;
    list.appendChild(card);
  });
}

function order(nama, harga) {
  const text = encodeURIComponent(
    `Halo admin, saya mau order:\n\nProduk: ${nama}\nHarga: Rp ${format(harga)}`
  );
  window.open("https://wa.me/62XXXXXXXXXX?text=" + text);
}

function format(x) {
  return Number(x).toLocaleString("id-ID");
}

function safe(str) {
  return String(str).replace(/'/g, "\\'");
}

document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  render(PRODUCTS.filter(p =>
    p.nama.toLowerCase().includes(q)
  ));
});
