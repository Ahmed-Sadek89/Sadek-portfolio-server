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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobTitlesController = void 0;
const Job_titles_service_1 = require("../services/Job_titles.service");
const jobTitleServices = new Job_titles_service_1.JobTitlesServices();
class JobTitlesController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const job_titles = yield jobTitleServices.getAll();
                res.status(200).json({
                    status: 200,
                    job_titles
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const link = yield jobTitleServices.getById(Number(id));
                res.status(200).json({
                    status: 200,
                    link
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    insertNewJobTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield jobTitleServices.insertNewJobTitle(req.body);
                res.status(200).json({
                    status: 200,
                    message: "new job title inserted successfully"
                });
            }
            catch (error) {
                console.log({ error: error.message });
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    updateJobTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield jobTitleServices.updateJobTitle(Number(id), req.body);
                res.status(200).json({
                    status: 200,
                    message: `the job title number ${id} updated successfully`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield jobTitleServices.deleteById(Number(id));
                res.status(200).json({
                    status: 200,
                    message: `the job title number ${id} deleted successfully`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield jobTitleServices.deleteAll();
                res.status(200).json({
                    status: 200,
                    message: `all job titles are deleted`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong"
                });
            }
        });
    }
}
exports.JobTitlesController = JobTitlesController;
