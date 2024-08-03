import { Prisma, PrismaClient } from "@prisma/client";

export class ColorSettingServices {
    private readonly prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient();
    }

    async insertColorSetting(data: Prisma.colors_settingCreateInput) {
        const colors_setting = await this.prisma.colors_setting.create({
            data
        })
        return colors_setting
    }

    async getColorSetting() {
        const colors_setting = await this.prisma.colors_setting.findFirst({});
        return colors_setting;
    }

    async updateColorSetting(data: Prisma.awner_infoUpdateInput) {
        return await this.prisma.colors_setting.update({
            where: {id: 1},
            data
        })
    }
}