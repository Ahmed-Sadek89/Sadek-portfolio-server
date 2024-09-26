import prisma from "../libs/prisma";
import { Project } from "../types";


export class ProjectServices {

    private selectProjectFormate = () => {
        return {
            id: true,
            title: true,
            description: true,
            live_url: true,
            repo_url: true,
            status: true,
            created_at: true,
            ended_at: true,
            attachment: true,
            category_project_id: true,
            awner_id: true,
            CategoryProject: {
                select: {
                    category_name: true,
                },
            },
            ProjectCategorySkill: {
                select: {
                    CategorySkill: {
                        select: {
                            category_name: true,
                        },
                    },
                },
            },
            ProjectSkill: {
                select: {
                    Skill: {
                        select: {
                            title: true,
                        },
                    },
                },
            },
        }
    }

    private formateProjectObject = (rawProject: any) => {
        const project = {
            id: rawProject?.id,
            title: rawProject?.title,
            description: rawProject?.description,
            live_url: rawProject?.live_url,
            repo_url: rawProject?.repo_url,
            status: rawProject?.status,
            created_at: rawProject?.created_at,
            ended_at: rawProject?.ended_at,
            attachment: rawProject?.attachment,
            awner_id: rawProject?.awner_id,
            category_project: {
                id: rawProject?.category_project_id,
                name: rawProject?.CategoryProject.category_name
            },
            categorySkills: rawProject?.ProjectCategorySkill.map((cs: any) => cs.CategorySkill.category_name),
            skills: rawProject?.ProjectSkill.map((s: any) => s.Skill.title),
        };

        return project;
    }



    async all(awner_id: number) {
        return await prisma.project.findMany({
            where: { awner_id },
            select: {
                id: true,
                title: true,
                attachment: true,
                status: true,
            }
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
        const rawProject = await prisma.project.findUnique({
            where: {
                id,
            },
            select: this.selectProjectFormate(),
        });

        return this.formateProjectObject(rawProject);
    }

    async insert(data: any, category_skill_ids: string[], skill_ids: string[]) {
        const newProject = await prisma.project.create({
            data,
        });


        const projectCategorySkillData = category_skill_ids.map(key => {
            return { project_id: newProject.id, category_skills_id: Number(key) }
        })
        await prisma.projectCategorySkill.createMany({
            data: projectCategorySkillData,
        });

        const projectSkillData = skill_ids.map(key => {
            return { project_id: newProject.id, skill_id: Number(key) }
        })

        await prisma.projectSkill.createMany({
            data: projectSkillData,
        });

        return newProject
    }

    async updateById(id: number, data: Project) {
        return await prisma.project.update({
            where: { id },
            data
        })
    }

    async deleteById(id: number) {
        const deleteById = await prisma.project.delete({
            where: { id }
        })
        await prisma.projectCategorySkill.deleteMany({
            where: { project_id: id },
        });

        // Delete related records in `ProjectSkill` for the project_id
        await prisma.projectSkill.deleteMany({
            where: { project_id: id },
        });

        return deleteById
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