"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinary_config_1 = require("./cloudinary.config");
const sharp_1 = __importDefault(require("sharp"));
cloudinary_1.v2.config(cloudinary_config_1.cloudinaryConfig);
function convertToWebp(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const webpData = yield (0, sharp_1.default)(path).toFormat('webp').toBuffer();
        // Convert the buffer to a Base64-encoded string
        const webpDataString = webpData.toString('base64');
        return webpDataString;
    });
}
function uploadToCloudinary(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const webpDataString = yield convertToWebp(path);
        return yield cloudinary_1.v2.uploader.upload(`data:image/webp;base64,${webpDataString}`, {
            resource_type: "image",
            folder: "sadek_portfolio"
        });
    });
}
exports.uploadToCloudinary = uploadToCloudinary;
function removeFromCloudinary(imgLink) {
    return __awaiter(this, void 0, void 0, function* () {
        const ImgFolderName = imgLink.split('/')[7];
        let imgId = imgLink.split('/')[8];
        imgId = imgId.split('.')[0];
        const publicId = `${ImgFolderName}/${imgId}`;
        return yield cloudinary_1.v2.uploader.destroy(publicId);
    });
}
exports.removeFromCloudinary = removeFromCloudinary;
