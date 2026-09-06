import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Mail,
  Phone,
  CalendarDays,
} from 'lucide-react';
import './styles.css';

const projects = [
  {
    zh: '游戏特效与场景氛围',
    en: 'Game VFX Atmosphere',
    type: 'Game VFX / UE5',
    image: '/assets/cover-game-vfx.png',
    meta: 'UE5 / Niagara / Particles',
  },
  {
    zh: '品牌视觉识别与图形系统',
    en: 'Brand Identity System',
    type: 'Brand Design',
    image: '/assets/cover-brand-system.png',
    meta: 'Logo / Symbol / Identity',
  },
  {
    zh: 'AIGC 视觉概念实验',
    en: 'AIGC Visual Concept Study',
    type: 'AI Design / Visual Direction',
    image: '/assets/cover-aigc-study.png',
    meta: 'Stable Diffusion / Midjourney / Compositing',
    href: '#aigc-concept',
  },
];

const strengths = [
  ['视觉表达', 'Visual Expression', '扎实的画面构图、色彩控制、材质表达与视觉叙事能力。', 'Composition, color, material expression and visual storytelling.'],
  ['品牌系统搭建', 'Brand System', '理解品牌识别、符号延展、视觉规范与图形系统的统一表达。', 'Brand identity, symbol extension, visual rules and graphic systems.'],
  ['三维与渲染', '3D & Rendering', '学习并实践 C4D、Maya、材质表达、灯光控制与 UE5 场景表现。', '3D modeling, material expression, lighting control and UE5 scenes.'],
  ['AI 设计流程', 'AI Design Workflow', '使用 Stable Diffusion、Midjourney、Nano Banana 辅助概念探索与设计迭代。', 'Using generative tools for concept exploration and design iteration.'],
  ['软件技能', 'Software Skills', 'PS、AI、C4D、AE、Maya、ZBrush、RizomUV、PT、UE5。', 'Photoshop, Illustrator, C4D, After Effects, Maya, ZBrush, RizomUV, PT and UE5.'],
  ['AI工作流搭建', 'AI Workflow Building', '整合 Stable Diffusion、Midjourney、Nano Banana、ChatGPT，建立从调研、提示词、草图生成到视觉迭代的设计流程。', 'Building a workflow from research and prompting to concept generation and visual iteration.'],
];

const aigcProjectFrames = [
  {
    zh: 'VFX COPILOT',
    en: '面向 Unreal Engine 5 特效制作流程的 AI 技术规划系统',
    type: 'AIGC Concept / Visual Experiment',
    status: 'Unreal Engine 5 / AI Planning System',
    featured: true,
    href: '#vfx-copilot',
  },
  {
    zh: '项目名称待补充',
    en: 'Project Title To Be Added 02',
    type: 'AI Workflow / Image Iteration',
    status: 'Waiting for project files',
  },
  {
    zh: '项目名称待补充',
    en: 'Project Title To Be Added 03',
    type: 'Visual Direction / Concept Study',
    status: 'Waiting for project files',
  },
];

const vfxOverview = [
  ['Project Type', 'AI Technical Tool'],
  ['Platform', 'Web / UE5 Workflow'],
  ['Role', 'Product Design + AI Workflow + Frontend + Technical Planning'],
  ['Core Model', 'DeepSeek / Mock / OpenAI Provider abstraction'],
  ['Version', 'V1.0 Completed'],
  ['Output', 'UE5 Handoff Package JSON'],
];

const vfxWorkflow = [
  'Describe visual intent',
  'Generate AI Candidate',
  'Normalize structured schema',
  'Validate timeline, material and Niagara',
  'Apply to active VFX plan',
  'Implement and export handoff JSON',
];

const vfxFeatures = [
  ['AI Planner', 'Prompt, provider, generated candidate, validation summary and Apply flow.'],
  ['Timeline Breakdown', 'Layer timing, phase structure, purpose and intensity planning.', '/assets/vfx-copilot/timeline.png'],
  ['Material Graphs', 'Semantic feature set, dynamic parameters and node strategy.', '/assets/vfx-copilot/material-graphs.png'],
  ['Niagara Systems', 'Emitter, module, renderer and verification planning.', '/assets/vfx-copilot/niagara-systems.png'],
  ['Validation Engine', 'Pass / Warning / Error / Verify status for production handoff.', '/assets/vfx-copilot/validation.png'],
  ['Asset Planner', 'Required assets, optional assets, reuse groups, blockers and procedural alternatives.', '/assets/vfx-copilot/asset-planner.png'],
];

