import { BcryptService } from "./bcript.service";
import { JWT } from "./JWT.service";
import prisma from "../libs/prisma";
import { Awner, AwnerLogin } from "../types";
import { ACTION, TABLE } from "@prisma/client";
import { createActivity } from "../libs/create-activity";

export class AwnerServices {
    private readonly bcrypt: BcryptService;
    private readonly jwt: JWT;
    constructor() {
        this.bcrypt = new BcryptService();
        this.jwt = new JWT()
    }

    private async removePrimeFromAwners(isPriamry: boolean) {
        const primeAwner = await this.getPrimeAwner()

        if (primeAwner && primeAwner?.isPriamry === true && isPriamry === true) {
            await prisma.awner.update({
                where: {
                    id: primeAwner.id
                },
                data: {
                    isPriamry: false
                }
            })
        }
    }

    async getPrimeAwner() {
        const awner = await prisma.awner.findFirst({
            where: {
                isPriamry: true
            },

        });
        return awner && awner
    }

    async postAwnerService(data: Awner) {

        const isPriamry = Boolean(data.isPriamry)
        await this.removePrimeFromAwners(isPriamry)
        const hashedPassword = await this.bcrypt.encryptPassword(data.password)
        const awner = await prisma.awner.create({
            data: {
                ...data,
                isPriamry,
                password: hashedPassword
            }
        })
        return awner
    }

    async findAllAwnersService() {
        const awners = await prisma.awner.findMany();
        return awners
    }

    async findAwnerById(id: number) {
        const awner = await prisma.awner.findUnique({
            where: {
                id
            },
            include: {
                Project: true,
                FuturePlan: {
                    orderBy: {
                        id: 'desc'
                    }
                },
                Activity: {
                    orderBy: {
                        id: 'desc'
                    }
                },
                _count: {
                    select: {
                        Phone: true,
                        JobTitle: true,
                        LinkType: true,
                        Link: true,
                        CategorySkill: true,
                        Skill: true,
                        CategoryProject: true,
                        Project: true,
                        ProjectNote: true,
                        Visitor: true,
                        Message: true,
                    }
                },

            }
        });

        return awner
    }

    private async findAwnerByEmail(email: string) {
        const awner = await prisma.awner.findUnique({
            where: {
                email
            },
        });

        return awner
    }

    async loginAwnerService(awnerInput: AwnerLogin) {
        const isAwner = await this.checkIsAwner(awnerInput);
        if (isAwner) {
            const payload = {
                id: isAwner.id,
                email: isAwner.email,
            }
            const Authorization = this.jwt.generetaJWT(payload);

            await createActivity({
                action: ACTION.LOGIN,
                table_name: TABLE.AWNER,
                awner_id: isAwner.id,
                table_name_id: ''
            })

            return {
                id: isAwner.id,
                Authorization,
            }
        }
        return null
    }

    private async checkIsAwner({ email, password }: AwnerLogin) {
        const awner = await this.findAwnerByEmail(email);
        if (awner) {
            const checkPassword = await this.bcrypt.comparingPassword(password, awner.password);
            if (checkPassword) {
                return awner
            }
        }
        return null
    }

    async deleteAllAwnersService() {
        return await prisma.awner.deleteMany()
    }

    async deleteAwnerByIdService(id: number) {
        return await prisma.awner.delete({
            where: {
                id
            }
        })
    }

    async updateAwnerByIdService(id: number, data: Awner) {
        const isPriamry = Boolean(data.isPriamry)
        await this.removePrimeFromAwners(isPriamry)
        const hashedPassword = await this.bcrypt.encryptPassword(data.password)
        return await prisma.awner.update({
            where: { id },
            data: {
                ...data,
                isPriamry,
                password: hashedPassword
            }
        })
    }

}