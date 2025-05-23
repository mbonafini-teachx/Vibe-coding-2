// app/page.js
import SolitarioNapoletano from "./components/SolitarioNapoletano";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24 overflow-hidden">
      {/* Italian-style background layers */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient - warm terracotta to deep green */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-emerald-900/80 to-emerald-950"></div>

        {/* Ornate pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-conic-gradient(from 45deg at 50% 50%, rgba(255,215,0,0.1) 0deg, transparent 90deg, rgba(255,215,0,0.1) 180deg)`,
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Venetian wallpaper effect */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255,215,0,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(139,69,19,0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 20%, rgba(255,215,0,0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(139,69,19,0.1) 0%, transparent 50%)
            `,
            backgroundSize: "200px 200px",
          }}
        ></div>

        {/* Marble texture effect */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)
            `,
            backgroundSize: "100px 100px, 100px 100px",
          }}
        ></div>

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>

        {/* Coffee stain effects for authenticity */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-800/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-amber-700/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-800/5 rounded-full blur-xl"></div>
      </div>
      <div className="z-10 w-full">
        <SolitarioNapoletano />
      </div>
    </main>
  );
}
