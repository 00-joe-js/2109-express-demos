const express = require("express");
const session = require("express-session");
const app = express();

app.listen(8080, () => {
    console.log("Server is on!");
});

// Session middleware, this is how I remember your client.
app.set('trust proxy', 1);
app.use(
    session({
        secret: "supersecretpassword:)",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

app.use(express.static(__dirname + "/the-static-folder"));

const flavors = ["red", "orange", "yellow", "pink"];

app.get("/", (req, res) => {
    res.send(
        `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Best Starburst?</title>
                    <link rel="stylesheet" href="/choose-style.css" />
                </head>
                <body>
                    <h1>What is the best Starburst flavor?</h1>
                    <img src="/starburst.jpg" />
                    <div id="flavor-selection">
                        ${flavors.map(flav => {
                            return `<div><a href="/select/${flav}">${flav}</a></div>`;
                        }).join("")}
                    </div>
                </body>
            </html>
        `
    );
});

app.get("/voting-results", (req, res) => {
    res.send("To be implemented. :)");
});

const fs = require("fs");
app.get("/select/:flavor", (req, res) => {

    if (req.session.voted === true) {
        res.status(401); // Not authorized.
        res.send("Sorry, you already voted. :) Wait for me to restart the server.");
        return;
    }

    const favoriteFlavor = req.params.flavor;

    if (!flavors.includes(favoriteFlavor)) {
        res.send("");
    }

    fs.appendFile(__dirname + "/votes.txt", req.params.flavor + "\n", () => {
        res.send("Your vote is cast!");
        req.session.voted = true;
        req.session.save();
    });

});