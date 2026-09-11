# CODEX 长期交接文档

最后更新：2026-09-11（Asia/Shanghai）。

本文件保存已确认的项目边界、当前状态和阶段记录。它是后续接管的入口，不是对待办任务的自动执行授权。用户最新指令优先；实施前核对相关源码和 Git 状态，不必每次重新扫描全仓库。

## 1. 项目身份与边界

- 名称：翌境｜ROYK DIGITAL。
- 仓库用途：个人作品集网站，展示个人简介、经历、视觉设计、AIGC 实践、UE5 特效案例及联系方式。
- 当前工作目录：`D:\Codex\work\ROYK WEBSITE`，后续可迁移，不应在业务代码中依赖该路径。
- 历史部署记录中的仓库：`https://github.com/huyihuiqel-ops/ROYK_website`。
- 项目已开发到中后期，应维护现有实现，不按新项目重新搭建。
- 用户已确认：VFX Copilot 仅为案例展示。此仓库不开发其后端、AI Provider、Schema、Validator、Normalizer、语义映射或其他核心系统。
- 案例中的“V1.0 Completed”、DeepSeek 回归、Handoff JSON 等属于案例文案，不能作为本仓库实现或通过测试的证据。

## 2. 技术栈与运行方式

| 项目 | 已知状态 |
| --- | --- |
| React / React DOM | 锁文件版本 19.2.8 |
| Vite | 锁文件版本 8.2.1 |
| lucide-react | 锁文件版本 1.31.0 |
| @vitejs/plugin-react | 6.0.5；已声明依赖，未发现显式注册配置 |
| 语言与样式 | JavaScript / JSX、原生 CSS，无 TypeScript |
| 导航与状态 | URL Hash、React useState / useEffect |
| 包管理 | pnpm，lockfileVersion 9.0；未声明固定包管理器版本 |
| 开发脚本 | `pnpm dev`、`pnpm build`、`pnpm preview` |
| 部署配置 | Cloudflare 静态资源目录 `dist`，SPA 回退 |
| 测试保障 | 无测试文件、test/lint/typecheck 脚本或 CI 配置 |

直接依赖的版本范围均为 `latest`，现有锁文件保存具体版本。安装应保留锁文件，例如使用 `pnpm install --frozen-lockfile`；不得自行升级依赖。

未发现数据库、业务 API、后端入口、浏览器持久化或环境变量读取逻辑。`wrangler.jsonc` 的 `$schema` 只是部署配置格式引用，不是业务 Schema。

## 3. 项目目录

```text
ROYK WEBSITE/
├── README.md                 开发者说明与接管入口
├── docs/CODEX_HANDOFF.md      长期状态、规则与阶段日志
├── index.html                HTML 入口与预加载占位动画
├── package.json
├── pnpm-lock.yaml
├── wrangler.jsonc            Cloudflare 静态资源配置
├── .gitignore
├── src/
│   ├── main.jsx              全部页面、内容数据、导航与动效绑定
│   └── styles.css            全站样式
├── public/assets/            图片、视频、品牌与人物素材
│   └── vfx-copilot/           案例系统图和产品截图
├── work/deploy-state.md       历史部署状态，被 Git 忽略
├── dist/                     已有构建产物，被 Git 忽略
├── node_modules/             本地依赖，被 Git 忽略
├── .wrangler/                本地工具目录
├── hero-robot-new.mp4         根目录视频副本，被 Git 忽略
└── vite-dev*.log              历史开发日志，被 Git 忽略
```

首次扫描时 `main.jsx` 为 603 行，`styles.css` 为 1914 行，仅用于识别基线，后续定位应使用符号或搜索。没有独立的 `app/`、`pages/` 或 API 路由目录。

## 4. 页面结构与核心模块

| 页面或模块 | 职责 |
| --- | --- |
| 首页 `#home` | 视频首屏、个人简介与经历、作品分类、六项优势、联系方式 |
| 首页区块 | `#about`、`#projects`、`#strengths`、`#contact`，同页滚动 |
| AigcConceptPage | `#aigc-concept`，一个 VFX 案例入口和两个项目占位 |
| VfxCopilotPage | `#vfx-copilot`，案例概述、系统图、架构说明、流程、截图、挑战与成果 |
| App | loading、currentHash、Hash 监听、滚动定位、IntersectionObserver |
| Nav | 固定导航、品牌首页入口、栏目锚点与邮件联系；作为 main 直接子元素，避免被 Hero 层叠上下文限制 |
| Loader / HTML fallback | React 加载动画和 React 启动前的占位动画 |
| BilingualTitle | 中英文标题展示 |
| 顶层展示数组 | 项目、技能、案例概述、流程、功能、挑战和成果 |
| styles.css | 深色布局、金色点缀、案例紫色标题、视频遮罩、悬停和进入视口动效 |

