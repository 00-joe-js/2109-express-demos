const express = require("express");
const app = express();

app.listen(8080, () => {
    console.log("Server on!");
});

app.get("/joes-favorite-movie", (req, res) => {
    res.send(`<h1>The Dark Knight</h1>`);
});

app.get("/elissas-favorite-movie", (req, res) => {
    res.send("<h1>Stranger than Fiction</h1>");
});

app.get("/pennys-favorite-movie", (req, res) => {
    res.send("<h1>Lapsis</h1>");
});