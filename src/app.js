"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
//import "dotenv/config"
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.send("TS App is Running");
});

const PORT = process.env.PORT
app.listen(PORT, function () {
    console.log("server is running on PORT " + PORT);
});
