"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Category_skills_service_1 = require("../../../services/Category_skills.service");
const prisma = new client_1.PrismaClient();
const categorySkills = new Category_skills_service_1.CategorySkillsServices();
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.$connect();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.$disconnect();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    return yield categorySkills.deleteAll();
}));
describe("category_skills services", () => {
    it("should insert category_skills, it must be unique", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { category_name: "programming skills10" };
        const newCategorySkills = yield categorySkills.insert(data);
        expect(newCategorySkills).toHaveProperty("id");
        expect(newCategorySkills).toHaveProperty("category_name");
    }));
    it("should return all category_skills", () => __awaiter(void 0, void 0, void 0, function* () {
        yield categorySkills.insert({ category_name: "programming skills11" });
        yield categorySkills.insert({ category_name: "libs and frameworks" });
        const getAll = yield categorySkills.getAll();
        expect(getAll.length).toBe(2);
    }));
    it("should return category_skills by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newOne = yield categorySkills.insert({ category_name: "programming skills" });
        let getById = yield categorySkills.getById(newOne.id);
        expect(getById).toMatchObject({ category_name: "programming skills" });
    }));
    it("should delete category_skills by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newOne = yield categorySkills.insert({ category_name: "programming skills" });
        yield categorySkills.deleteById(newOne.id);
        const deletedCategorySkills = yield categorySkills.getById(newOne.id);
        expect(deletedCategorySkills).toBeNull();
    }));
    it("should update category_skills by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newOne = yield categorySkills.insert({ category_name: "programming skills" });
        const updateById = yield categorySkills.updateById(newOne.id, { category_name: "backend" });
        expect(updateById).toMatchObject({ category_name: "backend" });
    }));
    it("should get category_skills and its skills", () => __awaiter(void 0, void 0, void 0, function* () {
        const getAllWithSkills = yield categorySkills.getByIdWithSkills(1);
        expect(getAllWithSkills).toBeNull();
    }));
});
