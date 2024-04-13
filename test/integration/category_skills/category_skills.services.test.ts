import { PrismaClient } from "@prisma/client";
import { CategorySkillsServices } from "../../../src/services/Category_skills.service";

let prisma: PrismaClient
let categorySkills: CategorySkillsServices


beforeAll(() => {
  prisma = new PrismaClient();
  categorySkills = new CategorySkillsServices()
})

afterAll(async () => {
  await prisma.category_skills.deleteMany({})
  await prisma.$disconnect()
})

beforeEach(async () => {
  await prisma.category_skills.deleteMany({})
})

const data = { category_name: "programming skills10" };
test("should insert category_skills", async () => {
  const newCategorySkills = await categorySkills.insert(data);

  expect(newCategorySkills).toHaveProperty("id");
  expect(newCategorySkills).toHaveProperty("category_name");
});

test("should insert unique category_name", async () => {
  await categorySkills.insert(data);
  try {
    await expect(categorySkills.insert(data)).rejects.toThrow()
  } catch (error) { }
})

test("get no category skills if not found", async () => {
  const getAll = await categorySkills.getAll();

  expect(getAll.length).toBe(0);
})

test("get all category skills if found", async () => {
  await categorySkills.insert({ category_name: "libs and frameworks" });
  const getAll = await categorySkills.getAll();

  expect(getAll.length).toBe(1);
})

test("get category_skills by id", async () => {
  const newOne = await categorySkills.insert({ category_name: "programming skills" });
  const getById = await categorySkills.getById(newOne.id);

  expect(getById).toMatchObject({ category_name: "programming skills" })
})

test("get category_skills and its skills", async () => {
  const getAllWithSkills = await categorySkills.getByIdWithSkills(2);
  expect(getAllWithSkills).toBeNull()
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