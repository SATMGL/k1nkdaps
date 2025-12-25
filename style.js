* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0f172a;
  color: white;
}

header {
  text-align: center;
  padding: 24px;
  background: #020617;
}

header h1 {
  margin: 0;
  font-size: 26px;
}

header p {
  margin: 6px 0 0;
  opacity: .7;
}

.toolbar {
  padding: 14px;
  text-align: center;
}

.toolbar input {
  width: 90%;
  max-width: 400px;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  outline: none;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  padding: 20px;
}

.card {
  background: #1e293b;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 15px rgba(0,0,0,.4);
}

.card img {
  width: 100%;
  height: 170px;
  object-fit: cover;
  background: black;
}

.card-body {
  padding: 14px;
  flex: 1;
}

.nama {
  font-weight: bold;
  margin-bottom: 6px;
}

.harga {
  color: #22c55e;
  font-weight: bold;
  margin-bottom: 6px;
}

.stok {
  font-size: 13px;
  opacity: .8;
}

.btn {
  margin: 12px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background: #22c55e;
  font-weight: bold;
  cursor: pointer;
}

footer {
  text-align: center;
  padding: 20px;
  font-size: 13px;
  opacity: .6;
}
