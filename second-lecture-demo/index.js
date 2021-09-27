const express = require("express");
const app = express();

app.listen(8080, () => {
    console.log("server is on and listening for HTTP messages!");
});

app.get("/", (req, res) => {
    res.send(`
        <!doctype html>
        <html>
            <head><title>go to characters</title></head>
            <body>
                <a href="/characters/s">S</a>
                <a href="/characters/l">L</a>
                <a href="/characters/c">C</a>
            </body>
        </html>
    `);
});

// /favorite-movie/joe
// /favorite-movie/elissa
// /favorite-movie/penny
// /favorite-movie/banana
app.get("/favorite-movie/:familyMember", (req, res) => {
    if (req.params.familyMember === "joe") {
        res.send("The Dark Knight");
    } else if (req.params.familyMember === "elissa") {
        res.send("Stranger than Fiction");
    } else if (req.params.familyMember === "penny") {
        res.send("Lapsis");
    } else {
        res.status(404);
        res.send("Unknown family member")
    }
});

const allSmashCharacters = require("./smash-chars.json");

// /characters/a
// /characters/z
// /characters/banana
app.get("/characters/:startingLetter", (req, res) => {
    const letter = req.params.startingLetter;
    const charactersThatStartWithThatLetter = allSmashCharacters.filter(char => {
        return char.name[0].toLowerCase() === letter.toLowerCase();
    });
    res.send(`
        <!doctype html>
        <html>
            <head><title>Characters that start with ${letter}</title></head>
            <body>
                ${charactersThatStartWithThatLetter.map(char => {
                    return `<h1>${char.name}</h1>`
                }).join("\n")}
            </body>
        </html>
    `);
});