const vfxChallenges = [
  ['AI 输出不可靠', 'Strict Schema Boundary + Parser + Normalizer.'],
  ['Candidate 与 ActivePlan 混乱', 'Generate 和 Apply 分离，建立单一 source of truth.'],
  ['Material / Niagara 命名不一致', 'Shared Material Name Resolver.'],
  ['自然语言 Motion 映射复杂', 'Niagara Semantic Mapping.'],
  ['Trail 与 lightning 语义覆盖', 'Structural Semantic First and Dynamic Parameter contract.'],
];

const vfxResults = [
  '完成 Natural Language 到 Structured VFX Plan 的闭环',
  '建立 Material / Niagara Semantic Mapping',
  '加入 Cross-System Validation',
  '输出 Implementation + Asset Planning',
  '支持 vfx-copilot-handoff-v1 JSON',
  '完成 DeepSeek API 回归与 V1 Final QA',
];

function BilingualTitle({ zh, en }) {
  return (
    <>
      <span className="zh">{zh}</span>
      <span className="en">{en}</span>
    </>
  );
}

function Loader({ loading }) {
  return (
    <div className={`loader ${loading ? '' : 'loaderHidden'}`} aria-hidden={!loading}>
      <div className="bootConsole">
        <div className="bootRings" />
        <div className="loaderMark" />
        <div className="bootScan" />
      </div>
      <p>ROYK</p>
      <div className="bootStatus">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <a className="brand" href="#home" aria-label="Back to home">
        <img className="brandMark" src="/assets/logo-mark-white.png" alt="ROYK Logo" />
        <span className="brandLetters">ROYK</span>
      </a>
      <div className="navLinks">
        <a href="#about"><BilingualTitle zh="简历" en="Resume" /></a>
        <a href="#projects"><BilingualTitle zh="作品集" en="Portfolio" /></a>
        <a href="#strengths"><BilingualTitle zh="优势" en="Skills" /></a>
        <a href="#contact"><BilingualTitle zh="联系" en="Contact" /></a>
      </div>
      <a className="contactBtn" href="mailto:3565945197@qq.com">Get Started</a>
    </nav>
  );
}

