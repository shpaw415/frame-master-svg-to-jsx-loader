// Module declarations for CSS imports
declare module "*.css" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}
