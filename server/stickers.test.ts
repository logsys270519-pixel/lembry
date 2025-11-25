import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `user-${userId}`,
    email: `user${userId}@example.com`,
    name: `User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("stickers router", () => {
  describe("list", () => {
    it("should return empty array for user with no stickers", async () => {
      const { ctx } = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.stickers.list();

      expect(Array.isArray(result)).toBe(true);
    });

    it("should require authentication", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.stickers.list();
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });

  describe("create", () => {
    it("should create a sticker with valid input", async () => {
      const { ctx } = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.stickers.create({
        content: "Test sticker",
        positionX: 100,
        positionY: 200,
        color: "yellow",
      });

      expect(result).toBeDefined();
    });

    it("should reject empty content", async () => {
      const { ctx } = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.stickers.create({
          content: "",
          positionX: 100,
          positionY: 200,
          color: "yellow",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("BAD_REQUEST");
      }
    });

    it("should require authentication", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.stickers.create({
          content: "Test",
          positionX: 0,
          positionY: 0,
          color: "yellow",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });

    it("should use default values for optional fields", async () => {
      const { ctx } = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.stickers.create({
        content: "Test sticker",
      });

      expect(result).toBeDefined();
    });
  });

  describe("update", () => {
    it("should update sticker content", async () => {
      const { ctx } = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.stickers.update({
        id: 1,
        content: "Updated content",
      });

      expect(result).toBeDefined();
    });

    it("should update sticker position", async () => {
      const { ctx } = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.stickers.update({
        id: 1,
        positionX: 300,
        positionY: 400,
      });

      expect(result).toBeDefined();
    });

    it("should update sticker zIndex", async () => {
      const { ctx } = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.stickers.update({
        id: 1,
        zIndex: 10,
      });

      expect(result).toBeDefined();
    });

    it("should require authentication", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.stickers.update({
          id: 1,
          content: "Updated",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });

  describe("delete", () => {
    it("should delete a sticker", async () => {
      const { ctx } = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.stickers.delete({ id: 1 });

      expect(result).toBeDefined();
    });

    it("should require authentication", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.stickers.delete({ id: 1 });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });
});
