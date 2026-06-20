import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);

  return (
    <motion.span
      initial={{ count: 0 }}
      whileInView={{ count: value }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      onUpdate={(latest) => {
        setCount(Math.floor(latest.count));
      }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState("video");
  const [activeServiceTab, setActiveServiceTab] = useState("services");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shineStyle, setShineStyle] = useState({left: "-20%", duration: 2,});
  const [activeSection, setActiveSection] = useState("home");
  const [spotlight, setSpotlight] = useState({x: 50, y: 50, active: false,});
  const [parallax, setParallax] = useState({x: 0, y: 0,});
  const [mouseGlow, setMouseGlow] = useState({x: 0, y: 0,});
  const [showIntro, setShowIntro] = useState(true);
  const [typedLogo, setTypedLogo] = useState("");
  const [loadingStage, setLoadingStage] = useState("PREPARING EXPERIENCE");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [introSkipped, setIntroSkipped] = useState(false);
  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem("stoicethAccent") || "red";
  });
  const [showAccentPicker, setShowAccentPicker] = useState(false);
  const [cursorFollower, setCursorFollower] = useState({
    x: 0,
    y: 0,
  });
  const [hoveredWork, setHoveredWork] = useState(null);
  const [readyPreview, setReadyPreview] = useState({});
  const [selectedWorkCategory, setSelectedWorkCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [messageStatus, setMessageStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

const accents = {
  red: {
    text: "text-red-500",
    bg: "bg-red-600",
    hoverBg: "hover:bg-red-700",
    border: "border-red-600",
    glow: "shadow-[0_0_25px_rgba(239,68,68,0.45)]",
  },
  blue: {
    text: "text-blue-500",
    bg: "bg-blue-600",
    hoverBg: "hover:bg-blue-700",
    border: "border-blue-600",
    glow: "shadow-[0_0_25px_rgba(59,130,246,0.45)]",
  },
  purple: {
    text: "text-purple-500",
    bg: "bg-purple-600",
    hoverBg: "hover:bg-purple-700",
    border: "border-purple-600",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.45)]",
  },
  emerald: {
    text: "text-emerald-500",
    bg: "bg-emerald-600",
    hoverBg: "hover:bg-emerald-700",
    border: "border-emerald-600",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.45)]",
  },
};

const accent = accents[accentColor];

useEffect(() => {
  localStorage.setItem("stoicethAccent", accentColor);
}, [accentColor]);
  
useEffect(() => {
  const randomShine = () => {
    const randomDelay = Math.random() * 7000 + 4000; // 4s - 11s

    setTimeout(() => {
      setShineStyle({
        left: `${Math.floor(Math.random() * 50) - 20}%`,
        duration: Math.random() * 1.5 + 1.5, // 1.5s - 3s
      });

      randomShine();
    }, randomDelay);
  };

  randomShine();
}, []);

useEffect(() => {
  const sections = ["home", "works", "services", "about", "contact"];

  const handleScroll = () => {
    let currentSection = "home";

    sections.forEach((section) => {
      const element = document.getElementById(section);

      if (!element) return;

      const offsetTop = element.offsetTop;
      const sectionHeight = element.offsetHeight;
      const scrollPosition = window.scrollY + 220;

      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + sectionHeight
      ) {
        currentSection = section;
      }
    });

    setActiveSection(currentSection);
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("hashchange", handleScroll);

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("hashchange", handleScroll);
  };
}, []);

  const navLinkClass = (section) =>
  `relative transition-all duration-300 hover:-translate-y-1 ${
    activeSection === section
      ? `${accent.text} ${
          accentColor === "red"
            ? "drop-shadow-[0_0_10px_rgba(239,68,68,0.9)]"
            : accentColor === "blue"
            ? "drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]"
            : accentColor === "purple"
            ? "drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]"
            : "drop-shadow-[0_0_10px_rgba(16,185,129,0.9)]"
        } after:w-full`
      : `text-gray-300 ${
          accentColor === "red"
            ? "hover:text-red-500"
            : accentColor === "blue"
            ? "hover:text-blue-500"
            : accentColor === "purple"
            ? "hover:text-purple-500"
            : "hover:text-emerald-500"
        } after:w-0`
  } after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] ${
    accentColor === "red"
      ? "after:bg-red-500"
      : accentColor === "blue"
      ? "after:bg-blue-500"
      : accentColor === "purple"
      ? "after:bg-purple-500"
      : "after:bg-emerald-500"
  } after:transition-all after:duration-300 hover:after:w-full`;

