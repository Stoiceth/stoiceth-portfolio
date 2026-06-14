import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaTiktok,
} from "react-icons/fa";

function App() {
  const [activeCategory, setActiveCategory] = useState("video");
  const [activeServiceTab, setActiveServiceTab] = useState("services");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shineStyle, setShineStyle] = useState({left: "-20%", duration: 2,});
  const [activeSection, setActiveSection] = useState("home");
  const [spotlight, setSpotlight] = useState({x: 50, y: 50, active: false,});
  const [darkMode, setDarkMode] = useState(true);
  const [parallax, setParallax] = useState({x: 0, y: 0,});
  const [mouseGlow, setMouseGlow] = useState({x: 0, y: 0,});
  const [showIntro, setShowIntro] = useState(true);
  const [typedLogo, setTypedLogo] = useState("");
  const [loadingStage, setLoadingStage] = useState("PREPARING EXPERIENCE");
  
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
    sections.forEach((section) => {
      const element = document.getElementById(section);

      if (element) {
        const rect = element.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section);
        }
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const navLinkClass = (section) =>
    `relative transition-all duration-300 hover:-translate-y-1 ${
      activeSection === section
        ? "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] after:w-full"
        : "text-gray-300 hover:text-red-500 after:w-0"
    } after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full`;

const animatedText = (text, extraClass = "", isRed = false) => (
  <span className={extraClass}>
    {text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-300 hover:-translate-y-2 hover:scale-110 ${
          char === " " ? "w-[0.35em]" : ""
        } ${
          isRed
            ? "text-red-600 hover:text-white hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.8)]"
            : "text-white hover:text-red-500 hover:drop-shadow-[0_0_14px_rgba(239,68,68,0.9)]"
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



  return (
    <div
      className="relative min-h-screen bg-black text-white overflow-x-hidden scroll-smooth"
      onMouseMove={(e) => {
        setMouseGlow({
          x: e.clientX,
          y: e.clientY,
        });
      }}
    >

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
        background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(239,68,68,0.10) 45%, transparent 75%)",
      }}
    />

      <nav className="fixed top-5 left-0 w-full z-50 px-4 md:px-8 animate-[navDrop_0.8s_ease-out]">
        <div className="group relative max-w-7xl mx-auto h-20 px-4 md:px-6 flex justify-between items-center rounded-full overflow-hidden bg-black/35 backdrop-blur-2xl border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_35px_rgba(0,0,0,0.5)] hover:border-red-500/40 transition-all duration-300">
  
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

          <div className="flex items-center gap-4">
            <img
              src="/images/logo.jpg"
              alt="Stoiceth"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border border-red-900 shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:scale-105 transition-all duration-300"
            />

            <h1 className="text-base sm:text-lg md:text-2xl font-black tracking-[3px] md:tracking-[6px]">
              STOI<span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">C</span>ETH
            </h1>
          </div>

          <div className="hidden md:flex gap-10 text-sm uppercase tracking-wider">
            <a href="#home" className={navLinkClass("home")}>
              Home
            </a>

            <a href="#works" className={navLinkClass("works")}>
              Works
            </a>

            <a href="#services" className={navLinkClass("services")}>
              Services
            </a>

            <a href="#about" className={navLinkClass("about")}>
              About
            </a>
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_40px_rgba(255,0,0,0.7)] transition-all duration-300 hover:scale-105"
          >
            Contact
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl hover:border-red-600 hover:text-red-500 transition-all"
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
        </div>

       {isMenuOpen && (
          <div className="md:hidden max-w-5xl mx-auto mt-3 px-5 py-6 bg-black/95 border border-white/10 rounded-3xl shadow-[0_0_35px_rgba(0,0,0,0.7)] backdrop-blur-md">

            <div className="flex flex-col gap-4 text-sm uppercase tracking-widest">

              <a
                onClick={() => setIsMenuOpen(false)}
                href="#home"
                className={
                  activeSection === "home"
                    ? "text-red-500 font-bold"
                    : "text-gray-300 hover:text-red-500 transition-all"
                }
              >
                Home
              </a>

              <a
                onClick={() => setIsMenuOpen(false)}
                href="#works"
                className={
                  activeSection === "works"
                    ? "text-red-500 font-bold"
                    : "text-gray-300 hover:text-red-500 transition-all"
                }
              >
                Works
              </a>

              <a
                onClick={() => setIsMenuOpen(false)}
                href="#services"
                className={
                  activeSection === "services"
                    ? "text-red-500 font-bold"
                    : "text-gray-300 hover:text-red-500 transition-all"
                }
              >
                Services
              </a>

              <a
                onClick={() => setIsMenuOpen(false)}
                href="#about"
                className={
                  activeSection === "about"
                    ? "text-red-500 font-bold"
                    : "text-gray-300 hover:text-red-500 transition-all"
                }
              >
                About
              </a>

              <a
                onClick={() => setIsMenuOpen(false)}
                href="#contact"
                className={`mt-3 text-center px-5 py-3 rounded-full font-bold shadow-[0_0_25px_rgba(255,0,0,0.4)] transition-all ${
                  activeSection === "contact"
                    ? "bg-red-700 text-white"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Contact
              </a>

            </div>

          </div>
        )}
      </nav>

      <section
        id="home"
        className="relative min-h-screen pt-36 md:pt-28 lg:pt-20 flex items-center overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();

          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          setParallax({
            x,
            y,
          });
        }}
        onMouseLeave={() => {
          setParallax({
            x: 0,
            y: 0,
          });
        }}
      >
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-between">
          <div className="relative w-full">
            <div
              className="absolute right-[-50px] top-[0px] w-[650px] h-[350px] rounded-full bg-red-600/30 blur-[120px] z-0 opacity-0 animate-[heroGlow_1.2s_ease_2.8s_forwards]"
              style={{
                transform: `translate(${parallax.x * 25}px, ${parallax.y * 25}px)`,
                transition: "transform 250ms ease-out",
              }}
            ></div>

            <div
              className="absolute right-[1000px] top-[-400px] w-[800px] h-[500px] rounded-full bg-red-600/30 blur-[120px] z-0 opacity-0 animate-[heroGlow_1.2s_ease_2.9s_forwards]"
              style={{
                transform: `translate(${parallax.x * 15}px, ${parallax.y * 15}px)`,
                transition: "transform 250ms ease-out",
              }}
            ></div>

            <div className="relative z-20 max-w-none">
              <p className="uppercase tracking-[7px] text-red-500 text-xs md:text-sm font-bold mb-5 opacity-0 animate-[heroFadeUp_0.7s_ease_3.0s_forwards]">
                Available for Freelance
              </p>

              <h1 className="font-black uppercase leading-[0.88] tracking-tight">
                <div className="opacity-0 animate-[heroFadeUp_0.8s_ease_3.2s_forwards]">
                  {animatedText(
                    "Freelance",
                    "block text-[2.8rem] sm:text-[4rem] lg:text-[5.8rem] xl:text-[6.2rem]",
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
                  <div className="opacity-0 animate-[heroFadeUp_0.8s_ease_3.4s_forwards]">
                    {animatedText("Video Editor", "block", true)}
                  </div>

                  <div className="opacity-0 animate-[heroFadeUp_0.8s_ease_3.6s_forwards]">
                    {animatedText("& Designer", "block", true)}
                  </div>
                </span>
              </h1>

              <p className="text-gray-200 text-base md:text-xl max-w-xl leading-relaxed mt-8 mb-10 md:mb-12 opacity-0 animate-[heroFadeUp_0.8s_ease_3.8s_forwards]">
                Crafting cinematic edits, motion graphics, and visual stories that leave a lasting impression.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto opacity-0 animate-[heroFadeUp_0.8s_ease_4.0s_forwards]">
                <a
                  href="#works"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-red-600 hover:bg-red-700 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.75)] transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                  <span className="relative z-10">View Works</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </a>

                <a
                  href="#contact"
                  className="group relative w-full sm:w-fit inline-flex items-center justify-center gap-3 overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-red-500 hover:bg-red-950/40 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]"
                >
                  <span className="absolute inset-0 bg-white/10 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                  <span className="relative z-10">Get in Touch</span>
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>

            <div
              className="relative mt-12 xl:mt-0 mx-auto xl:absolute xl:right-[40px] 2xl:right-[-20px] xl:bottom-[-85px] z-30 flex justify-center w-fit opacity-0 animate-[heroImageReveal_1.2s_ease_4.2s_forwards]"
              onMouseEnter={() =>
                setSpotlight((prev) => ({
                  ...prev,
                  active: true,
                }))
              }
              onMouseLeave={() =>
                setSpotlight((prev) => ({
                  ...prev,
                  active: false,
                }))
              }
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();

                setSpotlight({
                  x: ((e.clientX - rect.left) / rect.width) * 100,
                  y: ((e.clientY - rect.top) / rect.height) * 100,
                  active: true,
                });
              }}
            >
              <div className="absolute right-[18%] top-[20%] w-48 h-48 rounded-full bg-red-600/15 blur-[100px]"></div>

              <img
                src="/images/zeth.png"
                alt="Stoiceth"
                className="relative z-10 w-[220px] sm:w-[280px] md:w-[340px] lg:w-[380px] xl:w-[46vw] max-w-[700px] object-contain brightness-[0.18] contrast-[1.08] saturate-[0.9] animate-[float_6s_ease-in-out_infinite]"
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

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 text-[10px] sm:text-xs md:text-base uppercase tracking-wide md:tracking-widest text-gray-200 text-center px-4 opacity-0 animate-[heroFadeUp_0.8s_ease_4.3s_forwards]">
          Video Editor • Designer • Filmmaker
        </div>
      </section>






      <section id="works" className="relative min-h-screen px-6 md:px-12 py-28 bg-transparent overflow-hidden">
        <div className="absolute left-[-200px] top-[150px] w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[130px]"></div>
        <div className="absolute right-[-250px] bottom-[100px] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]"></div>

        <div className="relative z-10 max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <p className="text-red-500 uppercase tracking-[6px] text-sm font-bold mb-4">
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
            className="max-w-xl mx-auto mb-14 p-2 rounded-full border border-red-900/50 bg-white/5 backdrop-blur-md flex gap-2"
          >

            <button
              onClick={() => setActiveCategory("video")}
              className={`w-1/2 py-4 rounded-full font-bold transition-all duration-500 ease-out hover:-translate-y-1 ${
                activeCategory === "video"
                  ? "bg-red-600 text-white shadow-[0_0_35px_rgba(239,68,68,0.45)]"
                  : "bg-black/60 text-gray-300 border border-white/5 hover:border-red-600 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
              }`}
            >
              Video Editing
            </button>

            <button
              onClick={() => setActiveCategory("design")}
              className={`w-1/2 py-4 rounded-full font-bold transition-all duration-500 ease-out hover:-translate-y-1 ${
                activeCategory === "design"
                  ? "bg-red-600 text-white shadow-[0_0_35px_rgba(239,68,68,0.45)]"
                  : "bg-black/60 text-gray-300 border border-white/5 hover:border-red-600 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
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
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                  className="group relative rounded-3xl overflow-hidden bg-[#0b0b0b] border border-red-950/60 transition-all duration-700 ease-out hover:-translate-y-4 hover:scale-[1.02] hover:border-red-500 hover:shadow-[0_0_60px_rgba(239,68,68,0.28)]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-red-500/10 via-transparent to-red-700/10"></div>

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
                    <h3 className="text-2xl font-black mb-4 transition-all duration-500 group-hover:text-red-500">
                      {work.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed mb-8">
                      {work.desc}
                    </p>

                    <div className="flex justify-between items-center gap-4">
                      <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600">
                        <>
                          ✦ {work.tag}
                        </>
                      </span>

                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative inline-flex items-center gap-2 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:text-red-500"
                      >
                        <span>View Collection</span>

                        <span className="transition-all duration-300 group-hover/link:translate-x-1">
                          →
                        </span>

                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover/link:w-full"></span>
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
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                  className="group relative rounded-3xl overflow-hidden bg-[#0b0b0b] border border-red-950/60 transition-all duration-700 ease-out hover:-translate-y-4 hover:scale-[1.02] hover:border-red-500 hover:shadow-[0_0_60px_rgba(239,68,68,0.28)]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-red-500/10 via-transparent to-red-700/10"></div>

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
                    <h3 className="text-2xl font-black mb-4 transition-all duration-500 group-hover:text-red-500">
                      {work.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed mb-8">
                      {work.desc}
                    </p>

                    <div className="flex justify-between items-center gap-4">
                      <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600">
                        <>
                          ✦ {work.tag}
                        </>
                      </span>

                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative inline-flex items-center gap-2 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:text-red-500"
                      >
                        <span>View Collection</span>

                        <span className="transition-all duration-300 group-hover/link:translate-x-1">
                          →
                        </span>

                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover/link:w-full"></span>
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
          <div className="absolute left-[-250px] top-[150px] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]"></div>
          <div className="absolute right-[-200px] bottom-[100px] w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[140px]"></div>

          <div className="relative z-10 max-w-screen-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <p className="text-red-500 uppercase tracking-[6px] text-sm font-bold mb-4">
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
              className="w-32 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-14 opacity-80 shadow-[0_0_12px_rgba(239,68,68,0.5)]"
            ></motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                className="space-y-5 sticky top-28 self-start"
              >
                <button
                  onClick={() => setActiveServiceTab("services")}
                  className={`relative w-full text-left rounded-3xl p-6 border overflow-hidden hover:-translate-y-1 transition-all duration-500 ${
                    activeServiceTab === "services"
                      ? "bg-red-600 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.45)] scale-[1.02]"
                      : "bg-[#0b0b0b] border-red-950/60 hover:border-red-600 hover:shadow-[0_0_25px_rgba(255,0,0,0.2)]"
                  }`}
                >
                  <p className="text-sm uppercase tracking-[4px] mb-3 opacity-80">● Service List</p>
                  <h3 className="text-2xl font-black mb-2">Services</h3>
                  <p className={activeServiceTab === "services" ? "text-white/80" : "text-gray-400"}>
                    Explore what I can offer.
                  </p>
                </button>

                <button
                  onClick={() => setActiveServiceTab("tools")}
                  className={`relative w-full text-left rounded-3xl p-6 border overflow-hidden hover:-translate-y-1 transition-all duration-500 ${
                    activeServiceTab === "tools"
                      ? "bg-red-600 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.45)] scale-[1.02]"
                      : "bg-[#0b0b0b] border-red-950/60 hover:border-red-600 hover:shadow-[0_0_25px_rgba(255,0,0,0.2)]"
                  }`}
                >
                  <p className="text-sm uppercase tracking-[4px] mb-3 opacity-80">● Creative Stack</p>
                  <h3 className="text-2xl font-black mb-2">Creative Tools</h3>
                  <p className={activeServiceTab === "tools" ? "text-white/80" : "text-gray-400"}>
                    See the apps I use.
                  </p>
                </button>
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
                        className="group relative min-h-[430px] bg-[#0b0b0b] border border-red-950/60 rounded-3xl p-8 md:p-10 overflow-hidden hover:border-red-600 hover:shadow-[0_0_55px_rgba(255,0,0,0.28)] hover:-translate-y-3 transition-all duration-700 ease-out"
                      >
                        <div className="absolute right-[-120px] top-[-120px] w-[350px] h-[350px] bg-red-600/20 rounded-full blur-[100px] group-hover:bg-red-600/30 group-hover:scale-125 transition-all duration-700"></div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                          <div>
                            <div className="mb-8 w-20 h-20 rounded-3xl bg-red-600/10 border border-red-900/50 flex items-center justify-center overflow-hidden group-hover:rotate-3 group-hover:scale-110 transition-all duration-500">
                              <img src={service.icon} alt={service.alt} className={`w-full h-full object-cover ${service.iconScale}`} />
                            </div>

                            <p className="text-red-500 uppercase tracking-[5px] text-sm font-bold mb-4">{service.number}</p>
                            <div className="w-14 h-1 bg-red-500 rounded-full mb-6 group-hover:w-24 transition-all duration-500"></div>

                            <h3 className="text-4xl md:text-5xl font-black mb-6 group-hover:text-red-500 transition-all duration-500">
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
                                <span key={i} className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600">
                                  ✦ {tag}
                                </span>
                              ))}
                            </div>

                            <p className="group/link relative mt-8 inline-flex items-center gap-2 text-white font-bold hover:text-red-500 hover:-translate-y-1 transition-all duration-300">
                              <span>{service.cta}</span>
                              <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover/link:w-full"></span>
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
                        className="bg-[#0b0b0b] border border-red-950/60 rounded-3xl p-6 md:p-8 shadow-[0_0_35px_rgba(255,0,0,0.10)] hover:border-red-600/70 hover:-translate-y-2 hover:shadow-[0_0_45px_rgba(239,68,68,0.20)] transition-all duration-700"
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
                              className="group/tool bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:border-red-600/60 hover:bg-red-950/10 hover:-translate-y-1 transition-all duration-500"
                            >
                              <div className="flex items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-900/50 flex items-center justify-center overflow-hidden">
                                    <img src={tool[3]} alt={tool[0]} className={`w-full h-full object-cover ${tool[4]}`} />
                                  </div>

                                  <div>
                                    <h5 className="font-black text-lg group-hover/tool:text-red-500 transition-all duration-300">{tool[0]}</h5>
                                    <p className="text-gray-500 text-sm">Skill Level</p>
                                  </div>
                                </div>

                                <span className={`flex items-center gap-2 text-sm font-bold px-3 py-1 rounded-full border ${
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
          <div className="absolute left-[-250px] top-[200px] w-[600px] h-[600px] rounded-full bg-red-600/20 blur-[150px]"></div>
          <div className="absolute right-[-200px] bottom-[100px] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[140px]"></div>

          <div className="relative z-10 max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-red-500 uppercase tracking-[6px] text-sm font-bold mb-4">
                About Me
              </p>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-5">
                More Than Just an Editor
              </h2>

              <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                I create visuals with purpose, emotion, and story.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
              <div className="relative max-w-[560px] mx-auto w-full">
                <div className="absolute inset-0 bg-red-600/20 blur-[100px] rounded-full"></div>

                <div className="relative bg-[#0b0b0b] border border-red-950/60 rounded-3xl overflow-hidden shadow-[0_0_35px_rgba(255,0,0,0.15)] aspect-[4/5]">
                  <img
                    src="/images/zeth 2.jpg"
                    alt="The Director"
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-3xl md:text-5xl font-black mb-6">
                  Hi, I'm <span className="text-red-500">Stoiceth</span>.
                </h3>

                <div className="space-y-5 text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                  <p>
                    My name is Zeth Laurence Manalo, a Bachelor of Science in Computer Engineering student and a creative video editor based in the Philippines.
                  </p>

                  <p>
                    I started editing in 2020, and since then, I have continued exploring different styles, software, and storytelling techniques to improve my craft.
                  </p>

                  <p>
                    As part of the CETSO Creative Committee, I work on video editing, videography, and creative documentation. I also directed, wrote, produced, and edited my own short film titled PAGLAHUTAY.
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-2xl font-black mb-8">
                    AT A GLANCE
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                    <div className="bg-white/5 border border-red-950/60 rounded-2xl p-5 hover:border-red-600 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-300">
                      <p className="text-xs uppercase tracking-[3px] text-red-500 mb-2">
                        Since
                      </p>
                      <h5 className="font-bold text-lg">2020</h5>
                      <p className="text-gray-400 text-sm">
                        Started Video Editing 
                      </p>
                    </div>

                    <div className="bg-white/5 border border-red-950/60 rounded-2xl p-5 hover:border-red-600 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-300">
                      <p className="text-xs uppercase tracking-[3px] text-red-500 mb-2">
                        Experience
                      </p>
                      <h5 className="font-bold text-lg">6+</h5>
                      <p className="text-gray-400 text-sm">
                        Years of Experience
                      </p>
                    </div>

                    <div className="bg-white/5 border border-red-950/60 rounded-2xl p-5 hover:border-red-600 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-300">
                      <p className="text-xs uppercase tracking-[3px] text-red-500 mb-2">
                        Position
                      </p>
                      <h5 className="font-bold text-lg">Creative Committee</h5>
                      <p className="text-gray-400 text-sm">
                        CETSO 
                      </p>
                    </div>

                    <div className="bg-white/5 border border-red-950/60 rounded-2xl p-5 hover:border-red-600 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-300">
                      <p className="text-xs uppercase tracking-[3px] text-red-500 mb-2">
                        Education
                      </p>
                      <h5 className="font-bold text-lg">BSCpE</h5>
                      <p className="text-gray-400 text-sm">
                        Computer Engineering
                      </p>
                    </div>

                    <div className="bg-white/5 border border-red-950/60 rounded-2xl p-5 hover:border-red-600 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-300">
                      <p className="text-xs uppercase tracking-[3px] text-red-500 mb-2">
                        Project
                      </p>
                      <h5 className="font-bold text-lg">PAGLAHUTAY</h5>
                      <p className="text-gray-400 text-sm">
                        Director & Editor
                      </p>
                    </div>

                    <div className="bg-white/5 border border-red-950/60 rounded-2xl p-5 hover:border-red-600 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-300">
                      <p className="text-xs uppercase tracking-[3px] text-red-500 mb-2">
                        Based In
                      </p>
                      <h5 className="font-bold text-lg">Philippines</h5>
                      <p className="text-gray-400 text-sm">
                        Freelance Creative
                      </p>
                    </div>

                  </div>
                </div>

                <div className="flex flex-wrap gap-5">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    className="group relative inline-flex items-center gap-3 overflow-hidden bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full font-bold shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.75)] transition-all duration-300 hover:scale-105"
                  >
                    <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                    <span className="relative z-10">Download Resume</span>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                      ↓
                    </span>
                  </a>

                  <a
                    href="#contact"
                    className="group relative inline-flex items-center gap-3 overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-red-500 hover:bg-red-950/40 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]"
                  >
                    <span className="absolute inset-0 bg-white/10 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                    <span className="relative z-10">Get in Touch</span>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative min-h-screen px-6 md:px-12 pt-36 pb-28 bg-transparent overflow-hidden">
          <div className="absolute left-[-250px] top-[120px] w-[600px] h-[600px] rounded-full bg-red-600/20 blur-[160px] animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute right-[-250px] bottom-[80px] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[160px] animate-[pulse_10s_ease-in-out_infinite]"></div>

          <div className="relative z-10 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
              
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 text-green-400 text-sm font-bold">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                  </span>
                  Available for Freelance
                </div>

                <div>
                  <p className="text-red-500 uppercase tracking-[6px] text-sm font-bold mb-5">
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

                <p className="italic text-gray-400 text-lg">
                  “Turning ideas into visuals that people remember.”
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
                  <div className="bg-white/5 border border-red-950/60 rounded-2xl p-5 hover:border-red-600 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-300">
                    <h3 className="text-2xl font-black text-red-500">6+</h3>
                    <p className="text-gray-400 text-sm">Years Editing</p>
                  </div>

                  <div className="bg-white/5 border border-red-950/60 rounded-2xl p-5 hover:border-red-600 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-300">
                    <h3 className="text-2xl font-black text-red-500">2020</h3>
                    <p className="text-gray-400 text-sm">Started</p>
                  </div>

                  <div className="bg-white/5 border border-red-950/60 rounded-2xl p-5 hover:border-red-600 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all duration-300">
                    <h3 className="text-2xl font-black text-red-500">24h</h3>
                    <p className="text-gray-400 text-sm">Response</p>
                  </div>
                </div>

                <a
                  href="mailto:zethlaurencemanalo@gmail.com"
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full font-bold shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.75)] transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></span>
                  <span className="relative z-10">Start a Project</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>

              <div className="bg-[#0b0b0b] border border-red-950/60 rounded-3xl p-6 md:p-8 shadow-[0_0_35px_rgba(255,0,0,0.12)] hover:border-red-600/60 hover:-translate-y-2 hover:shadow-[0_0_45px_rgba(255,0,0,0.18)] transition-all duration-500">
                <div className="space-y-5">
                  
                  <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
                    <div>
                      <p className="text-red-500 uppercase tracking-[4px] text-xs font-bold mb-2">
                        Email
                      </p>

                      <div className="inline-block">
                        <h3 className="text-xl md:text-2xl font-black break-all">
                          zethlaurencemanalo@gmail.com
                        </h3>
                        <div className="w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-500"></div>
                      </div>
                    </div>

                    <a
                      href="mailto:zethlaurencemanalo@gmail.com"
                      className="text-gray-400 group-hover:text-red-500 transition-all"
                    >
                      Email Me →
                    </a>
                  </div>

                  <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5 hover:pl-2 transition-all duration-300">
                    <div>
                      <p className="text-red-500 uppercase tracking-[4px] text-xs font-bold mb-2">
                        Location
                      </p>
                      <h3 className="text-xl md:text-2xl font-black">
                        Philippines
                      </h3>
                    </div>

                    <p className="text-gray-400">
                      Available remotely
                    </p>
                  </div>

                  <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5 hover:pl-2 transition-all duration-300">
                    <div>
                      <p className="text-red-500 uppercase tracking-[4px] text-xs font-bold mb-2">
                        Availability
                      </p>
                      <h3 className="text-xl md:text-2xl font-black">
                        Open for Freelance
                      </h3>
                    </div>

                    <p className="text-gray-400">
                      Projects & collaborations
                    </p>
                  </div>

                  <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 hover:pl-2 transition-all duration-300">
                    <div>
                      <p className="text-red-500 uppercase tracking-[4px] text-xs font-bold mb-2">
                        Response
                      </p>
                      <h3 className="text-xl md:text-2xl font-black">
                        Within 24 Hours
                      </h3>
                    </div>

                    <p className="text-gray-400">
                      Usually active online
                    </p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-gray-400 mb-5">
                    Connect with me
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {[
                      {
                        icon: <FaFacebookF />,
                        link: "https://facebook.com/yourprofile",
                      },
                      {
                        icon: <FaTiktok />,
                        link: "https://tiktok.com/@yourprofile",
                      },
                      {
                        icon: <FaInstagram />,
                        link: "https://instagram.com/yourprofile",
                      },
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-xl hover:border-red-600 hover:text-red-500 hover:scale-110 hover:rotate-6 hover:shadow-[0_0_20px_rgba(255,0,0,0.25)] transition-all duration-300"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <footer className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-gray-500 text-sm">
              <p className="font-bold tracking-[4px] text-white">
                STOI<span className="text-red-500">C</span>ETH
              </p>

              <p>
                © 2026 Stoiceth. All rights reserved.
              </p>

              <p>
                Video Editor • Designer • Filmmaker
              </p>
            </footer>
          </div>
        </section>
    </div>
  );
}

export default App;