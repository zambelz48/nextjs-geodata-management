import { initContract } from "@ts-rest/core"
import { z } from "zod"

const c = initContract()

const GeodataSchema = z.object({
  _id: z.string(),
  name: z.string(),
  createdBy: z.string(),
  type: z.literal("Feature"),
  features: z.array(
    z.object({
      type: z.literal("Feature"),
      properties: z.record(z.unknown()),
      geometry: z.object({
        type: z.union([
          z.literal("Point"),
          z.literal("LineString"),
          z.literal("Polygon"),
          z.literal("MultiPoint"),
          z.literal("MultiLineString"),
          z.literal("MultiPolygon"),
          z.literal("GeometryCollection"),
        ]),
        coordinates: z.union([
          z.array(z.number()),
          z.array(z.array(z.number())),
          z.array(z.array(z.array(z.number()))),
        ]),
      }),
    }),
  ),
})

const GeodataPostSchema = z.object({
  name: z.string(),
  createdBy: z.string(),
  type: z.literal("Feature"),
  features: z.array(
    z.object({
      type: z.literal("Feature"),
      properties: z.record(z.unknown()),
      geometry: z.object({
        type: z.union([
          z.literal("Point"),
          z.literal("LineString"),
          z.literal("Polygon"),
          z.literal("MultiPoint"),
          z.literal("MultiLineString"),
          z.literal("MultiPolygon"),
          z.literal("GeometryCollection"),
        ]),
        coordinates: z.union([
          z.array(z.number()),
          z.array(z.array(z.number())),
          z.array(z.array(z.array(z.number()))),
        ]),
      }),
    }),
  ),
})

export const contract = c.router({
  getdatas: {
    method: "GET",
    path: "/geodatas",
    responses: {
      200: z.array(GeodataSchema),
    },
    summary: "Get all geodata",
  },
  getdataById: {
    method: "GET",
    path: "/geodatas/:id",
    query: z.object({
      id: z.string(),
    }),
    responses: {
      200: GeodataSchema,
    },
    summary: "Get geodata by id",
  },
  postdata: {
    method: "POST",
    path: "/geodatas",
    body: GeodataPostSchema,
    responses: {
      200: GeodataSchema,
    },
    summary: "Post new geodata",
  },
})
