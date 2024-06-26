const express = require("express");
var app = express();
const cors = require("cors");
const connection = require("./connection");

const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.use(express.json());
app.use(cors({
  origin:'http://localhost:3000  '
}));

app.get("/", (req, res) => {
  try {
    res.send({ message: "Api is Working Fine" });
  } catch (err) {
    res.send(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM user_list");
    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.send({ message: "No users available" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/login", async (req, res) => {
  var data = req.body;
  var email = data.email;
  var username = data.username;

  //using username and password
  if (email == undefined) {
    if (data.username == "" && data.password == "") {
      res.send({
        message: "Please provide username and password",
      });
    } else {
      try {
        const [rows, feilds] = await connection.query(
          "SELECT * FROM user_list WHERE username=? AND password=?",
          [data.username, data.password]
        );
        if (rows == "") {
          res.send({
            message: "user not available",
          });
        } else {
          res.send(rows);
        }
      } catch (e) {
        res.send({
          message: "error login",
        });
      }
    }
  } else {
    //using email and password
    if (data.email == "" && data.password == "") {
      res.send({
        message: "Please provide email and password",
      });
    } else {
      try {
        const [rows, feilds] = await connection.query(
          "SELECT * FROM user_list WHERE email=? AND password=?",
          [data.email, data.password]
        );
        if (rows == "") {
          res.send({
            message: "user not available",
          });
        } else {
          res.send(rows);
        }
      } catch (e) {
        res.send({
          message: "error login",
        });
      }
    }
  }
});

//Register a new user
app.post("/register", async (req, res) => {
  var data = req.body;
  var email = data.email;
  if (!usernameRegex.test(email)) {
    res.send({
      message: "Enter valid email",
    });
  } else {
    if (data.password === data.confirmpassword) {
      try {
        const [existingUser] = await connection.query(
          "SELECT * FROM user_list WHERE email=?",
          [email]
        );
        if (existingUser.length > 0) {
          res.send({
            message: "user already exist",
          });
        } else {
          var userData = [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.phone,
            data.username,
            data.password,
            data.image,
          ];

          await connection.query(
            "INSERT INTO user_list(firstName, lastName, gender, email, phone, username, password, image) VALUES(?)",
            [userData]
          );
          res.send({
            message: "Registered successfully",
          });
        }
      } catch (e) {
        console.log(e);
        res.send({
          message: "All feilds required",
        });
      }
    } else {
      res.send({
        message: "Password dosen't match",
      });
    }
  }
});

//delete user
app.delete("/deleteUser/:id",async (req,res)=>{
  try {
    const result = await connection.query(
      "DELETE from user_list WHERE id=?",
      [req.params.id]
    );
    if (result[0].affectedRows > 0) {
      res.send({ message: "successfully deleted" });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
})

//get products
app.get("/products", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM product_list");
    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.send({
        message: "No products available",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Error retrieving products" });
  }
});

//get specified products
app.get("/products/:id", async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM product_list WHERE id = ?",
      [req.params.id]
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({
        message: "Product not found",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error retrieving product" });
  }
});

//register product
app.post("/addproduct", async (req, res) => {
  try {
    var data = req.body;

    var productData = [
      data.title,
      data.description,
      data.price,
      data.discountPercentage,
      data.rating,
      data.stock,
      data.brand,
      data.category,
      data.thumbnail,
      data.images,
    ];
    await connection.query(
      "INSERT INTO product_list(title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images) VALUES(?)",
      [productData]
    );
    res.send({
      message: "Product added successfully",
    });
  } catch (e) {
    console.log(e);
    res.send({
      message: "error registering product",
    });
  }
});

//delete product
app.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const result = await connection.query(
      "DELETE from product_list WHERE id=?",
      [req.params.id]
    );
    if (result[0].affectedRows > 0) {
      res.send({ message: "successfully deleted" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(8080, () => {
  console.log("Running on port 8080");
});