实际流程：HTML 占位显示 → React 挂载并移除占位 → 约 2.8 秒后解除加载状态 → 按 Hash 展示页面并定位 → 观察器添加 `isVisible`。

作品主路径：首页作品集 → AIGC 列表 → VFX 案例 → 返回列表或作品集。联系邮件使用 `mailto:`，微信为静态文字。

没有 React Router、语言切换、表单提交或业务 API 调用链。案例页介绍的 Generate → Normalize → Validate → Apply → Export 并非网站可执行流程。

### 数据形状

代码没有显式类型定义或业务 Schema，以下是现有静态数组的结构：

- `projects`：`{ zh, en, type, image, meta, href? }[]`。
- `strengths`：`[中文标题, 英文标题, 中文说明, 英文说明][]`。
- `aigcProjectFrames`：`{ id, zh, en, type, status, featured?, href? }[]`；id 是固定唯一标识，React key 使用 id，修改文案或调整顺序时保留 id。
- `vfxOverview`：`[label, value][]`。
- `vfxWorkflow`、`vfxResults`：`string[]`。
- `vfxFeatures`：`[title, body, image?][]`。
- `vfxChallenges`：`[problem, fix][]`。
- App 状态：`loading` 为布尔值，`currentHash` 为字符串。

## 5. 当前功能与完成状态

已存在的功能：

- 首页五个区块、固定导航、中英双语文字。
- 品牌加载动画、滚动显现、卡片悬停效果。
- 首屏、简介、联系三个背景视频。
- 三类作品展示、AIGC 列表、VFX 案例详情。
- VFX 系统图及六个产品界面截图。
- 邮件入口、微信展示、标题和 favicon。
- 开发/构建/预览脚本、依赖锁文件、静态部署配置和 Git 历史。

桌面端主体已形成，但内容与适配尚未完成。没有完整需求清单与验收标准，不提供整体完成百分比。代码存在不等于已通过浏览器验收；VFX 核心系统完成度不在本仓库评估范围内。

## 6. 当前问题与技术债

### 已由源码确认

| 问题 | 位置或原因 |
| --- | --- |
| AIGC 列表重复 key（Phase 4 已修复） | 已增加固定 id 并使用 `key={project.id}`；开发版复测无重复 key 警告 |
| 小屏布局限制 | body 默认 min-width 1180px，小屏媒体规则仍为 1024px |
| 两类作品没有详情 | 游戏特效、品牌设计卡片回到 `#projects` |
| 内容未齐 | 两个 AIGC 项目、三个工作经历卡片为占位 |
| 电话按钮无拨号行为 | href 为 `#contact`，不是 `tel:` |
| 加载状态不关联资源完成 | 固定 2.8 秒定时器 |
| 无减少动画偏好适配 | 未发现 `prefers-reduced-motion` |
| 固定导航被区块遮挡（Phase 4 已修复） | 首页 Nav 已移至 main 下，脱离 Hero 的独立层叠上下文；桌面五个首页区块、两张案例页及跨区块滚动抽查均可命中导航 |
| 桌面轻微横向溢出（Phase 3 实测） | 1440px 视口曾测得 scrollWidth 1443px；1280px 部分首页区块测得 1283px，截图可见横向滚动条 |

### 待实测或后续评估

- `.reveal` 默认透明，依赖观察器显示；JS 启动失败时 HTML 加载层缺少退出机制。
- 未见图片懒加载、视频封面、离屏暂停逻辑；资源性能应通过测量判断。
- 首次扫描 public 共 30 个文件，约 26.5 MB；三个视频合计约 9.47 MB。这不是单次访问传输量。
- 所有页面与数据集中在 main.jsx，样式存在重复选择器和累积覆盖；不能因此直接重构。
- HTML 与 React 两套加载动画需要同步维护。
- 位置元组缺少显式字段语义，依赖范围与运行环境缺少固定约束。
- 无测试与 CI；缺少页面描述、分享元信息和详情页独立标题。
- 素材含多个历史版本，缺少用途清单；未引用不代表可删除。
- 历史部署记录存在过时信息，线上状态待核实。

首次扫描未发现显式 TODO/FIXME 注释，以上占位与问题构成实际待办。README 和长期交接文档已在 Phase 2 补建。

## 7. 高风险区域与维护规则

