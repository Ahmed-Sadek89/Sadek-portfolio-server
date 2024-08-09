import { BcryptService } from "./bcript.service";
import { JWT } from "./JWT.service";
import prisma from "../libs/prisma";
import { Awner, AwnerLogin } from "../types";

export class AwnerServices {
    private readonly bcrypt: BcryptService;
    private readonly jwt: JWT;
    constructor() {
        this.bcrypt = new BcryptService();
        this.jwt = new JWT()
    }

    private async removePrimeFromAwners(isPrimeAwner: boolean) {
        const primeAwner = await this.getPrimeAwner()
        if (primeAwner?.isPrimeAwner === true && isPrimeAwner === true) {
            await prisma.awner.update({
                where: {
                    id: primeAwner.id
                },
                data: {
                    isPrimeAwner: false
                }
            })
        }
    }

    async postAwnerService(data: Awner) {
        const isPrimeAwner = Boolean(data.isPrimeAwner)
        await this.removePrimeFromAwners(isPrimeAwner)
        const hashedPassword = await this.bcrypt.encryptPassword(data.password)
        const awner = await prisma.awner.create({
            data: {
                ...data,
                isPrimeAwner,
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
                category_projects: true,
                category_skills: true,
                colors_setting: true,
                job_titles: true,
                links: true,
                messages: true,
                phones: true,
                projects: true,
                visitor: true
            }
        });
        return awner
    }
    async getPrimeAwner() {
        const awner = await prisma.awner.findFirst({
            where: {
                isPrimeAwner: true
            },
        });
        return awner
    }

    private async findAwnerByEmail(email: string) {
        const awner = await prisma.awner.findUnique({
            where: {
                email
            },
            include: {
                category_projects: true,
                category_skills: true,
                colors_setting: true,
                job_titles: true,
                links: true,
                messages: true,
                phones: true,
                projects: true,
                visitor: true
            }
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
            const { password, ...others } = isAwner
            return {
                ...others,
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
        const isPrimeAwner = Boolean(data.isPrimeAwner)
        await this.removePrimeFromAwners(isPrimeAwner)
        const hashedPassword = await this.bcrypt.encryptPassword(data.password)
        return await prisma.awner.update({
            where: { id },
            data: {
                ...data,
                isPrimeAwner,
                password: hashedPassword
            }
        })
    }

}