import { type ComponentProps } from "react";

import { cn } from "@/utils/style";

interface TextInputProps extends Omit<ComponentProps<"input">, "type"> {
  isError?: boolean;
}
function TextInput({ isError = false, className, ...args }: TextInputProps) {
  return (
    <input
      type="text"
      className={cn("w-full border", isError && "border-red-500", className)}
      {...args}
    />
  );
}

export default TextInput;
