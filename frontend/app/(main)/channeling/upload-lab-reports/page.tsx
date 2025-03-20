"use client";

import {
  MultiFileDropzone,
  type FileState,
} from "@/channeling/uploads/multi-file-dropzone";
import { useEdgeStore } from "@/libs/edgestore";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IoDocumentsOutline } from "react-icons/io5";

export default function UploadLabReports() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div className="bg-white py-5 px-10 min-h-svh">
      <div className="w-full">
        <Link href="/channeling" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
          Appointment Center
        </Link>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="text-2xl font-bold text-teal-900 text-center underline underline-offset-8 mt-8 flex items-center gap-2">
          Upload Your Lab Reports <IoDocumentsOutline />
        </h1>

        <p className="text-gray-600 text-center text-balance">
          Upload your lab reports here. <br />
          <b>JPG</b>, <b>PNG</b> or <b>Webp</b> upto <b>1MB</b> size accepted.
          If your image size is bigger, please compress it <br />
        </p>
        <MultiFileDropzone
          value={fileStates}
          onChange={(files) => {
            setFileStates(files);
          }}
          onFilesAdded={async (addedFiles) => {
            setFileStates([...fileStates, ...addedFiles]);
            await Promise.all(
              addedFiles.map(async (addedFileState) => {
                try {
                  const res = await edgestore.publicFiles.upload({
                    file: addedFileState.file,
                    onProgressChange: async (progress) => {
                      updateFileProgress(addedFileState.key, progress);
                      if (progress === 100) {
                        // wait 1 second to set it to complete
                        // so that the user can see the progress bar at 100%
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                        updateFileProgress(addedFileState.key, "COMPLETE");
                      }
                    },
                  });
                  console.log(res.url);
                } catch {
                  updateFileProgress(addedFileState.key, "ERROR");
                }
              })
            );
          }}
        />
        <h2 className="text-xl font-bold text-teal-900 text-center underline underline-offset-8 mt-8 mb-4 self-start">
          Recently Uploaded Lab Reports
        </h2>
        <div className="flex flex-wrap gap-2 justify-start self-start">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-[100px] h-32 flex items-center justify-center"></div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-[100px] h-32 flex items-center justify-center"></div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-[100px] h-32 flex items-center justify-center"></div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-[100px] h-32 flex items-center justify-center"></div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-[100px] h-32 flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
}
