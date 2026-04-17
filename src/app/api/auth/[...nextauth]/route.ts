import { authOptions } from "@/auth"; // 注意：这里 auth.ts 需要只导出 authOptions

const handler = authOptions;

export { handler as GET, handler as POST };
