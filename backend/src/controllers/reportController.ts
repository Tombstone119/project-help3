import HttpStatusCodes from "../util/statusCodes.ts";
import reportService from "../services/reportService.ts";
import { handleError } from "../util/errorHandler.ts";
import { Response, Request } from "express";

export const getAllReportsByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { reportId } = req.params;
    const reports = await reportService.getAllReportById(reportId);
    res.status(HttpStatusCodes.OK).json({
      success: true,
      reports,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllReports = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const reports = await reportService.getAllReports();
    res.status(HttpStatusCodes.OK).json({
      success: true,
      reports,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const addReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { reportId } = req.params;
    const { images } = req.body;
    const reports = await reportService.addReports(reportId, images);
    res.status(HttpStatusCodes.OK).json({
      success: true,
      reports,
    });
  } catch (error) {
    handleError(res, error);
  }
};
