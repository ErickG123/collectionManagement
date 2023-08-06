import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function collectionItemsRoutes(app: FastifyInstance) {
  app.get('/collection_items', async (request, reply) => {
    const collection_items = await prisma.collectionItem.findMany();

    return collection_items.map((collection_item) => {
      return {
        name: collection_item.name,
        description: collection_item.description,
        coverUrl: collection_item.imageUrl,
        averageValue: collection_item.averageValue,
        releaseYear: collection_item.releaseYear,
        iOwn: collection_item.iOwn,
        isFavorite: collection_item.isFavorite
      }
    });
  });

  app.get('/collection_items/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params)

    const collection_item = await prisma.collectionItem.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return collection_item;
  });

  app.post('/collection_items', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string().nullable(),
      imageUrl: z.string().nullable(),
      averageValue: z.number().default(0),
      releaseYear: z.number().int().default(0),
      iOwn: z.coerce.boolean().default(true),
      isFavorite:z.coerce.boolean().default(false),
      collectionId: z.string(),
    });

    const { name, description, imageUrl, averageValue, releaseYear, iOwn, isFavorite, collectionId } = bodySchema.parse(request.body);

    const collection = await prisma.collectionItem.create({
      data: {
        name,
        description,
        imageUrl,
        averageValue,
        releaseYear,
        iOwn,
        isFavorite,
        collectionId
      }
    });

    return collection;
  });

  app.put('/collection_items/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      imageUrl: z.string(),
      averageValue: z.number(),
      releaseYear: z.number().int(),
      iOwn: z.coerce.boolean().default(true),
      isFavorite:z.coerce.boolean().default(false),
      collectionId: z.string(),
    });

    const { name, description, imageUrl, averageValue, releaseYear, iOwn, isFavorite, collectionId } = bodySchema.parse(request.body);

    const collection_item = await prisma.collectionItem.update({
      where: {
        id
      },
      data: {
        name,
        description,
        imageUrl,
        averageValue,
        releaseYear,
        iOwn,
        isFavorite,
        collectionId
      }
    });

    return collection_item;
  });

  app.delete('/collection_items/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.collectionItem.delete({
      where: {
        id,
      },
    });
  });
}