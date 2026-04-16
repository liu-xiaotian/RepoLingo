//// commitlint.config.js
module.exports = {
  ignores: [(commit) => commit.includes("init")], // 忽略规则：如果提交信息中包含 "init"，则跳过校验
  extends: ["@commitlint/config-conventional"], // 继承官方的规范配置
  // 校验规则
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    // 限制 type 必须是以下枚举之一
    "type-enum": [
      2, // 级别：2 = error（报错，提交会被阻止）
      "always", // 必须匹配下面的枚举
      [
        "feat", // 新功能
        "fix", // 修复 bug
        "perf", // 性能优化
        "style", // 代码格式（不影响逻辑）
        "docs", // 文档变更
        "test", // 测试相关
        "refactor", // 重构
        "build", // 构建相关
        "ci", // CI/CD 相关
        "chore", // 杂项（依赖更新等）
        "revert", // 回滚提交
        "wip", // 开发中（不建议长期使用）
        "workflow", // 工作流相关
        "types", // 类型定义（TS）
        "release", // 发布版本
      ],
    ],
  },
};
