"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  CircuitBoard,
  Mail,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import ThreeCanvas from "@/components/ui/ThreeCanvas";

const links = {
  github: "https://github.com/misbah-ullah01",
  linkedin: "https://www.linkedin.com/in/misbah-ullah01",
  mail: "mailto:misbahu094@gmail.com",
};

const chapters = [
  { label: "Opening", href: "#chapter-0" },
  { label: "Systems", href: "#chapter-1" },
  { label: "Projects", href: "#chapter-2" },
  { label: "Lab Notes", href: "#dld" },
  { label: "Skills", href: "#chapter-3" },
  { label: "Contact", href: "#chapter-4" },
];

const projects = [
  {
    code: "CASE 01",
    title: "PHANTASM",
    subtitle: "Blue-Green Deployment Visualizer",
    meta: "May 2026 / Project Lead & Backend Engineer",
    href: "https://github.com/misbah-ullah01/phantasm",
    tone: "deploy",
    stack: ["Docker", "GitHub Actions", "AWS EC2", "Terraform", "Nginx"],
    copy:
      "Zero-downtime deployment lab with two live app versions, weighted Nginx traffic, Docker Compose orchestration, Terraform IaC, and rollback-ready CI/CD.",
  },
  {
    code: "CASE 02",
    title: "EscapeQL",
    subtitle: "Security-flavored database project",
    meta: "University build / SQL + systems thinking",
    href: "https://github.com/misbah-ullah01/EscapeQL",
    tone: "security",
    stack: ["SQL", "DBMS", "Auth", "Data modeling"],
    copy:
      "A database-driven project shaped around query logic, constraints, and secure handling patterns. It fits the portfolio as the DBMS chapter in the systems arc.",
  },
  {
    code: "CASE 03",
    title: "ITNMS",
    subtitle: "Intelligent Transport Network Management System",
    meta: "Dec 2025 / Algorithms & custom data structures",
    href: "https://github.com/misbah-ullah01/ITNMS-GIKI-SEM3-project",
    tone: "network",
    stack: ["C++", "Graphs", "Heaps", "Hash Tables", "Dijkstra", "Prim"],
    copy:
      "A command-line city brain built without STL shortcuts: route search, MST planning, density analytics, and traversal tools over custom graph infrastructure.",
  },
  {
    code: "CASE 04",
    title: "Medical Scheduler",
    subtitle: "Multi-client TCP scheduling system",
    meta: "Apr 2025 / Networking project",
    href: "https://github.com/misbah-ullah01/medical-schedular",
    tone: "socket",
    stack: ["C++", "Winsock2", "TCP", "CMake", "Vigenere Cipher"],
    copy:
      "Patient, admin, and viewer modules talk over a raw socket server, with a custom credential encryption layer and concurrent workflow design.",
  },
  {
    code: "CASE 05",
    title: "Hybrid OTP Generator",
    subtitle: "Digital Logic Design hardware device",
    meta: "Dec 2025 / LFSR + Arduino",
    href: "#dld",
    tone: "hardware",
    stack: ["Arduino", "Flip-Flops", "XOR gates", "8-bit LFSR", "OTP"],
    copy:
      "A physical security device made from DLD fundamentals: flip-flops and XOR feedback produce pseudo-random 6-character OTPs through Arduino interfacing.",
  },
  {
    code: "CASE 06",
    title: "Gomodoro",
    subtitle: "Godot focus game",
    meta: "Game side quest / Godot Engine",
    href: "https://github.com/misbah-ullah01/gomodoro",
    tone: "game",
    stack: ["Godot", "Game loop", "Focus timer", "UX"],
    copy:
      "A playful productivity experiment that turns focus sessions into an interactive game rhythm instead of another plain timer utility.",
  },
];

const skillRows = [
  ["DevOps", "Docker", "GitHub Actions", "AWS EC2", "Terraform", "Nginx"],
  ["Systems", "C++", "C", "RISC-V", "CMake", "Linux"],
  ["Security", "PortSwigger", "SQLi", "XSS", "IDOR", "Incident Response"],
  ["Theory", "Automata", "DBMS", "DLD", "Graphs", "Algorithms"],
];

