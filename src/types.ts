import { object, string, TypeOf } from "zod";

export type DBEntry = {
  country: string;
  city: string;
  AirportFee: number;
  HourlyFee: number;
  AmountPerKM: number;
  BaseAmount: number;
  BaseKms: number;
};

export const requestBodyModel = object({
  body: object({
    origin: string({ required_error: "origin is required" }).min(3),
    destination: string({ required_error: "destination is required" }).min(3),
    vehicle_type: string({required_error: "vehicle_type is required"}).min(3),
  }),
});

export type RequestBodyType = TypeOf<typeof requestBodyModel>
