// app/components/ItalianPlayingCard.js
"use client";

import React from "react";

const ItalianPlayingCard = ({
  suit = "Coppe",
  rank = "Asso",
  faceDown = false,
}) => {
  // Italian suit symbols
  const suitSymbols = {
    Coppe: "🏆", // Cups
    Spade: "⚔️", // Swords
    Denari: "🪙", // Coins
    Bastoni: "🏑", // Clubs/Batons
  };

  // Italian rank names
  const rankDisplay = {
    Asso: "A",
    Due: "2",
    Tre: "3",
    Quattro: "4",
    Cinque: "5",
    Sei: "6",
    Sette: "7",
    Fante: "F",
    Cavallo: "C",
    Re: "R",
  };

  return (
    <div className="relative w-32 h-48 perspective-1000">
      <div
        className={`
          absolute inset-0 w-full h-full transition-all duration-500 transform-style-preserve-3d cursor-pointer
          hover:scale-105 hover:shadow-2xl
          ${faceDown ? "rotate-y-180" : ""}
        `}
      >
        {/* Card Front */}
        <div
          className="
          absolute inset-0 w-full h-full backface-hidden
          bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100
          border-2 border-amber-700 rounded-lg shadow-lg
          overflow-hidden
        "
        >
          {/* Gold trim effect */}
          <div
            className="
            absolute inset-0 border-4 border-amber-600/30 rounded-lg m-1
            bg-gradient-to-br from-transparent via-amber-200/10 to-transparent
          "
          ></div>

          {/* Aged paper texture overlay */}
          <div
            className="
            absolute inset-0 opacity-20
            bg-gradient-to-br from-amber-900/20 via-transparent to-amber-800/20
          "
          ></div>

          {/* Top left corner */}
          <div className="absolute top-3 left-3 text-center">
            <div className="text-amber-900 font-serif text-2xl font-bold leading-none">
              {rankDisplay[rank] || rank}
            </div>
            <div className="text-3xl leading-none mt-1 drop-shadow-sm">
              {suitSymbols[suit]}
            </div>
          </div>

          {/* Center design */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-30 transform rotate-12">
              {suitSymbols[suit]}
            </div>
          </div>

          {/* Bottom right corner (rotated) */}
          <div className="absolute bottom-3 right-3 text-center transform rotate-180">
            <div className="text-amber-900 font-serif text-2xl font-bold leading-none">
              {rankDisplay[rank] || rank}
            </div>
            <div className="text-3xl leading-none mt-1 drop-shadow-sm">
              {suitSymbols[suit]}
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-600/40 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-600/40 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-600/40 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-600/40 rounded-br-lg"></div>
        </div>

        {/* Card Back */}
        <div
          className="
          absolute inset-0 w-full h-full backface-hidden rotate-y-180
          bg-gradient-to-br from-red-900 via-red-800 to-red-900
          border-2 border-amber-700 rounded-lg shadow-lg
          overflow-hidden flex items-center justify-center
        "
        >
          {/* Back pattern */}
          <div
            className="
            absolute inset-2 border-2 border-amber-600/50 rounded
            bg-repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 215, 0, 0.1) 10px,
              rgba(255, 215, 0, 0.1) 20px
            )
          "
          ></div>

          {/* Center emblem */}
          <div
            className="
            w-20 h-20 bg-amber-700/20 rounded-full 
            border-2 border-amber-600/50
            flex items-center justify-center
            shadow-inner
          "
          >
            <span className="text-amber-200 text-4xl font-serif italic">N</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItalianPlayingCard;