| 区域 | 风险与维护要求 |
| --- | --- |
| App 的 Hash 与 Effect | 页面切换、深链、返回、滚动与观察器互相影响，修改需覆盖这些场景 |
| fallback、Loader、appReady | 退出时序与导航/首屏动效耦合，不单独改一处便视为完成 |
| Hero / About 视频与遮罩 | 负边距、层级与渐变经过近期调优，保留现有视觉基线 |
| 全局 reveal 与卡片动画 | 影响多页面可见性，不能只检查一个区块 |
| VFX 案例文案 | 技术事实应与原项目一致，不虚构实现和验证结果 |
| 素材、锁文件、部署配置 | 不删除历史素材，不升级依赖，不自行切换发布方式 |

已确定的规则：

1. 不在此仓库开发 VFX Copilot 核心系统。
2. 不因看到单文件结构、重复样式或未使用素材而自行重构、清理或删除。
3. 保留现有 UI、视觉、页面结构和业务行为；只有明确任务要求的范围才能修改。
4. 不自行升级依赖、修改锁文件或部署配置；如后续任务需要，先明确任务范围。
5. 不手工修改 dist 代替源码修改，不把历史产物或日志当成本次验证。
6. 按阶段工作，每阶段结束更新本文并报告实际验证与遗留问题。
7. Phase 3 基线已获用户确认。Phase 4 仅授权修复导航遮挡和 AIGC 重复 key；不处理响应式、桌面溢出、内容占位、资源优化、Loader 架构或文件拆分，不升级依赖、不改部署配置。
8. Phase 4 完成后等待用户确认，不自动进入下一阶段。后续用户授权可以更新阶段范围，应同步记录。
9. 保持 Nav 位于区块层叠上下文之外，不重新嵌入 Hero；AIGC 项目使用固定唯一 id，不以重复标题或数组位置作为身份。

## 8. 当前开发状态

- 用户已确认 Phase 1 项目边界与 Phase 2 文档体系，README.md 和本文作为长期开发上下文。
- Phase 3 基线验收已获确认，历史问题与证据保留在 Phase 3 日志。
- Phase 4 已修复导航遮挡及重复 key，build 与限定范围回归通过；其余已知 Warning 保留。当前停止在修复报告交付，等待用户确认。
- 文档创建前 Git 工作区干净，源码基线为 `a1710ff`（Smooth about background transition）。
- 最近源码工作：2026-09-05 配置部署、标题和图标；2026-09-06 增加联系/简介视频并调整亮度与背景过渡。
- Phase 1 本地分支相对缓存的 origin/main 超前 1 个提交；没有 fetch，不能据此断言当前远端状态。
- Phase 4 已通过现有 build 重新生成 dist；CSS 产物哈希不变，JS 产物已包含两处修复。
- 历史 `work/deploy-state.md` 记录 Pages 部署缺少认证；后续存在 Wrangler 静态资源配置，实际平台、域名、线上版本待核实。
- Phase 4 仅修改 src/main.jsx 与本文，构建自动更新被忽略的 dist；未安装或升级依赖，未部署、提交或推送。README.md 与 docs/ 仍为未跟踪文件，本阶段没有代为提交。

## 9. 下一步任务（等待授权）

以下为建议顺序，不应自动执行：

1. 用户确认 Phase 4 报告并授权下一阶段范围。
2. 保留已通过的导航、稳定 key、尺寸及媒体回归基线；下一阶段由用户选择，不自动扩大修改范围。
3. 核实发布目标、线上版本和 Git 同步状态；核实不等于获得发布授权。
4. 重复 key 已修复；占位链接或联系方式行为只在后续明确授权时处理。
5. 根据用户提供的真实内容补齐作品与经历。
6. 保留桌面视觉基线，完成移动端和减少动画适配。
7. 根据实测优化图片、视频与首屏加载。
8. 补充必要的回归检查，再决定是否需要局部模块拆分。

## 10. 新 Codex 接管指南

1. 阅读 README.md 和本文件，先理解项目边界、维护规则、当前开发状态及最新开发日志。
2. 遵守当前用户要求与适用的 AGENTS.md；待办列表不是执行授权。若状态写明等待确认，先取得新的阶段任务。
3. 只读检查 `git status --short` 和最近提交，保护用户已有改动。不要自动 fetch、pull、push 或部署。
4. 使用 rg 定位当前任务相关符号，再读取必要源码：页面/交互看 main.jsx，视觉看 styles.css，加载入口看 index.html。只有任务涉及依赖或发布时才扩展检查对应配置。
5. 如文档与代码不一致，以实际代码说明现状并记录差异；不要通过修改代码强行匹配旧记录。
6. 在授权范围内进行最小修改和与风险匹配的验证，不重复全仓扫描，不自动大规模重构。
7. 阶段结束同步更新“当前功能/问题”“当前开发状态”“下一步任务”，追加开发日志。日期、修改文件、验证结果与遗留问题必须真实。
8. 向用户报告本阶段结果并遵循阶段边界；用户要求等待时不继续下一阶段。

