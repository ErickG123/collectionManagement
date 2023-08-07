import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function funkosRoutes(app: FastifyInstance) {
  app.get('/funkos', async (request, reply) => {
    const funkos = await prisma.funko.findMany();

    return funkos.map((funko) => {
      return {
        id: funko.id,
        name: funko.name,
        description: funko.description,
        imageUrl: funko.imageUrl,
        averageValue: funko.averageValue,
        releaseYear: funko.releaseYear,
        iOwn: funko.iOwn,
        isFavorite: funko.isFavorite,
        number: funko.number,
        label: funko.label,
        set: funko.set,
      }
    });
  });

  app.get('/funkos/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params)

    const funko = await prisma.funko.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return funko;
  });

  app.post('/funkos', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string().nullable(),
      imageUrl: z.string().nullable(),
      averageValue: z.number().default(0),
      releaseYear: z.number().int().default(0),
      iOwn: z.coerce.boolean().default(true),
      isFavorite: z.coerce.boolean().default(false),
      number: z.number(),
      label: z.string(),
      set: z.string(),
      collectionId: z.string(),
    });

    const { name, description, imageUrl, averageValue, releaseYear, iOwn, isFavorite, number, label, set, collectionId } = bodySchema.parse(request.body);

    const funko = await prisma.funko.create({
      data: {
        name,
        description,
        imageUrl,
        averageValue,
        releaseYear,
        iOwn,
        isFavorite,
        number,
        label,
        set,
        collectionId
      }
    })

    return funko;
  });

  app.put('/funkos/:id', async (request, reply) => {
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
      isFavorite: z.coerce.boolean().default(false),
      number: z.number(),
      label: z.string(),
      set: z.string(),
      collectionId: z.string(),
    });

    const { name, description, imageUrl, averageValue, releaseYear, iOwn, isFavorite, number, label, set, collectionId } = bodySchema.parse(request.body);

    const funko = await prisma.funko.update({
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
        number,
        label,
        set,
        collectionId,
      }
    });

    return funko;
  });

  app.delete('/funkos/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.funko.delete({
      where: {
        id,
      },
    });
  });
}
