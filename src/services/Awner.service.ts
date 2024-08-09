import { awner } from "@prisma/client"
import { BcryptService } from "./bcript.service";
import { JWT } from "./JWT.service";
import prisma from "../libs/prisma";

export class AwnerServices {
    private readonly bcrypt: BcryptService;
    private readonly jwt: JWT;
    constructor() {
        this.bcrypt = new BcryptService();
        this.jwt = new JWT()
    }
    async postAwnerService(data: awner) {
        const hashedPassword = await this.bcrypt.encryptPassword(data.password)
        const awner = await prisma.awner.create({
            data: {
                ...data,
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
            }
        });
        return awner
    }

    private async findAwnerByEmail(email: string) {
        const awner = await prisma.awner.findUnique({
            where: {
                email
            }
        });
        return awner
    }

    async loginAwnerService(awnerInput: awner) {
        const isAwner = await this.checkIsAwner(awnerInput);
        if (isAwner) {
            const payload = {
                id: isAwner.id,
                email: isAwner.email,
            }
            const Authorization = this.jwt.generetaJWT(payload);
            return {
                ...payload,
                Authorization
            }
        }
        return null
    }

    private async checkIsAwner({ email, password }: awner) {
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

    async updateAwnerByIdService(id: number, data: awner) {
        const hashedPassword = await this.bcrypt.encryptPassword(data.password)
        return await prisma.awner.update({
            where: { id },
            data: {
                ...data,
                password: hashedPassword
            }
        })
    }

}