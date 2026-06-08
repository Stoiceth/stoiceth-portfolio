function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="w-full px-12 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-700/80 shadow-[0_0_25px_rgba(220,38,38,0.5)]"></div>

            <h1 className="text-2xl font-black tracking-[6px]">
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
            <a href="#portfolio" className="text-gray-300 hover:text-red-500 hover:-translate-y-1 transition-all duration-300">
              Portfolio
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
            className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_40px_rgba(255,0,0,0.7)] transition-all duration-300 hover:scale-105"
          >
            Contact
          </a>
        </div>
      </nav>

      <section
        id="home"
        className="relative min-h-screen pt-20 flex items-center overflow-hidden"
      >
        <div className="relative z-10 max-w-screen-2xl mx-auto px-12 w-full min-h-[calc(100vh-80px)] flex items-center">
          <div className="relative w-full">
            
            <div className="absolute right-[-50px] top-[0px] w-[800px] h-[500px] rounded-full bg-red-600/30 blur-[120px] z-0"></div>

            <div className="absolute right-[800px] top-[350px] w-[500px] h-[500px] rounded-full bg-red-600/30 blur-[120px] z-0"></div>

            <div className="absolute right-[1000px] top-[-400px] w-[800px] h-[500px] rounded-full bg-red-600/30 blur-[120px] z-0"></div>

            <div className="relative z-20 max-w-none">
              <h1 className="font-black uppercase leading-[0.9] tracking-wider text-[8rem] md:text-[10rem]">
                <span className="block text-[8rem]">
                  Freelance
                </span>

                <span className="block text-[8rem] whitespace-nowrap">
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
                    VIDEO EDITOR
                  </span>{" "}
                </span>
              </h1>

              <p className="text-gray-200 text-lg md:text-xl max-w-xl leading-relaxed mt-8 mb-12">
                Stoiceth, a freelance video editor based in the Philippines.
                Helping creators and brands tell stories through cinematic editing.
              </p>

              <div className="flex flex-wrap gap-6">
                <a
                  href="#portfolio"
                  className="bg-red-600 hover:bg-red-700 px-15 py-6 rounded-full font-bold shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_40px_rgba(255,0,0,0.7)] transition-all duration-300 hover:scale-105"
                >
                  View Portfolio
                </a>

                <a
                  href="#contact"
                  className="bg-black hover:bg-red-950/60 px-15 py-6 rounded-full font-bold border border-white/10 hover:border-red-600 shadow-[0_0_20px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-105"
                >
                  Contact
                </a>
              </div>
            </div>

            <div className="absolute right-[10px] bottom-[-120px] z-30">
              <img
                src="/images/zeth.png"
                alt="Stoiceth"
                className="relative z-10 w-[700px] object-contain hover:scale-105 transition-all duration-500 animate-[float_6s_ease-in-out_infinite]"
              />
            </div>

          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 text-medium uppercase tracking-widest text-gray-200">
          Video Editor • Filmmaker • Content Creator
        </div>
      </section>

      <section id="portfolio" className="min-h-screen px-12 py-28 bg-black">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-5xl font-black mb-6">Portfolio</h2>
            <p className="text-gray-400">
              My video projects will go here.
            </p>
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