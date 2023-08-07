import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function tagsRoutes(app: FastifyInstance) {
  app.get('/tags', async (request, reply) => {
    const tags = await prisma.tag.findMany();

    return tags.map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
      }
    });
  });

  app.get('/tags/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params)

    const tag = await prisma.tag.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return tag;
  });

  app.post('/tags', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      funkoId: z.string(),
    });

    const { name, funkoId } = bodySchema.parse(request.body);

    const tag = await prisma.tag.create({
      data: {
        name,
        funkoId,
      }
    });

    return tag;
  });

  app.put('/tags/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      name: z.string(),
    });

    const { name } = bodySchema.parse(request.body);

    const funko = await prisma.funko.update({
      where: {
        id
      },
      data: {
        name,
      }
    });

    return funko;
  });

  app.delete('/tags/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.tag.delete({
      where: {
        id,
      },
    });
  });
}
