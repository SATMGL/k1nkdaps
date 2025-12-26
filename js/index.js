const list = document.getElementById("list");

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
    const items = await Store.fetchItems();

    list.innerHTML = "";

    items.forEach(item => {
      list.appendChild(createCard(item));
    });

    for (let i = items.length; i < SLOT; i++) {
      list.appendChild(createEmpty());
    }

  } catch {
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
    <button class="btn" onclick="order('${item.nama}')">Beli</button>
  `;
  return c;
}

function createEmpty(text = "KOSONG") {
  const c = document.createElement("div");
  c.className = "card empty";
  c.innerHTML = `<div class="card-body">${text}</div>`;
  return c;
}

function order(nama) {
  window.open(
    `https://wa.me/6285647997123?text=Order ${nama}`,
    "_blank"
  );
}

