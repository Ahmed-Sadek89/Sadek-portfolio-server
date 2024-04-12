import { PrismaClient } from "@prisma/client";
import { Category_skills } from "../../../services/Category_skills.service";

const prisma = new PrismaClient();
const categorySkills = new Category_skills()

beforeAll(async () => {
  return await prisma.$connect()
})
afterAll(async () => {
  return await prisma.$disconnect()
})
afterEach(async () => {
  return await categorySkills.deleteAll()
})

describe("category_skills services", () => {
  it("should insert category_skills, it must be unique", async () => {
    const data = { category_name: "programming skills10" }
    const newCategorySkills = await categorySkills.insert(data);

    expect(newCategorySkills).toHaveProperty("id")
    expect(newCategorySkills).toHaveProperty("category_name");
  })

  it("should return all category_skills", async () => {
    await categorySkills.insert({ category_name: "programming skills11" });
    await categorySkills.insert({ category_name: "libs and frameworks" });

    const getAll = await categorySkills.getAll();

    expect(getAll.length).toBe(2);
  })

  it("should return category_skills by id", async () => {
    const newOne = await categorySkills.insert({ category_name: "programming skills" });
    let getById = await categorySkills.getById(newOne.id);

    expect(getById).toMatchObject({ category_name: "programming skills" })
  })

  it("should delete category_skills by id", async () => {
    const newOne = await categorySkills.insert({ category_name: "programming skills" });
    await categorySkills.deleteById(newOne.id)
    const deletedCategorySkills = await categorySkills.getById(newOne.id)

    expect(deletedCategorySkills).toBeNull()
  })

  it("should update category_skills by id", async () => {
    const newOne = await categorySkills.insert({ category_name: "programming skills" });
    const updateById = await categorySkills.updateById(newOne.id, { category_name: "backend" })

    expect(updateById).toMatchObject({ category_name: "backend" })
  })

  it("should get category_skills and its skills", async () => {
    const getAllWithSkills = await categorySkills.getByIdWithSkills(1);
    expect(getAllWithSkills).toBeNull()
  })

})