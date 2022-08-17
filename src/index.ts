import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { AnyZodObject } from "zod";
import { requestBodyModel, RequestBodyType } from "./types";
import { db } from "./db";

const validationMiddleware =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      return next();
    } catch (err: any) {
      return res.status(400).send(err.errors);
    }
  };

function main() {
  const app = express();
  app.use(express.json());
  app.get("/health", (req: Request, res: Response) => res.send("hello world"));
  app.get(
    "/location/verify",
    validationMiddleware(requestBodyModel),
    checkLocationHandler
  );

  const PORT = 8080;
  dotenv.config();

  app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
}

main();

async function checkLocationHandler(
  req: Request<{}, {}, RequestBodyType["body"]>,
  res: Response
) {
  let resp: Boolean = true;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  const { origin, destination, vehicle_type } = req.body;
  if (destination != "Paris" && destination != "London") {
    return res.send(resp);
  }
  const vehicle = db.get(vehicle_type);
  if (!vehicle) {
    return res.status(400).send("Invalid Vehicle Type");
  }
  const BaseURL = "https://maps.googleapis.com/maps/api/directions/json?";
  const URL =
    BaseURL +
    `origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(URL);
  const data = await response.json();
  if (data.error_message) {
    return res.sendStatus(500);
  }
  if(data.routes.length === 0) {
    return res.status(400).send("No routes Found");
  }
  const distance: number = data.routes[0].legs[0].distance.value / 1000;
  const duration = data.routes[0].legs[0].duration.value / (60 * 60);
  const price: number =
    vehicle.AirportFee +
    (distance + vehicle.BaseKms) * vehicle.AmountPerKM +
    duration * vehicle.HourlyFee +
    vehicle.BaseAmount;
  if (distance > 1000) {
    res.status(400).send("To Far to offer ride");
  }
  if(distance < 30 && price < 50) {
    resp = false;
  }
  console.log(price)
  return res.send(resp);
}