可供新对话使用的接管提示：

> 这是已有的 ROYK 个人作品集网站。请先读取 README.md、docs/CODEX_HANDOFF.md 和本次任务相关源码，遵守维护规则。VFX Copilot 仅为案例展示。本次授权任务是：【填写任务和范围】。不要自动执行其他待办。

## 11. 开发日志

每完成一个开发阶段追加记录，不覆盖历史。更新旧结论时保留其历史背景，并在当前状态和新日志中说明。日志模板：

```text
### YYYY-MM-DD — Phase N：阶段名称
- 修改文件：
- 修改内容：
- 验证结果：（列出实际检查；未执行的构建/测试应明确说明）
- 遗留问题：
```

### 2026-09-11 — Phase 1：只读接管分析

- 修改文件：无。
- 修改内容：扫描自有源码、目录、配置、依赖锁文件、资源引用、历史日志与 Git 记录；输出接管报告，用户已确认项目边界。
- 验证结果：16 个源码静态资源引用均存在；扫描时 Git 工作区干净。没有执行构建、浏览器测试或线上核验。
- 遗留问题：内容占位、重复 key、小屏适配、资源加载及发布状态等，详见当前问题；VFX 核心源码不属于此仓库。

### 2026-09-11 — Phase 2：建立长期交接文档

- 修改文件：新增 `README.md`、`docs/CODEX_HANDOFF.md`。
- 修改内容：建立开发说明、项目边界、技术与目录说明、页面和模块记录、问题清单、维护规则、当前状态、后续建议、接管指南与日志模板。
- 验证结果：文档创建前确认两个目标文件不存在且 Git 工作区干净；交付检查确认仅新增两份文档、内部链接目标存在、必要章节齐全。未运行安装、构建、测试或部署，未修改任何现有源码与配置。
- 遗留问题：原有产品和工程问题保持不变；等待用户确认，不进入下一阶段。

### 2026-09-11 — Phase 3：当前版本基线验收

- 修改文件：仅更新 `docs/CODEX_HANDOFF.md`；现有 `pnpm build` 正常重新生成被 Git 忽略的 `dist/`。README.md 保持 Phase 2 内容，未修改源码、依赖、配置或 public 资源。
- 修改内容：记录真实构建、入口、导航、返回、媒体、控制台和不同尺寸测试结果；同步当前问题、状态与后续建议。没有实施任何问题修复。
- 验证结果：**可构建、主要内容可访问；存在 ERROR，不作为全项通过的发布验收。** 分类与证据如下。
- 遗留问题：about/contact 固定导航遮挡；React 重复 key 警告；平板/手机横向溢出及裁切；桌面轻微溢出；历史内容占位与部署状态仍未处理。等待用户确认。

#### 环境、Git 与构建

- 日期：2026-09-11，Asia/Shanghai。
- 源码基线：`a1710ff`，本阶段没有新提交。
- 开始时 `git status --short`：`?? README.md`、`?? docs/`，来自 Phase 2；受跟踪源码和配置无差异。交付前再次核对，相同文件范围，没有新增业务改动。
- 本机 Node：v24.19.0；pnpm：11.19.0。
- 执行命令：`pnpm build`。首次完成 1794 个模块转换后，在 `vite:prepare-out-dir` 清理 `dist/assets` 时出现 EPERM，退出码 1。
- 按权限流程获准在沙箱外重试同一命令，退出码 0，1794 个模块转换，构建耗时 1.21 秒。未修改配置、权限设置或依赖，也未手工删除目录。证据支持首次失败与受限执行环境有关，不是本次发现的源码编译错误。
- 产物：HTML 5.45 kB（gzip 1.54 kB）、CSS 27.78 kB（gzip 6.58 kB）、JS 215.46 kB（gzip 68.28 kB）。
- 生产验收服务：`pnpm preview --host 127.0.0.1 --port 4173 --strictPort`。
- React 警告补充检查：`pnpm dev --host 127.0.0.1 --port 5174 --strictPort`，打开 AIGC 页面。
- 浏览器：Codex 内置浏览器；桌面独立深链标签实测 1280×720，另以 1440×900 检查截图与导航；平板 768×1024，手机 390×844。
- 平板、手机为浏览器视口模拟，不代表 iOS/Android 真机、触摸或 Safari 验证；未检查线上部署、弱网或所有浏览器。临时视口覆盖已重置，测试标签已关闭。
- 测试结束已停止本阶段启动的 4173 预览服务和 5174 开发服务。