const animatedText = (text, extraClass = "", isAccent = false) => (
  <span className={extraClass}>
    {text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-300 hover:-translate-y-2 hover:scale-110 ${
          char === " " ? "w-[0.35em]" : ""
        } ${
          isAccent
            ? `${accent.text} hover:text-white hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.8)]`
            : `text-white ${accentColor === "red" ? "hover:text-red-500 hover:drop-shadow-[0_0_14px_rgba(239,68,68,0.9)]" : accentColor === "blue" ? "hover:text-blue-500 hover:drop-shadow-[0_0_14px_rgba(59,130,246,0.9)]" : accentColor === "purple" ? "hover:text-purple-500 hover:drop-shadow-[0_0_14px_rgba(168,85,247,0.9)]" : "hover:text-emerald-500 hover:drop-shadow-[0_0_14px_rgba(16,185,129,0.9)]"}`
        }`}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </span>
);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowIntro(false);
    setIntroSkipped(true);
  }, 3200);

  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  const text = "STOICETH";
  let index = 0;

  const interval = setInterval(() => {
    setTypedLogo(text.slice(0, index + 1));
    index++;

    if (index >= text.length) {
      clearInterval(interval);
    }
  }, 120);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const first = setTimeout(() => {
    setLoadingStage("LOADING PORTFOLIO");
  }, 900);

  const second = setTimeout(() => {
    setLoadingStage("WELCOME");
  }, 1900);

  return () => {
    clearTimeout(first);
    clearTimeout(second);
  };
}, []);

useEffect(() => {
  const handleScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    setScrollProgress(progress);
    setShowScrollTop(scrollTop > window.innerHeight * 0.5);
  };

  window.addEventListener("scroll", handleScrollProgress);
  handleScrollProgress();

  return () => window.removeEventListener("scroll", handleScrollProgress);
}, []);

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);

  if (section) {
    setActiveSection(sectionId);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#${sectionId}`);
  }

  setIsMenuOpen(false);
};

  return (
    <div
      className="relative min-h-screen bg-black text-white overflow-x-hidden scroll-smooth transition-colors duration-500"
      onMouseMove={(e) => {
      setMouseGlow({
        x: e.clientX,
        y: e.clientY,
      });

      setCursorFollower({
        x: e.clientX,
        y: e.clientY,
      });
    }}
    >

      <div
        className={`h-full bg-gradient-to-r transition-all duration-150 ease-out ${
          accentColor === "red"
            ? "from-red-700 via-red-500 to-red-400 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
            : accentColor === "blue"
            ? "from-blue-700 via-blue-500 to-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
            : accentColor === "purple"
            ? "from-purple-700 via-purple-500 to-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
            : "from-emerald-700 via-emerald-500 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        }`}
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Floating Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className={`absolute left-[-180px] top-[15%] w-[420px] h-[420px] rounded-full blur-[130px] animate-[floatingOrbOne_24s_ease-in-out_infinite] ${
          accentColor === "red" ? "bg-red-600/10" : accentColor === "blue" ? "bg-blue-600/10" : accentColor === "purple" ? "bg-purple-600/10" : "bg-emerald-600/10"
        }`}></div>

        <div className={`absolute right-[-220px] top-[45%] w-[500px] h-[500px] rounded-full blur-[150px] animate-[floatingOrbTwo_28s_ease-in-out_infinite] ${
          accentColor === "red" ? "bg-red-600/10" : accentColor === "blue" ? "bg-blue-600/10" : accentColor === "purple" ? "bg-purple-600/10" : "bg-emerald-600/10"
        }`}></div>

        <div className={`absolute left-[35%] bottom-[-220px] w-[520px] h-[520px] rounded-full blur-[160px] animate-[floatingOrbThree_32s_ease-in-out_infinite] ${
          accentColor === "red" ? "bg-red-600/10" : accentColor === "blue" ? "bg-blue-600/10" : accentColor === "purple" ? "bg-purple-600/10" : "bg-emerald-600/10"
        }`}></div>
      </div>

      {showIntro && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center animate-[introSlideUp_0.9s_ease_2.4s_forwards]">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-[12px] text-white">
              {typedLogo.split("").map((char, i) =>
                char === "C" ? (
                  <span
                    key={i}
                    className="inline-block text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.8)] animate-[pulseC_0.45s_ease_1.2s_1]"
                  >
                    C
                  </span>
                ) : (
                  <span key={i}>{char}</span>
                )
              )}
            </h1>

            <div className="mt-5 w-36 h-[2px] mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>

            <div className="mt-10 flex flex-col items-center gap-5">
              <p
                key={loadingStage}
                className="text-[11px] uppercase tracking-[8px] text-gray-400 animate-[heroFadeUp_0.4s_ease]"
              >
                {loadingStage}
              </p>

              <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full animate-[loadBar_2.4s_linear_forwards]"></div>
              </div>
            </div>
          </div>
        </div>
      )}

    <div
    className="pointer-events-none fixed z-0 w-[500px] h-[500px] rounded-full blur-[120px]"
      style={{
        left: `${mouseGlow.x}px`,
        top: `${mouseGlow.y}px`,
        transform: "translate(-50%, -50%)",
        background:
        accentColor === "red"
          ? "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(239,68,68,0.10) 45%, transparent 75%)"
          : accentColor === "blue"
          ? "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(59,130,246,0.10) 45%, transparent 75%)"
          : accentColor === "purple"
          ? "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(168,85,247,0.10) 45%, transparent 75%)"
          : "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(16,185,129,0.10) 45%, transparent 75%)",
        }}
    />

    {/* Cursor Follower */}
    <div
      className={`pointer-events-none fixed z-[9999] hidden md:block w-5 h-5 rounded-full border transition-transform duration-150 ease-out ${
        accentColor === "red"
          ? "border-red-500 shadow-[0_0_18px_rgba(239,68,68,0.7)]"
          : accentColor === "blue"
          ? "border-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.7)]"
          : accentColor === "purple"
          ? "border-purple-500 shadow-[0_0_18px_rgba(168,85,247,0.7)]"
          : "border-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.7)]"
      }`}
      style={{
        left: `${cursorFollower.x}px`,
        top: `${cursorFollower.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    ></div>

      {/* Floating Accent Picker */}
      <div className="fixed bottom-24 right-6 z-[9997] flex flex-col items-center gap-3">
        <div
          className={`flex flex-col-reverse gap-3 mb-2 transition-all duration-300 ${
            showAccentPicker
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {[
            ["red", "bg-red-500", "shadow-[0_0_18px_rgba(239,68,68,0.7)]"],
            ["blue", "bg-blue-500", "shadow-[0_0_18px_rgba(59,130,246,0.7)]"],
            ["purple", "bg-purple-500", "shadow-[0_0_18px_rgba(168,85,247,0.7)]"],
            ["emerald", "bg-emerald-500", "shadow-[0_0_18px_rgba(16,185,129,0.7)]"],
          ].map(([color, bg, glow]) => (
            <button
              key={color}
              onClick={() => {
                setAccentColor(color);
                setShowAccentPicker(false);
              }}
              className={`w-8 h-8 rounded-full ${bg} ${glow} transition-all duration-300 hover:scale-125 ${
                accentColor === color
                  ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                  : "opacity-80 hover:opacity-100"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setShowAccentPicker(!showAccentPicker)}
          className={`w-12 h-12 rounded-full border border-white/10 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
            accentColor === "red"
              ? "bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.7)]"
              : accentColor === "blue"
              ? "bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.7)]"
              : accentColor === "purple"
              ? "bg-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.7)]"
              : "bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.7)]"
          }`}
        >
          <span className="block w-4 h-4 mx-auto rounded-full bg-white/90"></span>
        </button>
      </div>

      <nav className="fixed top-5 left-0 w-full z-50 px-4 md:px-8 animate-[navDrop_0.8s_ease-out]">
        <div
          className={`group relative max-w-7xl mx-auto h-20 px-4 md:px-6 flex justify-between items-center rounded-full overflow-hidden bg-black/35 backdrop-blur-2xl border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_35px_rgba(0,0,0,0.5)] transition-all duration-300 ${
            accentColor === "red"
              ? "hover:border-red-500/40"
              : accentColor === "blue"
              ? "hover:border-blue-500/40"
              : accentColor === "purple"
              ? "hover:border-purple-500/40"
              : "hover:border-emerald-500/40"
          }`}
        >
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000"></span>

          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-transparent"></span>

          <span
            key={shineStyle.left}
            className="pointer-events-none absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md animate-[glassMove_var(--duration)_ease-in-out]"
            style={{
              left: shineStyle.left,
              "--duration": `${shineStyle.duration}s`,
            }}
          ></span>

          <div className="flex items-center gap-4 relative z-10">
            <img
              src="/images/logo.png"
              alt="Stoiceth"
              className={`w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border hover:scale-105 transition-all duration-300 ${
                accentColor === "red"
                  ? "border-red-900 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                  : accentColor === "blue"
                  ? "border-blue-900 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  : accentColor === "purple"
                  ? "border-purple-900 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  : "border-emerald-900 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
              }`}
            />

            <h1 className="text-base sm:text-lg md:text-2xl font-black tracking-[3px] md:tracking-[6px]">
              STOI
              <span
                className={`${accent.text} ${
                  accentColor === "red"
                    ? "drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                    : accentColor === "blue"
                    ? "drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    : accentColor === "purple"
                    ? "drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    : "drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                }`}
              >
                C
              </span>
              ETH
            </h1>
          </div>

          <div className="hidden md:flex gap-10 text-m uppercase tracking-wider relative z-10">
            <button onClick={() => scrollToSection("home")} className={navLinkClass("home")}>
              Home
            </button>

            <button onClick={() => scrollToSection("about")} className={navLinkClass("about")}>
              About
            </button>

            <button onClick={() => scrollToSection("services")} className={navLinkClass("services")}>
              Services
            </button>

            <button onClick={() => scrollToSection("works")} className={navLinkClass("works")}>
              Works
            </button>
            
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className={`hidden md:inline-flex relative z-10 ${accent.bg} ${accent.hoverBg} px-8 py-3 rounded-full font-semibold text-white ${accent.glow} transition-all duration-300 hover:scale-105`}
          >
            Contact
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden relative z-10 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl transition-all ${
              accentColor === "red"
                ? "hover:border-red-600 hover:text-red-500"
                : accentColor === "blue"
                ? "hover:border-blue-600 hover:text-blue-500"
                : accentColor === "purple"
                ? "hover:border-purple-600 hover:text-purple-500"
                : "hover:border-emerald-600 hover:text-emerald-500"
            }`}
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden max-w-5xl mx-auto mt-3 px-5 py-6 bg-black/95 border border-white/10 rounded-3xl shadow-[0_0_35px_rgba(0,0,0,0.7)] backdrop-blur-md">
            <div className="flex flex-col gap-4 text-sm uppercase tracking-widest">
              {[
                ["home", "Home"],
                ["about", "About"],
                ["services", "Services"],
                ["works", "Works"],
              ].map(([section, label]) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-left transition-all ${
                    activeSection === section
                      ? `${accent.text} font-bold`
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}

              <button
                onClick={() => scrollToSection("contact")}
                className={`mt-3 text-center px-5 py-3 rounded-full font-bold text-white ${accent.bg} ${accent.hoverBg} ${accent.glow} transition-all`}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      <section
        id="home"
        className="relative min-h-screen pt-28 md:pt-28 lg:pt-20 flex items-center overflow-hidden"
      >
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-8 lg:gap-4">
          
          {/* LEFT CONTENT */}
          <div className="relative w-full lg:w-[55%] pt-8 md:pt-0">
            <div
              className={`absolute left-[-160px] top-[-160px] w-[560px] h-[560px] rounded-full blur-[160px] opacity-40 ${
                accentColor === "red"
                  ? "bg-red-600/30"
                  : accentColor === "blue"
                  ? "bg-blue-600/30"
                  : accentColor === "purple"
                  ? "bg-purple-600/30"
                  : "bg-emerald-600/30"
              }`}
            ></div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: introSkipped ? 0.2 : 3.0,
                ease: "easeOut",
              }}
              className="relative z-10"
            >
              <p
                className={`inline-flex items-center gap-3 mb-7 px-4 py-2 rounded-full border bg-white/[0.03] backdrop-blur-md uppercase tracking-[4px] text-[11px] md:text-xs font-bold ${
                  accent.text
                } ${
                  accentColor === "red"
                    ? "border-red-500/20"
                    : accentColor === "blue"
                    ? "border-blue-500/20"
                    : accentColor === "purple"
                    ? "border-purple-500/20"
                    : "border-emerald-500/20"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    accentColor === "red"
                      ? "bg-red-500"
                      : accentColor === "blue"
                      ? "bg-blue-500"
                      : accentColor === "purple"
                      ? "bg-purple-500"
                      : "bg-emerald-500"
                  }`}
                ></span>
                Available for freelance projects
              </p>

              <h1 className="font-black uppercase leading-[0.9] tracking-[-0.06em] relative z-10 w-full lg:w-[930px]">
                <span className="block text-[2.7rem] sm:text-[4.8rem] lg:text-[6.4rem] xl:text-[7.2rem] text-white">
                  {"Crafting".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 35, rotate: index % 2 === 0 ? -5 : 5 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: introSkipped ? 0.35 + index * 0.035 : 3.2 + index * 0.035,
                        ease: "easeOut",
                      }}
                      className={`inline-block transition-all duration-300 hover:-translate-y-2 hover:scale-110 ${
                        char === " " ? "w-[0.35em]" : ""
                      } ${
                        accentColor === "red"
                          ? "hover:text-red-500 hover:drop-shadow-[0_0_14px_rgba(239,68,68,0.9)]"
                          : accentColor === "blue"
                          ? "hover:text-blue-500 hover:drop-shadow-[0_0_14px_rgba(59,130,246,0.9)]"
                          : accentColor === "purple"
                          ? "hover:text-purple-500 hover:drop-shadow-[0_0_14px_rgba(168,85,247,0.9)]"
                          : "hover:text-emerald-500 hover:drop-shadow-[0_0_14px_rgba(16,185,129,0.9)]"
                      }`}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>

                <span
                  className={`block text-[2.7rem] sm:text-[4.8rem] lg:text-[6.4rem] xl:text-[7.2rem] ${accent.text}`}
                  style={{
                    textShadow: `
                      1px 1px 0 rgba(255,255,255,0.85),
                      2px 2px 0 rgba(0,0,0,0.35),
                      4px 4px 18px rgba(0,0,0,0.65)
                    `,
                  }}
                >
                  {"Visual Stories".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        opacity: 0,
                        y: index % 3 === 0 ? 45 : 25,
                        x: index % 2 === 0 ? -10 : 10,
                        rotate: index % 2 === 0 ? -7 : 7,
                      }}
                      animate={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                      transition={{
                        duration: 0.65,
                        delay: introSkipped ? 0.65 + index * 0.035 : 3.55 + index * 0.035,
                        ease: "easeOut",
                      }}
                      className={`inline-block transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:text-white hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.75)] ${
                        char === " " ? "w-[0.35em]" : ""
                      }`}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: introSkipped ? 1.1 : 4.1,
                  ease: "easeOut",
                }}
                className="mt-8 max-w-2xl text-gray-300 text-base md:text-xl leading-relaxed"
              >
                Professional video editor specializing in storytelling, video editing,
                and motion graphics for creators, brands, and visual projects.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: introSkipped ? 1.3 : 4.3,
                  ease: "easeOut",
                }}
                className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5"
              >
                <button
                  type="button"
                  onClick={() => scrollToSection("works")}
                  className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden ${accent.bg} ${accent.hoverBg} px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-white ${accent.glow} transition-all duration-300 hover:scale-105`}
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                  <span className="relative z-10">View Portfolio</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className={`group relative w-full sm:w-fit inline-flex items-center justify-center gap-3 overflow-hidden bg-white/[0.04] backdrop-blur-md border border-white/10 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold transition-all duration-300 hover:scale-105 text-white ${
                    accentColor === "red"
                      ? "hover:border-red-500/60 hover:bg-red-950/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.18)]"
                      : accentColor === "blue"
                      ? "hover:border-blue-500/60 hover:bg-blue-950/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]"
                      : accentColor === "purple"
                      ? "hover:border-purple-500/60 hover:bg-purple-950/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]"
                      : "hover:border-emerald-500/60 hover:bg-emerald-950/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]"
                  }`}
                >
                  <span className="absolute inset-0 bg-white/10 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                  <span className="relative z-10">Start a Project</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: introSkipped ? 0.8 : 3.7,
              ease: "easeOut",
            }}
            className="relative w-full lg:w-[45%] flex justify-center lg:-ml-32 xl:-ml-44 -mt-4 lg:mt-0 pb-24 sm:pb-0"
            onMouseEnter={() =>
              setSpotlight((prev) => ({
                ...prev,
                active: true,
              }))
            }
            onMouseLeave={() => {
              setSpotlight((prev) => ({
                ...prev,
                active: false,
              }));

              setParallax({
                x: 0,
                y: 0,
              });
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();

              setSpotlight({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
                active: true,
              });

              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;

              setParallax({
                x,
                y,
              });
            }}
          >
            <div
              className="relative"
              style={{
                transform: `translate(${parallax.x * -18}px, ${parallax.y * -14}px)`,
                transition: "transform 250ms ease-out",
              }}
            >
              <div
                className={`absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[82%] h-[58%] rounded-full blur-[85px] ${
                  accentColor === "red"
                    ? "bg-red-600/20"
                    : accentColor === "blue"
                    ? "bg-blue-600/20"
                    : accentColor === "purple"
                    ? "bg-purple-600/20"
                    : "bg-emerald-600/20"
                }`}
              ></div>

              <div className="absolute left-1/2 bottom-[-4%] -translate-x-1/2 w-[68%] h-[16%] rounded-full blur-[35px] bg-black/70"></div>

              <img
                src="/images/zeth.png"
                alt="Stoiceth"
                className="relative z-30 w-[230px] sm:w-[320px] md:w-[400px] lg:w-[510px] xl:w-[640px] object-contain brightness-[0.28] contrast-[1.06] saturate-[0.95] animate-[float_6s_ease-in-out_infinite] drop-shadow-[0_40px_55px_rgba(0,0,0,0.5)]"
              />

              <img
                src="/images/zeth.png"
                alt=""
                className="absolute inset-0 z-40 w-[230px] sm:w-[320px] md:w-[400px] lg:w-[510px] xl:w-[640px] object-contain pointer-events-none animate-[float_6s_ease-in-out_infinite]"
                style={{
                  WebkitMaskImage: spotlight.active
                    ? `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, black 0%, black 26%, rgba(0,0,0,0.55) 42%, transparent 65%)`
                    : "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)",
                  maskImage: spotlight.active
                    ? `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, black 0%, black 18%, rgba(0,0,0,0.6) 32%, transparent 50%)`
                    : "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)",
                  filter: "brightness(1.28) contrast(1.05) saturate(1.05)",
                  transition:
                    "mask-image 120ms ease-out, -webkit-mask-image 120ms ease-out, opacity 250ms ease-out",
                  opacity: spotlight.active ? 1 : 0,
                }}
              />

              <div className="absolute left-1/2 bottom-[-48px] sm:-bottom-6 -translate-x-1/2 z-50 w-[360px] sm:w-[460px] md:w-[520px] rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <p className="text-[10px] uppercase tracking-[3px] text-gray-500 mb-1">
                  Specialized in
                </p>
                <p className="text-xs sm:text-sm md:text-base font-bold text-white whitespace-nowrap">
                  Storytelling • Video Editing • Motion Graphics
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="about"
        className="relative min-h-screen px-6 md:px-12 py-28 bg-transparent overflow-hidden"
      >
        <div className="relative z-10 max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mb-20"
          >
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-white/10"></div>
                <span className={`${accent.text} text-s uppercase tracking-[6px] font-bold`}>
                  About
                </span>
              </div>

            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-[-0.04em] leading-[0.95] mb-8">
              More Than <br />
              Just An Editor.
            </h2>

            <p className="text-gray-400 max-w-3xl text-base md:text-xl leading-relaxed">
              I help creators, brands, and visual storytellers transform raw ideas
              into cinematic videos through clean editing, intentional pacing, and
              motion-driven visuals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative max-w-[540px] mx-auto w-full"
            >
              <div
                className={`absolute inset-0 rounded-full blur-[120px] opacity-40 ${
                  accentColor === "red"
                    ? "bg-red-600/20"
                    : accentColor === "blue"
                    ? "bg-blue-600/20"
                    : accentColor === "purple"
                    ? "bg-purple-600/20"
                    : "bg-emerald-600/20"
                }`}
              ></div>

              <div
                className={`group relative overflow-hidden rounded-[2rem] border bg-white/[0.03]
                transition-all duration-700 ease-out
                ${
                  accentColor === "red"
                    ? "border-red-950/30 hover:border-red-500 hover:shadow-[0_0_60px_rgba(239,68,68,0.22)]"
                    : accentColor === "blue"
                    ? "border-blue-950/30 hover:border-blue-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.22)]"
                    : accentColor === "purple"
                    
                    ? "border-purple-950/30 hover:border-purple-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.22)]"
                    : "border-emerald-950/30 hover:border-emerald-500 hover:shadow-[0_0_60px_rgba(16,185,129,0.22)]"
                }`}
              >
                <img
                  src="/images/zeth 2.jpg"
                  alt="Stoiceth"
                  loading="lazy"
                  className="
                  w-full
                  aspect-[4/5]
                  object-cover
                  brightness-[1.02]
                  contrast-[1.05]
                  grayscale-[5%]
                  transition-all
                  duration-700
                  ease-out
                  group-hover:brightness-[1.08]
                  group-hover:grayscale-0
                  group-hover:scale-[1.02]
                  "
                />

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none ${
                    accentColor === "red"
                      ? "bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08),transparent_70%)]"
                      : accentColor === "blue"
                      ? "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]"
                      : accentColor === "purple"
                      ? "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_70%)]"
                      : "bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_70%)]"
                  }`}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-7 transition-all duration-700 group-hover:-translate-y-1">
                  <p className={`${accent.text} uppercase tracking-[4px] text-xs font-bold mb-3`}>
                    Stoiceth
                  </p>

                  <h3 className="text-2xl md:text-3xl font-black leading-tight">
                    Professional Video Editor
                  </h3>

                  <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                    Storytelling • Video Editing • Motion Graphics
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className={`${accent.text} uppercase tracking-[5px] text-sm font-bold mb-4`}>
                Who I Am
              </p>

              <h3 className="text-3xl md:text-5xl font-black mb-7 leading-tight">
                Hi, I'm <span className={accent.text}>Zeth</span>.
              </h3>

              <div className="space-y-5 text-gray-400 text-base md:text-lg leading-relaxed mb-10">
                <p>
                  I’m Zeth Laurence Manalo, a freelance video editor based in the
                  Philippines. My work focuses on turning footage into engaging visual
                  stories with rhythm, structure, and emotion.
                </p>

                <p>
                  I started editing in 2020 and have continued developing my craft
                  through different creative styles, editing tools, and storytelling
                  techniques.
                </p>

                <p>
                  As part of the CETSO Creative Committee, I work on video editing,
                  videography, and creative documentation. I also directed, wrote,
                  produced, and edited my short film{" "}
                  <span className="text-white font-semibold">PAGLAHUTAY</span>.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {[
                  ["2020", "Started Editing"],
                  ["6+", "Years Experience"],
                  ["BSCpE", "Computer Engineering"],
                  ["CETSO", "Creative Committee"],
                  ["PAGLAHUTAY", "Director & Editor"],
                  ["PH", "Freelance Based"],
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-500"
                  >
                    <h4 className={`${accent.text} text-lg md:text-xl font-black mb-1`}>
                      {item[0]}
                    </h4>
                    <p className="text-gray-500 text-xs md:text-sm uppercase tracking-[2px]">
                      {item[1]}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative inline-flex items-center gap-3 overflow-hidden ${accent.bg} ${accent.hoverBg} px-8 py-4 rounded-full font-bold text-white ${accent.glow} transition-all duration-300 hover:scale-105`}
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                  <span className="relative z-10">Download Resume</span>
                  <span className="relative z-10 group-hover:translate-y-1 transition-transform duration-300">
                    ↓
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className={`group relative inline-flex items-center gap-3 overflow-hidden bg-white/[0.04] backdrop-blur-md border border-white/10 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 text-white ${
                    accentColor === "red"
                      ? "hover:border-red-500/60 hover:bg-red-950/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.18)]"
                      : accentColor === "blue"
                      ? "hover:border-blue-500/60 hover:bg-blue-950/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]"
                      : accentColor === "purple"
                      ? "hover:border-purple-500/60 hover:bg-purple-950/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]"
                      : "hover:border-emerald-500/60 hover:bg-emerald-950/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]"
                  }`}
                >
                  <span className="absolute inset-0 bg-white/10 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                  <span className="relative z-10">Let's Work Together</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

        <section
          id="services"
          className="relative min-h-screen px-6 md:px-12 py-28 bg-transparent overflow-hidden"
        >
          <div className="relative z-10 max-w-screen-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-5xl mb-16"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-white/10"></div>
                <span className={`${accent.text} text-s uppercase tracking-[6px] font-bold`}>
                  Services
                </span>
              </div>

              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-[-0.04em] leading-[0.95] mb-8">
                Editing Services <br />
                Built For Impact.
              </h2>

              <p className="text-gray-400 max-w-3xl text-base md:text-xl leading-relaxed">
                Focused editing services built for creators, brands, and storytellers who
                want clean, cinematic, and purposeful visual content.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.9fr_0.9fr] gap-8 mb-12">
              {[
                {
                  number: "01",
                  title: "Storytelling",
                  desc: "Turning raw footage into emotional visual experiences through structure, rhythm, and intentional pacing.",
                  points: ["Narrative structure", "Emotional pacing", "Cinematic rhythm"],
                },
                {
                  number: "02",
                  title: "Video Editing",
                  desc: "From cinematic films to social media content, I craft clean, engaging, and story-driven edits that keep viewers watching and deliver your message with impact.",
                  points: [
                    "Long-form & short-form editing",
                    "Cinematic pacing & transitions",
                    "Color grading & audio refinement",
                  ],
                },
                {
                  number: "03",
                  title: "Motion Graphics",
                  desc: "Subtle animated elements that add clarity, movement, and visual identity to every video.",
                  points: ["Animated titles", "Typography", "Transitions"],
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
                  className={`group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-9 hover:bg-white/[0.055] hover:-translate-y-2 transition-all duration-700 ${
                    accentColor === "red"
                      ? "hover:border-red-500/50 hover:shadow-[0_0_50px_rgba(239,68,68,0.16)]"
                      : accentColor === "blue"
                      ? "hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.16)]"
                      : accentColor === "purple"
                      ? "hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.16)]"
                      : "hover:border-emerald-500/50 hover:shadow-[0_0_50px_rgba(16,185,129,0.16)]"
                  }`}
                >
                  <span className="absolute right-6 top-4 text-[8rem] font-black leading-none text-white/[0.025] select-none">
                    {service.number}
                  </span>

                  <div
                    className={`absolute right-[-120px] top-[-120px] w-[260px] h-[260px] rounded-full blur-[90px] opacity-0 group-hover:opacity-100 transition-all duration-700 ${
                      accentColor === "red"
                        ? "bg-red-600/20"
                        : accentColor === "blue"
                        ? "bg-blue-600/20"
                        : accentColor === "purple"
                        ? "bg-purple-600/20"
                        : "bg-emerald-600/20"
                    }`}
                  ></div>

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <p className={`${accent.text} text-sm font-bold tracking-[5px] mb-10`}>
                        {service.number}
                      </p>

                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-[-0.03em] mb-5">
                        {service.title}
                      </h3>

                      <div className={`w-12 h-[2px] ${accent.bg} mb-6 transition-all duration-500 group-hover:w-24`}></div>

                      <p className="text-gray-400 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    <div className="space-y-3 mt-10">
                      <p className="text-[10px] uppercase tracking-[4px] text-gray-500 mb-4">
                        Capabilities
                      </p>

                      {service.points.map((point, i) => (
                        <p key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                          <span className={`w-1.5 h-1.5 rounded-full ${accent.bg}`}></span>
                          {point}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative overflow-hidden border-y border-white/10 py-8"
            >
              <div className="mb-6 flex items-center justify-between gap-6">
                <div>
                  <p className={`${accent.text} uppercase tracking-[5px] text-xs font-bold mb-2`}>
                    Tools I Use
                  </p>

                  <h3 className="text-2xl md:text-3xl font-black">
                    Professional Creative Stack
                  </h3>
                </div>

                <p className="hidden md:block text-gray-500 text-sm max-w-md text-right">
                  Software that powers every project from editing to motion graphics.
                </p>
              </div>

              <div className="relative overflow-hidden">
                <div className="flex w-max gap-4 animate-[toolMarquee_42s_linear_infinite]">
                  {[
                    ["DaVinci Resolve", "/logos/davinci resolve.jpg"],
                    ["CapCut", "/logos/capcut.webp"],
                    ["After Effects", "/logos/after effect.jpg"],
                    ["Alight Motion", "/logos/alight motion.jpg"],

                    ["DaVinci Resolve", "/logos/davinci resolve.jpg"],
                    ["CapCut", "/logos/capcut.webp"],
                    ["After Effects", "/logos/after effect.jpg"],
                    ["Alight Motion", "/logos/alight motion.jpg"],

                    ["DaVinci Resolve", "/logos/davinci resolve.jpg"],
                    ["CapCut", "/logos/capcut.webp"],
                    ["After Effects", "/logos/after effect.jpg"],
                    ["Alight Motion", "/logos/alight motion.jpg"],
                  ].map((tool, index) => (
                    <div
                      key={index}
                      className="group flex flex-col items-center justify-center gap-3 min-w-[150px] rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 hover:bg-white/[0.06] transition-all duration-500"
                    >
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center">
                        <img
                          src={tool[1]}
                          alt={tool[0]}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                        />
                      </div>

                      <h4 className="font-bold text-white text-sm text-center whitespace-nowrap">
                        {tool[0]}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      <section
        id="works"
        className="relative min-h-screen px-6 md:px-12 py-28 bg-transparent overflow-hidden"
      >
        {/* MAIN CONTENT WRAPPER: Animates into the background when modal is open */}
        <motion.div
          animate={{
            scale: selectedWorkCategory ? 0.95 : 1,
            opacity: selectedWorkCategory ? 0.4 : 1,
            filter: selectedWorkCategory ? "blur(12px)" : "blur(0px)",
          }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8"
        >

          {/* SECTION HEADER: Clean Minimal Alignment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-12 items-end mb-12 sm:mb-20 border-b border-white/[0.04] pb-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-px bg-white/20"></div>
                <span className={`${accent.text} text-xs uppercase tracking-[0.3em] font-black`}>
                  Works
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-[-0.04em] leading-[0.9] text-white">
                Featured <br className="hidden sm:inline" />Works.
              </h2>
            </div>

            <p className="text-gray-400 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed lg:justify-self-end font-medium">
              A curated collection of storytelling-focused edits, short-form content,
              and motion graphics engineered to help premier creators and brands stand out in digital dimensions.
            </p>
          </motion.div>

          {/* MAIN COLLECTION GRID: Dynamic Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr_0.9fr] gap-6 sm:gap-8 mb-16 sm:mb-24">
            {[
              {
                type: "collection",
                title: "Films, Stories & Long-form Edits",
                label: "Long-form Collection",
                desc: "Cinematic projects including films, documentaries, events, and story-driven edits built to last.",
                image: "/works/W1.jpg",
                link: "https://drive.google.com/drive/folders/1QILnebgXc3eU4qGKyZbBK7QOr_oGSzYz?usp=drive_link",
                tags: ["Storytelling", "Long-form", "Cinematic"],
              },
              {
                type: "modal",
                id: "short-form",
                title: "Short-form Editing",
                label: "Short-form Focus",
                desc: "Reels, TikTok edits, YouTube Shorts, promos, and vertical assets tuned for ultra-fast engagement.",
                image: "/works/W3.jpg",
                tags: ["Reels", "TikTok", "Shorts"],
              },
              {
                type: "modal",
                id: "motion",
                title: "Motion Graphics",
                label: "Motion Graphics",
                desc: "Animated titles, typography, transitions, and spatial visual assets that command raw visual retention.",
                image: "/works/W2.jpg",
                tags: ["Typography", "Animation", "Transitions"],
              },
            ].map((work, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.85, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
                onClick={() => {
                  if (work.type === "modal") {
                    setSelectedWorkCategory(work.id);
                    setSelectedProject(null);
                  }
                }}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/[0.05] bg-neutral-950/40 backdrop-blur-md flex flex-col justify-end min-h-[480px] sm:min-h-[520px] transition-all duration-500 ease-[cubic-bezier(.19,1,.22,1)] ${
                  index === 0 ? "lg:min-h-[600px]" : "lg:min-h-[520px]"
                } ${work.type === "modal" ? "cursor-pointer" : ""} ${
                  accentColor === "red"
                    ? "hover:border-red-500/30 hover:shadow-[0_20px_60px_rgba(239,68,68,0.15)]"
                    : accentColor === "blue"
                    ? "hover:border-blue-500/30 hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]"
                    : accentColor === "purple"
                    ? "hover:border-purple-500/30 hover:shadow-[0_20px_60px_rgba(168,85,247,0.15)]"
                    : "hover:border-emerald-500/30 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)]"
                }`}
              >
                {/* Dynamic Image Container Box */}
                <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                  <img
                    src={work.image}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-50 brightness-[0.7] contrast-[1.05] group-hover:scale-[1.05] group-hover:opacity-60 transition-all duration-1000 ease-[cubic-bezier(.19,1,.22,1)]"
                  />
                  {/* True Luxury Dark Masking */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent group-hover:via-neutral-950/20 transition-all duration-700"></div>
                </div>

                {/* Card Metadata Section */}
                <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col items-start w-full pointer-events-none transform group-hover:translate-y-[-4px] transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)]">
                  <p className={`${accent.text} uppercase tracking-[4px] text-[10px] sm:text-xs font-black mb-3`}>
                    {work.label}
                  </p>

                  <h3 className="text-2xl sm:text-3xl font-black mb-3 text-white tracking-tight leading-tight uppercase">
                    {work.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 max-w-md font-medium">
                    {work.desc}
                  </p>

                  {/* Luxury Tags Pillar (Dynamically colored on hover) */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {work.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] text-gray-300 font-bold uppercase tracking-wider transition-all duration-500 ${
                          accentColor === "red"
                            ? "group-hover:text-red-400 group-hover:border-red-500/50 group-hover:bg-red-500/10"
                            : accentColor === "blue"
                            ? "group-hover:text-blue-400 group-hover:border-blue-500/50 group-hover:bg-blue-500/10"
                            : accentColor === "purple"
                            ? "group-hover:text-purple-400 group-hover:border-purple-500/50 group-hover:bg-purple-500/10"
                            : "group-hover:text-emerald-400 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Footer Trigger Lines */}
                  <div className="w-full pt-4 border-t border-white/[0.06] pointer-events-auto">
                    {work.type === "collection" ? (
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-white uppercase group/btn"
                      >
                        Explore Work 
                        <span className="transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300 text-sm">↗</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-white uppercase group/btn"
                      >
                        View Projects 
                        <span className="transform group-hover/btn:translate-x-1.5 transition-transform duration-300 text-sm">→</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Premium Inner Border Line Glow Accent on Hover */}
                <div className={`absolute inset-0 border-[2px] border-transparent group-hover:${accent.border} transition-colors duration-700 pointer-events-none rounded-[2rem] opacity-40`}></div>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM MATRIX QUICK-LINKS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-12">
            {[
              {
                id: "short-form",
                title: "Short-form Editing Overview",
                projects: [
                  ["01", "Product Promo Edit", "TikTok / Reels", "/previews/V1.mp4"],
                  ["02", "Lifestyle Reel", "Instagram Reel", "/previews/V2.mp4"],
                  ["03", "Event Highlights", "Short-form Edit", "/previews/V3.mp4"],
                ],
              },
              {
                id: "motion",
                title: "Motion Graphics Showcase",
                projects: [
                  ["01", "Kinetic Typography", "Text Animation", "/previews/V4.mp4"],
                  ["02", "Logo Reveal", "Motion Intro", "/previews/V1.mp4"],
                  ["03", "Title Sequence", "Film Title Animation", "/previews/video-projects.mp4"],
                ],
              },
            ].map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className={`relative group/container rounded-[2rem] border border-white/[0.04] bg-gradient-to-b from-white/[0.01] to-transparent backdrop-blur-xl p-5 sm:p-8 transition-all duration-700 hover:-translate-y-2 ${
                  accentColor === "red"
                    ? "hover:shadow-[-15px_0_45px_-20px_rgba(239,68,68,0.2),15px_0_45px_-20px_rgba(239,68,68,0.2)] hover:border-red-500/20"
                    : accentColor === "blue"
                    ? "hover:shadow-[-15px_0_45px_-20px_rgba(59,130,246,0.2),15px_0_45px_-20px_rgba(59,130,246,0.2)] hover:border-blue-500/20"
                    : accentColor === "purple"
                    ? "hover:shadow-[-15px_0_45px_-20px_rgba(168,85,247,0.2),15px_0_45px_-20px_rgba(168,85,247,0.2)] hover:border-purple-500/20"
                    : "hover:shadow-[-15px_0_45px_-20px_rgba(16,185,129,0.2),15px_0_45px_-20px_rgba(16,185,129,0.2)] hover:border-emerald-500/20"
                }`}
              >
                <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-white/[0.04]">
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
                    {group.title}
                  </h3>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedWorkCategory(group.id);
                      setSelectedProject(null);
                    }}
                    className={`text-xs font-bold text-gray-500 hover:${accent.text} transition-colors uppercase tracking-widest`}
                  >
                    View All +
                  </button>
                </div>

                {/* Inner matrix clips grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  {group.projects.map((project, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSelectedWorkCategory(group.id);
                        setSelectedProject({
                          number: project[0],
                          title: project[1],
                          type: project[2],
                          video: project[3],
                        });
                      }}
                      className="group text-left flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0"
                    >
                      {/* Aspect Ratio Box Wrapper */}
                      <div className={`relative w-20 sm:w-full aspect-[9/16] overflow-hidden rounded-xl border border-white/10 bg-neutral-950 flex-shrink-0 transition-all duration-500 ${
                        accentColor === "red"
                          ? "group-hover:border-red-500/50"
                          : accentColor === "blue"
                          ? "group-hover:border-blue-500/50"
                          : accentColor === "purple"
                          ? "group-hover:border-purple-500/50"
                          : "group-hover:border-emerald-500/50"
                      }`}>
                        <video
                          src={project[3]}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
                      </div>

                      <div className="mt-0 sm:mt-4 min-w-0 flex-1">
                        <p className={`${accent.text} text-[9px] tracking-[2px] font-black mb-1`}>
                          {project[0]}
                        </p>

                        <h4 className={`text-xs sm:text-sm font-black text-white truncate uppercase mb-0.5 transition-colors duration-300 ${
                          accentColor === "red"
                            ? "group-hover:text-red-400"
                            : accentColor === "blue"
                            ? "group-hover:text-blue-400"
                            : accentColor === "purple"
                            ? "group-hover:text-purple-400"
                            : "group-hover:text-emerald-400"
                        }`}>
                          {project[1]}
                        </h4>

                        <p className="text-[10px] text-gray-500 font-semibold truncate uppercase tracking-wide">
                          {project[2]}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* IMMERSIVE POPUP MODAL COMPONENT */}
        <AnimatePresence>
          {selectedWorkCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-3xl overflow-hidden flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.96, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.97, y: 15, opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
                className="h-full w-full overflow-y-auto scroll-smooth style-scrollbar"
              >
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16">
                  
                  {/* Header Section */}
                  <div className="flex justify-between items-start gap-4 sm:gap-6 mb-8 sm:mb-12">
                    <div className="flex-1 min-w-0">
                      <motion.button
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                        type="button"
                        onClick={() => {
                          setSelectedWorkCategory(null);
                          setSelectedProject(null);
                        }}
                        className="mb-4 sm:mb-8 text-xs sm:text-sm font-bold text-gray-400 hover:text-white transition-all flex items-center gap-2 sm:gap-3 group whitespace-nowrap"
                      >
                        <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Works
                      </motion.button>

                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
                        className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4"
                      >
                        <div className="w-8 sm:w-16 h-px bg-white/10"></div>
                        <p className={`${accent.text} uppercase tracking-[4px] sm:tracking-[6px] text-[10px] sm:text-xs font-bold truncate`}>
                          {selectedWorkCategory === "short-form"
                            ? "Short-form Projects"
                            : "Motion Graphics Projects"}
                        </p>
                      </motion.div>

                      <motion.h3 
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                        className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-[-0.04em] leading-[0.95] text-white break-words"
                      >
                        {selectedWorkCategory === "short-form"
                          ? "Short-form Editing."
                          : "Motion Graphics."}
                      </motion.h3>
                    </div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.6, rotate: 45 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                      type="button"
                      onClick={() => {
                        setSelectedWorkCategory(null);
                        setSelectedProject(null);
                      }}
                      className="w-10 h-10 sm:w-14 h-14 flex-shrink-0 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:scale-105 text-xl sm:text-3xl transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)] flex items-center justify-center text-gray-400 hover:text-white group"
                    >
                      <span className="group-hover:rotate-90 transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)]">×</span>
                    </motion.button>
                  </div>

                  {/* Layout Canvas Grid Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 sm:gap-8 items-start">
                    
                    {/* Left Column Preview Frame */}
                    <motion.div 
                      initial={{ opacity: 0, y: 35, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 25, scale: 0.98 }}
                      transition={{ duration: 0.8, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
                      className="lg:sticky lg:top-6 rounded-2xl sm:rounded-[2.5rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-3 sm:p-4 md:p-6 shadow-[0_25px_100px_rgba(0,0,0,0.6)]"
                    >
                      <div className="relative rounded-xl sm:rounded-[2rem] overflow-hidden bg-black min-h-[260px] sm:min-h-[380px] md:min-h-[520px] lg:min-h-[580px] xl:min-h-[640px] flex items-center justify-center border border-white/5">
                        <AnimatePresence mode="wait">
                          {selectedProject ? (
                            <motion.video
                              key={selectedProject.video + selectedProject.title}
                              initial={{ opacity: 0, filter: "blur(8px)" }}
                              animate={{ opacity: 1, filter: "blur(0px)" }}
                              exit={{ opacity: 0, filter: "blur(4px)" }}
                              transition={{ duration: 0.4 }}
                              src={selectedProject.video}
                              controls
                              autoPlay
                              playsInline
                              className="max-w-full max-h-[50vh] lg:max-h-[75vh] w-auto h-auto object-contain z-10"
                            />
                          ) : (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-center px-4 sm:px-6"
                            >
                              <p className={`${accent.text} uppercase tracking-[4px] sm:tracking-[5px] text-[10px] sm:text-xs font-bold mb-2 sm:mb-4`}>
                                Select a project
                              </p>
                              <h4 className="text-xl sm:text-3xl md:text-5xl font-black mb-2 sm:mb-4 text-white">
                                Preview Area
                              </h4>
                              <p className="text-gray-400 max-w-sm mx-auto leading-relaxed text-xs sm:text-sm">
                                Choose any project from the gallery to preview it here.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Right Grid Column Lists */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                      {(selectedWorkCategory === "short-form"
                        ? [
                            ["01", "Product Promo Edit", "TikTok / Reels", "/previews/V1.mp4"],
                            ["02", "Lifestyle Reel", "Instagram Reel", "/previews/V2.mp4"],
                            ["03", "Event Highlights", "Short-form Edit", "/previews/V3.mp4"],
                            ["04", "Travel Reel", "Vertical Content", "/previews/video-projects.mp4"],
                            ["05", "Creator Promo", "Social Media Edit", "/previews/V4.mp4"],
                            ["06", "Brand Campaign", "Premium Short-form", "/previews/V1.mp4"],
                          ]
                        : [
                            ["01", "Kinetic Typography", "Text Animation", "/previews/V4.mp4"],
                            ["02", "Logo Reveal", "Motion Intro", "/previews/V1.mp4"],
                            ["03", "Title Sequence", "Film Title Animation", "/previews/video-projects.mp4"],
                            ["04", "Lower Thirds Pack", "Minimal Motion Graphic", "/previews/V3.mp4"],
                            ["05", "Transition Pack", "Dynamic Transitions", "/previews/V2.mp4"],
                            ["06", "3D Abstract Space", "Experimental Motion", "/previews/V4.mp4"],
                          ]
                      ).map((project, index) => {
                        const isSelected = selectedProject?.title === project[1];
                        
                        return (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.97 }}
                            transition={{ 
                              duration: 0.75, 
                              delay: 0.25 + index * 0.04, 
                              ease: [0.19, 1, 0.22, 1] 
                            }}
                            type="button"
                            onClick={() =>
                              setSelectedProject({
                                number: project[0],
                                title: project[1],
                                type: project[2],
                                video: project[3],
                              })
                            }
                            className={`group text-left overflow-hidden rounded-2xl sm:rounded-[1.7rem] border bg-white/[0.015] hover:bg-white/[0.04] sm:hover:-translate-y-1.5 transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)] shadow-xl ${
                              isSelected
                                ? `${accent.border} bg-white/[0.03] shadow-[0_0_40px_rgba(255,255,255,0.03)]`
                                : "border-white/5 hover:border-white/15"
                            }`}
                          >
                            <div className="relative h-36 sm:h-44 md:h-52 bg-neutral-950 overflow-hidden">
                              <video
                                src={project[3]}
                                muted
                                loop
                                autoPlay
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                              <div className={`absolute bottom-0 left-0 h-[2px] w-0 ${accent.bg} group-hover:w-full transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]`}></div>
                            </div>

                            <div className="p-4 sm:p-6 bg-black/20">
                              <p className={`${accent.text} text-[9px] sm:text-[10px] tracking-[3px] sm:tracking-[4px] font-bold mb-1.5 sm:mb-3`}>
                                {project[0]}
                              </p>
                              <h4 className="text-base sm:text-lg font-black mb-1 sm:mb-2 text-white tracking-tight truncate">
                                {project[1]}
                              </h4>
                              <p className="text-gray-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider truncate">
                                {project[2]}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>


        <section
          id="contact"
          className="relative min-h-screen px-6 md:px-12 pt-36 pb-28 bg-transparent overflow-hidden"
        >
          <div className="relative z-10 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
              
              {/* LEFT COLUMN: Text and Info Cards */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-px bg-white/10"></div>
                  <span className={`${accent.text} text-sm uppercase tracking-[6px] font-bold`}>
                    Contact
                  </span>
                </div>

                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-[-0.04em] leading-[0.95] mb-8 text-white">
                  Let's Tell <br />
                  Your Story.
                </h2>

                <p className="text-gray-400 max-w-xl text-base md:text-xl leading-relaxed mb-5">
                  Whether it's a commercial, documentary, social media campaign,
                  event coverage, or personal project, I'm here to help bring your
                  vision to life.
                </p>

                <p className={`${accent.text} uppercase tracking-[4px] text-xs font-bold mb-10`}>
                  Let's build something memorable.
                </p>

                <div className="space-y-4 max-w-xl">
                  {[
                    ["Email", "zethlaurencemanalo@gmail.com"],
                    ["Availability", "Open for Freelance Projects"],
                    ["Response", "Usually Within 24 Hours"],
                    ["Turnaround", "2–5 Business Days"],
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] px-5 py-4 transition-all duration-500 hover:-translate-y-1 cursor-default
                      ${
                        accentColor === "red"
                          ? "hover:border-red-500/30 hover:shadow-[0_15px_30px_-10px_rgba(239,68,68,0.15)]"
                          : accentColor === "blue"
                          ? "hover:border-blue-500/30 hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.15)]"
                          : accentColor === "purple"
                          ? "hover:border-purple-500/30 hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.15)]"
                          : "hover:border-emerald-500/30 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.15)]"
                      }`}
                    >
                      <p className={`${accent.text} uppercase tracking-[4px] text-xs font-bold mb-2`}>
                        {item[0]}
                      </p>
                      <p className={`font-bold text-white transition-colors duration-300 ${
                        accentColor === "red"
                          ? "group-hover:text-red-400"
                          : accentColor === "blue"
                          ? "group-hover:text-blue-400"
                          : accentColor === "purple"
                          ? "group-hover:text-purple-400"
                          : "group-hover:text-emerald-400"
                      }`}>
                        {item[1]}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-500 text-center mt-6 tracking-wide">
                  Open for freelance projects, collaborations, and creative partnerships.
                </p>
              </motion.div>

              {/* RIGHT COLUMN: Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.97 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative rounded-[2.5rem] border border-white/[0.06] bg-white/[0.025] backdrop-blur-xl p-6 md:p-8 transition-all duration-700 hover:-translate-y-2
                ${
                  accentColor === "red"
                    ? "shadow-[0_20px_90px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_100px_-20px_rgba(239,68,68,0.2)] hover:border-red-500/20"
                    : accentColor === "blue"
                    ? "shadow-[0_20px_90px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_100px_-20px_rgba(59,130,246,0.2)] hover:border-blue-500/20"
                    : accentColor === "purple"
                    ? "shadow-[0_20px_90px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_100px_-20px_rgba(168,85,247,0.2)] hover:border-purple-500/20"
                    : "shadow-[0_20px_90px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_100px_-20px_rgba(16,185,129,0.2)] hover:border-emerald-500/20"
                }`}
              >
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    setIsSending(true);

                    try {
                      const response = await fetch(
                        "https://api.web3forms.com/submit",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                          },
                          body: JSON.stringify({
                            access_key: "65c3b4fb-9efd-4c6b-b23e-3306c8aea98b",
                            subject: `Project Inquiry from ${contactForm.name}`,
                            from_name: contactForm.name,
                            email: contactForm.email,
                            message: contactForm.message,
                          }),
                        }
                      );

                      const result = await response.json();

                      if (result.success) {
                        setMessageStatus("success");

                        setContactForm({
                          name: "",
                          email: "",
                          message: "",
                        });
                      } else {
                        setMessageStatus("error");
                      }
                    } catch {
                      setMessageStatus("error");
                    } finally {
                      setIsSending(false);
                    }

                    setTimeout(() => {
                      setMessageStatus("");
                    }, 3000);
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your name"
                      className={`w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 outline-none transition-all duration-300 text-white
                      ${
                        accentColor === "red"
                          ? "focus:border-red-500 focus:shadow-[0_0_25px_rgba(239,68,68,0.18)]"
                          : accentColor === "blue"
                          ? "focus:border-blue-500 focus:shadow-[0_0_25px_rgba(59,130,246,0.18)]"
                          : accentColor === "purple"
                          ? "focus:border-purple-500 focus:shadow-[0_0_25px_rgba(168,85,247,0.18)]"
                          : "focus:border-emerald-500 focus:shadow-[0_0_25px_rgba(16,185,129,0.18)]"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="yourname@gmail.com"
                      className={`w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 outline-none transition-all duration-300 text-white
                      ${
                        accentColor === "red"
                          ? "focus:border-red-500 focus:shadow-[0_0_25px_rgba(239,68,68,0.18)]"
                          : accentColor === "blue"
                          ? "focus:border-blue-500 focus:shadow-[0_0_25px_rgba(59,130,246,0.18)]"
                          : accentColor === "purple"
                          ? "focus:border-purple-500 focus:shadow-[0_0_25px_rgba(168,85,247,0.18)]"
                          : "focus:border-emerald-500 focus:shadow-[0_0_25px_rgba(16,185,129,0.18)]"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Message</label>
                    <textarea
                      required
                      rows="6"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className={`w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 outline-none transition-all duration-300 text-white resize-none
                      ${
                        accentColor === "red"
                          ? "focus:border-red-500 focus:shadow-[0_0_25px_rgba(239,68,68,0.18)]"
                          : accentColor === "blue"
                          ? "focus:border-blue-500 focus:shadow-[0_0_25px_rgba(59,130,246,0.18)]"
                          : accentColor === "purple"
                          ? "focus:border-purple-500 focus:shadow-[0_0_25px_rgba(168,85,247,0.18)]"
                          : "focus:border-emerald-500 focus:shadow-[0_0_25px_rgba(16,185,129,0.18)]"
                      }`}
                    ></textarea>
                  </div>

                  {messageStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-2xl px-5 py-4 font-bold ${
                        messageStatus === "success"
                          ? "bg-green-500/15 border border-green-500/20 text-green-400"
                          : "bg-red-500/15 border border-red-500/20 text-red-400"
                      }`}
                    >
                      {messageStatus === "success"
                        ? "✓ Message sent successfully!"
                        : "✕ Failed to send message."}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full group relative overflow-hidden ${
                      accent.bg
                    } ${accent.hoverBg} px-8 py-4 rounded-2xl font-bold text-white ${
                      accent.glow
                    } transition-all duration-300 ${
                      isSending
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:scale-[1.02]"
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Start a Conversation
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            →
                          </span>
                        </>
                      )}
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>

                    <div className="relative flex justify-center">
                      <span className="bg-neutral-950 px-4 text-[11px] uppercase tracking-[4px] text-gray-500">
                        Or Connect With Me
                      </span>
                    </div>
                  </div>

                  {/* Social Icons */}
                  <div className="flex justify-center gap-4">
                    {[
                      {
                        icon: <FaFacebookF />,
                        link: "https://www.facebook.com/share/1AgowuTEAL/",
                      },
                      {
                        icon: <FaInstagram />,
                        link: "https://www.instagram.com/stoiceth",
                      },
                      {
                        icon: <FaTiktok />,
                        link: "https://www.tiktok.com/@stoiceth",
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:scale-105 text-white ${
                          accentColor === "red"
                            ? "hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:text-red-400"
                            : accentColor === "blue"
                            ? "hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:text-blue-400"
                            : accentColor === "purple"
                            ? "hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:text-purple-400"
                            : "hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:text-emerald-400"
                        }`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </form>
              </motion.div>             
            </div>

            {/* Footer */}
            <div className="mt-24 border-t border-white/[0.06] pt-8">
              <motion.footer
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm"
              >
                <p className="font-bold tracking-[4px] text-white">
                  STOI<span className={accent.text}>C</span>ETH
                </p>

                <p>© 2026 Stoiceth. All rights reserved.</p>

                <p>Storytelling • Video Editing • Motion Graphics</p>
              </motion.footer>
            </div>
          </div>
        </section>

        

            {/* Scroll To Top Button */}
            <button
              onClick={() => {
                document.getElementById("home")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={`fixed bottom-6 right-6 z-[9998] w-12 h-12 rounded-full border text-white font-black transition-all duration-500 hover:scale-110 hover:-translate-y-1 ${
                accentColor === "red"
                  ? "bg-red-600 border-red-400/40 shadow-[0_0_25px_rgba(239,68,68,0.45)] hover:bg-red-700 hover:shadow-[0_0_40px_rgba(239,68,68,0.8)]"
                  : accentColor === "blue"
                  ? "bg-blue-600 border-blue-400/40 shadow-[0_0_25px_rgba(59,130,246,0.45)] hover:bg-blue-700 hover:shadow-[0_0_40px_rgba(59,130,246,0.8)]"
                  : accentColor === "purple"
                  ? "bg-purple-600 border-purple-400/40 shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:bg-purple-700 hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]"
                  : "bg-emerald-600 border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:bg-emerald-700 hover:shadow-[0_0_40px_rgba(16,185,129,0.8)]"
              } ${
                showScrollTop
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-5 pointer-events-none"
              }`}
            >
              ↑
            </button>

    </div>
  );
}

export default App;