import { PrismaClient } from "@prisma/client";
import fs from 'fs';
import { SkillsServices } from '../../../src/services/Skills.service'
import { CategorySkillsServices } from "../../../src/services/Category_skills.service";

let prisma: PrismaClient;
let skillsServices: SkillsServices;
let categorySkillsServices: CategorySkillsServices;

let dummyId = 1;
let category_skills: { id: number, category_name: string };
let dummyPostSkill: { title: string, icon: string, category_id: number }

beforeAll(async () => {
    prisma = new PrismaClient()
    skillsServices = new SkillsServices();
    categorySkillsServices = new CategorySkillsServices()

    category_skills = await categorySkillsServices.insert({ category_name: "programming language" })

    dummyPostSkill = {
        title: "react",
        icon: "image.png",
        category_id: category_skills.id
    }
})

afterAll(async () => {
    await prisma.skills.deleteMany({})
    await categorySkillsServices.deleteAll()
    await prisma.$disconnect()
})

beforeEach(async () => {
    await prisma.skills.deleteMany({})
})

describe("getById", () => {
    it("should return null if no skills", async () => {
        const skill = await skillsServices.getById(dummyId);

        expect(skill).toBe(null)
    })

    it("should not return null if there is a skill by id", async () => {
        const newSkill = await skillsServices.insert(dummyPostSkill);
        const skill = await skillsServices.getById(newSkill.id);

        expect(skill).not.toBe(null)
    })
})

describe("insert", () => {
    it("should insert successfully", async () => {
        const newSkill = await skillsServices.insert(dummyPostSkill);

        expect(newSkill.title).toEqual("react")
        expect(newSkill.icon).toEqual("image.png")
        expect(newSkill.category_id).toEqual(dummyPostSkill.category_id)
    })
})

describe("updateById", () => {

    it("should update successfully by id", async () => {
        const newOne = await skillsServices.insert(dummyPostSkill)
        const skill = await skillsServices.updateById(newOne.id, {
            icon: "logo.png"
        });

        expect(skill.icon).toEqual("logo.png")
        expect(skill.title).toEqual("react")
    })
})

describe("deleteById", () => {
    it("should delete successfully by id", async () => {
        const newOne = await skillsServices.insert(dummyPostSkill)
        await skillsServices.deleteById(newOne.id);
        const getTheDeletedOne = await skillsServices.getById(newOne.id)

        expect(getTheDeletedOne).toBeNull()
    })
})

describe("deleteByCategoryId", () => {
    it("should return null after delete by category_id", async () => {
        await skillsServices.insert(dummyPostSkill)
        await skillsServices.deleteByCategoryId(dummyPostSkill.category_id);
        const skillsByCategoryId = await skillsServices.getByCategoryId(dummyPostSkill.category_id)

        expect(skillsByCategoryId.length).toBe(0)
    })
})