#### PASS：入口、返回和资源

| Hash | 桌面 | 平板 | 手机 | 说明 |
| --- | --- | --- | --- | --- |
| #home | PASS | PASS | PASS | 首页渲染，Loader 退出 |
| #about | PASS | PASS | PASS | 简介区块存在并定位；导航遮挡另列 ERROR |
| #projects | PASS | PASS | PASS | 作品区块存在并定位 |
| #strengths | PASS | PASS | PASS | 优势区块存在并定位 |
| #contact | PASS | PASS | PASS | 联系区块存在并定位；导航遮挡另列 ERROR |
| #aigc-concept | PASS | PASS | PASS | AIGC 列表渲染 |
| #vfx-copilot | PASS | PASS | PASS | 案例页渲染，图片正常 |

表中的 PASS 仅表示入口与内容渲染通过，不表示该尺寸视觉适配或所有交互通过。桌面七个入口使用独立 URL 标签验证初始深链；平板和手机逐个访问七个 Hash，并在平滑滚动完成后确认目标 top 为 0。没有把滚动中的瞬时位置误判为定位失败。

- 从桌面 home 首屏点击简历、作品集、优势、联系，Hash 均到达预期值；最终定位误差在约 1px 内。
- 实际点击首页 AIGC 作品卡片 → AIGC 列表 → VFX 案例，主浏览路径通过。
- 桌面、平板、手机实际点击“返回 AIGC 页面 / Back”和“返回作品集 / Back to Portfolio”，均到达对应 Hash。
- 桌面浏览器后退/前进可在 AIGC 与作品集间恢复对应 Hash。
- 稳定页面中 `.loader` 的 visibility 为 hidden，HTML `#preload-fallback` 已移除。等待工具曾超时，但后续独立读取确认 Loader 正常退出，未将工具等待超时作为网站错误。
- 首页人物、封面、Logo 与案例系统图/界面截图检查 `complete` 和 `naturalWidth`，未发现损坏图片。
- 三个 MP4 均 readyState 4、无 media error；在对应可见区块观察到 paused=false 和播放时间推进。离屏视频存在暂停，未将其视为资源故障。
- 16 个源码引用资源经本地 HTTP HEAD 检查全部 200，图片为 image/png、视频为 video/mp4；生产 JS/CSS 同样返回 200 且类型正确。
- 七个生产版独立标签的 warn/error 控制台记录均为空；本次观测未发现资源 404 或应用运行时异常。

#### WARNING：已知限制与非阻断问题

1. **React 重复 key**：开发版 `#aigc-concept` 实际输出 `Encountered two children with the same key`，key 为“项目名称待补充”。根因是两个占位条目共用 zh，并以 `key={project.zh}` 渲染。React 使用 console.error 输出；本报告按不阻止本次渲染的 React 警告分类为 WARNING，不声称控制台完全无错误级消息。
2. **平板与手机适配**：768px/390px 视口仍有 1024px 的最小内容宽度，部分首页状态 scrollWidth 达 1042px。截图确认标题、正文和导航裁切，页面存在横向滚动。此为已知 min-width 问题的实测确认，未修改。
3. **桌面轻微溢出**：1440px 视口观察到 scrollWidth 1443px；1280px 部分首页状态为 1283px（clientWidth 1265px）。截图可见横向滚动条，具体产生溢出的全部元素未进一步定位。
4. **构建环境**：沙箱内原命令出现 EPERM，获准沙箱外重试成功；保留环境限制记录，不能声称首次构建无错误。
5. **验收范围**：仅本机现有依赖、内置浏览器及视口模拟；没有进行真机、多浏览器、弱网、线上或完整性能验收。原有占位卡片和电话自链接仍存在。

#### ERROR：简介及联系区块遮住固定导航

- 复现（桌面 1440×900）：进入 `#home`，点击“简历 Resume”到 `#about`；导航不再正常显示，在原导航“作品集 Portfolio”位置点击不能切换 Hash。直接进入 `#contact` 或从 home 点击联系后同样存在遮挡。
- DOM 证据：导航仍为 position=fixed、opacity=1、visibility=visible；导航链接中心点的 `document.elementFromPoint` 命中对应 SECTION，而非 nav 后代。about 和 contact 均复现；projects/strengths 相同位置命中导航后代。
- 源码关联：Nav 在首页嵌套于 Hero，Hero 与后续 about/contact 存在独立层叠上下文（isolation）；现象与层叠覆盖一致。这是有源码支持的原因判断，本阶段没有修改验证修复方案。
- 影响：Hash 本身及直接访问正常，但用户进入简介/联系后不能继续通过被遮挡的固定导航操作。判为交互 ERROR，而非路由缺失或页面加载失败。
- 状态：仅记录，未修复。下一阶段是否处理及如何处理，等待用户授权。

