const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || './data/omics.db';

// 确保数据目录存在
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database:', DB_PATH);
    initializeDatabase();
  }
});

// 启用外键约束
db.run('PRAGMA foreign_keys = ON');

function initializeDatabase() {
  // 酶学表
  db.run(`
    CREATE TABLE IF NOT EXISTS enzymes (
      enzyme_id INTEGER PRIMARY KEY AUTOINCREMENT,
      enzyme_name TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      catalog_number TEXT,
      vendor TEXT,
      substrate TEXT,
      optimal_ph TEXT,
      temperature TEXT,
      cofactors TEXT,
      tissue_applicability TEXT,
      working_concentration TEXT,
      inhibitors TEXT,
      reference TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 组织表
  db.run(`
    CREATE TABLE IF NOT EXISTS tissues (
      tissue_id INTEGER PRIMARY KEY AUTOINCREMENT,
      tissue_name TEXT NOT NULL,
      organism TEXT NOT NULL,
      ecm_components TEXT,
      fat_content TEXT,
      fibrosis_level TEXT,
      cell_density TEXT,
      special_challenges TEXT,
      recommended_enzymes TEXT,
      reference TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 单细胞数据集表
  db.run(`
    CREATE TABLE IF NOT EXISTS scrnaseq_datasets (
      dataset_id INTEGER PRIMARY KEY AUTOINCREMENT,
      dataset_name TEXT NOT NULL UNIQUE,
      tissue TEXT NOT NULL,
      organism TEXT NOT NULL,
      cell_count INTEGER,
      gene_count INTEGER,
      technology TEXT,
      paper_title TEXT,
      reference TEXT,
      data_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 单细胞表达表
  db.run(`
    CREATE TABLE IF NOT EXISTS scrnaseq_expression (
      expr_id INTEGER PRIMARY KEY AUTOINCREMENT,
      dataset_id INTEGER NOT NULL,
      gene_id TEXT NOT NULL,
      gene_name TEXT NOT NULL,
      cell_type TEXT,
      expression_mean REAL,
      expression_median REAL,
      expression_max REAL,
      expressing_cells REAL,
      FOREIGN KEY(dataset_id) REFERENCES scrnaseq_datasets(dataset_id)
    )
  `);

  // 空间组学数据表
  db.run(`
    CREATE TABLE IF NOT EXISTS spatial_data (
      position_id INTEGER PRIMARY KEY AUTOINCREMENT,
      dataset_id INTEGER NOT NULL,
      cell_id TEXT NOT NULL,
      x REAL NOT NULL,
      y REAL NOT NULL,
      z REAL,
      gene_expression TEXT,
      cell_type TEXT,
      intensity REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 蛋白质数据表
  db.run(`
    CREATE TABLE IF NOT EXISTS proteins (
      protein_id INTEGER PRIMARY KEY AUTOINCREMENT,
      uniprot_id TEXT UNIQUE,
      protein_name TEXT NOT NULL,
      gene_id TEXT,
      gene_name TEXT,
      protein_sequence TEXT,
      molecular_weight REAL,
      subcellular_location TEXT,
      function_description TEXT,
      reference TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 蛋白质修饰表
  db.run(`
    CREATE TABLE IF NOT EXISTS protein_modifications (
      mod_id INTEGER PRIMARY KEY AUTOINCREMENT,
      protein_id INTEGER NOT NULL,
      modification_type TEXT NOT NULL,
      site_position INTEGER,
      amino_acid TEXT,
      validated INTEGER DEFAULT 0,
      reference TEXT,
      FOREIGN KEY(protein_id) REFERENCES proteins(protein_id)
    )
  `);

  console.log('✅ Database tables initialized');
}

// Promise 包装器便于使用
db.run = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    sqlite3.Database.prototype.run.call(this, sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

db.get = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    sqlite3.Database.prototype.get.call(this, sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

db.all = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    sqlite3.Database.prototype.all.call(this, sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
};

module.exports = db;
