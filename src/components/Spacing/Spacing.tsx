type SpacingProps = {
  size: number;
};

export default function Spacing({ size }: SpacingProps) {
  return (
    <div
      style={{
        flex: "none",
        height: size,
      }}
    />
  );
}
