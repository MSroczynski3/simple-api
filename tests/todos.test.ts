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

describe("GET /todos pagination", () => {
  beforeAll(async () => {
    // Seed 3 todos for pagination tests
    await request(app).post("/todos").send({ title: "Todo 1" });
    await request(app).post("/todos").send({ title: "Todo 2" });
    await request(app).post("/todos").send({ title: "Todo 3" });
  });

  it("returns default pagination with all todos", async () => {
    const res = await request(app).get("/todos");
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("items");
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("limit");
    expect(res.body).toHaveProperty("offset");
    expect(res.body.limit).toBe(20);
    expect(res.body.offset).toBe(0);
    expect(res.body.total).toBeGreaterThanOrEqual(3);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it("returns paginated results with limit=2 offset=0", async () => {
    const res = await request(app).get("/todos?limit=2&offset=0");
    
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(2);
    expect(res.body.total).toBeGreaterThanOrEqual(3);
    expect(res.body.limit).toBe(2);
    expect(res.body.offset).toBe(0);
  });

  it("returns paginated results with limit=2 offset=2", async () => {
    const res = await request(app).get("/todos?limit=2&offset=2");
    
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBeGreaterThanOrEqual(1);
    expect(res.body.total).toBeGreaterThanOrEqual(3);
    expect(res.body.limit).toBe(2);
    expect(res.body.offset).toBe(2);
  });

  it("validates limit is within bounds", async () => {
    const maxRes = await request(app).get("/todos?limit=101");
    expect(maxRes.status).toBe(400);
    expect(maxRes.body.error.code).toBe("VALIDATION_ERROR");

    const minRes = await request(app).get("/todos?limit=0");
    expect(minRes.status).toBe(400);
    expect(minRes.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("validates offset is non-negative", async () => {
    const res = await request(app).get("/todos?offset=-1");
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});