### 2026-09-11 — Phase 4：确定性 Bug 修复

- 修改文件：`src/main.jsx`、`docs/CODEX_HANDOFF.md`；build 自动重新生成被 Git 忽略的 dist。
- 修改内容：将首页 Nav 移至 main 下，与 Hero/其他区块同级；为三个 AIGC 项目增加固定 id，列表 key 改用 id。源码 diff 为 5 行新增、2 行删除；没有修改 styles.css、显示文案、资源、依赖或部署配置。
- 验证结果：**本阶段 A/B 两个修复目标 PASS**，build 成功，桌面导航、案例入口、返回/历史导航、Loader、视频、图片和 Console 回归通过，资源检查无 404。详细证据如下。
- 遗留问题：手机/平板布局、桌面轻微溢出、内容占位等保持原状；没有顺手修复。限定回归范围内未发现新增问题，不代表多浏览器或真机全面验收。等待用户确认。

#### 根因与修改位置

1. **导航遮挡**：main.jsx 首页原本将 Nav 放在 Hero 内。运行时 Hero/about/contact 均为 position:relative、isolation:isolate、z-index:auto、overflow:hidden，且这些区块的 transform/filter 为 none。Nav 为 position:fixed、z-index:1000，但该数值只在 Hero 的独立层叠上下文内参与排序，后续 about/contact 上下文覆盖它。原链接中心点实际命中 about SECTION；about 视频和遮罩均 pointer-events:none，排除其直接截获点击。不是简单的 z-index 数字不足，也不是祖先 transform 改变 fixed 定位参照。
2. **导航修复**：main.jsx 的 App 首页返回分支（修复后约第 447 行），将 `<Nav />` 放在 Loader 之后、Hero 之前，成为 main 的直接子元素，与现有详情页结构一致。保留 Nav 的 position、transform、z-index 和全部 CSS，也保留区块 overflow/isolation 及视频/遮罩层级。这直接消除导航被困在 Hero 上下文的问题，不需要抬高极端 z-index 或改变区块排版。
3. **重复 key**：两个 AIGC 占位项目中文标题相同，旧的 `key={project.zh}` 因而冲突。
4. **key 修复**：main.jsx 的 aigcProjectFrames（约第 45 行）增加 `vfx-copilot`、`ai-workflow-study`、`visual-direction-study` 三个固定 id；AigcConceptPage 列表约第 180 行使用 `key={project.id}`。id 与标题、当前数组位置解耦，不改变显示内容，未来调整顺序/标题时保持 id。

#### build 与回归证据

- `pnpm build`：沙箱内首次在 dist/assets 清理时再次 EPERM；按权限流程获准沙箱外执行同一命令成功，退出码 0，1794 个模块转换，耗时 474ms。无依赖或配置调整。
- CSS：`index--sz56E8K.css`，27.78 kB，文件名哈希与 Phase 3 一致；JS：`index-XWI9d-P9.js`，215.53 kB（gzip 68.31 kB）。
- 桌面生产预览 1440×900：实际点击串联 about → contact → projects → strengths → home → about，所有目标 Hash 正确；每个区块全部六个导航链接中心点均命中自身或其子元素。AIGC 和 VFX 页面相同检查通过。邮件入口仅做命中检查，未发送邮件。
- 从首页滚动至页面底部，scrollY 750、1500、2250、3000、3750、4500、5250、5677 八个位置抽查，全部导航链接命中检查通过。
- 首页 → AIGC → VFX 入口、VFX 返回 AIGC、AIGC 返回作品集通过；浏览器后退恢复 AIGC 页面，前进恢复作品集。一次多步骤工具调用超时后，重新连接并单独验证历史导航成功，未将工具超时当作网站异常。
- 修复前后同一 1440×900 视口下，五个首页 section 的 width、height、文档 top 数值完全一致。导航 top=18、height=58、left=40、width≈1344.67，固定定位和 z-index=1000 不变；移开鼠标后的背景 rgba(3,4,5,0.38)、blur(18px)、999px 圆角与修复前一致。
- 已查看 Hero/About/Contact 截图，导航恢复在前景显示；区块、视频、遮罩和内容视觉未发现新增异常。视频为动态内容，本次不是固定帧像素差分。
- 刷新生产版后观察到 Loader 显示，后续 visibility=hidden、HTML fallback 已移除；开发版 Loader 同样正常退出。
- 首页图片及全部 VFX 案例截图 complete=true、naturalWidth>0；三个视频 readyState=4、无 media error，可见播放状态与时间正常；离屏暂停未作为错误。
- 16 个引用资源加生产 JS/CSS 共 18 个路径 HTTP HEAD 全部 200。
- 独立开发版 AIGC 初次加载及 home/about/contact/VFX/AIGC 往返后，warn/error 日志为空；生产版最终 warn/error 也为空。重复 key 警告已消失，未发现新增 Console error/warning 或资源 404。
- `git diff --check` 通过；Git 仅提示 Windows LF/CRLF 转换策略，不是应用警告。受跟踪源码仅 main.jsx 有差异，styles.css、依赖、配置及资源未变。
- 本阶段 4173 预览服务、5174 开发服务均已停止；测试标签关闭，临时视口已重置。未提交、推送或部署，等待用户确认。

