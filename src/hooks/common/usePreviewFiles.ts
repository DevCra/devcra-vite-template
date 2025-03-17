import { type ChangeEventHandler, useCallback, useState } from "react";

type PreviewFile = {
  file: File;
  name: string;
  src: string;
};

const MAX_FILE_SIZE = 1_048_576; // 1MB

const usePreviewFiles = () => {
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);

  const handlePreviewFiles: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    const hasOverSizeFile = Array.from(files).some((file) => file.size > MAX_FILE_SIZE);

    if (hasOverSizeFile) {
      alert("파일의 최대 용량은 1MB 입니다. 확인 후, 다시 업로드해주세요.");
      return;
    }

    const newFiles: PreviewFile[] = Array.from(files).map((file) => ({
      file,
      name: file.name,
      src: URL.createObjectURL(file),
    }));

    setPreviewFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDeletePreviewFile = useCallback((idx: number) => {
    setPreviewFiles((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const clearPreviewFiles = useCallback(() => {
    setPreviewFiles([]);
  }, []);

  return {
    previewFiles,
    setPreviewFiles,
    handlePreviewFiles,
    handleDeletePreviewFile,
    clearPreviewFiles,
  };
};

export default usePreviewFiles;
