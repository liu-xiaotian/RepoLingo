import * as React from "react";

import { cn } from "@/lib/utils";

// 使用 React.forwardRef 创建一个可以接收 ref 的函数组件
const Card = React.forwardRef<
  HTMLDivElement, // 指定 ref 最终指向的 DOM 类型是 HTMLDivElement
  React.HTMLAttributes<HTMLDivElement> // 指定组件接收的 props 类型（标准 div 属性）
>(
  (
    { className, ...props }, // 解构 props：取出 className，其余属性放入 props
    ref, // 接收外部传入的 ref
  ) => (
    <div
      ref={ref} // 将 ref 绑定到这个 div 上，允许父组件直接访问 DOM
      className={cn(
        // 默认样式（通常是 Tailwind CSS 类）
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className, // 允许外部传入额外的 className 进行样式扩展
      )}
      {...props} // 将剩余的 props（如 onClick、style 等）透传给 div
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
