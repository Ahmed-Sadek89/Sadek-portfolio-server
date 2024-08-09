import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";

export class ColorSettingServices {

    async insertColorSetting(data: Prisma.colors_settingCreateInput) {
        const colors_setting = await prisma.colors_setting.create({
            data
        })
        return colors_setting
    }

    async getColorSetting() {
        const colors_setting = await prisma.colors_setting.findFirst({});
        return colors_setting;
    }

    async updateColorSetting(data: Prisma.colors_settingUpdateInput) {
        return await prisma.colors_setting.update({
            where: { id: 1 },
            data
        })
    }
}