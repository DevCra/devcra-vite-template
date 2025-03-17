export const fileDownload = async ({
  fetchFn,
  fileName,
}: {
  fetchFn: () => Promise<BlobPart>;
  fileName: string;
}) => {
  try {
    const data = await fetchFn();

    // CSV 한글 깨짐 해결
    const blobFile = new Blob([`\uFEFF${data}`], {
      type: "text/csv; charset=utf-8",
    });

    const url = window.URL.createObjectURL(blobFile);

    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert("파일 다운로드에 실패했습니다.");
  }
};
