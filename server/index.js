const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "said",
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

app.post("/products", (req, res) => {
  const { ID_Produit, NomProduit, Prix, Stock, Description, Categorie } =
    req.body; // Destructure the data received from the clien
  const sql = `
    INSERT INTO produit (ID_Produit, NomProduit, Prix, Stock, Description, Categorie)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  // array to sent
  produit = [ID_Produit, NomProduit, Prix, Stock, Description, Categorie];
  pool.query(sql, produit, (err, result) => {
    if (err) {
      console.log("the was an error with sending to db");
      res.status(500).send("the was an error with sending to db");
      return;
    }
  });
  res.send(req.body);
});

app.put("/products/:id", (req, res) => {
  const id = req.params.id; // Extract product ID from the route parameter
  const updatedData = req.body; // Get updated product details from request body
  pool.query(
    "UPDATE produit SET ? WHERE ID_Produit = ?",
    [updatedData, id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).send({ error: "Internal Server Error" });
        return;
      }

      if (result.affectedRows === 0) {
        // No rows were updated, likely because the product ID doesn't exist
        res.status(404).send({ error: "Product not found" });
        return;
      }

      // Successfully updated
      res.status(200).send({ message: "Product updated successfully" });
    }
  );
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

app.listen(3000, () => {
  console.log("listening...");
});
