const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxu5UrYrzUi49Pj6mG2ZT4Ajah7G7R5KPmkkcD9FJD5n1m0jOC8EYK_mldam80rDTBz/exec";

let PRODUCTS = [];

fetch(GAS_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ action: "getItems" })
})
  .then(res => res.json())
  .then(data => {
    PRODUCTS = data;
    render(data);
  })
  .catch(() => {
    document.getElementById("list").innerHTML =
      "<p>Gagal memuat produk</p>";
  });

function render(items) {
  const list = document.getElementById("list");
  list.innerHTML = "";

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
        onclick="order('${escape(p.nama)}','${escape(p.harga)}')">
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

document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  render(PRODUCTS.filter(p =>
    p.nama.toLowerCase().includes(q)
  ));
});
