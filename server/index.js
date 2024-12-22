const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uplaod = multer({
  storage: storage,
});

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce5",
});

app.get("/products", (req, res) => {
  pool.query("select * from produit", (err, result, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
    return;
  });
});
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM produit WHERE ID_Produit = ?", // Fixed SQL query
    [id], // Using parameterized query for security
    (err, result, fields) => {
      if (err) {
        console.error("Database error:", err); // Log error for debugging
        res.status(500).send({ error: "Internal Server Error" });
        return;
      }

      if (result.length === 0) {
        // Handle case when no product is found
        res.status(404).send({ error: "Product not found" });
        return;
      }

      // Send the product details as the response
      res.status(200).send(result[0]); // Send the first product
    }
  );
});

app.post("/products", uplaod.single("image"), (req, res) => {
  const { NomProduit, Prix, Stock, Description, ID_Categorie } = req.body;

  // Get the uploaded image file path
  const imagePath = req.file ? `/images/${req.file.filename}` : null;

  const sql = `
    INSERT INTO produit (NomProduit, Prix, Stock, Description, ID_Categorie, Image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const produit = [
    NomProduit,
    Prix,
    Stock,
    Description,
    ID_Categorie,
    imagePath, // Save the image path in the Image column
  ];

  pool.query(sql, produit, (err, result) => {
    if (err) {
      console.error("Error inserting product into database:", err);
      res.status(500).send({ error: "Error inserting product into database" });
      return;
    }

    res.status(201).send({ message: "Product added successfully" });
  });
});

app.put("/products/:id", uplaod.single("image"), (req, res) => {
  const id = req.params.id;
  const { NomProduit, Prix, Stock, Description, ID_Categorie } = req.body;

  // Check if a new image is uploaded
  const imagePath = req.file ? `/images/${req.file.filename}` : null;

  // Build the update query
  const updatedFields = {
    NomProduit,
    Prix,
    Stock,
    Description,
    ID_Categorie,
  };

  if (imagePath) {
    updatedFields.Image = imagePath; // Include image path if a new image is uploaded
  }

  pool.query(
    "UPDATE produit SET ? WHERE ID_Produit = ?",
    [updatedFields, id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).send({ error: "Internal Server Error" });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).send({ error: "Product not found" });
        return;
      }

      res.status(200).send({ message: "Product updated successfully" });
    }
  );
});

// Add the /categories endpoint
app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM categorie";
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      res.status(500).send({ error: "Error fetching categories" });
      return;
    }
    res.send(results);
  });
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id; // Extract product ID from the route parameter

  pool.query(
    "DELETE FROM produit WHERE ID_Produit = ?", // SQL query to delete a product by ID
    [id], // Pass the product ID as a parameter
    (err, result) => {
      if (err) {
        console.error("Database error:", err); // Log error for debugging
        res.status(500).send({ error: "Internal Server Error" });
        return;
      }

      if (result.affectedRows === 0) {
        // No rows were deleted, likely because the product ID doesn't exist
        res.status(404).send({ error: "Product not found" });
        return;
      }

      // Successfully deleted
      res.status(200).send({ message: "Product deleted successfully" });
    }
  );
});

app.post("/commandes", (req, res) => {
  const { ID_Utilisateur, Adresse_Livraison, Code_Postal, Prix_Total } =
    req.body;
  const sql = `
    INSERT INTO commande (ID_Utilisateur, Adresse_Livraison, Code_Postal, Prix_Total)
    VALUES (?, ?, ?, ?)
  `;
  const commande = [ID_Utilisateur, Adresse_Livraison, Code_Postal, Prix_Total];
  pool.query(sql, commande, (err, result) => {
    if (err) {
      console.error("Error in adding commande:", err);
      return res.status(500).send("Error in adding commande");
    }
    console.log("Commande added successfully");
    res.status(200).send(result);
  });
});

app.post("/liste_produits", (req, res) => {
  const sql = `
    INSERT INTO liste_des_produits (ID_Commande, ID_Produit, Quantite)
    VALUES (?, ?, ?)
  `;
  const { ID_Commande, ID_Produit, Quantite } = req.body;
  const data = [ID_Commande, ID_Produit, Quantite];
  pool.query(sql, data, (err, result) => {
    console.log(res.body);
    if (err) {
      console.log("there was an error with add a liste of products");
      res.send("there was an error with add a liste of products");
      return;
    }
    console.log("liste of products added ");
    res.send("liste of products added ");
  });
});

app.get("/commande", (req, res) => {
  pool.query("select * from commande", (err, result, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
    return;
  });
});

app.get("/liste_produits", (req, res) => {
  pool.query("select * from liste_des_produits", (err, result, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
    return;
  });
});
app.post("/utilisateur", (req, res) => {
  const { Nom, Prenom, Email, Telephone, MotDePasse } = req.body;
  const ID_Role = 2;
  const sql = `
    INSERT INTO utilisateur (Nom, Prenom, Email, Telephone, MotDePasse, ID_Role)
    VALUES (?, ?, ?, ?, ?,?)
  `;
  const utilisateur = [Nom, Prenom, Email, Telephone, MotDePasse, ID_Role];
  pool.query(sql, utilisateur, (err, result) => {
    if (err) {
      console.error("Error inserting utilisateur into database:", err);
      res
        .status(500)
        .send({ error: "Error inserting utilisateur into database" });
      return;
    }

    res.status(201).send({ insertId: result.insertId });
  });
});
app.get("/utilisateur", (req, res) => {
  pool.query("select * from utilisateur", (err, result, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
    return;
  });
});

app.listen(3000, () => {
  console.log("listening...");
});
