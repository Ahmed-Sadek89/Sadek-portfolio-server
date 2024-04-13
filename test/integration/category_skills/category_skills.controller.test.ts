import request from 'supertest';
import server from '../../../src/index';
import { PrismaClient } from "@prisma/client";
import { CategorySkillsServices } from '../../../src/services/Category_skills.service';

let prisma: PrismaClient;
let categorySkillsServices: CategorySkillsServices;
const dummyToken = "Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhaG1lYW1vaGFtZWQxNjFAZ21haWwuY29tIiwiaWF0IjoxNzEzMDA4NzcxLCJleHAiOjE3MTMwOTUxNzF9.cBmPi-H2rD_n0PYf6X6ykO6jiNf_IWS2zjdbMDDvvws"
const dummyId = 1;
const dummyPostCategory_skills = { category_name: "frontend development" };
const dummyPutCategory_skills = { category_name: "backend development" };

beforeAll(() => {
    prisma = new PrismaClient();
    categorySkillsServices = new CategorySkillsServices();
})
afterAll(async () => {
    await prisma.category_skills.deleteMany({})
    await prisma.$disconnect();
    server.close()
})
beforeEach(async () => {
    await prisma.category_skills.deleteMany({})
})

describe("GET /api/category_skills/withItsSkills/:id", () => {
    test("response is 404 if no category_skills by id", async () => {
        const res = await request(server).get(`/api/category_skills/withItsSkills/${dummyId}`);

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({
            status: 404,
            category_skills: {},
            message: `no category and no skills has number ${dummyId}`
        })
    })

    test("resposne is 200 if there is category_skills by id", async () => {
        const newOne = await categorySkillsServices.insert({ category_name: "ahmed sadek" });
        const res = await request(server).get(`/api/category_skills/withItsSkills/${newOne.id.toString()}`);

        expect(res.status).toBe(200)
    })
})

describe("GET /api/category_skills/all", () => {

    test("response is 401 if no token provided", async () => {
        const res = await request(server).get(`/api/category_skills/all`);

        expect(res.status).toBe(401);
        expect(res.body).toMatchObject({
            status: 401,
            message: "no token provided"
        })
    })

    test("response is 404 in case unauthorized or expired token", async () => {
        const res = await request(server)
            .get(`/api/category_skills/all`)
            .set("Authorization", dummyToken.concat('a'))

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({
            status: 404,
            result: "you are unauthorized !"
        })
    })

    test("response is 404 if no category_skills", async () => {
        const res = await request(server)
            .get(`/api/category_skills/all`)
            .set("Authorization", dummyToken)

        expect(res.status).toBe(404);
    })

    test("resposne is 200 if there is category_skills", async () => {
        await categorySkillsServices.insert({ category_name: "frontend" });
        await categorySkillsServices.insert({ category_name: "backend" });
        const res = await request(server)
            .get(`/api/category_skills/all`)
            .set("Authorization", dummyToken);

        expect(res.status).toBe(200);
        expect(res.body.category_skills.length).toBe(2)
    })
})

describe("GET /api/category_skills/:id", () => {
    test("response is 401 if no token provided", async () => {
        const res = await request(server).get(`/api/category_skills/${dummyId}`);

        expect(res.status).toBe(401);
        expect(res.body).toMatchObject({
            status: 401,
            message: "no token provided"
        })
    })

    test("response is 404 in case unauthorized or expired token", async () => {
        const res = await request(server)
            .get(`/api/category_skills/${dummyId}`)
            .set("Authorization", dummyToken.concat('a'))

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({
            status: 404,
            result: "you are unauthorized !"
        })
    })

    test("response is 404 if no category_skills by id", async () => {
        const res = await request(server)
            .get(`/api/category_skills/${dummyId}`)
            .set("Authorization", dummyToken)

        expect(res.status).toBe(404);
        expect(res.body.category_skills).toEqual({})
    })

    test("resposne is 200 if there is category_skills by id", async () => {
        const newOne = await categorySkillsServices.insert({ category_name: "frontend" });
        const res = await request(server)
            .get(`/api/category_skills/${newOne.id}`)
            .set("Authorization", dummyToken);

        expect(res.status).toBe(200);
        expect(res.body.category_skills).not.toEqual({})
    })
})

