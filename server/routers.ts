import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getUserStickers, createSticker, updateSticker, deleteSticker } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  stickers: router({
    list: protectedProcedure.query(({ ctx }) => getUserStickers(ctx.user.id)),
    create: protectedProcedure
      .input(z.object({
        content: z.string().min(1),
        positionX: z.number().default(0),
        positionY: z.number().default(0),
        color: z.string().default("yellow"),
      }))
      .mutation(({ ctx, input }) => createSticker({
        userId: ctx.user.id,
        content: input.content,
        positionX: input.positionX,
        positionY: input.positionY,
        color: input.color,
        zIndex: 1,
      })),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        content: z.string().optional(),
        positionX: z.number().optional(),
        positionY: z.number().optional(),
        zIndex: z.number().optional(),
        color: z.string().optional(),
      }))
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return updateSticker(id, data);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteSticker(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
