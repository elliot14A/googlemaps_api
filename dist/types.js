"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestBodyModel = void 0;
const zod_1 = require("zod");
exports.requestBodyModel = (0, zod_1.object)({
    body: (0, zod_1.object)({
        origin: (0, zod_1.string)({ required_error: "origin is required" }).min(3),
        destination: (0, zod_1.string)({ required_error: "destination is required" }).min(3),
        vehicle_type: (0, zod_1.string)({ required_error: "vehicle_type is required" }).min(3),
    }),
});
