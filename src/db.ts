import type { DBEntry } from "./types";


export const db: Map<string, DBEntry> = new Map<string, DBEntry>();
db.set("Luxury", {
  country: "GB",
  city: "London",
  AirportFee: 0.1,
  HourlyFee: 135,
  AmountPerKM: 2.5,
  BaseAmount: 89,
  BaseKms: 10,
});
db.set("Comfort", {
  country: "GB",
  city: "London",
  AirportFee: 0.1,
  HourlyFee: 55,
  AmountPerKM: 1.25,
  BaseAmount: 43,
  BaseKms: 10,
});
db.set("BusinessVan", {
  country: "GB",
  city: "London",
  AirportFee: 0.1,
  HourlyFee: 75,
  AmountPerKM: 1.7,
  BaseAmount: 70,
  BaseKms: 10,
});
db.set("MiniVan", {
  country: "GB",
  city: "London",
  AirportFee: 0.1,
  HourlyFee: 60,
  AmountPerKM: 1.35,
  BaseAmount: 55,
  BaseKms: 10,
});
db.set("Business", {
  country: "GB",
  city: "London",
  AirportFee: 0.1,
  HourlyFee: 65,
  AmountPerKM: 1.5,
  BaseAmount: 58,
  BaseKms: 10,
});
db.set("Coach", {
  country: "GB",
  city: "London",
  AirportFee: 0,
  HourlyFee: 0,
  AmountPerKM: 0,
  BaseAmount: 0,
  BaseKms: 0,
});
db.set("Minibus", {
  country: "GB",
  city: "London",
  AirportFee: 0,
  HourlyFee: 0,
  AmountPerKM: 0,
  BaseAmount: 0,
  BaseKms: 0,
});
db.set("Economy", {
  country: "GB",
  city: "London",
  AirportFee: 0.1,
  HourlyFee: 50,
  AmountPerKM: 1.15,
  BaseAmount: 39,
  BaseKms: 10,
});