### 2026-09-11 — Phase 5：响应式布局与横向溢出修复

- 修改文件：`src/styles.css`、`docs/CODEX_HANDOFF.md`；未修改 JSX、依赖、部署配置、内容或资源。
- 根因：全局及旧媒体规则强制 body `min-width`（1180/1024）；About/Contact 使用 viewport 宽度；窄屏仍使用固定列宽、间距和字号；VFX 思维导图设有 1536px 最小宽度；滚动显现的水平 transform 会在元素进入视口前扩大 scrollWidth。
- 修改区域：将基础 body 最小宽度设为 0；About/Contact 背景改用容器宽度；新增/补充 ≤1179px 与 ≤767px 断点，调整容器、导航、网格列数、字号、按钮、案例布局与思维导图；移动端取消 reveal 水平位移；最终使用 `html { overflow-x: clip; }` 作为已定位动画溢出的安全边界，不以其替代布局修复。
- Breakpoint：≥1180px 保留桌面基线；≤1179px 为平板布局；≤767px 为手机布局。
- 验证结果：生产 build 成功（沙箱内清理 dist 时仍受 EPERM，沙箱外重试成功）；768×1024、1024×768、430×932、390×844、375×812、360×800 首页已无水平滚动；手机主体宽度与视口一致。桌面 1920×1080 无溢出；1440/1280 的 scrollWidth 仍受历史 reveal/布局几像素影响，但 `overflow-x: clip` 已移除可见水平滚动条，未改动桌面排版。七个 Hash、案例内容、媒体和 Loader 的完整浏览器回归尚未在本阶段最终版逐一完成。
- 遗留问题：需在下一轮最终确认七个 Hash 的全部目标视口、导航点击、前进后退、Console、404、图片比例及 VFX 案例各模块；桌面 scrollWidth 数值仍需进一步定位，不能宣称桌面所有布局溢出已从 DOM 指标中完全消除。Phase 4 的导航层级和稳定 key 尚未发现回归，但仍需随完整回归复核。当前停止，等待用户确认。

### 2026-09-11 — Phase 5B：响应式最终回归与桌面溢出收尾（未闭环）

- 修改文件：仅 `src/styles.css` 与本交接文档。
- 根因定位：桌面约 18px scrollWidth 来自 `.revealRight` / `.revealLeft` 在进入视口前的水平 transform，实际元素右边界超过 viewport；1280 下同时受滚动条 clientWidth 影响。窄屏固定列宽和旧媒体 `body min-width` 已在 Phase 5 处理。
- 修改内容：为页面分区增加 `contain: paint`，限制 reveal 变换的绘制边界；保留 `html { overflow-x: clip; }` 作为安全边界。未修改 JSX、断点体系、文案或资源。
- 验证结果：最终 build 成功（1794 modules，退出码 0；CSS 31.66 kB）。之前 9 个尺寸测量已确认手机/平板主体无溢出；但本阶段浏览器会话在最终全量回归期间失效，无法凭证据宣称 1440/1280 scrollWidth 已达到 clientWidth 以下，也未完成七个 Hash、VFX、Console/404 和 Phase 4 的最终全量复核。
- 当前状态：**WARNING / 未完成，不可将 Phase 5 标记 DONE。** 下一次应先重新启动预览并建立新浏览器会话，逐尺寸、逐 Hash 完成验收；若 DOM scrollWidth 仍超出，再继续定位实际越界元素。不得把 `overflow-x: clip` 单独视为修复证据。

### 2026-09-11 — Phase 5C：响应式纯验证收尾

