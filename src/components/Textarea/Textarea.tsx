import { type ComponentProps } from "react";

import { cn } from "@/utils/style";

interface TextareaProps extends ComponentProps<"textarea"> {
  isError?: boolean;
}
function Textarea({ isError = false, className, ...args }: TextareaProps) {
  return (
    <textarea
      className={cn("w-full resize-none border", isError && "border-red-500", className)}
      {...args}
    />
  );
}

export default Textarea;
