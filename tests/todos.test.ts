import request from "supertest";
import app from "../src/app";
import { initSchema, closeDb } from "../src/db/database";

beforeAll(() => {
  process.env.DB_PATH = ":memory:";
  initSchema();
});

afterAll(() => {
  closeDb();
});

describe("GET /health", () => {
  it("returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
    expect(res.headers["x-request-id"]).toBeDefined();
  });
});

describe("POST /todos", () => {
  it("creates a todo and returns 201", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "Write tests" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe("Write tests");
    expect(res.body.completed).toBe(false);
    expect(res.body.createdAt).toBeDefined();
  });

  it("returns 400 for invalid body", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "" });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});

describe("CRUD lifecycle", () => {
  let todoId: string;

  it("creates, reads, updates, patches, and deletes a todo", async () => {
    const create = await request(app)
      .post("/todos")
      .send({ title: "Lifecycle test", description: "Full cycle" });
    expect(create.status).toBe(201);
    todoId = create.body.id;

    const get = await request(app).get(`/todos/${todoId}`);
    expect(get.status).toBe(200);
    expect(get.body.title).toBe("Lifecycle test");

    const put = await request(app)
      .put(`/todos/${todoId}`)
      .send({ title: "Updated", completed: true });
    expect(put.status).toBe(200);
    expect(put.body.title).toBe("Updated");
    expect(put.body.completed).toBe(true);

    const patch = await request(app)
      .patch(`/todos/${todoId}`)
      .send({ description: "Patched desc" });
    expect(patch.status).toBe(200);
    expect(patch.body.description).toBe("Patched desc");
    expect(patch.body.title).toBe("Updated");

    const del = await request(app).delete(`/todos/${todoId}`);
    expect(del.status).toBe(204);

    const notFound = await request(app).get(`/todos/${todoId}`);
    expect(notFound.status).toBe(404);
    expect(notFound.body.error.code).toBe("NOT_FOUND");
  });
});
