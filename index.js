const express = require("express");
const massive = require("massive");
require("dotenv").config();
const productsController = require("./products_controller.js");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING).then(dbInstance => {
    app.set("db", dbInstance);
})
.catch(err=> console.log(err));

app.use(express.json());

app.listen(SERVER_PORT, () => {
    console.log("Listening on port ", SERVER_PORT);
});

app.get("/api/products", productsController.getAll);
app.get("/api/products/:id", productsController.getOne);
app.post("/api/products", productsController.create);
app.put("/api/products/:id", productsController.update);
app.delete("/api/products/:id", productsController.delete);



