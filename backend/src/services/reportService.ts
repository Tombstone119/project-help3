import { IReport } from "@src/util/user-schema.ts";
import reportModel from "../models/reportModel.ts";

async function getAllReportById(patientId: string) {
  const reports = await reportModel.find({
    patientId: patientId,
  });
  return reports;
}

async function getAllReports() {
  const reports = await reportModel.find();
  return reports;
}

async function addReports(reportId: string, images: string[]) {
  const newReport = await reportModel.create({
    patientId: reportId,
    image: images,
  });
  return newReport;
}

export default {
  getAllReportById,
  getAllReports,
  addReports,
};
