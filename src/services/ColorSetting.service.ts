import prisma from "../libs/prisma";
import { ColorsSetting } from "../types";

export class ColorSettingServices {

    async insertColorSetting(data: ColorsSetting) {
        const colors_setting = await prisma.colorsSetting.create({
            data
        })
        return colors_setting
    }

    async getColorSetting() {
        const colors_setting = await prisma.colorsSetting.findFirst({});
        return colors_setting;
    }

    async updateColorSetting(data: ColorsSetting) {
        return await prisma.colorsSetting.update({
            where: { id: 1 },
            data
        })
    }
}