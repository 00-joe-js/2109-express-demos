const express = require("express");
const session = require("express-session");
const fs = require("fs");

const app = express();
app.listen(8080, () => {
    console.log("Server is on!");
});

// Session middleware, this is how I remember your client.
// This is not covered material so don't fret~ :)
app.set('trust proxy', 1);
app.use(
    session({
        secret: "supersecretpassword:)",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

// Any URL like `/starburst.jpg` will be picked up by this middleware,
// seen to be a matching file name in "the-static-folder" folder
// and responded to with the content of the correct file.
app.use(express.static(__dirname + "/the-static-folder"));

const flavors = ["red", "orange", "yellow", "pink"];

// The homepage route.
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

// The voting route.
app.get("/select/:flavor", (req, res) => {

    if (req.session.voted === true) {
        res.status(401); // Not authorized.
        res.send("Sorry, you already voted. :) Wait for me to restart the server.");
        return;
    }

    const favoriteFlavor = req.params.flavor;

    if (!flavors.includes(favoriteFlavor)) {
        res.send("Unknown flavor");
        return;
    }

    fs.appendFile(__dirname + "/votes.txt", req.params.flavor + "\n", () => {
        res.send("Your vote is cast!");
        req.session.voted = true;
        req.session.save();
    });

});

const fsPromises = require("fs").promises; 
// Voting results route.
app.get("/voting-results", async (req, res, next) => {
    try {
        const contentsOfVotingFile = await fsPromises.readFile(__dirname + "/votes.txt", "utf-8");
        res.send(contentsOfVotingFile);
    } catch (err) {
        next(err);
    }
});
