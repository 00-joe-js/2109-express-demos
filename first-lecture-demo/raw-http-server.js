const http = require("http");

const server = http.createServer();

server.listen(8080, () => {
    console.log("Server is listening for HTTP requests!");
});

server.on("request", (req, res) => {
    if (req.url === "/joes-favorite-movie") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>The Dark Knight</h1><a href='https://www.google.com'>Google</a>'");
        res.end();
    } else {
        res.writeHead(404);
        res.write("Not found, sorry. Try again.")
        res.end();
    }
});