function useAnimeIntro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    animate(ref.current.querySelectorAll("[data-ink]"), {
      translateY: [18, 0],
      opacity: [0, 1],
      delay: (_el: Element, i: number) => i * 95,
      duration: 760,
      easing: "outExpo",
    });
  }, []);

  return ref;
}

function ActionLink({
  href,
  children,
  variant = "ink",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ink" | "paper";
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`comic-button ${variant === "paper" ? "comic-button-paper" : ""}`}
    >
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}

function ChapterRail({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  // Non-linear mapping: scroll positions → rail bar height positions
  // Each pair aligns a section's scroll offset with its dot's vertical position
  const height = useTransform(
    progress,
    [0, 0.10, 0.20, 0.46, 0.66, 0.82, 1],
    ["0%", "4%", "16%", "32%", "44%", "56%", "100%"]
  );

  return (
    <aside className="chapter-rail" aria-label="Page chapters">
      <motion.span className="chapter-progress" style={{ height }} />
      {chapters.map((chapter, index) => (
        <a key={chapter.label} href={chapter.href} className="chapter-dot">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{chapter.label}</strong>
        </a>
      ))}
    </aside>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.article
      className={`project-card ${project.tone}`}
      initial={{ opacity: 0, y: 40, rotate: index % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
    >
      <div className="project-card-top">
        <span>{project.code}</span>
        <a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          <Terminal size={18} aria-hidden="true" />
          <span className="sr-only">Open {project.title}</span>
        </a>
      </div>
      <h3>{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-copy">{project.copy}</p>
      <div className="project-stack">
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <footer>{project.meta}</footer>
    </motion.article>
  );
}

export default function Home() {
  const introRef = useAnimeIntro();
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const coverY = useTransform(scrollYProgress, [0, 0.25], [0, -90]);
  const coverRotate = useTransform(scrollYProgress, [0, 0.22], [0, -4]);

  return (
    <div ref={pageRef} className="portfolio-shell">
      <ThreeCanvas />
      <div className="paper-grain" aria-hidden="true" />
      <ChapterRail progress={scrollYProgress} />

      <header className="top-bar">
        <a className="brand-stamp" href="#chapter-0" aria-label="Misbah Ullah home">
          MU
        </a>
        <nav aria-label="Primary navigation">
          <a href="#chapter-2">Projects</a>
          <a href="#dld">DLD</a>
          <a href="#chapter-4">Contact</a>
        </nav>
      </header>

      <main>
        <section id="chapter-0" className="hero-page" ref={introRef}>
          <motion.div className="cover-card" style={{ y: coverY, rotate: coverRotate }}>
            <div className="cover-kicker" data-ink>
              <span>GIKI CS / DevOps / CyberSecurity / Networks</span>
              <span>Issue 2026</span>
            </div>
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="speech-strip" data-ink>
                  Scroll to inspect the build log
                </p>
                <h1 data-ink>
                  Misbah Ullah builds systems with a little cinematic voltage.
                </h1>
                <p className="hero-lede" data-ink>
                  Computer Science sophomore at GIKI turning cloud deployments,
                  C++ networks, hardware logic, and security labs into sharp,
                  demo-ready engineering stories.
                </p>
                <div className="hero-actions" data-ink>
                  <ActionLink href="#chapter-2">Open case files</ActionLink>
                  <ActionLink href={links.github} variant="paper">
                    GitHub
                  </ActionLink>
                </div>
              </div>

              <div className="portrait-panel" data-ink>
                <Image
                  src="/images/dp.jpg"
                  alt="Portrait of Misbah Ullah"
                  width={560}
                  height={700}
                  priority
                />
                <div className="impact-burst">
                  <Sparkles size={28} aria-hidden="true" />
                  <span>Creative Thinker and Problem Solver</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="chapter-1" className="chapter-section manifesto-section">
          <div className="section-title">
            <span>Chapter 02</span>
            <h2>Systems, staged like a presentation.</h2>
          </div>
          <div className="manifesto-grid">
            {[
              {
                icon: Workflow,
                title: "Deployment choreography",
                copy: "CI/CD, Docker, Terraform, Nginx, rollback logic, and AWS infrastructure treated as one visible system.",
              },
              {
                icon: RadioTower,
                title: "Networks with teeth",
                copy: "Raw TCP projects, graph-heavy transport routing, and CLI dashboards that prove the algorithms are alive.",
              },
              {
                icon: ShieldCheck,
                title: "Security instincts",
                copy: "Google Cybersecurity certified, PortSwigger workshop organizer, and comfortable around SQLi, XSS, IDOR, SSRF, Linux, and incident response.",
              },
              {
                icon: CircuitBoard,
                title: "Hardware logic",
                copy: "DLD work that leaves the simulator: flip-flops, XOR feedback, LFSRs, Arduino interfacing, and physical OTP output.",
              },
            ].map((item, index) => (
              <motion.article
                className="manifesto-card"
                key={item.title}
                initial={{ opacity: 0, x: index % 2 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <item.icon size={26} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="chapter-2" className="chapter-section projects-section">
          <div className="section-title wide">
            <span>Chapter 03</span>
            <h2>Case files from the university arc.</h2>
            <p>
              Real projects, framed as portfolio panels: cloud infrastructure,
              database work, custom data structures, sockets, hardware security,
              and a Godot side quest.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section id="dld" className="chapter-section dld-section">
          <div className="section-title">
            <span>Chapter 04</span>
            <h2>DLD evidence board.</h2>
          </div>
          <div className="dld-layout">
            <div className="dld-copy">
              <p className="caption-tag">Hybrid pseudo-random OTP generator</p>
              <h3>Flip-flops, XOR gates, LFSR logic, and Arduino output.</h3>
              <p>
                This project deserves a physical spotlight because it shows the
                bridge between theory and a device you can hold. The board
                implements an 8-bit LFSR and presents six-character OTPs through
                Arduino interfacing.
              </p>
              <div className="dld-stats">
                <span>8-bit LFSR</span>
                <span>6-char OTP</span>
                <span>Arduino Uno R3</span>
              </div>
            </div>
            <div className="dld-photos">
              {["IMG_150.jpg", "IMG_151.jpg", "IMG_152.jpg"].map((image, index) => (
                <motion.figure
                  key={image}
                  initial={{ opacity: 0, rotate: index === 1 ? 3 : -3, y: 30 }}
                  whileInView={{ opacity: 1, rotate: index === 1 ? 1.5 : -1.5, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <Image
                    src={`/images/projects/${image}`}
                    alt={`Digital logic design project photo ${index + 1}`}
                    width={520}
                    height={390}
                  />
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <section id="chapter-3" className="chapter-section skills-section">
          <div className="section-title">
            <span>Chapter 05</span>
            <h2>Skill inventory.</h2>
          </div>
          <div className="skill-board">
            {skillRows.map((row) => (
              <div className="skill-row" key={row[0]}>
                <strong>{row[0]}</strong>
                <div>
                  {row.slice(1).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="honors-strip">
            <span>Google Cybersecurity Professional Certificate</span>
            <span>ICPC Asia Topi Online Preliminary 2024 Honorable Mention</span>
            <span>NEXUS GIKI Tech Team: Web Exploitation workshop</span>
          </div>
        </section>

        <section id="chapter-4" className="final-section">
          <div className="final-panel">
            <div>
              <p className="caption-tag">Chapter 06</p>
              <h2>Bring a weird technical problem. I will make it explainable.</h2>
              <p>
                Open to internships, technical collaborations, DevOps/security
                experiments, and projects that need both engineering depth and
                a visual demo that people actually remember.
              </p>
            </div>
            <div className="contact-right">
              <div className="contact-portrait">
                <Image
                  src="/images/hero-portrait.jpg"
                  alt="Misbah Ullah"
                  width={280}
                  height={340}
                />
              </div>
              <div className="contact-actions">
                <ActionLink href={links.mail}>
                  <Mail size={18} aria-hidden="true" />
                  Email
                </ActionLink>
                <ActionLink href={links.linkedin} variant="paper">
                  <ArrowUpRight size={18} aria-hidden="true" />
                  LinkedIn
                </ActionLink>
                <ActionLink href={links.github} variant="paper">
                  <Terminal size={18} aria-hidden="true" />
                  GitHub
                </ActionLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Terminal size={18} aria-hidden="true" />
        <span>Misbah Ullah / Peshawar, Pakistan / GIKI Computer Science</span>
      </footer>
    </div>
  );
}
