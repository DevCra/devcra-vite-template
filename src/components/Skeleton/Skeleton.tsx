type SkeletonProps = {
  display?: "full" | "block";
  width: number | string;
  height: number | string;
};

const Skeleton = ({ display = "block", width, height }: SkeletonProps) => {
  return (
    <div
      style={{ width: display === "full" ? "100%" : `${width}%`, height }}
      className="animate-pulse rounded bg-[#e0e0e0]"
    />
  );
};

export default Skeleton;
