import { Prisma, PrismaClient } from "@prisma/client"
import { BcryptService } from "./bcript.service";

const prisma = new PrismaClient();
const bcrypt = new BcryptService();

export const postAwnerService = async ({ email, password }: Prisma.AwnerCreateInput) => {
    const hashedPassword = await bcrypt.encryptPassword(password)
    const awner = await prisma.awner.create({
        data: {
            email,
            password: hashedPassword
        }
    })
    return awner
}

export const findAllAwnersService = async () => {
    const awners = await prisma.awner.findMany();
    let result: { id: number, email: string }[] = [];
    awners.map((index) => {
        result.push({ id: index.id, email: index.email });
    })
    return result
}

export const findAwnerById = async (id: number) => {
    const awner = await prisma.awner.findUnique({
        where: {
            id
        }
    });
    const result = awner ? {
        id: Number(id),
        email: awner.email
    } : "no awner in this ID"

    return
}