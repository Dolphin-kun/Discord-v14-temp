const http = require("http");
const querystring = require("query-string");

const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();

app.use(express.static(path.join(__dirname, 'pages')));

app.post("/", (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    if (!data) {
      res.end("No post data");
      return;
    }
    const dataObject = querystring.parse(data);
    // console.log("post:" + dataObject.type);
    if (dataObject.type == "wake") {
      // console.log("Woke up in post");
      res.end();
      return;
    }
    res.end();
  });
});

app.get("/", (req, res) => {
  fs.readFile("./pages/home.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
})

// サーバーを起動
app.listen(3000, () => {
  console.log(`サーバーが開きました https://dolphin-kun.glitch.me`);
});

if (process.env.TOKEN == undefined || process.env.TOKEN == "") {
  console.log("TOKENを設定してください");
  process.exit(0);
}

require("./main.js");
