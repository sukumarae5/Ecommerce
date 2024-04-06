const express = require("express");
var app = express();
const cors = require("cors");
const connection = require("./connection");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Set the destination folder for uploaded images

const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Api is Working Fine" });
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
    res.status(500).send({ message: "Error retrieving users" });
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
// app.post("/register", async (req, res) => {
//   var data = req.body;
//   var email = data.email;
//   if (!usernameRegex.test(email)) {
//     res.send({
//       message: "Enter valid email",
//     });
//   } else {
//     if (data.password === data.confirmpassword) {
//       try {
//         const [existingUser] = await connection.query(
//           "SELECT * FROM user_list WHERE email=?",
//           [email]
//         );
//         if (existingUser.length > 0) {
//           res.send({
//             message: "user already exist",
//           });
//         } else {
//           var userData = [
//             data.firstName,
//             data.lastName,
//             data.maidenName,
//             data.age,
//             data.gender,
//             data.email,
//             data.phone,
//             data.username,
//             data.password,
//             data.birthDate,
//             data.image,
//             JSON.stringify(data.address),
//             JSON.stringify(data.bank),
//           ];

//           await connection.query(
//             "INSERT INTO user_list(firstName, lastName, maidenName, age, gender, email, phone, username, password, birthDate, image, address, bank) VALUES(?)",
//             [userData]
//           );
//           res.send({
//             message: "Registered successfully",
//           });
//         }
//       } catch (e) {
//         console.log(e);
//         res.send({
//           message: "All feilds required",
//         });
//       }
//     } else {
//       res.send({
//         message: "Password dosen't match",
//       });
//     }
//   }
// });

// Register using image


app.post("/register", upload.single("profileImage"), async (req, res) => {
  var data = req.body;
  var email = data.email;

  // Check if image was uploaded
  if (!req.file) {
    return res.send({
      message: "Image not uploaded",
    });
  }

  // Convert the uploaded image to a buffer
  var imageBuffer = req.file.buffer;

  // Continue with your existing logic to insert data into the database, including the image buffer
  // ...

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
        data.maidenName,
        data.age,
        data.gender,
        data.email,
        data.phone,
        data.username,
        data.password,
        data.birthDate,
        imageBuffer, // Insert the image buffer into the database
        JSON.stringify(data.address),
        JSON.stringify(data.bank),
      ];

      await connection.query(
        "INSERT INTO user_list(firstName, lastName, maidenName, age, gender, email, phone, username, password, birthDate, profileImage, address, bank) VALUES(?)",
        [userData]
      );
      res.send({
        message: "Registered successfully",
      });
    }
  } catch (e) {
    console.log(e);
    res.send({
      message: "All fields required",
    });
  }
});

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
    res.status(500).send({ message: "Error retrieving products" });
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
    console.log(productData);
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

app.listen(8080, () => {
  console.log("Running");
});
