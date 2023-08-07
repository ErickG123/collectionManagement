import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async (request, reply) => {
    const users = await prisma.user.findMany();

    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        login: user.login,
      }
    });
  });

  app.get('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return user;
  });

  app.post('/users', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      login: z.string(),
      password: z.string(),
    });

    const { name, login, password } = bodySchema.parse(request.body);
    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        login,
        password: passwordHash,
      }
    });

    return user;
  });

  app.put('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      name: z.string(),
      login: z.string(),
    });

    const { name, login } = bodySchema.parse(request.body);

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        login,
      }
    });

    return user;
  });

  app.delete('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.user.delete({
      where: {
        id,
      },
    });
  });
}