function AigcConceptPage() {
  return (
    <section className="detailPage aigcConceptPage" id="aigc-concept">
      <div className="detailHero reveal revealUp">
        <p className="eyebrow">AI Design / Visual Direction</p>
        <h1>
          <span>AIGC 视觉概念实验</span>
          <span>AIGC Visual Concept Study</span>
        </h1>
        <p>
          使用生成式工具进行概念探索、视觉方向推演与设计迭代。
          Building visual concepts through generative exploration and structured iteration.
        </p>
        <a className="detailBack" href="#projects">返回作品集 / Back to Portfolio <ArrowUpRight size={18} /></a>
      </div>
      <div className="detailProjectStack">
        {aigcProjectFrames.map((project, index) => (
          <a
            className={`detailProjectFrame reveal ${project.featured ? 'featuredFrame' : ''} ${index % 2 === 0 ? 'revealLeft' : 'revealRight'}`}
            href={project.href || '#aigc-concept'}
            key={project.zh}
            style={{ '--delay': `${index * 120}ms` }}
          >
            <div className="detailFrameMain">
              <span>{project.type}</span>
              <h2>{project.zh}</h2>
              <p>{project.en}</p>
            </div>
            <div className="detailFrameMeta">
              <small>{project.status}</small>
              <ArrowUpRight size={22} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function VfxCopilotPage() {
  return (
    <section className="vfxCasePage" id="vfx-copilot">
      <div className="vfxHero reveal revealUp">
        <p className="eyebrow">AI × Unreal Engine 5 × VFX Technical Planning</p>
        <h1>VFX COPILOT</h1>
        <h2>AI-Powered UE5 VFX Technical Planning System</h2>
        <p>
          将自然语言特效创意转化为结构化、可验证、可交付的 UE5 技术方案。
          Turn visual intent into structured, validated, production-ready UE5 VFX plans.
        </p>
        <div className="vfxHeroActions">
          <a className="detailBack" href="#aigc-concept">返回 AIGC 页面 / Back <ArrowUpRight size={18} /></a>
          <span>V1.0 / Completed</span>
        </div>
      </div>

      <div className="vfxCaseWrap">
        <section className="vfxIntroGrid reveal revealUp">
          <div>
            <span className="caseKicker">Project Overview</span>
            <h3>面向 UE5 特效制作流程的 AI 技术规划系统</h3>
            <p>
              VFX Copilot 将自然语言技能描述转换为结构化 VFX Plan，并进一步完成 Timeline 拆解、
              Material / Niagara 技术策略、跨系统 Validation、Implementation Plan、Asset Planning
              与 UE5 Handoff JSON 输出，帮助特效师更高效地完成从视觉创意到技术实现的前期规划。
            </p>
            <blockquote>
              AI does not replace the VFX artist. It removes the friction between visual intent and technical execution.
            </blockquote>
          </div>
          <div className="vfxOverviewCards">
            {vfxOverview.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="caseSection reveal revealUp">
          <div className="caseSectionHead">
            <span>Problem / Solution</span>
            <h3>从视觉想法到技术实现，中间缺少结构化桥梁。</h3>
          </div>
          <div className="caseTwoCol">
            <article>
              <h4>Problem</h4>
              <p>
                游戏特效创意通常来自视觉语言，但 UE5 落地需要 Timeline、Layer、Material、
                Niagara、Renderer、Dynamic Parameter 与 Asset 等技术链路。真正困难的不是描述效果，
                而是把想法系统拆成可执行、可验证、可交接的技术方案。
              </p>
            </article>
            <article>
              <h4>Solution</h4>
              <p>
                VFX Copilot 作为 Technical Copilot，围绕 Describe → Generate → Normalize →
                Validate → Apply → Implement → Export 建立完整流程，负责理解、拆解、校验、规划与交付。
              </p>
            </article>
          </div>
        </section>

        <section className="caseSection mindMapSection reveal revealUp">
          <div className="caseSectionHead">
            <span>Project Mind Map</span>
            <h3>VFX Copilot V1 项目系统图</h3>
          </div>
          <a className="mindMapFrame" href="/assets/vfx-copilot/mind-map.png" target="_blank" rel="noreferrer">
            <img src="/assets/vfx-copilot/mind-map.png" alt="VFX Copilot 项目思维导图" />
          </a>
        </section>

        <section className="caseSection reveal revealUp">
          <div className="caseSectionHead">
            <span>System Architecture</span>
            <h3>AI Planner 到 UE5 Handoff 的结构化系统架构</h3>
          </div>
          <div className="architectureFlow">
            {['User VFX Intent', 'AI Planner', 'Structured Schema', 'Parser / Normalizer', 'Semantic Mapping', 'Validation Engine', 'Active VFX Plan', 'Implementation Bridge', 'UE5 Handoff Package'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="caseSection reveal revealUp">
          <div className="caseSectionHead">
            <span>Core Workflow</span>
            <h3>从 Prompt 到可交付 JSON 的核心使用流程</h3>
          </div>
          <div className="workflowSteps">
            {vfxWorkflow.map((step, index) => (
              <div key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="caseSection reveal revealUp">
          <div className="caseSectionHead">
            <span>Product Experience</span>
            <h3>产品界面与功能模块</h3>
          </div>
          <article className="aiPlannerShowcase">
            <div>
              <span>01 / Core Workspace</span>
              <h4>AI Planner</h4>
              <p>Prompt, provider, generated candidate, validation summary and Apply flow.</p>
            </div>
            <img src="/assets/vfx-copilot/ai-planner.png" alt="VFX Copilot AI Planner 产品界面" />
          </article>
          <div className="featureMatrix">
            {vfxFeatures.slice(1).map(([title, body, image]) => (
              <article key={title}>
                <div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
                <img src={image} alt={`VFX Copilot ${title} 产品界面`} />
              </article>
            ))}
          </div>
        </section>

        <section className="caseSection reveal revealUp">
          <div className="caseSectionHead">
            <span>Technical Logic</span>
            <h3>Semantic Intelligence + Validation Engine</h3>
          </div>
          <div className="caseTwoCol">
            <article>
              <h4>Material + Niagara Semantic Mapping</h4>
              <p>
                系统将 Trail、Slash、Lightning、Shockwave、Decal 等视觉语义映射为 Material
                与 Niagara 的技术策略，并对无法自动确认的高级行为标记 Needs Verification。
              </p>
            </article>
            <article>
              <h4>Validation Engine</h4>
              <p>
                通过 PASS、WARNING、ERROR、VERIFY 四类状态检查 Material Binding、Dynamic Parameter、
                Particle Lifetime、Timeline gap / overlap 等关键问题。
              </p>
            </article>
          </div>
        </section>

        <section className="caseSection reveal revealUp">
          <div className="caseSectionHead">
            <span>Challenges</span>
            <h3>关键技术难点与修正方式</h3>
          </div>
          <div className="challengeList">
            {vfxChallenges.map(([problem, fix]) => (
              <article key={problem}>
                <h4>{problem}</h4>
                <p>{fix}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="caseSection finalCaseSection reveal revealUp">
          <div>
            <span className="caseKicker">Result / Future</span>
            <h3>V1 完成从规划到交付的闭环，V2 将走向执行桥接。</h3>
            <p>
              V1 的目标不是直接生成 .uasset，而是形成清晰可靠的 Technical Handoff Package。
              V2 将继续探索 UE5 Execution Bridge、Editor Plugin、Handoff JSON Importer、
              Reference Image Input、团队协作与实时 Preview。
            </p>
          </div>
          <div className="resultList">
            {vfxResults.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>
      </div>
    </section>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || '#home');

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2800);
    const fallback = document.getElementById('preload-fallback');
    if (fallback) {
      fallback.style.opacity = '0';
      fallback.style.transition = 'opacity 0.45s ease';
      window.setTimeout(() => fallback.remove(), 480);
    }
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash || '#home');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('isVisible');
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [currentHash]);

  useEffect(() => {
    if (loading) return;
    const targetId = currentHash.replace('#', '') || 'home';
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ block: 'start' });
    }
  }, [currentHash, loading]);

  const isAigcPage = currentHash === '#aigc-concept';
  const isVfxPage = currentHash === '#vfx-copilot';

  if (isAigcPage || isVfxPage) {
    return (
      <main className={loading ? 'appLoading' : 'appReady'}>
        <Loader loading={loading} />
        <Nav />
        {isVfxPage ? <VfxCopilotPage /> : <AigcConceptPage />}
      </main>
    );
  }

  return (
    <main className={loading ? 'appLoading' : 'appReady'}>
      <Loader loading={loading} />
      <section className="hero" id="home">
        <video className="heroVideo" autoPlay muted loop playsInline>
          <source src="/assets/hero-robot.mp4" type="video/mp4" />
        </video>
        <div className="heroShade" />
        <Nav />

        <div className="heroInner robotHeroInner">
          <div className="heroCopy">
            <p className="eyebrow">Portfolio 2026 / Visual Design / AI Design / Game VFX</p>
            <h1>
              <span>Next Layer</span>
              <span>of Visual</span>
              <span>Intelligence</span>
            </h1>
            <p className="heroText">
              <span>以视觉表达为核心，连接品牌识别、AIGC 设计与游戏特效工作流。</span>
              <span>Building restrained, sharp and future-facing visual systems across brand, AI and VFX.</span>
            </p>
            <div className="heroActions">
              <a href="#projects">查看作品 / View Works <ArrowUpRight size={18} /></a>
              <a className="ghostLink" href="#about">了解经历 / About Me</a>
            </div>
          </div>
        </div>
      </section>

      <section className="about pageSection" id="about">
        <div className="workHeader reveal revealDown">
          <h2>WORK EXPERIENCE</h2>
          <p>个人简介 / Personal Profile</p>
        </div>
        <div className="workIntro">
          <div className="characterFrame reveal revealLeft" style={{ '--delay': '80ms' }}>
            <img src="/assets/character-current-clean.png" alt="胡翌辉人物形象" />
          </div>
          <div className="workContent reveal revealRight" style={{ '--delay': '180ms' }}>
            <p className="eyebrow">About ROYK Hu</p>
            <h3>Hi, I am 胡翌辉!</h3>
            <p>
              视觉传达设计本科在读，未来就业方向聚焦视觉设计师、AI 设计师、品牌设计师与游戏特效师。
              我正在建立从视觉审美、品牌识别、AIGC 生成式工作流到 UE5 特效表现的综合能力。
            </p>
            <p className="enText">
              A visual communication design student building a workflow across visual design, brand identity, AI-generated design and game VFX.
            </p>
            <div className="infoStrip">
              <div><span>专业方向</span><strong>视觉设计 / AI设计 / 品牌设计 / 游戏特效</strong></div>
              <div><span>软件工具</span><strong>PS / AI / C4D / AE / Maya / UE5</strong></div>
              <div><span>联系方式</span><strong>3565945197@qq.com</strong></div>
              <div><span>所在地</span><strong>河南信阳 / Xinyang, Henan</strong></div>
            </div>
            <div className="workStats">
              <div><strong>10+</strong><span>核心软件与工具 / Tools</span></div>
              <div><strong>4</strong><span>目标就业方向 / Directions</span></div>
              <div><strong>1</strong><span>省级奖项 / Award</span></div>
            </div>
          </div>
        </div>
        <div className="experienceCards">
          <article className="experienceCard active reveal revealUp" style={{ '--delay': '80ms' }}>
            <span>2026.07 - 2026.09</span>
            <h3>重庆沐晨人工智能科技有限公司</h3>
            <p>AI训练师 / AI Trainer</p>
          </article>
          <article className="experienceCard empty reveal revealUp" style={{ '--delay': '160ms' }}>
            <span>Coming Soon</span>
            <h3>项目经历待补充</h3>
            <p>Experience to be added</p>
          </article>
          <article className="experienceCard empty reveal revealUp" style={{ '--delay': '240ms' }}>
            <span>Coming Soon</span>
            <h3>项目经历待补充</h3>
            <p>Experience to be added</p>
          </article>
          <article className="experienceCard empty reveal revealUp" style={{ '--delay': '320ms' }}>
            <span>Coming Soon</span>
            <h3>项目经历待补充</h3>
            <p>Experience to be added</p>
          </article>
        </div>
      </section>

      <section className="projects pageSection" id="projects">
        <div className="workHeader projectHeader reveal revealDown">
          <h2>PORTFOLIO & AIGC PRACTICE</h2>
          <p>作品集与AIGC实践 / Portfolio & AIGC Practice</p>
        </div>
        <div className="showcaseList">
          {projects.map((project, index) => (
            <a
              className={`showcaseItem reveal ${index % 2 === 0 ? 'revealLeft' : 'revealRight'}`}
              href={project.href || '#projects'}
              key={project.zh}
              style={{ '--delay': `${index * 120}ms` }}
            >
              <div className="showcaseMedia">
                <img src={project.image} alt={project.zh} />
                <div className="mediaRail">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="showcaseInfo">
                <span>{project.type}</span>
                <h3>{project.zh}</h3>
                <p>{project.en}</p>
                <div className="showcaseLine" />
                <small>{project.meta}</small>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="strengths pageSection" id="strengths">
        <div className="workHeader projectHeader reveal revealDown">
          <h2>CORE STRENGTHS</h2>
          <p>个人优势 / Core Strengths</p>
        </div>
        <div className="strengthGrid">
          {strengths.map(([zh, en, bodyZh, bodyEn], index) => (
            <article className="strengthCard reveal revealScale" key={zh} style={{ '--delay': `${index * 80}ms` }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3><BilingualTitle zh={zh} en={en} /></h3>
              <p>{bodyZh}</p>
              <p className="enText">{bodyEn}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contactClose" id="contact">
        <video className="contactVideo" autoPlay muted loop playsInline>
          <source src="/assets/contact-bg.mp4" type="video/mp4" />
        </video>
        <div className="contactShade" />
        <div className="reveal revealUp">
          <p className="eyebrow">Available for design collaboration</p>
          <h2>
            <span>让视觉更有辨识度，也更接近未来。</span>
            <span>Make visual identity sharper and closer to the future.</span>
          </h2>
          <div className="closeLinks">
            <a href="#contact" aria-label="Phone contact"><Phone size={18} /></a>
            <a href="mailto:3565945197@qq.com"><Mail size={18} />3565945197@qq.com</a>
            <span><CalendarDays size={18} />微信 / WeChat ROYK535676</span>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
