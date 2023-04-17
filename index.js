const http = require("http");

const app = require("./app");
const { mongoConnect } = require('./services/mongo.connect');

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 8000;


async function startServer() {
    await mongoConnect();
    httpServer.listen(PORT, () => {
        console.log(`app is running on port ${PORT} 🚀`);
    });
}

startServer();