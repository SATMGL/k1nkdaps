const Store = {
  items: [],

  async fetchItems() {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "getItems" })
    });
    this.items = await res.json();
    return this.items;
  },

  async login(password) {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        password
      })
    });
    return res.json();
  },

  async addItem(data) {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "addItem",
        ...data
      })
    });
  },

  async deleteItem(id, password) {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "deleteItem",
        id,
        password
      })
    });
  }
};