- 修改文件：仅本文档；源码未修改（NO）。
- 桌面溢出定位：1440×900 的稳定页面 `clientWidth=1425, scrollWidth=1425`；1280×720 为 `1265/1265`；1920×1080 为 `1905/1905`。越界扫描未发现稳定状态 DOM 元素。此前差值来自 reveal 水平 transform 的动画/初始态，分区 `contain: paint` 后被限制；`overflow-x: clip` 仍保留为安全边界。
- 九尺寸结果：1920、1440、1280、1024、768、430、390、375、360 均无可见水平滚动；各尺寸主体纵向可滚动。768×1024 扫描到一个右侧统计数字的绘制边界，但 document/body scrollWidth 仍等于 clientWidth，未形成滚动条。
- 七个 Hash：生产预览逐一直接访问并等待定位；`#home`、`#about`、`#projects`、`#strengths`、`#contact`、`#aigc-concept`、`#vfx-copilot` 全部 PASS。目标存在、定位接近 0、Loader hidden、固定导航可命中。此前 AIGC/VFX 返回路径和浏览器历史在 Phase 4 已通过，本阶段重新确认案例入口与页面可达。
- VFX 专项：1440×900、768×1024、390×844 均能渲染标题、Overview、Problem/Solution、系统架构、思维导图、Workflow、Features、截图、Challenges、Results/Future 和返回 AIGC；图片 naturalWidth 正常，案例页面 scrollWidth 等于 clientWidth，思维导图不再依赖 1536px min-width。返回作品集由全局导航可达。
- Phase 4 回归：About/Contact 上方导航点击命中 PASS；开发版 AIGC Console 无 duplicate key warning；生产/开发版未发现新增 error/warning；历史前进/后退链路保持通过。
- Console/Network：生产预览七入口控制台为空；开发版 AIGC 控制台为空。18 个 JS/CSS、图片和视频引用通过本地 HEAD 检查，全部 HTTP 200，无 404。
- Build：`pnpm build` PASS；沙箱内首次仍可能因 dist/assets EPERM，按既有安全流程沙箱外重试成功，1794 modules。
- 最终结论：**Phase 5 = DONE**。当前没有本阶段 WARNING/ERROR；历史内容占位、真机/多浏览器未测等项目级事项不属于本阶段阻塞项。Phase 6 不自动开始，等待用户确认。

### 2026-09-11 — Phase 6：作品集内容完善

- 原有缺口：AIGC 两个项目名称待补充；首页三个经历卡片为 Coming Soon；游戏特效和品牌设计没有真实详情页入口，点击后回到 `#projects`。
- 实际补充：将 AIGC 两个占位替换为“页小灵 / AI PPT Generator”和“AI 数字演员 / AI Digital Actor”，保留稳定 id、类型和状态字段；首页三个占位替换为项目实践条目：页小灵、AI 数字演员、UE5 红色枫叶刀光特效。
- 未补内容：没有新增游戏特效或品牌设计详情页，因为当前仓库没有对应真实详情内容；没有虚构公司、岗位、任职时间或客户信息；没有修改 VFX Copilot 文案、布局、图片或交互。
- 修改文件：`src/main.jsx`、本文档。未修改 CSS、依赖、部署配置或资源。
- 验证结果：`pnpm build` PASS（1794 modules，退出码 0；沙箱外执行以绕过已知 dist/assets EPERM）。未在本阶段重新执行完整浏览器七 Hash、Console、404 与三尺寸回归；Phase 5 已验收的响应式基线及 Phase 4 key/nav 修复未改动相关结构，但需要后续回归确认。
- 遗留问题：游戏特效、品牌设计仍是展示卡片而非详情页；AIGC 新项目目前只有现有标题/类型/状态展示，没有额外描述字段；首页项目实践条目没有时间和详细成果信息。Phase 7 不自动开始，等待用户确认。

### 2026-09-11 — 第二屏背景视频全屏修复

- 修改文件：`src/styles.css`。
- 根因：About 区域为全宽 section，但其视频和遮罩层使用 `width: 100%`，在带有大于 1700px 的左右内边距容器中，绝对定位背景层按内容包含块计算，导致超宽显示器两侧出现黑边。
- 修改内容：仅在 `min-width: 1180px` 桌面断点将 `.aboutVideo` 与 `.aboutShade` 恢复为 `width: 100vw`；平板和手机继续使用现有 `width: 100%` 响应式规则。
- 验证结果：`pnpm build` PASS；未修改页面结构、内容、断点体系、依赖或资源。尚未进行真实多显示器浏览器截图验收，下一次应重点检查 1920px 以上宽屏和 1440px 桌面。
- 遗留问题：等待用户确认第二屏背景在目标显示器上的实际全屏效果；本次未进入 Phase 7。
