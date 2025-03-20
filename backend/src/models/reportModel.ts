import { IReport } from "../util/user-schema.ts";
import { Schema, model } from "mongoose";

const reportSchema = new Schema<IReport>(
  {
    patientId: {
      type: String,
      required: [true, "Patient Id is required"],
    },
    image: {
      type: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const reportModel = model("report", reportSchema);
export default reportModel;
