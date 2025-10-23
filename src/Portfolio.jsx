import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu, X, ArrowRight, Mail, UserRound,
  Github, Linkedin, Instagram,
  Phone, MapPin, Sparkles, Code, Server, Cloud, CheckCircle2, Send
} from "lucide-react";
import { image } from "framer-motion/client";



// motion helpers
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" }
};

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Count-up for stats
function CountUp({ to = 0, suffix = "" }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    let raf, start;
    const dur = 1200; // ms
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n}{suffix}</span>;
}

/** Helper UI bits */
const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="container py-16 md:py-24 scroll-mt-24">
    {title && (
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          <span className="text-[var(--color-text)]">{title.split(" ")[0]} </span>
          <span
            className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-transparent"
          >
            {title.split(" ").slice(1).join(" ")}
          </span>
        </h2>
        {subtitle && (
          <p className="mt-4 text-[color:rgba(var(--color-muted))] max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    )}
    {children}
  </section>
);

const Card = ({ children, depth = 1 }) => (
  <div
    className={
      depth === 2
        ? "rounded-2xl bg-[--color-surface-2] border border-[color:var(--color-border)] p-6 shadow-[var(--shadow-soft)]"
        : "rounded-2xl bg-[--color-surface] border border-[color:var(--color-border)] p-6 shadow-[var(--shadow-soft)]"
    }
  >
    {children}
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border)] px-3 py-1 text-xs md:text-sm bg-[--color-surface]">
    {children}
  </span>
);
function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  const links = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  // helper for classes
  const cx = (...a) => a.filter(Boolean).join(" ");

  // highlight active section while scrolling
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { threshold: 0.2, rootMargin: "0px 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // lock body when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-[color:rgba(12,12,35,.55)] backdrop-blur border-b border-[color:var(--color-border)]">
      <div className="container h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="font-extrabold tracking-tight text-white text-[clamp(1.15rem,1.7vw,1.35rem)]"
          aria-label="Go to top"
        >
          Pratyush
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            const id = l.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={cx(
                  "relative transition text-[clamp(.98rem,1.05vw,1.08rem)]",
                  "text-[color:rgba(var(--color-muted))] hover:text-white",
                  "after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:rounded-full after:opacity-0",
                  "after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-[var(--color-accent-2)] hover:after:opacity-100",
                  isActive && "text-white after:opacity-100"
                )}
              >
                {l.label}
              </a>
            );
          })}
          <a
            href="/PratyushRajShrestha.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2
                       text-[clamp(.92rem,1vw,1rem)]
                       border border-[color:var(--color-border)]
                       bg-[--color-surface] hover:bg-[--color-surface-2]"
          >
            Resume <ArrowRight className="h-4 w-4" />
          </a>
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[color:var(--color-border)]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-[color:var(--color-border)] bg-[--color-surface]">
          <div className="container py-3 flex flex-col gap-1.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base hover:bg-[--color-surface-2]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/PratyushRajShrestha.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 mt-1 text-base border border-[color:var(--color-border)] bg-[--color-surface-2]"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


