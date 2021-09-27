const express = require("express");
const app = express();

app.listen(8080, () => {
    console.log("server is on and listening for HTTP messages!");
});

// Express is a pipeline
// request ('req') and response ('res') objects flow through it

// middleware #1
let requestCount = 0;
app.use((req, res, next) => {
    requestCount = requestCount + 1;
    console.log(requestCount);
    next();
});

// middleware #2
const morgan = require("morgan");
app.use(morgan("dev"));

// middleware #3
app.use(
    express.static(__dirname + "/public")
);

// middleware #4
app.use((req, res, next) => {
    if (req.method === "GET" && req.url === "/") {
        res.send(`
            <!doctype html>
            <html>
                <head>
                    <title>go to characters</title>
                    <link rel="stylesheet" href="/style.css" />
                </head>
                <body>
                    <img style="width: 200px" src="/images/luigi-t-pose.png" />
                    <a href="/characters/s">S</a>
                    <a href="/characters/l">L</a>
                    <a href="/characters/c">C</a>
                    <script src="/frontend-stuff.js"></script>
                </body>
            </html>
        `);
    } else {
        next();
    }
});


// app.get("/", (req, res) => {
//     res.send(`
//         <!doctype html>
//         <html>
//             <head><title>go to characters</title></head>
//             <body>
//                 <a href="/characters/s">S</a>
//                 <a href="/characters/l">L</a>
//                 <a href="/characters/c">C</a>
//             </body>
//         </html>
//     `);
// });

// middleware #5
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

// middleware #6
const allSmashCharacters = require("./smash-chars.json");
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