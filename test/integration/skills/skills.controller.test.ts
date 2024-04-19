import { PrismaClient } from "@prisma/client";
import { SkillsServices } from '../../../src/services/Skills.service'
import { CategorySkillsServices } from "../../../src/services/Category_skills.service";
import { AwnerServices } from "../../../src/services/Awner.service";

let prisma: PrismaClient;
let skillsServices: SkillsServices;
let categorySkillsServices: CategorySkillsServices;
let awnerServices: AwnerServices;

let dummyToken: string| undefined
beforeAll(async () => {
    prisma = new PrismaClient()
    skillsServices = new SkillsServices();
    categorySkillsServices = new CategorySkillsServices()
    awnerServices = new AwnerServices();

    awnerServices.loginAwnerService({
        email: "ahmeamohamed161@gmail.com",
        password: "Ahmed@01212758221"
    }).then((res) => {
        dummyToken = res?.Authorization
    })

    await categorySkillsServices.insert({ category_name: "programming language" })
})

afterAll(async () => {
    await prisma.skills.deleteMany({})
    await categorySkillsServices.deleteAll()
    await prisma.$disconnect()
    dummyToken = undefined
})

beforeEach(async() => {
    await prisma.skills.deleteMany({})
    await categorySkillsServices.deleteAll()
})

// start here, then update in categorySkills_controller_testing file
    //-> describe("GET /api/category_skills/withItsSkills/:id", () => {