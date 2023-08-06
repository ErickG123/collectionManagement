import fastify from "fastify";

import jwt from "@fastify/jwt"
import cors from "@fastify/cors"
import multipart from "@fastify/multipart"

import { resolve } from "node:path"
import { randomUUID } from "node:crypto";

import { usersRoutes } from "./routes/users";
import { collectionsRoutes } from "./routes/collections";
import { collectionItemsRoutes } from "./routes/collection_items";
import { uploadRoutes } from "./routes/upload";

const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: randomUUID(),
});

app.register(multipart);
app.register(require("@fastify/static"), {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});

app.register(usersRoutes);
app.register(uploadRoutes);
app.register(collectionsRoutes);
app.register(collectionItemsRoutes);

export { app };