/** Main page */
export default function Portfolio() {
  // ---- Edit these with your real links ----
  const LINKS = {
    email: "pratyush.8719@gmail.com",
    phone: "+977 9808218719",
    location: "Jhamsikhel, Lalitpur",
    Github: "https://github.com/Pratyushrajshrestha",
    linkedin: "https://www.linkedin.com/in/pratyush-raj-shrestha-224950317/",
    Instagram: "https://www.instagram.com/pratyush_shr_/",
  };

  // Hero metrics 
  const STATS = [
    { k: "2+", label: "Years Experience" },
    { k: "5+", label: "Projects Completed" },
    // { k: "100%", label: "Client Satisfaction" },
  ];

  // Skills buckets
  const SKILLS = {
    "🎨 Frontend Development": [
      "HTML5",
      "Canva / Figma",
      "Tailwind CSS",
      "JavaScript",
      "React",
    ],
    "⚙️ Backend Development": [
      "C",
      "C++",
      "Python",
      "Streamlit",
      "Node.js (beginner)",
    ],
    "☁️ Cloud, DevOps & Tools": [
      "Git & GitHub",
      "SEO",
      "Digital Marketing",
      "Stremlit Cloud",
      "Facebook Ads Manager",
    ],
    "🛠 Other Skills": [
      "Advertisement Designing",
      "Problem Solving",
      "Data Visualization(Slack / Discord)",
    ],
  };


  // Projects (add your real ones)
  const PROJECTS = [
    {
      status: "Completed",
      title: "Weather App",
      blurb:
        "A simple weather app built with Python and Streamlit that shows real-time weather for any city using the Open-Meteo API.",
      demo: "https://weather-prs.streamlit.app",        
      github: "https://github.com/Pratyushrajshrestha/Weather-app", // 
      image: "weather.png",                    
    },
    {
      status: "Completed",
      title: "Expense Tracker App",
      blurb:
        "Built with Streamlit and Pandas — helps you log daily expenses, view spending by category or month, and download reports easily.",
      demo: "https://expense-tracker-prs.streamlit.app/",
      github: "https://github.com/Pratyushrajshrestha/Expense-Tracker",
      image: "expense-tracker.png"
      
    },
    {
      status: "In Progress",
      title: "Marble & Tiles Business Website",
      blurb:
        "A responsive React-based website for showcasing marble, tile, and sanitary products. Designed with SEO optimization for better customer reach.",
      image: "website.png"
    },
  ];

  return (
    <div className="min-h-screen text-[color:rgb(var(--color-text))] bg-[--color-bg]">
      <Header />   {/* ← new navbar */}
      {/* HERO */}
      <div id="home" className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <h1
              className="
    font-black tracking-tight text-white leading-[1.06]
    text-[clamp(2.4rem,5.4vw,4.6rem)]
  "
            >
              <span className="block">Pratyush Raj</span>
              <span className="block bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]
                   bg-clip-text text-transparent gradient-shimmer">
                Shrestha
              </span>
            </h1>

            <p className="mt-3 text-base md:text-lg text-[color:rgba(var(--color-muted))]">
              Computer Science Student | Exploring Web & Software Development
            </p>

            <p className="mt-4 text-[color:rgba(var(--color-muted))]">
              Exploring AI, Data Analysis & Digital Marketing to empower business growth by turning data into insights, technology into solutions, and strategies into real results.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium text-black
                     bg-[var(--color-accent)] transition"
              >
                View My Work →
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium border
                     border-[color:var(--color-border)]
                     bg-[--color-surface] hover:bg-[--color-surface-2] transition"
              >
                Let’s Connect
              </motion.a>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-3xl">
              {STATS.map((s, i) => {
                // handle "3+", "15+", "100%" cases
                let node = s.k;
                if (typeof s.k === "string") {
                  if (s.k.endsWith("+")) {
                    const base = parseInt(s.k);
                    node = <><CountUp to={base} /><span>+</span></>;
                  } else if (s.k.endsWith("%")) {
                    const base = parseInt(s.k);
                    node = <><CountUp to={base} suffix="%" /></>;
                  }
                }

                return (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-[--color-surface] border border-[color:var(--color-border)] p-4 card-lift"
                  >
                    <div className="text-xl md:text-2xl font-extrabold">{node}</div>
                    <div className="text-xs md:text-sm text-[color:rgba(var(--color-muted))]">{s.label}</div>
                  </div>
                );
              })}
            </div>

          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="relative flex justify-center md:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="floaty relative h-[340px] w-[340px] md:h-[420px] md:w-[420px] rounded-full p-[3px]
             bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
            >
              <img
                src="/me.jpg"
                alt="Portrait"
                loading="eager"
                decoding="async"
                className="h-full w-full rounded-full object-cover border-4 border-[--color-bg]"
              />
              <div className="absolute inset-0 blur-2xl -z-10 bg-gradient-to-r from-[var(--color-accent)]/25 to-[var(--color-accent-2)]/25 rounded-full" />
            </motion.div>

          </motion.div>
        </div>
      </div>


      {/* ABOUT */}
      <Section
        id="about"
        title="About Me"
        subtitle="A passionate developer with a love for creating innovative solutions and pushing the boundaries of what's possible with technology."
      >
        <div className="grid md:grid-cols-3 gap-5">
          <Card depth={2}>
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-[var(--color-accent)]" />
              <div>
                <h3 className="font-semibold mb-1">My Journey</h3>
                <p className="text-sm text-[color:rgba(var(--color-muted))]">
                  From curiosity to commitment—crafting solutions that make a real impact with a
                  strong focus on user experience and clean architecture.
                </p>
              </div>
            </div>
          </Card>
          <Card depth={2}>
            <div className="flex items-start gap-3">
              <Code className="h-5 w-5 text-[var(--color-accent)]" />
              <div>
                <h3 className="font-semibold mb-1">Technical Excellence</h3>
                <p className="text-sm text-[color:rgba(var(--color-muted))]">
                  Proficient in modern web technologies with best practices, testing, and performance in mind.
                </p>
              </div>
            </div>
          </Card>
          <Card depth={2}>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" />
              <div>
                <h3 className="font-semibold mb-1">Problem Solver</h3>
                <p className="text-sm text-[color:rgba(var(--color-muted))]">
                  Able to break complex challenges into manageable steps and ship reliably.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* SKILLS */}
      <Section
        id="skills"
        title="My Skills"
        subtitle="A comprehensive toolkit of technologies and methodologies I use to bring ideas to life."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {Object.entries(SKILLS).map(([bucket, items]) => (
            <Card key={bucket}>
              <div className="flex items-center gap-2 mb-3">
                {bucket.includes("Frontend") && <UserRound className="h-5 w-5 text-[var(--color-accent)]" />}
                {bucket.includes("Backend") && <Server className="h-5 w-5 text-[var(--color-accent)]" />}
                {bucket.includes("Cloud") && <Cloud className="h-5 w-5 text-[var(--color-accent)]" />}
                <h4 className="font-semibold">{bucket}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((i) => (
                  <Pill key={i}>{i}</Pill>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section
        id="projects"
        title="Featured Projects"
        subtitle="A showcase of recent work across various technologies and domains."
      >
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <Card key={p.title}>
              {/* Thumbnail */}
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-[16/7]">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/20 to-[var(--color-accent-2)]/20" />
                    <span className="relative z-10 text-6xl font-black text-white/10 select-none">
                      {p.title?.charAt(0) ?? "–"}
                    </span>
                  </div>
                )}
              </div>

              {/* Header row */}
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{p.title}</h4>
                <span className="text-xs rounded-full px-2 py-1 border border-[color:rgb(var(--color-border))]">
                  {p.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[color:rgb(var(--color-muted))]">
                {p.blurb}
              </p>

              {/* CTAs */}
              {(p.demo || p.github) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium
                           text-black bg-[var(--color-accent)] hover:opacity-90"
                    >
                      Live Demo →
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium
                           border border-[color:rgb(var(--color-border))] bg-[--color-surface] hover:bg-[--color-surface-2]"
                    >
                      Code on GitHub
                    </a>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </Section>


      {/* CONTACT */}
      <Section id="contact" title="Get In Touch">
        <div className="grid md:grid-cols-2 gap-6">
          <Card depth={2}>
            <h4 className="font-semibold mb-2">Let’s Connect</h4>
            <p className="text-sm text-[color:rgba(var(--color-muted))] mb-4">
              I’m always open to discussing opportunities, interesting projects, or a friendly chat.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[var(--color-accent)]" />
                <a href={`mailto:${LINKS.email}`} className="hover:underline">
                  {LINKS.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--color-accent)]" />
                <span>{LINKS.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                <span>{LINKS.location}</span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={LINKS.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-full p-2 border border-[color:var(--color-border)] hover:bg-[--color-surface]"
                >
                  <Linkedin className="h-4 w-4" />
                </a>

                <a
                  href={LINKS.Github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="rounded-full p-2 border border-[color:var(--color-border)] hover:bg-[--color-surface]"
                >
                  <Github className="h-4 w-4" />
                </a>

                <a
                  href={LINKS.Instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="rounded-full p-2 border border-[color:var(--color-border)] hover:bg-[--color-surface]"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>

            </div>
          </Card>

          <Card>
            <h4 className="font-semibold mb-3">Send Message</h4>
            {/* Formspree example — replace the action with your form ID */}
            <form method="POST" action="https://formspree.io/f/xnngavew" className="space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <input name="name" required placeholder="Name *"
                  className="w-full rounded-xl bg-[--color-surface-2] border border-[color:var(--color-border)] px-3 py-2 outline-none" />
                <input type="email" name="email" required placeholder="Email *"
                  className="w-full rounded-xl bg-[--color-surface-2] border border-[color:var(--color-border)] px-3 py-2 outline-none" />
              </div>
              <input name="subject" placeholder="Subject *" required
                className="w-full rounded-xl bg-[--color-surface-2] border border-[color:var(--color-border)] px-3 py-2 outline-none" />
              <textarea name="message" required placeholder="Message *"
                className="w-full min-h-[120px] rounded-xl bg-[--color-surface-2] border border-[color:var(--color-border)] px-3 py-2 outline-none" />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-semibold
                text-black bg-[var(--color-accent)] hover:opacity-90 transition"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </Card>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-[color:var(--color-border)] py-10">
        <div className="container text-sm text-[color:rgba(var(--color-muted))] text-center">
          © {new Date().getFullYear()} Pratyush Raj Shrestha — All rights reserved.
        </div>
      </footer>
    </div>
  );
}
