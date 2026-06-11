import { useEffect, useState } from "react";

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
  
useEffect(() => {
  const randomShine = () => {
    const randomDelay = Math.random() * 7000 + 4000; // 4s - 11s

    setTimeout(() => {
      setShineStyle({
        left: `${Math.floor(Math.random() * 80) - 20}%`,
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

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
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
        className="relative min-h-screen pt-24 lg:pt-20 flex items-center overflow-hidden"
      >
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-between">
          <div className="relative w-full">
            
            <div className="absolute right-[-50px] top-[0px] w-[800px] h-[500px] rounded-full bg-red-600/30 blur-[120px] z-0"></div>

            <div className="absolute right-[800px] top-[350px] w-[500px] h-[500px] rounded-full bg-red-600/30 blur-[120px] z-0"></div>

            <div className="absolute right-[1000px] top-[-400px] w-[800px] h-[500px] rounded-full bg-red-600/30 blur-[120px] z-0"></div>

            <div className="relative z-20 max-w-none">
              <h1 className="font-black uppercase leading-[0.9] tracking-tight text-[8rem] md:text-[10rem]">
                <span className="block text-[2.5rem] sm:text-[4rem] lg:text-[6rem] xl:text-[7rem]">
                  Freelance
                </span>

                <span
                  className="block md:hidden text-[3.2rem] font-black text-red-600"
                  style={{
                    textShadow: `
                      1px 1px 0 #fff,
                      2px 2px 0 rgba(0,0,0,.2)
                    `,
                  }}
                >
                  VIDEO EDITOR &
                  <br />
                  DESIGNER
                </span>

                <span className="hidden md:block text-[2.2rem] sm:text-[4rem] md:text-[5.2rem] leading-none">
                  <span
                    className="text-red-600"
                    style={{
                      textShadow: `
                        1px 1px 0 #fff,
                        2px 2px 0 rgba(0,0,0,.2)
                      `,
                    }}
                  >
                    VIDEO EDITOR & DESIGNER
                  </span>{" "}
                </span>
              </h1>

              <p className="text-gray-200 text-base md:text-xl max-w-xl leading-relaxed mt-8 mb-10 md:mb-12">
                Stoiceth, a freelance video editor based in the Philippines.
                Helping creators and brands tell stories through cinematic editing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
                <a
                  href="#works"
                  className="w-full sm:w-fit text-center bg-red-600 hover:bg-red-700 px-8 py-4 md:px-15 md:py-6 rounded-full font-bold shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_40px_rgba(255,0,0,0.7)] transition-all duration-300 hover:scale-105"
                >
                  View Works
                </a>

                <a
                  href="#contact"
                  className="w-full sm:w-fit text-center bg-black hover:bg-red-950/60 px-8 py-4 md:px-15 md:py-6 rounded-full font-bold border border-white/10 hover:border-red-600 shadow-[0_0_20px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-105"
                >
                  Get in Touch
                </a>
              </div>
            </div>

            <div className=" relative lg:absolute lg:right-0 xl:right-[-20px] lg:bottom-[-50px] xl:bottom-[-130px] mt-12 lg:mt-0 z-30 flex justify-center">
              <img
                src="/images/zeth.png"
                alt="Stoiceth"
                className="relative z-10 w-[260px] sm:w-[340px] md:w-[430px] lg:w-[42vw] xl:w-[45vw] max-w-[720px] object-contain hover:scale-105 transition-all duration-500 animate-[float_6s_ease-in-out_infinite]"
              />
            </div>

          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 text-[10px] sm:text-xs md:text-base uppercase tracking-wide md:tracking-widest text-gray-200 text-center px-4">
          Video Editor • Designer • Filmmaker
        </div>

        

      </section>

      <section id="works" className="relative min-h-screen px-6 md:px-12 py-28 bg-transparent overflow-hidden">
        <div className="absolute left-[-200px] top-[150px] w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[130px]"></div>
        <div className="absolute right-[-250px] bottom-[100px] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]"></div>

        <div className="relative z-10 max-w-screen-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-500 uppercase tracking-[6px] text-sm font-bold mb-4">
              My Works
            </p>

            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-5">
              Featured Works
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
               A collection of projects showcasing my skills in video editing, motion graphics, and graphic design.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-14 p-2 rounded-full border border-red-900/50 bg-white/5 backdrop-blur-md flex gap-2">
            <button
              onClick={() => setActiveCategory("video")}
              className={`w-1/2 py-4 rounded-full font-bold transition-all duration-300 ${
                activeCategory === "video"
                  ? "bg-red-600 text-white shadow-[0_0_25px_rgba(255,0,0,0.35)]"
                  : "bg-black/60 text-gray-300 border border-white/5 hover:border-red-600 hover:text-white"
              }`}
            >
              Video Editing
            </button>

            <button
              onClick={() => setActiveCategory("design")}
              className={`w-1/2 py-4 rounded-full font-bold transition-all duration-300 ${
                activeCategory === "design"
                  ? "bg-red-600 text-white shadow-[0_0_25px_rgba(255,0,0,0.35)]"
                  : "bg-black/60 text-gray-300 border border-white/5 hover:border-red-600 hover:text-white"
              }`}
            >
              Graphic Design
            </button>
          </div>

          {activeCategory === "video" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group rounded-3xl overflow-hidden bg-[#0b0b0b] border border-red-950/60 hover:border-red-600/80 shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(255,0,0,0.25)] transition-all duration-500 hover:-translate-y-3">
                <div className="h-64 overflow-hidden relative">
                <img
                  src="/images/works/video-projects.jpg"
                  alt="Video Projects"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              </div>

                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4">
                    Video Projects
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-8">
                    Short films, documentaries, long-form edits, and cinematic storytelling projects.
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">
                      Storytelling
                    </span>

                    <a
                      href="https://drive.google.com/drive/folders/1QILnebgXc3eU4qGKyZbBK7QOr_oGSzYz?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold group-hover:text-red-500 transition-all"
                     > 
                      View Collection →
                    </a>
                  </div>
                </div>
              </div>

              <div className="group rounded-3xl overflow-hidden bg-[#0b0b0b] border border-red-950/60 hover:border-red-600/80 shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(255,0,0,0.25)] transition-all duration-500 hover:-translate-y-3">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src="/images/works/reels.jpg"
                    alt="Reels"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4">
                    Reels & Short-form
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-8">
                    TikTok videos, school reels, social media edits, and fast-paced vertical content.
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">
                      Short-form
                    </span>

                    <a
                      href="https://drive.google.com/drive/folders/1a0mAH7ANyyg60TS0IY9jFyr-1uRNVkpX?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold group-hover:text-red-500 transition-all"
                    >
                      View Collection →
                    </a>
                  </div>
                </div>
              </div>

              <div className="group rounded-3xl overflow-hidden bg-[#0b0b0b] border border-red-950/60 hover:border-red-600/80 shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(255,0,0,0.25)] transition-all duration-500 hover:-translate-y-3">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src="/images/works/motion.jpg"
                    alt="Motion Graphics"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4">
                    Motion Graphics
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-8">
                    Animated titles, transitions, visual effects, motion elements, and creative graphics.
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">
                      Animation
                    </span>

                    <a
                      href="https://drive.google.com/drive/folders/1n-_g7ih8L5zIs0F59VmAc52om74AyA4q?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold group-hover:text-red-500 transition-all"
                    >
                      View Collection →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCategory === "design" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group rounded-3xl overflow-hidden bg-[#0b0b0b] border border-red-950/60 hover:border-red-600/80 shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(255,0,0,0.25)] transition-all duration-500 hover:-translate-y-3">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src="/images/works/motion.jpg"
                    alt="Motion Graphics"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4">
                    Brand Design
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-8">
                    Logos, identity concepts, and visual branding materials for creative projects.
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">
                      Branding
                    </span>

                    <a
                      href="https://drive.google.com/drive/folders/1QZVwmrtODmYrWs2S2TGPghnhk1PsKaaX?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold group-hover:text-red-500 transition-all"
                    >
                      View Collection →
                    </a>
                  </div>
                </div>
              </div>

              <div className="group rounded-3xl overflow-hidden bg-[#0b0b0b] border border-red-950/60 hover:border-red-600/80 shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(255,0,0,0.25)] transition-all duration-500 hover:-translate-y-3">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src="/images/works/social.jpg"
                    alt="Social Media"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4">
                    Social Media Design
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-8">
                    Posters, posts, banners, and promotional graphics for online platforms.
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">
                      Social Media
                    </span>

                    <a
                      href="https://drive.google.com/drive/folders/1lkMB130a2I3SvwfrwQRp-JYnEYJcr5jh?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold group-hover:text-red-500 transition-all"
                    >
                      View Collection →
                    </a>
                  </div>
                </div>
              </div>

              <div className="group rounded-3xl overflow-hidden bg-[#0b0b0b] border border-red-950/60 hover:border-red-600/80 shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(255,0,0,0.25)] transition-all duration-500 hover:-translate-y-3">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src="/images/works/poster.jpg"
                    alt="Poster Design"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4">
                    Poster & Layout Design
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-8">
                    Event posters, layout designs, presentations, and creative publication materials.
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">
                      Layout
                    </span>

                    <a
                      href="https://drive.google.com/drive/folders/1P3Gkxn88peH0MSepx8S7W-rk9wM5CEd8?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold group-hover:text-red-500 transition-all"
                    >
                      View Collection →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
        <section id="services" className="relative min-h-screen px-6 md:px-12 py-28 bg-[#080808] overflow-visible">
          <div className="absolute left-[-250px] top-[150px] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]"></div>
          <div className="absolute right-[-200px] bottom-[100px] w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[140px]"></div>

          <div className="relative z-10 max-w-screen-2xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-red-500 uppercase tracking-[6px] text-sm font-bold mb-4">
                Services & Tools
              </p>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-5">
                What I Work With
              </h2>

              <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                Discover the creative services I offer and the tools I use to bring every project to life.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
              <div className="space-y-5 sticky top-28 self-start">
                <button
                  onClick={() => setActiveServiceTab("services")}
                  className={`w-full text-left rounded-3xl p-6 border
                  hover:-translate-y-1
                  hover:border-red-500
                  hover:shadow-[0_0_25px_rgba(255,0,0,0.2)]
                  transition-all duration-300 ${
                    activeServiceTab === "services"
                      ? "bg-red-600 border-red-500 shadow-[0_0_35px_rgba(255,0,0,0.35)]"
                      : "bg-[#0b0b0b] border-red-950/60 hover:border-red-600"
                  }`}
                >
                  <p className="text-sm uppercase tracking-[4px] mb-3 opacity-80">
                    Service List
                  </p>
                  <h3 className="text-2xl font-black mb-2">Services</h3>
                  <p className={activeServiceTab === "services" ? "text-white/80" : "text-gray-400"}>
                    Explore what I can offer.
                  </p>
                </button>

                <button
                  onClick={() => setActiveServiceTab("tools")}
                  className={`w-full text-left rounded-3xl p-6 border
                  hover:-translate-y-1
                  hover:border-red-500
                  hover:shadow-[0_0_25px_rgba(255,0,0,0.2)]
                  transition-all duration-300 ${
                    activeServiceTab === "tools"
                      ? "bg-red-600 border-red-500 shadow-[0_0_35px_rgba(255,0,0,0.35)]"
                      : "bg-[#0b0b0b] border-red-950/60 hover:border-red-600"
                  }`}
                >
                  <p className="text-sm uppercase tracking-[4px] mb-3 opacity-80">
                    Creative Stack
                  </p>
                  <h3 className="text-2xl font-black mb-2">Creative Tools</h3>
                  <p className={activeServiceTab === "tools" ? "text-white/80" : "text-gray-400"}>
                    See the apps I use.
                  </p>
                </button>
              </div>

              <div>
                      {activeServiceTab === "services" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <a
                        href="#works"
                        className="group relative min-h-[420px] bg-[#0b0b0b] border border-red-950/60 rounded-3xl p-10 overflow-hidden hover:border-red-600 hover:shadow-[0_0_45px_rgba(255,0,0,0.25)] hover:-translate-y-3 transition-all duration-500"
                      >
                        <div className="absolute right-[-120px] top-[-120px] w-[350px] h-[350px] bg-red-600/20 rounded-full blur-[100px]"></div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                          <div>
                            <div className="mb-8 group-hover:scale-110 transition-all duration-500">
                              <img
                                src="/icons/video-editing.png"
                                alt="Video Editing"
                                className="w-16 h-16 object-contain"
                              />
                            </div>
                            <p className="text-red-500 uppercase tracking-[5px] text-sm font-bold mb-4">
                              Service 01
                            </p>

                            <div className="w-14 h-1 bg-red-500 rounded-full mb-6"></div>

                            <h3 className="text-4xl md:text-5xl font-black mb-6">
                              Video Editing
                            </h3>

                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                              I create clean, cinematic, and story-driven edits for short films, reels, school projects, promotional videos, documentaries, and long-form content.
                            </p>

                            <ul className="mt-6 space-y-3 text-gray-300">
                              <li>✓ Clean cuts and smooth pacing</li>
                              <li>✓ Color mood and cinematic feel</li>
                              <li>✓ Reels, documentaries, and long-form edits</li>
                            </ul>
                            
                          </div>

                          <div className="mt-10 flex flex-wrap gap-3">
                            <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">Reels</span>
                            <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">Cinematic</span>
                            <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">Storytelling</span>
                          </div>

                          <p className="mt-8 text-white font-bold group-hover:text-red-500 transition-all">
                            View Video Works →
                          </p>
                        </div>
                      </a>

                      <a
                        href="#works"
                        className="group relative min-h-[420px] bg-[#0b0b0b] border border-red-950/60 rounded-3xl p-10 overflow-hidden hover:border-red-600 hover:shadow-[0_0_45px_rgba(255,0,0,0.25)] hover:-translate-y-3 transition-all duration-500"
                      >
                        <div className="absolute right-[-120px] bottom-[-120px] w-[350px] h-[350px] bg-red-600/20 rounded-full blur-[100px]"></div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                          <div>
                            <div className="mb-8 group-hover:scale-110 transition-all duration-500">
                              <img
                                src="/icons/graphic-design.png"
                                alt="Graphic Design"
                                className="w-16 h-16 object-contain"
                              />
                            </div>

                            <p className="text-red-500 uppercase tracking-[5px] text-sm font-bold mb-4">
                              Service 02
                            </p>

                            <div className="w-14 h-1 bg-red-500 rounded-full mb-6"></div>

                            <h3 className="text-4xl md:text-5xl font-black mb-6">
                              Graphic Design
                            </h3>

                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                              I design posters, social media graphics, layouts, thumbnails, visual concepts, and branding materials that match the mood and purpose of each project.
                            </p>
                          </div>

                          <ul className="mt-6 space-y-3 text-gray-300">
                            <li>✓ Posters and promotional layouts</li>
                            <li>✓ Social media graphics</li>
                            <li>✓ Visual concepts and branding materials</li>
                          </ul>

                          <div className="mt-10 flex flex-wrap gap-3">
                            <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">Posters</span>
                            <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">Layouts</span>
                            <span className="text-red-400 border border-red-800/70 px-4 py-2 rounded-full text-sm font-semibold">Branding</span>
                          </div>

                          <p className="mt-8 text-white font-bold group-hover:text-red-500 transition-all">
                            View Design Works →
                          </p>
                        </div>
                      </a>
                    </div>
                  )}

                  {activeServiceTab === "tools" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {[
                        {
                          title: "Editing Tools",
                          subtitle: "Software I use for cuts, pacing, color, motion, and storytelling.",
                          tools: [
                                  ["DaVinci Resolve", "Advanced", "85%", "🎞️"],
                                  ["CapCut", "Advanced", "90%", "✂️"],
                                  ["After Effects", "Intermediate", "65%", "✨"],
                                  ["Alight Motion", "Expert", "95%", "📱"],
                                ],
                        },
                        {
                          title: "Design Tools",
                          subtitle: "Tools I use for posters, layouts, graphics, and visual design.",
                          tools: [
                                  ["Canva", "Advanced", "90%", "🎨"],
                                  ["Lightroom", "Intermediate", "75%", "📸"],
                                  ["PicsArt", "Advanced", "85%", "🖼️"],
                                  ["Photoshop", "Learning", "55%", "🧩"],
                                ],
                        },
                      ].map((group, index) => (
                        <div
                          key={index}
                          className="bg-[#0b0b0b] border border-red-950/60 rounded-3xl p-6 md:p-8 shadow-[0_0_35px_rgba(255,0,0,0.10)] hover:border-red-600/70 transition-all duration-500"
                        >
                          <div className="mb-8">

                            <h4 className="text-3xl font-black mb-3">
                              {group.title}
                            </h4>

                            <p className="text-gray-400 leading-relaxed">
                              {group.subtitle}
                            </p>
                          </div>

                          <div className="space-y-5">
                            {group.tools.map((tool, i) => (
                              <div
                                key={i}
                                className="group/tool bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:border-red-600/60 hover:bg-red-950/10 transition-all duration-300"
                              >
                                <div className="flex items-center justify-between gap-4 mb-4">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-900/50 flex items-center justify-center overflow-hidden p-2">
                                      <img
                                        src={tool[3]}
                                        alt={tool[0]}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>

                                    <div>
                                      <h5 className="font-black text-lg">
                                        {tool[0]}
                                      </h5>

                                      <p className="text-gray-500 text-sm">
                                        Skill Level
                                      </p>
                                    </div>
                                  </div>

                                  <span
                                    className={`flex items-center gap-2 text-sm font-bold px-3 py-1 rounded-full border ${
                                      tool[1] === "Expert"
                                        ? "text-red-400 border-red-700 bg-red-950/20"
                                        : tool[1] === "Advanced"
                                        ? "text-green-400 border-green-700 bg-green-950/20"
                                        : tool[1] === "Intermediate"
                                        ? "text-blue-400 border-blue-700 bg-blue-950/20"
                                        : "text-gray-300 border-gray-600 bg-white/5"
                                    }`}
                                  >
                                    <span
                                      className={`w-2.5 h-2.5 rounded-full ${
                                        tool[1] === "Expert"
                                          ? "bg-red-500"
                                          : tool[1] === "Advanced"
                                          ? "bg-green-500"
                                          : tool[1] === "Intermediate"
                                          ? "bg-blue-500"
                                          : "bg-gray-300"
                                      }`}
                                    ></span>

                                    {tool[1]}
                                  </span>
                                </div>

                                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${
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
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            
        </section>

        <section id="about" className="relative min-h-screen px-6 md:px-12 py-28 bg-black overflow-hidden">
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
                    src="/images/The Director.png"
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
                    className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full font-bold shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_40px_rgba(255,0,0,0.7)] transition-all duration-300 hover:scale-105 "
                  >
                    Download Resume
                  </a>

                  <a
                    href="#contact"
                    className="bg-black hover:bg-red-950/60 px-8 py-4 rounded-full font-bold border border-white/10 hover:border-red-600 shadow-[0_0_20px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-105"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative min-h-screen px-6 md:px-12 pt-36 pb-28 bg-black overflow-hidden">
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