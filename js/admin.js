let ADMIN_PASS = "";

async function login() {
  const res = await Store.login(pw.value);
  if (!res.ok) return alert("Password salah");

  ADMIN_PASS = pw.value;
  panel.style.display = "block";
  loadAdminItems();
}

async function loadAdminItems() {
  const items = await Store.fetchItems();
  list.innerHTML = "";

  items.forEach(i => {
    list.innerHTML += `
      <div class="card">
        <img src="${i.gambar}">
        <b>${i.nama}</b><br>
        ${i.harga}
        <button onclick="del('${i.id}')">Hapus</button>
      </div>
    `;
  });
}

function addItem() {
  const file = img.files[0];
  if (!file) return alert("Pilih gambar");

  const r = new FileReader();
  r.onload = async () => {
    await Store.addItem({
      password: ADMIN_PASS,
      nama: nama.value,
      kategori: kategori.value,
      harga: +harga.value,
      rarity: rarity.value,
      stok: stok.value,
      deskripsi: desk.value,
      filename: file.name,
      image: r.result.split(",")[1]
    });
    loadAdminItems();
  };
  r.readAsDataURL(file);
}

async function del(id) {
  if (!confirm("Hapus item?")) return;
  await Store.deleteItem(id, ADMIN_PASS);
  loadAdminItems();
}

