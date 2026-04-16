import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// clsx 优雅地拼接 className（支持条件、数组、对象）
// tailwind-merge 自动合并 Tailwind CSS 类名，并解决冲突（让“后面的覆盖前面的”生效）

//clsx + tailwind-merge 的组合封装
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
