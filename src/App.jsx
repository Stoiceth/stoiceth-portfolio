import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

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
  const introPlayed = sessionStorage.getItem("stoicethIntroPlayed");

  if (introPlayed) {
    setShowIntro(false);
    setIntroSkipped(true);
    return;
  }

  const timer = setTimeout(() => {
    setShowIntro(false);
    sessionStorage.setItem("stoicethIntroPlayed", "true");
  }, 3200);

  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  const introPlayed = sessionStorage.getItem("stoicethIntroPlayed");

  if (introPlayed) {
    setTypedLogo("STOICETH");
    return;
  }

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
              src="/images/logo.jpg"
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

            <button onClick={() => scrollToSection("works")} className={navLinkClass("works")}>
              Works
            </button>

            <button onClick={() => scrollToSection("services")} className={navLinkClass("services")}>
              Services
            </button>

            <button onClick={() => scrollToSection("about")} className={navLinkClass("about")}>
              About
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
                ["works", "Works"],
                ["services", "Services"],
                ["about", "About"],
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
        className="relative min-h-screen pt-36 md:pt-28 lg:pt-20 flex items-center overflow-hidden"
      >
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-between">
          <div className="relative w-full">
            <div
              className={`absolute right-[-50px] top-[0px] w-[650px] h-[350px] rounded-full blur-[120px] z-0 opacity-0 ${
                accentColor === "red"
                  ? "bg-red-600/30"
                  : accentColor === "blue"
                  ? "bg-blue-600/30"
                  : accentColor === "purple"
                  ? "bg-purple-600/30"
                  : "bg-emerald-600/30"
              } ${
                introSkipped
                  ? "animate-[heroGlow_1.2s_ease_0.1s_forwards]"
                  : "animate-[heroGlow_1.2s_ease_2.8s_forwards]"
              }`}
              style={{
                transform: `translate(${parallax.x * 25}px, ${parallax.y * 25}px)`,
                transition: "transform 250ms ease-out",
              }}
            ></div>

            <div
              className={`absolute right-[1000px] top-[-400px] w-[800px] h-[500px] rounded-full blur-[120px] z-0 opacity-0 ${
                accentColor === "red"
                  ? "bg-red-600/25"
                  : accentColor === "blue"
                  ? "bg-blue-600/25"
                  : accentColor === "purple"
                  ? "bg-purple-600/25"
                  : "bg-emerald-600/25"
              } ${
                introSkipped
                  ? "animate-[heroGlow_1.2s_ease_0.2s_forwards]"
                  : "animate-[heroGlow_1.2s_ease_2.9s_forwards]"
              }`}
              style={{
                transform: `translate(${parallax.x * 15}px, ${parallax.y * 15}px)`,
                transition: "transform 250ms ease-out",
              }}
            ></div>

            <div className="relative z-20 max-w-none">
              <p
                className={`inline-flex items-center gap-3 uppercase tracking-[5px] text-xs md:text-sm font-bold mb-5 opacity-0 px-4 py-2 rounded-full border backdrop-blur-md ${
                  accent.text
                } ${
                  accentColor === "red"
                    ? "bg-red-500/10 border-red-500/20"
                    : accentColor === "blue"
                    ? "bg-blue-500/10 border-blue-500/20"
                    : accentColor === "purple"
                    ? "bg-purple-500/10 border-purple-500/20"
                    : "bg-emerald-500/10 border-emerald-500/20"
                } ${
                  introSkipped
                    ? "animate-[heroFadeUp_0.7s_ease_0.2s_forwards]"
                    : "animate-[heroFadeUp_0.7s_ease_3.0s_forwards]"
                }`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                      accentColor === "red"
                        ? "bg-red-500"
                        : accentColor === "blue"
                        ? "bg-blue-500"
                        : accentColor === "purple"
                        ? "bg-purple-500"
                        : "bg-emerald-500"
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                      accentColor === "red"
                        ? "bg-red-500"
                        : accentColor === "blue"
                        ? "bg-blue-500"
                        : accentColor === "purple"
                        ? "bg-purple-500"
                        : "bg-emerald-500"
                    }`}
                  ></span>
                </span>
                Available for Freelance
              </p>

              <h1 className="font-black uppercase leading-[0.88] tracking-tight">
                <div
                  className={`opacity-0 ${
                    introSkipped
                      ? "animate-[heroFadeUp_0.8s_ease_0.4s_forwards]"
                      : "animate-[heroFadeUp_0.8s_ease_3.2s_forwards]"
                  }`}
                >
                  {animatedText(
                    "Freelance",
                    "block text-[2.8rem] sm:text-[4rem] lg:text-[5.8rem] xl:text-[6.2rem] text-white",
                    false
                  )}
                </div>

                <span
                  className="block text-[2.45rem] sm:text-[3.6rem] lg:text-[4.9rem] xl:text-[5.6rem] font-black leading-[0.9]"
                  style={{
                    textShadow: `
                      1px 1px 0 #fff,
                      2px 2px 0 rgba(0,0,0,.2)
                    `,
                  }}
                >
                  <div
                    className={`opacity-0 ${
                      introSkipped
                        ? "animate-[heroFadeUp_0.8s_ease_0.6s_forwards]"
                        : "animate-[heroFadeUp_0.8s_ease_3.4s_forwards]"
                    }`}
                  >
                    <span className="block">
                      {"Video Editor".split("").map((char, index) => (
                        <span
                          key={index}
                          className={`inline-block transition-all duration-300 hover:-translate-y-2 hover:scale-110 ${
                            char === " " ? "w-[0.35em]" : ""
                          } ${accent.text} hover:text-white hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.8)]`}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    </span>
                  </div>

                  <div
                    className={`opacity-0 ${
                      introSkipped
                        ? "animate-[heroFadeUp_0.8s_ease_0.8s_forwards]"
                        : "animate-[heroFadeUp_0.8s_ease_3.6s_forwards]"
                    }`}
                  >
                    <span className="block">
                      {"& Designer".split("").map((char, index) => (
                        <span
                          key={index}
                          className={`inline-block transition-all duration-300 hover:-translate-y-2 hover:scale-110 ${
                            char === " " ? "w-[0.35em]" : ""
                          } ${accent.text} hover:text-white hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.8)]`}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    </span>
                  </div>
                </span>
              </h1>

              <p
                className={`text-gray-200 text-base md:text-xl max-w-xl leading-relaxed mt-8 mb-10 md:mb-12 opacity-0 ${
                  introSkipped
                    ? "animate-[heroFadeUp_0.8s_ease_1.0s_forwards]"
                    : "animate-[heroFadeUp_0.8s_ease_3.8s_forwards]"
                }`}
              >
                Crafting cinematic edits, motion graphics, and visual stories that leave a lasting impression.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto opacity-0 ${
                  introSkipped
                    ? "animate-[heroFadeUp_0.8s_ease_1.2s_forwards]"
                    : "animate-[heroFadeUp_0.8s_ease_4.0s_forwards]"
                }`}
              >
                <a
                  href="#works"
                  className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden ${accent.bg} ${accent.hoverBg} px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-white ${accent.glow} transition-all duration-300 hover:scale-105`}
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                  <span className="relative z-10">View Works</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </a>

                <a
                  href="#contact"
                  className={`group relative w-full sm:w-fit inline-flex items-center justify-center gap-3 overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold transition-all duration-300 hover:scale-105 text-white ${
                    accentColor === "red"
                      ? "hover:border-red-500 hover:bg-red-950/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]"
                      : accentColor === "blue"
                      ? "hover:border-blue-500 hover:bg-blue-950/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
                      : accentColor === "purple"
                      ? "hover:border-purple-500 hover:bg-purple-950/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
                      : "hover:border-emerald-500 hover:bg-emerald-950/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                  }`}
                >
                  <span className="absolute inset-0 bg-white/10 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                  <span className="relative z-10">Get in Touch</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>

            <div
              className={`relative mt-12 xl:mt-0 mx-auto xl:absolute xl:right-[40px] 2xl:right-[-20px] xl:bottom-[-85px] z-30 flex justify-center w-fit opacity-0 ${
                introSkipped
                  ? "animate-[heroImageReveal_1.2s_ease_1.4s_forwards]"
                  : "animate-[heroImageReveal_1.2s_ease_4.2s_forwards]"
              }`}
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
                  transform: `translate(${parallax.x * -35}px, ${parallax.y * -25}px)`,
                  transition: "transform 250ms ease-out",
                }}
              >
                <div
                  className={`absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[85%] h-[58%] rounded-full blur-[75px] ${
                    accentColor === "red"
                      ? "bg-red-600/20"
                      : accentColor === "blue"
                      ? "bg-blue-600/20"
                      : accentColor === "purple"
                      ? "bg-purple-600/20"
                      : "bg-emerald-600/20"
                  }`}
                ></div>

                <div className="absolute left-1/2 bottom-[-5%] -translate-x-1/2 w-[70%] h-[18%] rounded-full blur-[35px] bg-black/70"></div>

                <div
                  className={`absolute right-[18%] top-[20%] w-48 h-48 rounded-full blur-[100px] ${
                    accentColor === "red"
                      ? "bg-red-600/15"
                      : accentColor === "blue"
                      ? "bg-blue-600/15"
                      : accentColor === "purple"
                      ? "bg-purple-600/15"
                      : "bg-emerald-600/15"
                  }`}
                  style={{
                    transform: `translate(${parallax.x * -25}px, ${parallax.y * -18}px)`,
                    transition: "transform 250ms ease-out",
                  }}
                ></div>

                <img
                  src="/images/zeth.png"
                  alt="Stoiceth"
                  className="relative z-10 w-[220px] sm:w-[280px] md:w-[340px] lg:w-[380px] xl:w-[46vw] max-w-[700px] object-contain brightness-[0.18] contrast-[1.08] saturate-[0.9] animate-[float_6s_ease-in-out_infinite] drop-shadow-[0_35px_45px_rgba(0,0,0,0.45)]"
                />

                <img
                  src="/images/zeth.png"
                  alt=""
                  className="absolute inset-0 z-20 w-[220px] sm:w-[280px] md:w-[340px] lg:w-[380px] xl:w-[46vw] max-w-[700px] object-contain pointer-events-none animate-[float_6s_ease-in-out_infinite]"
                  style={{
                    WebkitMaskImage: spotlight.active
                      ? `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, black 0%, black 28%, rgba(0,0,0,0.55) 45%, transparent 68%)`
                      : "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)",
                    maskImage: spotlight.active
                      ? `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, black 0%, black 18%, rgba(0,0,0,0.6) 32%, transparent 50%)`
                      : "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)",
                    filter: "brightness(1.35) contrast(1.08) saturate(1.08)",
                    transition:
                      "mask-image 120ms ease-out, -webkit-mask-image 120ms ease-out, opacity 250ms ease-out",
                    opacity: spotlight.active ? 1 : 0,
                  }}
                />

              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-50 text-[10px] sm:text-xs md:text-base uppercase tracking-wide md:tracking-widest text-gray-200 text-center px-4 opacity-0 ${
            introSkipped
              ? "animate-[heroFadeUp_0.8s_ease_1.5s_forwards]"
              : "animate-[heroFadeUp_0.8s_ease_4.3s_forwards]"
          }`}
        >
          Video Editor • Designer • Filmmaker
        </div>
      </section>





      <section id="works" className="relative min-h-screen px-6 md:px-12 py-28 bg-transparent overflow-hidden">
        <div
          className={`absolute left-[-200px] top-[150px] w-[500px] h-[500px] rounded-full blur-[130px] ${
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
          className={`absolute right-[-250px] bottom-[100px] w-[600px] h-[600px] rounded-full blur-[150px] ${
            accentColor === "red"
              ? "bg-red-600/10"
              : accentColor === "blue"
              ? "bg-blue-600/10"
              : accentColor === "purple"
              ? "bg-purple-600/10"
              : "bg-emerald-600/10"
          }`}
        ></div>

        <div className="relative z-10 max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <p className={`${accent.text} uppercase tracking-[6px] text-sm font-bold mb-4`}>
              My Works
            </p>

            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-5">
              Featured Works
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              A collection of projects showcasing my skills in video editing, motion graphics, and graphic design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className={`max-w-xl mx-auto mb-14 p-2 rounded-full border bg-white/5 backdrop-blur-md flex gap-2 ${
              accentColor === "red"
                ? "border-red-900/50"
                : accentColor === "blue"
                ? "border-blue-900/50"
                : accentColor === "purple"
                ? "border-purple-900/50"
                : "border-emerald-900/50"
            }`}
          >
            <button
              onClick={() => setActiveCategory("video")}
              className={`w-1/2 py-4 rounded-full font-bold transition-all duration-500 ease-out hover:-translate-y-1 ${
                activeCategory === "video"
                  ? `${accent.bg} text-white ${accent.glow}`
                  : `bg-black/60 text-gray-300 border border-white/5 hover:text-white ${
                      accentColor === "red"
                        ? "hover:border-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                        : accentColor === "blue"
                        ? "hover:border-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                        : accentColor === "purple"
                        ? "hover:border-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                        : "hover:border-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    }`
              }`}
            >
              Video Editing
            </button>

            <button
              onClick={() => setActiveCategory("design")}
              className={`w-1/2 py-4 rounded-full font-bold transition-all duration-500 ease-out hover:-translate-y-1 ${
                activeCategory === "design"
                  ? `${accent.bg} text-white ${accent.glow}`
                  : `bg-black/60 text-gray-300 border border-white/5 hover:text-white ${
                      accentColor === "red"
                        ? "hover:border-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                        : accentColor === "blue"
                        ? "hover:border-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                        : accentColor === "purple"
                        ? "hover:border-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                        : "hover:border-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    }`
              }`}
            >
              Graphic Design
            </button>
          </motion.div>

          {activeCategory === "video" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  image: "/works/nopic.png",
                  alt: "Video Projects",
                  title: "Video Projects",
                  desc: "Short films, documentaries, long-form edits, and cinematic storytelling projects.",
                  tag: "Storytelling",
                  link: "https://drive.google.com/drive/folders/1QILnebgXc3eU4qGKyZbBK7QOr_oGSzYz?usp=drive_link",
                },
                {
                  image: "/works/nopic.png",
                  alt: "Reels",
                  title: "Reels & Short-form",
                  desc: "TikTok videos, school reels, social media edits, and fast-paced vertical content.",
                  tag: "Short-form",
                  link: "https://drive.google.com/drive/folders/1a0mAH7ANyyg60TS0IY9jFyr-1uRNVkpX?usp=drive_link",
                },
                {
                  image: "/works/nopic.png",
                  alt: "Motion Graphics",
                  title: "Motion Graphics",
                  desc: "Animated titles, transitions, visual effects, motion elements, and creative graphics.",
                  tag: "Animation",
                  link: "https://drive.google.com/drive/folders/1n-_g7ih8L5zIs0F59VmAc52om74AyA4q?usp=drive_link",
                },
              ].map((work, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
                  className={`group relative rounded-3xl overflow-hidden bg-[#0b0b0b] border transition-all duration-700 ease-out hover:-translate-y-4 hover:scale-[1.02] ${
                    accentColor === "red"
                      ? "border-red-950/60 hover:border-red-500 hover:shadow-[0_0_60px_rgba(239,68,68,0.28)]"
                      : accentColor === "blue"
                      ? "border-blue-950/60 hover:border-blue-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.28)]"
                      : accentColor === "purple"
                      ? "border-purple-950/60 hover:border-purple-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.28)]"
                      : "border-emerald-950/60 hover:border-emerald-500 hover:shadow-[0_0_60px_rgba(16,185,129,0.28)]"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                      accentColor === "red"
                        ? "bg-gradient-to-br from-red-500/10 via-transparent to-red-700/10"
                        : accentColor === "blue"
                        ? "bg-gradient-to-br from-blue-500/10 via-transparent to-blue-700/10"
                        : accentColor === "purple"
                        ? "bg-gradient-to-br from-purple-500/10 via-transparent to-purple-700/10"
                        : "bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-700/10"
                    }`}
                  ></div>

                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={work.image}
                      alt={work.alt}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:brightness-110 group-hover:contrast-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-all duration-700 group-hover:from-black/70 group-hover:via-black/10"></div>
                  </div>

                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[11px] font-bold tracking-[2px] text-white">
                      FEATURED
                    </span>
                  </div>

                  <div className="relative z-10 p-8">
                    <h3 className={`text-2xl font-black mb-4 transition-all duration-500 group-hover:${accent.text.replace("text-", "text-")}`}>
                      {work.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed mb-8">
                      {work.desc}
                    </p>

                    <div className="flex justify-between items-center gap-4">
                      <span
                        className={`border px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 group-hover:text-white ${
                          accentColor === "red"
                            ? "text-red-400 border-red-800/70 group-hover:bg-red-600 group-hover:border-red-600"
                            : accentColor === "blue"
                            ? "text-blue-400 border-blue-800/70 group-hover:bg-blue-600 group-hover:border-blue-600"
                            : accentColor === "purple"
                            ? "text-purple-400 border-purple-800/70 group-hover:bg-purple-600 group-hover:border-purple-600"
                            : "text-emerald-400 border-emerald-800/70 group-hover:bg-emerald-600 group-hover:border-emerald-600"
                        }`}
                      >
                        ✦ {work.tag}
                      </span>

                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/link relative inline-flex items-center gap-2 font-bold text-white transition-all duration-300 hover:-translate-y-1 ${accentColor === "red" ? "hover:text-red-500" : accentColor === "blue" ? "hover:text-blue-500" : accentColor === "purple" ? "hover:text-purple-500" : "hover:text-emerald-500"}`}
                      >
                        <span>View Collection</span>
                        <span className="transition-all duration-300 group-hover/link:translate-x-1">→</span>
                        <span className={`absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-300 group-hover/link:w-full ${accentColor === "red" ? "bg-red-500" : accentColor === "blue" ? "bg-blue-500" : accentColor === "purple" ? "bg-purple-500" : "bg-emerald-500"}`}></span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeCategory === "design" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  image: "/works/nopic.png",
                  alt: "Brand Design",
                  title: "Brand Design",
                  desc: "Logos, identity concepts, and visual branding materials for creative projects.",
                  tag: "Branding",
                  link: "https://drive.google.com/drive/folders/1QZVwmrtODmYrWs2S2TGPghnhk1PsKaaX?usp=drive_link",
                },
                {
                  image: "/works/nopic.png",
                  alt: "Social Media",
                  title: "Social Media Design",
                  desc: "Posters, posts, banners, and promotional graphics for online platforms.",
                  tag: "Social Media",
                  link: "https://drive.google.com/drive/folders/1lkMB130a2I3SvwfrwQRp-JYnEYJcr5jh?usp=drive_link",
                },
                {
                  image: "/works/nopic.png",
                  alt: "Poster Design",
                  title: "Poster & Layout Design",
                  desc: "Event posters, layout designs, presentations, and creative publication materials.",
                  tag: "Layout",
                  link: "https://drive.google.com/drive/folders/1P3Gkxn88peH0MSepx8S7W-rk9wM5CEd8?usp=drive_link",
                },
              ].map((work, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
                  className={`group relative rounded-3xl overflow-hidden bg-[#0b0b0b] border transition-all duration-700 ease-out hover:-translate-y-4 hover:scale-[1.02] ${
                    accentColor === "red"
                      ? "border-red-950/60 hover:border-red-500 hover:shadow-[0_0_60px_rgba(239,68,68,0.28)]"
                      : accentColor === "blue"
                      ? "border-blue-950/60 hover:border-blue-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.28)]"
                      : accentColor === "purple"
                      ? "border-purple-950/60 hover:border-purple-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.28)]"
                      : "border-emerald-950/60 hover:border-emerald-500 hover:shadow-[0_0_60px_rgba(16,185,129,0.28)]"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                      accentColor === "red"
                        ? "bg-gradient-to-br from-red-500/10 via-transparent to-red-700/10"
                        : accentColor === "blue"
                        ? "bg-gradient-to-br from-blue-500/10 via-transparent to-blue-700/10"
                        : accentColor === "purple"
                        ? "bg-gradient-to-br from-purple-500/10 via-transparent to-purple-700/10"
                        : "bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-700/10"
                    }`}
                  ></div>

                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={work.image}
                      alt={work.alt}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:brightness-110 group-hover:contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-all duration-700 group-hover:from-black/70 group-hover:via-black/10"></div>
                  </div>

                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[11px] font-bold tracking-[2px] text-white">
                      FEATURED
                    </span>
                  </div>

                  <div className="relative z-10 p-8">
                    <h3 className={`text-2xl font-black mb-4 transition-all duration-500 ${accentColor === "red" ? "group-hover:text-red-500" : accentColor === "blue" ? "group-hover:text-blue-500" : accentColor === "purple" ? "group-hover:text-purple-500" : "group-hover:text-emerald-500"}`}>
                      {work.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed mb-8">{work.desc}</p>

                    <div className="flex justify-between items-center gap-4">
                      <span className={`border px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 group-hover:text-white ${accentColor === "red" ? "text-red-400 border-red-800/70 group-hover:bg-red-600 group-hover:border-red-600" : accentColor === "blue" ? "text-blue-400 border-blue-800/70 group-hover:bg-blue-600 group-hover:border-blue-600" : accentColor === "purple" ? "text-purple-400 border-purple-800/70 group-hover:bg-purple-600 group-hover:border-purple-600" : "text-emerald-400 border-emerald-800/70 group-hover:bg-emerald-600 group-hover:border-emerald-600"}`}>
                        ✦ {work.tag}
                      </span>

                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/link relative inline-flex items-center gap-2 font-bold text-white transition-all duration-300 hover:-translate-y-1 ${accentColor === "red" ? "hover:text-red-500" : accentColor === "blue" ? "hover:text-blue-500" : accentColor === "purple" ? "hover:text-purple-500" : "hover:text-emerald-500"}`}
                      >
                        <span>View Collection</span>
                        <span className="transition-all duration-300 group-hover/link:translate-x-1">→</span>
                        <span className={`absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-300 group-hover/link:w-full ${accentColor === "red" ? "bg-red-500" : accentColor === "blue" ? "bg-blue-500" : accentColor === "purple" ? "bg-purple-500" : "bg-emerald-500"}`}></span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      
        <section id="services" className="relative min-h-screen px-6 md:px-12 py-28 bg-transparent overflow-visible">
          <div className={`absolute left-[-250px] top-[150px] w-[600px] h-[600px] rounded-full blur-[150px] ${
            accentColor === "red" ? "bg-red-600/10" :
            accentColor === "blue" ? "bg-blue-600/10" :
            accentColor === "purple" ? "bg-purple-600/10" :
            "bg-emerald-600/10"
          }`}></div>

          <div className={`absolute right-[-200px] bottom-[100px] w-[500px] h-[500px] rounded-full blur-[140px] ${
            accentColor === "red" ? "bg-red-600/20" :
            accentColor === "blue" ? "bg-blue-600/20" :
            accentColor === "purple" ? "bg-purple-600/20" :
            "bg-emerald-600/20"
          }`}></div>

          <div className="relative z-10 max-w-screen-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <p className={`${accent.text} uppercase tracking-[6px] text-sm font-bold mb-4`}>
                Services & Tools
              </p>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-5">
                What I Work With
              </h2>

              <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                Helping creators and brands through cinematic editing, modern visual design, and creative storytelling.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className={`w-32 h-[2px] bg-gradient-to-r from-transparent mx-auto mb-14 opacity-80 ${
                accentColor === "red" ? "via-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]" :
                accentColor === "blue" ? "via-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]" :
                accentColor === "purple" ? "via-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]" :
                "via-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
              } to-transparent`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                className="space-y-5 sticky top-28 self-start"
              >
                {[
                  ["services", "● Service List", "Services", "Explore what I can offer."],
                  ["tools", "● Creative Stack", "Creative Tools", "See the apps I use."],
                ].map(([tab, label, title, desc]) => (
                  <button
                    key={tab}
                    onClick={() => setActiveServiceTab(tab)}
                    className={`relative w-full text-left rounded-3xl p-6 border overflow-hidden hover:-translate-y-1 transition-all duration-500 ${
                      activeServiceTab === tab
                        ? `${accent.bg} border-white/10 ${accent.glow} scale-[1.02]`
                        : `bg-[#0b0b0b] ${
                            accentColor === "red" ? "border-red-950/60 hover:border-red-600 hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]" :
                            accentColor === "blue" ? "border-blue-950/60 hover:border-blue-600 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]" :
                            accentColor === "purple" ? "border-purple-950/60 hover:border-purple-600 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]" :
                            "border-emerald-950/60 hover:border-emerald-600 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                          }`
                    }`}
                  >
                    <p className="text-sm uppercase tracking-[4px] mb-3 opacity-80">{label}</p>
                    <h3 className="text-2xl font-black mb-2">{title}</h3>
                    <p className={activeServiceTab === tab ? "text-white/80" : "text-gray-400"}>
                      {desc}
                    </p>
                  </button>
                ))}
              </motion.div>

              <motion.div
                key={activeServiceTab}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {activeServiceTab === "services" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[
                      {
                        href: "#works",
                        icon: "/icons/graphic deisgn.webp",
                        iconScale: "scale-150",
                        alt: "Video Editing",
                        number: "Service 01",
                        title: "Video Editing",
                        desc: "I create clean, cinematic, and story-driven edits for short films, reels, school projects, promotional videos, documentaries, and long-form content.",
                        list: ["Clean cuts and smooth pacing", "Color mood and cinematic feel", "Reels, documentaries, and long-form edits"],
                        tags: ["Reels", "Cinematic", "Storytelling"],
                        cta: "View Video Works",
                      },
                      {
                        href: "#works",
                        icon: "/icons/graphic deisgn.jpg",
                        iconScale: "scale-100",
                        alt: "Graphic Design",
                        number: "Service 02",
                        title: "Graphic Design",
                        desc: "I design posters, social media graphics, layouts, thumbnails, visual concepts, and branding materials that match the mood and purpose of each project.",
                        list: ["Posters and promotional layouts", "Social media graphics", "Visual concepts and branding materials"],
                        tags: ["Posters", "Layouts", "Branding"],
                        cta: "View Design Works",
                      },
                    ].map((service, index) => (
                      <motion.a
                        key={index}
                        href={service.href}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                        className={`group relative min-h-[430px] bg-[#0b0b0b] border rounded-3xl p-8 md:p-10 overflow-hidden hover:-translate-y-3 transition-all duration-700 ease-out ${
                          accentColor === "red" ? "border-red-950/60 hover:border-red-600 hover:shadow-[0_0_55px_rgba(239,68,68,0.28)]" :
                          accentColor === "blue" ? "border-blue-950/60 hover:border-blue-600 hover:shadow-[0_0_55px_rgba(59,130,246,0.28)]" :
                          accentColor === "purple" ? "border-purple-950/60 hover:border-purple-600 hover:shadow-[0_0_55px_rgba(168,85,247,0.28)]" :
                          "border-emerald-950/60 hover:border-emerald-600 hover:shadow-[0_0_55px_rgba(16,185,129,0.28)]"
                        }`}
                      >
                        <div className={`absolute right-[-120px] top-[-120px] w-[350px] h-[350px] rounded-full blur-[100px] group-hover:scale-125 transition-all duration-700 ${
                          accentColor === "red" ? "bg-red-600/20 group-hover:bg-red-600/30" :
                          accentColor === "blue" ? "bg-blue-600/20 group-hover:bg-blue-600/30" :
                          accentColor === "purple" ? "bg-purple-600/20 group-hover:bg-purple-600/30" :
                          "bg-emerald-600/20 group-hover:bg-emerald-600/30"
                        }`}></div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                          <div>
                            <div className={`mb-8 w-20 h-20 rounded-3xl border flex items-center justify-center overflow-hidden group-hover:rotate-3 group-hover:scale-110 transition-all duration-500 ${
                              accentColor === "red" ? "bg-red-600/10 border-red-900/50" :
                              accentColor === "blue" ? "bg-blue-600/10 border-blue-900/50" :
                              accentColor === "purple" ? "bg-purple-600/10 border-purple-900/50" :
                              "bg-emerald-600/10 border-emerald-900/50"
                            }`}>
                              <img src={service.icon} alt={service.alt} className={`w-full h-full object-cover ${service.iconScale}`} />
                            </div>

                            <p className={`${accent.text} uppercase tracking-[5px] text-sm font-bold mb-4`}>
                              {service.number}
                            </p>

                            <div className={`w-14 h-1 rounded-full mb-6 group-hover:w-24 transition-all duration-500 ${accent.bg}`}></div>

                            <h3 className={`text-4xl md:text-5xl font-black mb-6 transition-all duration-500 ${
                              accentColor === "red" ? "group-hover:text-red-500" :
                              accentColor === "blue" ? "group-hover:text-blue-500" :
                              accentColor === "purple" ? "group-hover:text-purple-500" :
                              "group-hover:text-emerald-500"
                            }`}>
                              {service.title}
                            </h3>

                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">{service.desc}</p>

                            <ul className="mt-6 space-y-3 text-gray-300">
                              {service.list.map((item, i) => (
                                <li key={i}>✓ {item}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="mt-10 flex flex-wrap gap-3">
                              {service.tags.map((tag, i) => (
                                <span key={i} className={`border px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 group-hover:text-white ${
                                  accentColor === "red" ? "text-red-400 border-red-800/70 group-hover:bg-red-600 group-hover:border-red-600" :
                                  accentColor === "blue" ? "text-blue-400 border-blue-800/70 group-hover:bg-blue-600 group-hover:border-blue-600" :
                                  accentColor === "purple" ? "text-purple-400 border-purple-800/70 group-hover:bg-purple-600 group-hover:border-purple-600" :
                                  "text-emerald-400 border-emerald-800/70 group-hover:bg-emerald-600 group-hover:border-emerald-600"
                                }`}>
                                  ✦ {tag}
                                </span>
                              ))}
                            </div>

                            <p className={`group/link relative mt-8 inline-flex items-center gap-2 text-white font-bold hover:-translate-y-1 transition-all duration-300 ${
                              accentColor === "red" ? "hover:text-red-500" :
                              accentColor === "blue" ? "hover:text-blue-500" :
                              accentColor === "purple" ? "hover:text-purple-500" :
                              "hover:text-emerald-500"
                            }`}>
                              <span>{service.cta}</span>
                              <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                              <span className={`absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-300 group-hover/link:w-full ${accent.bg}`}></span>
                            </p>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                )}

                {activeServiceTab === "tools" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[
                      {
                        title: "Editing Tools",
                        subtitle: "Software I use for cuts, pacing, color, motion, and storytelling.",
                        tools: [
                          ["DaVinci Resolve", "Advanced", "85%", "/logos/davinci resolve.jpg", "scale-130"],
                          ["CapCut", "Advanced", "90%", "/logos/capcut.webp", ""],
                          ["After Effects", "Intermediate", "65%", "/logos/after effect.jpg", ""],
                          ["Alight Motion", "Expert", "95%", "/logos/alight motion.jpg", "scale-120"],
                        ],
                      },
                      {
                        title: "Design Tools",
                        subtitle: "Tools I use for posters, layouts, graphics, and visual design.",
                        tools: [
                          ["Canva", "Advanced", "90%", "/logos/Canva.jpg", "scale-120"],
                          ["Lightroom", "Intermediate", "75%", "/logos/lightroon.jpg", "scale-120"],
                          ["PicsArt", "Advanced", "85%", "/logos/picsart.jpg", ""],
                          ["Photoshop", "Learning", "55%", "/logos/Photo Shop.jpg", "scale-120"],
                        ],
                      },
                    ].map((group, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                        className={`bg-[#0b0b0b] border rounded-3xl p-6 md:p-8 transition-all duration-700 hover:-translate-y-2 ${
                          accentColor === "red" ? "border-red-950/60 shadow-[0_0_35px_rgba(239,68,68,0.10)] hover:border-red-600/70 hover:shadow-[0_0_45px_rgba(239,68,68,0.20)]" :
                          accentColor === "blue" ? "border-blue-950/60 shadow-[0_0_35px_rgba(59,130,246,0.10)] hover:border-blue-600/70 hover:shadow-[0_0_45px_rgba(59,130,246,0.20)]" :
                          accentColor === "purple" ? "border-purple-950/60 shadow-[0_0_35px_rgba(168,85,247,0.10)] hover:border-purple-600/70 hover:shadow-[0_0_45px_rgba(168,85,247,0.20)]" :
                          "border-emerald-950/60 shadow-[0_0_35px_rgba(16,185,129,0.10)] hover:border-emerald-600/70 hover:shadow-[0_0_45px_rgba(16,185,129,0.20)]"
                        }`}
                      >
                        <div className="mb-8">
                          <h4 className="text-3xl font-black mb-3">{group.title}</h4>
                          <p className="text-gray-400 leading-relaxed">{group.subtitle}</p>
                        </div>

                        <div className="space-y-5">
                          {group.tools.map((tool, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 25 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.25 }}
                              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                              className={`group/tool bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-500 ${
                                accentColor === "red" ? "hover:border-red-600/60 hover:bg-red-950/10" :
                                accentColor === "blue" ? "hover:border-blue-600/60 hover:bg-blue-950/10" :
                                accentColor === "purple" ? "hover:border-purple-600/60 hover:bg-purple-950/10" :
                                "hover:border-emerald-600/60 hover:bg-emerald-950/10"
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                <div className="flex items-center gap-4">
                                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center overflow-hidden ${
                                    accentColor === "red" ? "bg-red-600/10 border-red-900/50" :
                                    accentColor === "blue" ? "bg-blue-600/10 border-blue-900/50" :
                                    accentColor === "purple" ? "bg-purple-600/10 border-purple-900/50" :
                                    "bg-emerald-600/10 border-emerald-900/50"
                                  }`}>
                                    <img src={tool[3]} alt={tool[0]} className={`w-full h-full object-cover ${tool[4]}`} />
                                  </div>

                                  <div>
                                    <h5 className={`font-black text-lg transition-all duration-300 ${
                                      accentColor === "red" ? "group-hover/tool:text-red-500" :
                                      accentColor === "blue" ? "group-hover/tool:text-blue-500" :
                                      accentColor === "purple" ? "group-hover/tool:text-purple-500" :
                                      "group-hover/tool:text-emerald-500"
                                    }`}>
                                      {tool[0]}
                                    </h5>
                                    <p className="text-gray-500 text-sm">Skill Level</p>
                                  </div>
                                </div>

                                <span className={`w-fit flex items-center gap-2 text-xs sm:text-sm font-bold px-3 py-1 rounded-full border ${
                                  tool[1] === "Expert"
                                    ? "text-red-400 border-red-700 bg-red-950/20"
                                    : tool[1] === "Advanced"
                                    ? "text-green-400 border-green-700 bg-green-950/20"
                                    : tool[1] === "Intermediate"
                                    ? "text-blue-400 border-blue-700 bg-blue-950/20"
                                    : "text-gray-300 border-gray-600 bg-white/5"
                                }`}>
                                  <span className={`w-2.5 h-2.5 rounded-full ${
                                    tool[1] === "Expert"
                                      ? "bg-red-500"
                                      : tool[1] === "Advanced"
                                      ? "bg-green-500"
                                      : tool[1] === "Intermediate"
                                      ? "bg-blue-500"
                                      : "bg-gray-300"
                                  }`}></span>
                                  {tool[1]}
                                </span>
                              </div>

                              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-1000 ${
                                    tool[1] === "Expert"
                                      ? "bg-[#ff3b3b] shadow-[0_0_12px_rgba(255,59,59,.5)]"
                                      : tool[1] === "Advanced"
                                      ? "bg-[#22c55e] shadow-[0_0_12px_rgba(34,197,94,.4)]"
                                      : tool[1] === "Intermediate"
                                      ? "bg-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,.4)]"
                                      : "bg-[#d1d5db]"
                                  }`}
                                  style={{ width: tool[2] }}
                                ></div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about" className="relative min-h-screen px-6 md:px-12 py-28 bg-transparent overflow-hidden">
          <div className={`absolute left-[-250px] top-[200px] w-[600px] h-[600px] rounded-full blur-[150px] ${
            accentColor === "red" ? "bg-red-600/20" :
            accentColor === "blue" ? "bg-blue-600/20" :
            accentColor === "purple" ? "bg-purple-600/20" :
            "bg-emerald-600/20"
          }`}></div>

          <div className={`absolute right-[-200px] bottom-[100px] w-[500px] h-[500px] rounded-full blur-[140px] ${
            accentColor === "red" ? "bg-red-600/10" :
            accentColor === "blue" ? "bg-blue-600/10" :
            accentColor === "purple" ? "bg-purple-600/10" :
            "bg-emerald-600/10"
          }`}></div>

          <div className="relative z-10 max-w-screen-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <p className={`${accent.text} uppercase tracking-[6px] text-sm font-bold mb-4`}>
                About Me
              </p>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-5">
                The Story Behind The Editor
              </h2>

              <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                A creative journey built on editing, storytelling, and visual design.
              </p>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`w-32 h-[2px] bg-gradient-to-r from-transparent mx-auto mb-16 opacity-80 ${
                accentColor === "red" ? "via-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]" :
                accentColor === "blue" ? "via-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]" :
                accentColor === "purple" ? "via-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]" :
                "via-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
              } to-transparent`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -80, rotate: -4, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative max-w-[560px] mx-auto w-full"
              >
                <div className={`absolute inset-0 rounded-full blur-[100px] ${
                  accentColor === "red" ? "bg-red-600/20" :
                  accentColor === "blue" ? "bg-blue-600/20" :
                  accentColor === "purple" ? "bg-purple-600/20" :
                  "bg-emerald-600/20"
                }`}></div>

                <div className={`relative bg-[#0b0b0b] border rounded-3xl overflow-hidden aspect-[4/5] group ${
                  accentColor === "red" ? "border-red-950/60 shadow-[0_0_45px_rgba(239,68,68,0.18)]" :
                  accentColor === "blue" ? "border-blue-950/60 shadow-[0_0_45px_rgba(59,130,246,0.18)]" :
                  accentColor === "purple" ? "border-purple-950/60 shadow-[0_0_45px_rgba(168,85,247,0.18)]" :
                  "border-emerald-950/60 shadow-[0_0_45px_rgba(16,185,129,0.18)]"
                }`}>
                  <img
                    src="/images/zeth 2.jpg"
                    alt="Stoiceth"
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <p className={`${accent.text} uppercase tracking-[4px] text-xs font-bold mb-2`}>
                      Stoiceth
                    </p>
                    <h3 className="text-2xl s:text-3xl font-black">
                      Video Editor • Designer • Filmmaker
                    </h3>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <p className={`${accent.text} uppercase tracking-[5px] text-sm font-bold mb-4`}>
                  Who I Am
                </p>

                <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                  Hi, I'm <span className={accent.text}>Stoiceth</span>.
                </h3>

                <div className="space-y-5 text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                  <p>
                    My name is Zeth Laurence Manalo, a Bachelor of Science in Computer Engineering student and a freelance creative based in the Philippines.
                  </p>

                  <p>
                    I started editing in 2020, and since then, I have continued exploring different styles, software, and storytelling techniques to improve my craft.
                  </p>

                  <p>
                    As part of the CETSO Creative Committee, I work on video editing, videography, and creative documentation. I also directed, wrote, produced, and edited my own short film titled <span className="text-white font-semibold">PAGLAHUTAY</span>.
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-2xl font-black mb-8">At A Glance</h4>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {[
                      ["Since", "2020", "Started Video Editing"],
                      ["Experience", "6+", "Years of Experience"],
                      ["Position", "Creative Committee", "CETSO"],
                      ["Education", "BSCpE", "Computer Engineering"],
                      ["Project", "PAGLAHUTAY", "Director & Editor"],
                      ["Based In", "Philippines", "Freelance Creative"],
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                        className={`group bg-white/5 border rounded-2xl p-5 hover:-translate-y-1 transition-all duration-500 ${
                          accentColor === "red" ? "border-red-950/60 hover:border-red-600 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]" :
                          accentColor === "blue" ? "border-blue-950/60 hover:border-blue-600 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]" :
                          accentColor === "purple" ? "border-purple-950/60 hover:border-purple-600 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]" :
                          "border-emerald-950/60 hover:border-emerald-600 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]"
                        }`}
                      >
                        <p className={`${accent.text} text-xs uppercase tracking-[3px] mb-2`}>
                          {item[0]}
                        </p>

                        <h5 className={`font-bold text-lg transition-all duration-300 ${
                          accentColor === "red" ? "group-hover:text-red-500" :
                          accentColor === "blue" ? "group-hover:text-blue-500" :
                          accentColor === "purple" ? "group-hover:text-purple-500" :
                          "group-hover:text-emerald-500"
                        }`}>
                          {item[1]}
                        </h5>

                        <p className="text-gray-400 text-sm">{item[2]}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="flex flex-wrap gap-5"
                >
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    className={`group relative inline-flex items-center gap-3 overflow-hidden ${accent.bg} ${accent.hoverBg} px-8 py-4 rounded-full font-bold text-white ${accent.glow} transition-all duration-300 hover:scale-105`}
                  >
                    <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                    <span className="relative z-10">Download Resume</span>
                    <span className="relative z-10 group-hover:translate-y-1 transition-transform duration-300">↓</span>
                  </a>

                  <a
                    href="#contact"
                    className={`group relative inline-flex items-center gap-3 overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 ${
                      accentColor === "red" ? "hover:border-red-500 hover:bg-red-950/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]" :
                      accentColor === "blue" ? "hover:border-blue-500 hover:bg-blue-950/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]" :
                      accentColor === "purple" ? "hover:border-purple-500 hover:bg-purple-950/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]" :
                      "hover:border-emerald-500 hover:bg-emerald-950/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                    }`}
                  >
                    <span className="absolute inset-0 bg-white/10 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                    <span className="relative z-10">Get in Touch</span>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative min-h-screen px-6 md:px-12 pt-36 pb-28 bg-transparent overflow-hidden">
          <div className={`absolute left-[-250px] top-[120px] w-[600px] h-[600px] rounded-full blur-[160px] animate-[pulse_8s_ease-in-out_infinite] ${
            accentColor === "red" ? "bg-red-600/20" :
            accentColor === "blue" ? "bg-blue-600/20" :
            accentColor === "purple" ? "bg-purple-600/20" :
            "bg-emerald-600/20"
          }`}></div>

          <div className={`absolute right-[-250px] bottom-[80px] w-[600px] h-[600px] rounded-full blur-[160px] animate-[pulse_10s_ease-in-out_infinite] ${
            accentColor === "red" ? "bg-red-600/10" :
            accentColor === "blue" ? "bg-blue-600/10" :
            accentColor === "purple" ? "bg-purple-600/10" :
            "bg-emerald-600/10"
          }`}></div>

          <div className="relative z-10 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="inline-flex items-center gap-3 text-green-400 text-sm font-bold bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                  </span>
                  Available for Freelance
                </motion.div>

                <div>
                  <p className={`${accent.text} uppercase tracking-[6px] text-sm font-bold mb-5`}>
                    Contact
                  </p>

                  <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] mb-6">
                    Let's Work
                    <br />
                    Together.
                  </h2>

                  <p className="text-white text-xl md:text-2xl font-black max-w-xl mb-5">
                    Your next project deserves more than just edits.
                    <br />
                    It deserves a story.
                  </p>

                  <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                    Have a project in mind or want to collaborate? I'm open for video editing,
                    graphic design, creative projects, and freelance opportunities.
                  </p>
                </div>

                <div className={`relative border-l-2 pl-5 ${
                  accentColor === "red" ? "border-red-600/50" :
                  accentColor === "blue" ? "border-blue-600/50" :
                  accentColor === "purple" ? "border-purple-600/50" :
                  "border-emerald-600/50"
                }`}>
                  <p className="italic text-gray-300 text-lg">
                    “Turning ideas into visuals that people remember.”
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
                  {[
                    ["6+", "Years Editing"],
                    ["2020", "Started"],
                    ["24h", "Response"],
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`group bg-white/5 border rounded-2xl p-5 hover:-translate-y-1 transition-all duration-500 ${
                        accentColor === "red" ? "border-red-950/60 hover:border-red-600 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]" :
                        accentColor === "blue" ? "border-blue-950/60 hover:border-blue-600 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]" :
                        accentColor === "purple" ? "border-purple-950/60 hover:border-purple-600 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]" :
                        "border-emerald-950/60 hover:border-emerald-600 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]"
                      }`}
                    >
                      <h3 className={`${accent.text} text-2xl font-black group-hover:scale-105 transition-all duration-300`}>
                        {item[0]}
                      </h3>
                      <p className="text-gray-400 text-sm">{item[1]}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  href="mailto:zethlaurencemanalo@gmail.com"
                  className={`group relative inline-flex items-center gap-3 overflow-hidden ${accent.bg} ${accent.hoverBg} px-8 py-4 rounded-full font-bold text-white ${accent.glow} transition-all duration-300 hover:scale-105`}
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                  <span className="relative z-10">Start a Project</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 70, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative bg-[#0b0b0b]/90 backdrop-blur-xl border rounded-3xl p-6 md:p-8 hover:-translate-y-2 transition-all duration-500 overflow-hidden ${
                  accentColor === "red" ? "border-red-950/60 shadow-[0_0_35px_rgba(239,68,68,0.12)] hover:border-red-600/60 hover:shadow-[0_0_45px_rgba(239,68,68,0.18)]" :
                  accentColor === "blue" ? "border-blue-950/60 shadow-[0_0_35px_rgba(59,130,246,0.12)] hover:border-blue-600/60 hover:shadow-[0_0_45px_rgba(59,130,246,0.18)]" :
                  accentColor === "purple" ? "border-purple-950/60 shadow-[0_0_35px_rgba(168,85,247,0.12)] hover:border-purple-600/60 hover:shadow-[0_0_45px_rgba(168,85,247,0.18)]" :
                  "border-emerald-950/60 shadow-[0_0_35px_rgba(16,185,129,0.12)] hover:border-emerald-600/60 hover:shadow-[0_0_45px_rgba(16,185,129,0.18)]"
                }`}
              >
                <div className={`absolute right-[-120px] top-[-120px] w-[300px] h-[300px] rounded-full blur-[100px] ${
                  accentColor === "red" ? "bg-red-600/20" :
                  accentColor === "blue" ? "bg-blue-600/20" :
                  accentColor === "purple" ? "bg-purple-600/20" :
                  "bg-emerald-600/20"
                }`}></div>

                <div className="relative z-10 space-y-5">
                  {[
                    {
                      label: "Email",
                      title: "zethlaurencemanalo@gmail.com",
                      desc: "Email Me →",
                      href: "mailto:zethlaurencemanalo@gmail.com",
                    },
                    {
                      label: "Location",
                      title: "Philippines",
                      desc: "Available remotely",
                    },
                    {
                      label: "Availability",
                      title: "Open for Freelance",
                      desc: "Projects & collaborations",
                    },
                    {
                      label: "Response",
                      title: "Within 24 Hours",
                      desc: "Usually active online",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 35 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5 last:border-b-0 last:pb-2 hover:pl-2 transition-all duration-300"
                    >
                      <div>
                        <p className={`${accent.text} uppercase tracking-[4px] text-xs font-bold mb-2`}>
                          {item.label}
                        </p>

                        <div className="inline-block">
                          <h3 className={`text-xl md:text-2xl font-black break-all transition-all duration-300 ${
                            accentColor === "red" ? "group-hover:text-red-500" :
                            accentColor === "blue" ? "group-hover:text-blue-500" :
                            accentColor === "purple" ? "group-hover:text-purple-500" :
                            "group-hover:text-emerald-500"
                          }`}>
                            {item.title}
                          </h3>

                          <div className={`w-0 h-[2px] group-hover:w-full transition-all duration-500 ${accent.bg}`}></div>
                        </div>
                      </div>

                      {item.href ? (
                        <a href={item.href} className={`text-gray-400 transition-all ${
                          accentColor === "red" ? "group-hover:text-red-500" :
                          accentColor === "blue" ? "group-hover:text-blue-500" :
                          accentColor === "purple" ? "group-hover:text-purple-500" :
                          "group-hover:text-emerald-500"
                        }`}>
                          {item.desc}
                        </a>
                      ) : (
                        <p className="text-gray-400">{item.desc}</p>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 mt-10 pt-8 border-t border-white/10">
                  <p className="text-gray-400 mb-5">Connect with me</p>

                  <div className="flex flex-wrap gap-4">
                    {[
                      {
                        icon: <FaFacebookF />,
                        link: "https://www.facebook.com/share/1AgowuTEAL/",
                      },
                      {
                        icon: <FaTiktok />,
                        link: "https://www.tiktok.com/@stoiceth?_r=1&_t=ZS-97FJgtYxWCt",
                      },
                      {
                        icon: <FaInstagram />,
                        link: "https://www.instagram.com/stoiceth?igsh=MXhiZGJtNHlhcjN0ZQ==",
                      },
                    ].map((item, index) => (
                      <motion.a
                        key={index}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-xl hover:scale-110 hover:rotate-6 transition-all duration-300 ${
                          accentColor === "red" ? "hover:border-red-600 hover:text-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]" :
                          accentColor === "blue" ? "hover:border-blue-600 hover:text-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]" :
                          accentColor === "purple" ? "hover:border-purple-600 hover:text-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]" :
                          "hover:border-emerald-600 hover:text-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                        }`}
                      >
                        {item.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-24">
              <div
                className={`w-full h-px bg-gradient-to-r from-transparent ${
                  accentColor === "red"
                    ? "via-red-500/50"
                    : accentColor === "blue"
                    ? "via-blue-500/50"
                    : accentColor === "purple"
                    ? "via-purple-500/50"
                    : "via-emerald-500/50"
                } to-transparent mb-8`}
              ></div>

              <motion.footer
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm"
              >
                <p className="font-bold tracking-[4px] text-white">
                  STOI
                  <span className={accent.text}>C</span>
                  ETH
                </p>

                <p>© 2026 Stoiceth. All rights reserved.</p>

                <p>Video Editor • Designer • Filmmaker</p>
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