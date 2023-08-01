"use client";

import PageHeading from "@/lib/components/ui/PageHeading";

import { FileUploader } from "./components/FileUploader";

const UploadPage = (): JSX.Element => {
  return (
    <main className="pt-10">
      <PageHeading
        title="Upload Knowledge"
        subtitle="Text, document, spreadsheet, presentation, audio, video, and URLs supported"
      />
      <FileUploader />
    </main>
  );
};

export default UploadPage;
