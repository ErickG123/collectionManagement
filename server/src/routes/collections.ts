import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function collectionsRoutes(app: FastifyInstance) {
  app.get('/collections', async (request, reply) => {
    const collections = await prisma.collection.findMany();

    return collections.map((collection) => {
      return {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        coverUrl: collection.coverUrl,
      }
    });
  });

  app.get('/collections/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params)

    const collection = await prisma.collection.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return collection;
  });

  app.post('/collections', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string().nullable(),
      coverUrl: z.string().nullable(),
      userId: z.string(),
    });

    const { name, description, coverUrl, userId } = bodySchema.parse(request.body);

    const collection = await prisma.collection.create({
      data: {
        name,
        description,
        coverUrl,
        userId,
      }
    });

    return collection;
  });

  app.put('/collections/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      coverUrl: z.string(),
    });

    const { name, description, coverUrl } = bodySchema.parse(request.body);

    const collection = await prisma.collection.update({
      where: {
        id
      },
      data: {
        name,
        description,
        coverUrl,
      }
    });

    return collection;
  });

  app.delete('/collections/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.collection.delete({
      where: {
        id,
      },
    });
  });
}
