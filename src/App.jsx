import { useState } from "react";
function App() {
  const [activeCategory, setActiveCategory] = useState("video");
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="w-full px-5 md:px-12 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-700/80 shadow-[0_0_25px_rgba(220,38,38,0.5)]"></div>

            <h1 className="text-lg md:text-2xl font-black tracking-[4px] md:tracking-[6px]">
              STOI
              <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                C
              </span>
              ETH
            </h1>
          </div>

          <div className="hidden md:flex gap-12 text-sm uppercase tracking-wider">
            <a href="#home" className="text-gray-300 hover:text-red-500 hover:-translate-y-1 transition-all duration-300">
              Home
            </a>
            <a href="#works" className="text-gray-300 hover:text-red-500 hover:-translate-y-1 transition-all duration-300">
              Work
            </a>
            <a href="#services" className="text-gray-300 hover:text-red-500 hover:-translate-y-1 transition-all duration-300">
              Services
            </a>
            <a href="#about" className="text-gray-300 hover:text-red-500 hover:-translate-y-1 transition-all duration-300">
              About
            </a>
          </div>

          <a
            href="#contact"
            className="bg-red-600 hover:bg-red-700 px-5 md:px-8 py-3 rounded-full font-semibold shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_40px_rgba(255,0,0,0.7)] transition-all duration-300 hover:scale-105"
          >
            Contact
          </a>
        </div>
      </nav>

      <section
        id="home"
        className="relative min-h-screen pt-24 lg:pt-20 flex items-center overflow-hidden"
      >
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 w-full min-h-[calc(100vh-80px)] flex items-center">
          <div className="relative w-full">
            
            <div className="absolute right-[-50px] top-[0px] w-[800px] h-[500px] rounded-full bg-red-600/30 blur-[120px] z-0"></div>

            <div className="absolute right-[800px] top-[350px] w-[500px] h-[500px] rounded-full bg-red-600/30 blur-[120px] z-0"></div>

            <div className="absolute right-[1000px] top-[-400px] w-[800px] h-[500px] rounded-full bg-red-600/30 blur-[120px] z-0"></div>

            <div className="relative z-20 max-w-none">
              <h1 className="font-black uppercase leading-[0.9] tracking-tight text-[8rem] md:text-[10rem]">
                <span className="block text-[4.5rem] sm:text-[5rem] md:text-[7rem]">  
                  Freelance
                </span>

                <span className="block text-[3.7rem] sm:text-[4rem] md:text-[5.2rem] whitespace-nowrap">
                  <span
                    className="text-red-600"
                    style={{
                      textShadow: `
                        1px 1px 0 #fff,
                        2px 2px 0 #fff,
                        3px 3px 0 #fff,
                        4px 4px 0 rgba(0,0,0,.25)
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

              <div className="flex flex-wrap gap-6">
                <a
                  href="#works"
                  className="bg-red-600 hover:bg-red-700 px-8 py-4 md:px-15 md:py-6 rounded-full font-bold shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_40px_rgba(255,0,0,0.7)] transition-all duration-300 hover:scale-105"
                >
                  View Works
                </a>

                <a
                  href="#contact"
                  className="bg-black hover:bg-red-950/60 px-8 py-4 md:px-15 md:py-6 rounded-full font-bold border border-white/10 hover:border-red-600 shadow-[0_0_20px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-105"
                >
                  Get in Touch
                </a>
              </div>
            </div>

            <div className="absolute right-[-25px] bottom-[-140px] z-30">
              <img
                src="/images/zeth.png"
                alt="Stoiceth"
                className="relative z-10 w-[320px] sm:w-[420px] md:w-[560px] lg:w-[700px] object-contain hover:scale-105 transition-all duration-500 animate-[float_6s_ease-in-out_infinite]"
              />
            </div>

          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 text-xs md:text-base uppercase tracking-widest text-gray-200 text-center whitespace-nowrap">
          Video Editor • Filmmaker • Content Creator
        </div>

        

      </section>

      <section id="works" className="relative min-h-screen px-6 md:px-12 py-28 bg-transparent overflow-hidden">
        <div className="absolute left-[-200px] top-[150px] w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[130px]"></div>
        <div className="absolute right-[-250px] bottom-[100px] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]"></div>

        <div className="relative z-10 max-w-screen-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-500 uppercase tracking-[6px] text-sm font-bold mb-4">
              My Work
            </p>

            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-5">
              Featured Work
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
                <div className="h-64 bg-gradient-to-br from-red-950 via-black to-[#1a1a1a] flex items-center justify-center overflow-hidden">
                  <div className="text-6xl opacity-80 group-hover:scale-110 transition-all duration-500">
                    🎬
                  </div>
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
                <div className="h-64 bg-gradient-to-br from-red-900/60 via-black to-[#1a1a1a] flex items-center justify-center overflow-hidden">
                  <div className="text-6xl opacity-80 group-hover:scale-110 transition-all duration-500">
                    📱
                  </div>
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
                <div className="h-64 bg-gradient-to-br from-red-950 via-[#120000] to-black flex items-center justify-center overflow-hidden">
                  <div className="text-6xl opacity-80 group-hover:scale-110 transition-all duration-500">
                    ✨
                  </div>
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
                <div className="h-64 bg-gradient-to-br from-red-950 via-black to-[#1a1a1a] flex items-center justify-center overflow-hidden">
                  <div className="text-6xl opacity-80 group-hover:scale-110 transition-all duration-500">
                    🎨
                  </div>
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
                <div className="h-64 bg-gradient-to-br from-red-900/60 via-black to-[#1a1a1a] flex items-center justify-center overflow-hidden">
                  <div className="text-6xl opacity-80 group-hover:scale-110 transition-all duration-500">
                    📱
                  </div>
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
                <div className="h-64 bg-gradient-to-br from-red-950 via-[#120000] to-black flex items-center justify-center overflow-hidden">
                  <div className="text-6xl opacity-80 group-hover:scale-110 transition-all duration-500">
                    🖼️
                  </div>
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
      
        <section id="services" className="min-h-screen px-12 py-28 bg-[#080808]">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-5xl font-black mb-6">Services</h2>
            <p className="text-gray-400">
              Editing, filming, reels, motion graphics, and more.
            </p>
          </div>
        </section>

        <section id="about" className="min-h-screen px-12 py-28 bg-black">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-5xl font-black mb-6">
              About Stoiceth
            </h2>

            <p className="text-gray-400 max-w-4xl">
              My full story, CETSO experience, editing journey,
              and PAGLAHUTAY details will go here.
            </p>
          </div>
        </section>

        <section id="contact" className="min-h-screen px-12 py-28 bg-[#080808]">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-5xl font-black mb-6">
              Contact
            </h2>

            <p className="text-gray-400">
              My contact details or contact form will go here.
            </p>
          </div>
        </section>
    </div>
  );
}

export default App;