import { useQueryErrorResetBoundary } from "@tanstack/react-query";

interface ErrorIndicatorProps {
  error: Error;
  reset: () => void;
}

export function ErrorIndicator({ error, reset }: ErrorIndicatorProps) {
  const { reset: resetQuery } = useQueryErrorResetBoundary();

  return (
    <div>
      <div>에러가 발생했어요.</div>
      <div>빠르게 대응하고 있어요.</div>
      <button
        type="button"
        onClick={() => {
          reset();
          resetQuery();
        }}
      >
        다시 시도하기
      </button>
    </div>
  );
}
