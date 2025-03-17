import { type ChangeEventHandler, type Dispatch, type SetStateAction, useRef } from "react";

interface useFileUploadProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const useFileUpload = ({ files, setFiles }: useFileUploadProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const onClickRef = () => {
    ref.current?.click();
  };

  const handleChangeFileUpload: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { files: currentFiles },
  }) => {
    if (!currentFiles) {
      return;
    }

    const files: File[] = [];
    for (let i = 0; i < currentFiles.length; i++) {
      const file = currentFiles.item(i);

      if (!file) {
        return;
      }

      files.push(file);
    }

    setFiles((prev) => [...prev, ...files]);

    ref.current!.value = "";
  };

  const deleteFile = (file: File) => {
    setFiles((prev) => prev && prev.filter((curr) => curr !== file));
  };

  return {
    ref,
    onClickRef,
    files,
    handleChangeFileUpload,
    deleteFile,
  };
};

export default useFileUpload;
