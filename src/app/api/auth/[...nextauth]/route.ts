import { handlers } from "@/auth";
// 从 auth 模块复用 GET/POST 请求处理函数，并导出给 Next.js App Router 调用
export const { GET, POST } = handlers;
