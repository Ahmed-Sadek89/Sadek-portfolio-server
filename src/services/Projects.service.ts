import prisma from "../libs/prisma";
import { Project } from "../types";


export class ProjectServices {

    async all(awner_id: number) {
        return await prisma.project.findMany({
            where: { awner_id }
        })
    }

    async getByCategoryProjectId(category_project_id: number) {
        return await prisma.project.findMany({
            where: { category_project_id }
        })
    }

    async getByCategorySkillId(category_skills_id: number) {
        const projects = await prisma.project.findMany({
            where: {
                ProjectCategorySkill: {
                    some: {
                        category_skills_id
                    }
                }
            },
            include: {
                CategoryProject: true,
            }
        });

        return projects;
    }

    async getBySkillId(skill_id: number) {
        const projects = await prisma.project.findMany({
            where: {
                ProjectSkill: {
                    some: {
                        skill_id
                    }
                }
            },
            include: {
                ProjectSkill: {
                    include: {
                        Skill: true
                    }
                }
            }
        });

        return projects;
    }

    async getById(id: number) {
        return await prisma.project.findUnique({
            where: { id }
        })
    }

    async insert(data: Project) {
        return await prisma.project.create({
            data
        })
    }

    async updateById(id: number, data: Project) {
        return await prisma.project.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        return await prisma.project.delete({
            where: { id }
        })
    }


    // join
    async deleteAllByCategoryId(category_project_id: number) {
        return await prisma.project.deleteMany({
            where: { category_project_id }
        })
    }

    async getProjectNotesByProjectId(id: number) {
        // 
        return await prisma.project.findUnique({
            where: { id },
            include: { ProjectNote: true }
        })
    }
}