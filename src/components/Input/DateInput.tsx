import { type ComponentProps } from "react";

import { cn } from "@/utils/style";

interface DateInputProps extends Omit<ComponentProps<"input">, "type"> {
  isError?: boolean;
}
function DateInput({ isError = false, className, ...args }: DateInputProps) {
  return (
    <input
      type="date"
      className={cn("w-full border", isError && "border-red-500", className)}
      {...args}
    />
  );
}

export default DateInput;
