import { HTMLAttributes, memo } from "react";

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
}

const Icon = memo(function Icon({ className = "", name, ...props }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()} {...props}>
      {name}
    </span>
  );
});

Icon.displayName = "Icon";

export default Icon;
