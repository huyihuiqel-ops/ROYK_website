# 翌境｜ROYK DIGITAL

个人作品集网站，用于展示个人简介、工作经历、视觉设计、AIGC 实践、UE5 特效案例及联系方式。项目已经进入开发中后期，应在现有实现上持续维护。

VFX Copilot 在此仓库中仅为作品案例介绍和截图展示。本仓库不承载其后端、AI Provider、Schema、Validator、Normalizer 或其他核心系统，不要根据案例文案在此实现这些模块。

## 接管入口

开始开发前依次阅读：

1. 本 README。
2. [长期交接文档](docs/CODEX_HANDOFF.md)：维护规则、当前状态、问题、阶段日志和接管指南。
3. 当前任务涉及的源码；页面和交互位于 `src/main.jsx`，样式位于 `src/styles.css`。

同时遵守当前用户指令和适用的 AGENTS.md。交接文档记录的是已知状态，实际文件与 Git 状态应在开始工作时核对。

## 技术栈

- React / React DOM 19.2.8，JavaScript / JSX。
- Vite 8.2.1。
- lucide-react 1.31.0。
- 原生 CSS，Hash 导航，无路由库或后端。
- pnpm，锁文件格式 9.0。
- Cloudflare 静态资源部署配置。

版本来自当前 `pnpm-lock.yaml`。`@vitejs/plugin-react` 6.0.5 已声明为依赖，但未发现显式插件注册配置。`package.json` 的依赖范围为 `latest`，维护时保留现有锁文件，不自行升级依赖。

## 本地开发

仓库未声明 Node 和 pnpm 的固定版本。当前锁文件中的构建依赖要求 Node `^20.19.0 || >=22.12.0`；该范围不等于已验证的本机环境。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

构建和预览：

```sh
pnpm build
pnpm preview
```

以上为现有脚本的使用说明，不代表本次文档阶段执行过这些命令。构建会写入 `dist/`。目前没有 test、lint 或 typecheck 脚本，也没有测试文件。

## 目录与页面

```text
index.html              HTML 入口、标题、图标、预加载动画
src/main.jsx            页面、静态展示数据、Hash 导航和滚动逻辑
src/styles.css          全站布局、视觉效果和动画
public/assets/          图片、视频和 VFX Copilot 案例截图
package.json            开发、构建、预览脚本
pnpm-lock.yaml          依赖锁文件
wrangler.jsonc          静态资源部署配置
docs/CODEX_HANDOFF.md   长期交接状态与开发日志
work/deploy-state.md    被 Git 忽略的历史部署记录，仅供参考
dist/                   被 Git 忽略的构建产物
```

- 首页：`#home`，包含 `#about`、`#projects`、`#strengths`、`#contact`。
- AIGC 项目列表：`#aigc-concept`。
- VFX Copilot 案例详情：`#vfx-copilot`。

中英文同时展示，没有语言切换功能。内容保存在源码中，没有数据库、运行时业务 API 或环境变量读取逻辑，当前也没有环境变量示例文件。

## 部署说明

`wrangler.jsonc` 将 `dist/` 配置为静态资源目录，并启用 SPA 回退。历史工作记录提到 Cloudflare Pages 部署曾因缺少认证而受阻；实际使用的发布方式、线上域名和最新版本仍待核实。

不要将已有构建产物或部署配置视为线上发布成功的证明。发布前先确认目标与授权，不自行修改部署配置。

## 持续维护

每次完成开发阶段，更新 `docs/CODEX_HANDOFF.md` 的当前状态、下一步任务和开发日志，记录实际修改及验证结果。没有运行的检查应明确标注，不能将历史验证写成本次验证。
