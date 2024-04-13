import { PrismaClient } from "@prisma/client";
import { CategorySkillsServices } from "../../../services/Category_skills.service";

const prisma = new PrismaClient();
const categorySkills = new CategorySkillsServices()

beforeAll(async () => {
  await prisma.$connect()
})
afterAll(async () => {
  await prisma.$disconnect()
})
afterEach(async () => {
  await categorySkills.deleteAll()
})

describe("insert category_skills", () => {
  const data = { category_name: "programming skills10" };
  it("should insert category_skills", async () => {
    const newCategorySkills = await categorySkills.insert(data);
    expect(newCategorySkills).toHaveProperty("id");
    expect(newCategorySkills).toHaveProperty("category_name");
  });

  it("should insert uniqye category_name", async () => {
    await categorySkills.insert(data);
    await expect(categorySkills.insert(data)).rejects.toThrow()
  })
})
describe("get all category skills", () => {
  it("get no category skills if not found", async () => {
    const getAll = await categorySkills.getAll();
    expect(getAll.length).toBe(0);
  })
  it("get all category skills if found", async () => {
    await categorySkills.insert({ category_name: "programming skills11" });
    await categorySkills.insert({ category_name: "libs and frameworks" });
    const getAll = await categorySkills.getAll();
    expect(getAll.length).toBe(2);
  })

})

test("get category_skills by id", async () => {
  const newOne = await categorySkills.insert({ category_name: "programming skills" });
  const getById = await categorySkills.getById(newOne.id);

  expect(getById).toMatchObject({ category_name: "programming skills" })
})

test("delete category_skills by id", async () => {
  const newOne = await categorySkills.insert({ category_name: "programming skills" });
  await categorySkills.deleteById(newOne.id)
  const deletedCategorySkills = await categorySkills.getById(newOne.id)

  expect(deletedCategorySkills).toBeNull();
})

test("update category_skills by id", async () => {
  const newOne = await categorySkills.insert({ category_name: "programming skills" });
  const updateById = await categorySkills.updateById(newOne.id, { category_name: "backend" })

  expect(updateById).toMatchObject({ category_name: "backend" })
})
test("get category_skills and its skills", async () => {
  const getAllWithSkills = await categorySkills.getByIdWithSkills(1);
  expect(getAllWithSkills).toBeNull()
})