const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

function initializeDatabase() {
  db.serialize(() => {
    // Create products table
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      imageUrl TEXT NOT NULL
    )`);

    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);

    // Insert default admin user if not exists
    db.get("SELECT * FROM users WHERE username = 'admin'", (err, row) => {
      if (!row) {
        const bcrypt = require('bcryptjs');
        const hashedPassword = bcrypt.hashSync('password123', 10);
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", 
          ['admin', hashedPassword]);
      }
    });
  });
}

// Database operations
const dbOperations = {
  getAllProducts: (callback) => {
    db.all("SELECT * FROM products", callback);
  },

  getProductById: (id, callback) => {
    db.get("SELECT * FROM products WHERE id = ?", [id], callback);
  },

  createProduct: (product, callback) => {
    const { name, description, price, imageUrl } = product;
    db.run(
      "INSERT INTO products (name, description, price, imageUrl) VALUES (?, ?, ?, ?)",
      [name, description, price, imageUrl],
      function(err) {
        callback(err, this.lastID);
      }
    );
  },

  updateProduct: (id, product, callback) => {
    const { name, description, price, imageUrl } = product;
    db.run(
      "UPDATE products SET name = ?, description = ?, price = ?, imageUrl = ? WHERE id = ?",
      [name, description, price, imageUrl, id],
      callback
    );
  },

  deleteProduct: (id, callback) => {
    db.run("DELETE FROM products WHERE id = ?", [id], callback);
  },

  findUserByUsername: (username, callback) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], callback);
  }
};

module.exports = {
  initializeDatabase,
  dbOperations
}; 