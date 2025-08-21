export default function App() {
  return (
    <main className="min-h-screen w-full bg-[#F5B301] flex items-center justify-center p-4 sm:p-8">
      {/* Banner Wrapper */}
      <section
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl shadow-xl bg-[#F5B301]"
        aria-label="Pengingat penagihan project"
      >
        {/* Decorative purple wave */}
        <div className="pointer-events-none absolute -bottom-24 sm:-bottom-28 right-0 left-0 h-64 sm:h-72 bg-[#5B3A8E] rounded-t-[60%]" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-10">
          {/* Text Block */}
          <div className="z-10">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#2A2A2A]">
              Halo, Project Kamu
              <br className="hidden sm:block" /> Kangen Dibayar Loh…
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-[#2A2A2A] max-w-xl">
              Sudah lewat <span className="font-semibold">2 bulan</span> sejak invoice ini lahir,
              dan sepertinya dia mulai merindukan perhatian. Yuk, jangan biarkan
              invoice ini jadi nostalgia tak berujung.
            </p>

            {/* CTA */}
            <div className="mt-6">
              <a
                href="#bayar"
                className="inline-flex items-center rounded-2xl bg-[#E94D35] px-5 sm:px-6 py-3 sm:py-4 text-white text-sm sm:text-base md:text-lg font-semibold shadow-md hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-white/50 transition"
              >
                Tolong di bayar ya kalau bisa karena kami sudah seret nih
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative z-10 flex items-end md:items-center justify-center">
            <div className="relative w-56 sm:w-64 md:w-72">
              {/* Sticker */}
              <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-3 rotate-6 bg-[#FFD84D] text-[#2A2A2A] rounded-xl px-3 py-1 text-xs sm:text-sm font-bold shadow">
                masih nunggu nih…
              </div>

              {/* Invoice Sheet (SVG) */}
              <svg
                viewBox="0 0 220 260"
                className="w-full h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
                role="img"
                aria-label="Ilustrasi invoice sedih"
              >
                <defs>
                  <linearGradient id="paper" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FFF8EF" />
                    <stop offset="100%" stopColor="#FFEEDD" />
                  </linearGradient>
                </defs>
                {/* Paper */}
                <path d="M30 20 h130 a16 16 0 0 1 16 16 v178 a16 16 0 0 1-16 16 H50 a20 20 0 0 1-20-20 V36 a16 16 0 0 1 16-16 z" fill="url(#paper)" stroke="#4B2E83" strokeWidth="6" />
                {/* Title */}
                <text x="38" y="55" fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto" fontSize="28" fontWeight="800" fill="#4B2E83">
                  INVOICE
                </text>
                {/* Face */}
                <circle cx="85" cy="110" r="14" fill="#FFFFFF" stroke="#4B2E83" strokeWidth="6" />
                <circle cx="85" cy="110" r="6" fill="#4B2E83" />
                <circle cx="145" cy="110" r="14" fill="#FFFFFF" stroke="#4B2E83" strokeWidth="6" />
                <circle cx="145" cy="110" r="6" fill="#4B2E83" />
                {/* Brows */}
                <path d="M70 88 q16 -14 32 0" fill="none" stroke="#4B2E83" strokeWidth="6" strokeLinecap="round" />
                <path d="M130 88 q16 8 32 0" fill="none" stroke="#4B2E83" strokeWidth="6" strokeLinecap="round" />
                {/* Mouth */}
                <path d="M110 136 q-8 20 8 20 q16 0 8-20" fill="#E94D35" />
                {/* Lines */}
                <path d="M46 170 h128" stroke="#C7B3E3" strokeWidth="8" strokeLinecap="round" />
                <path d="M46 196 h128" stroke="#C7B3E3" strokeWidth="8" strokeLinecap="round" />
                <path d="M46 222 h94" stroke="#C7B3E3" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
