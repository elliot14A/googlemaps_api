"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const types_1 = require("./types");
const db_1 = require("./db");
const validationMiddleware = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        return next();
    }
    catch (err) {
        return res.status(400).send(err.errors);
    }
};
function main() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/health", (req, res) => res.send("hello world"));
    app.get("/location/verify", validationMiddleware(types_1.requestBodyModel), checkLocationHandler);
    const PORT = 8080;
    dotenv_1.default.config();
    app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
}
main();
function checkLocationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp = true;
        const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
        const { origin, destination, vehicle_type } = req.body;
        if (destination != "Paris" && destination != "London") {
            return res.send(resp);
        }
        const vehicle = db_1.db.get(vehicle_type);
        if (!vehicle) {
            return res.status(400).send("Invalid Vehicle Type");
        }
        const BaseURL = "https://maps.googleapis.com/maps/api/directions/json?";
        const URL = BaseURL +
            `origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}`;
        const response = yield fetch(URL);
        const data = yield response.json();
        if (data.error_message) {
            return res.sendStatus(500);
        }
        if (data.routes.length === 0) {
            return res.status(400).send("No routes Found");
        }
        const distance = data.routes[0].legs[0].distance.value / 1000;
        const duration = data.routes[0].legs[0].duration.value / (60 * 60);
        const price = vehicle.AirportFee +
            (distance + vehicle.BaseKms) * vehicle.AmountPerKM +
            duration * vehicle.HourlyFee +
            vehicle.BaseAmount;
        if (distance > 1000) {
            res.status(400).send("To Far to offer ride");
        }
        if (distance < 30 && price < 50) {
            resp = false;
        }
        console.log(price);
        return res.send(resp);
    });
}
