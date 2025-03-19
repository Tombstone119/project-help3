"use client";

import {
  MultiFileDropzone,
  type FileState,
} from "@/channeling/uploaders/multi-file-dropzone";
import { useEdgeStore } from "@/libs/edgestore";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
    <div className=" bg-white py-5 px-10">
      <div className="w-full">
        <Link href="/channeling" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
          Appointment Center
        </Link>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Upload Lab Reports
        </h1>
        <div className="min-h-svh">
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
        </div>
      </div>
    </div>
  );
}