describe("POST /api/category_skills/", () => {
    test("response is 401 if no token provided", async () => {
        const res = await request(server)
            .post(`/api/category_skills`)
            .send(dummyPostCategory_skills)

        expect(res.status).toBe(401);
        expect(res.body).toMatchObject({
            status: 401,
            message: "no token provided"
        })
    })

    test("response is 404 in case unauthorized or expired token", async () => {
        const res = await request(server)
            .post(`/api/category_skills`)
            .send(dummyPostCategory_skills)
            .set("Authorization", dummyToken.concat('a'))

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({
            status: 404,
            result: "you are unauthorized !"
        })
    })

    test("insert new category_skills successfully", async () => {
        const res = await request(server)
            .post('/api/category_skills')
            .send(dummyPostCategory_skills)
            .set("Authorization", dummyToken);

        expect(res.status).toBe(200)
        expect(res.body.result).toEqual("new category_skills created successfully")
    })
})

describe("PUT /api/category_skills/:id", () => {
    test("response is 401 if no token provided", async () => {
        const res = await request(server)
            .put(`/api/category_skills/${dummyId}`)
            .send(dummyPutCategory_skills)

        expect(res.status).toBe(401);
        expect(res.body).toMatchObject({
            status: 401,
            message: "no token provided"
        })
    })

    test("response is 404 in case unauthorized or expired token", async () => {
        const res = await request(server)
            .put(`/api/category_skills/${dummyId}`)
            .send(dummyPutCategory_skills)
            .set("Authorization", dummyToken.concat('a'))

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({
            status: 404,
            result: "you are unauthorized !"
        })
    })

    test("if category_skills is not found by id, response code is 404", async () => {
        const res = await request(server)
            .put(`/api/category_skills/${dummyId}`)
            .send(dummyPutCategory_skills)
            .set("Authorization", dummyToken)

        expect(res.status).toBe(404)
        expect(res.body.result).toEqual(`Category_skills number ${dummyId} is not found`)
    })

    test("if category_skills is found by id, response code is 200, then update it", async () => {
        const newOne = await categorySkillsServices.insert(dummyPostCategory_skills)
        const res = await request(server)
            .put(`/api/category_skills/${newOne.id}`)
            .send(dummyPutCategory_skills)
            .set("Authorization", dummyToken)

        expect(res.status).toBe(200)
        expect(res.body.result).toEqual(`Category_skills number ${newOne.id} updated successfully`);

        const findUpdated = await categorySkillsServices.getById(newOne.id)

        expect(findUpdated?.category_name).toEqual("backend development")
    })
})

describe("DELETE /api/category_skills/:id", () => {
    test("response is 401 if no token provided", async () => {
        const res = await request(server).delete(`/api/category_skills/${dummyId}`);

        expect(res.status).toBe(401);
        expect(res.body).toMatchObject({
            status: 401,
            message: "no token provided"
        })
    })

    test("response is 404 in case unauthorized or expired token", async () => {
        const res = await request(server)
            .delete(`/api/category_skills/${dummyId}`)
            .set("Authorization", dummyToken.concat('a'))

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({
            status: 404,
            result: "you are unauthorized !"
        })
    })

    test("response is 404 if no category_skills by id", async () => {
        const res = await request(server)
            .delete(`/api/category_skills/${dummyId}`)
            .set("Authorization", dummyToken)

        expect(res.status).toBe(404)
        expect(res.body.result).toEqual(`Category_skills number ${dummyId} is not found`)
    })

    test("resposne is 200 if there is category_skills by id, then delete it", async () => {
        const newOne = await categorySkillsServices.insert({ category_name: "frontend" });
        const res = await request(server)
            .delete(`/api/category_skills/${newOne.id}`)
            .set("Authorization", dummyToken);

        expect(res.status).toBe(200);
        expect(res.body.result).toEqual(`Category_skills number ${newOne.id} is deleted successfully`)
    })
})

describe("DELETE /api/category_skills/all", () => {
    test("response is 401 if no token provided", async () => {
        const res = await request(server).delete(`/api/category_skills/all`);

        expect(res.status).toBe(401);
        expect(res.body).toMatchObject({
            status: 401,
            message: "no token provided"
        })
    })

    test("response is 404 in case unauthorized or expired token", async () => {
        const res = await request(server)
            .delete(`/api/category_skills/all`)
            .set("Authorization", dummyToken.concat('a'))

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({
            status: 404,
            result: "you are unauthorized !"
        })
    })

    test("resposne is 200 if delete success", async () => {
        await categorySkillsServices.insert({ category_name: "frontend" });
        const res = await request(server)
            .delete(`/api/category_skills/all`)
            .set("Authorization", dummyToken);

        expect(res.status).toBe(200);
        expect(res.body.result).toEqual(`All category_skills deleted successfully`)
    })
})