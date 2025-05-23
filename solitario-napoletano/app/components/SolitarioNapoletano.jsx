// app/components/SolitarioNapoletano.js
"use client";

import React, { useState, useEffect } from "react";
import ItalianPlayingCard from "./ItalianPlayingCard";

const SolitarioNapoletano = () => {
  // Game state
  const [deck, setDeck] = useState([]);
  const [tableau, setTableau] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [foundations, setFoundations] = useState([[], [], [], []]);
  const [waste, setWaste] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  // Initialize deck
  const initializeDeck = () => {
    const suits = ["Coppe", "Spade", "Denari", "Bastoni"];
    const ranks = [
      "Asso",
      "Due",
      "Tre",
      "Quattro",
      "Cinque",
      "Sei",
      "Sette",
      "Fante",
      "Cavallo",
      "Re",
    ];
    const newDeck = [];

    suits.forEach((suit) => {
      ranks.forEach((rank, index) => {
        newDeck.push({
          suit,
          rank,
          value: index + 1, // Asso = 1, Due = 2, ..., Re = 10
          id: `${suit}-${rank}`,
          faceDown: false,
        });
      });
    });

    return shuffleArray(newDeck);
  };

  // Shuffle array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Deal cards
  const dealCards = () => {
    const shuffledDeck = initializeDeck();
    const newTableau = [[], [], [], [], [], [], [], [], [], []];

    // Deal 4 cards to each of the 10 tableau piles
    let cardIndex = 0;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 10; col++) {
        if (cardIndex < shuffledDeck.length) {
          const card = { ...shuffledDeck[cardIndex], faceDown: row < 3 };
          newTableau[col].push(card);
          cardIndex++;
        }
      }
    }

    setTableau(newTableau);
    setFoundations([[], [], [], []]);
    setWaste([]);
    setSelectedCard(null);
    setGameWon(false);
    setMoveCount(0);
  };

  // Check if move to foundation is valid
  const canMoveToFoundation = (card, foundation) => {
    if (foundation.length === 0) {
      return card.rank === "Asso";
    }

    const topCard = foundation[foundation.length - 1];
    return topCard.suit === card.suit && card.value === topCard.value + 1;
  };

  // Check if move to tableau is valid
  const canMoveToTableau = (card, targetPile) => {
    if (targetPile.length === 0) {
      return true; // Can place any card on empty pile
    }

    const topCard = targetPile[targetPile.length - 1];
    return card.value === topCard.value - 1; // Must be one rank lower
  };

  // Handle card click
  const handleCardClick = (card, source, sourceIndex) => {
    if (card.faceDown) return;

    if (selectedCard && selectedCard.card.id === card.id) {
      setSelectedCard(null);
      return;
    }

    if (selectedCard) {
      // Try to move selected card to this location
      if (source === "tableau") {
        if (canMoveToTableau(selectedCard.card, tableau[sourceIndex])) {
          moveCard(selectedCard, { source: "tableau", index: sourceIndex });
        }
      }
      setSelectedCard(null);
    } else {
      // Select this card
      setSelectedCard({ card, source, sourceIndex });
    }
  };

  // Handle foundation click
  const handleFoundationClick = (foundationIndex) => {
    if (!selectedCard) return;

    if (canMoveToFoundation(selectedCard.card, foundations[foundationIndex])) {
      moveCard(selectedCard, { source: "foundation", index: foundationIndex });
    }
    setSelectedCard(null);
  };

  // Handle empty tableau pile click
  const handleEmptyPileClick = (pileIndex) => {
    if (!selectedCard) return;

    if (tableau[pileIndex].length === 0) {
      moveCard(selectedCard, { source: "tableau", index: pileIndex });
      setSelectedCard(null);
    }
  };

  // Move card
  const moveCard = (from, to) => {
    const newTableau = [...tableau];
    const newFoundations = [...foundations];

    // Remove card from source
    let card;
    if (from.source === "tableau") {
      card = newTableau[from.sourceIndex].pop();
      // Flip face-down card if exposed
      if (newTableau[from.sourceIndex].length > 0) {
        const topCard =
          newTableau[from.sourceIndex][newTableau[from.sourceIndex].length - 1];
        if (topCard.faceDown) {
          topCard.faceDown = false;
        }
      }
    }

    // Add card to destination
    if (to.source === "tableau") {
      newTableau[to.index].push(card);
    } else if (to.source === "foundation") {
      newFoundations[to.index].push(card);
    }

    setTableau(newTableau);
    setFoundations(newFoundations);
    setMoveCount(moveCount + 1);

    // Check for win
    const totalFoundationCards = newFoundations.reduce(
      (sum, f) => sum + f.length,
      0
    );
    if (totalFoundationCards === 40) {
      setGameWon(true);
    }
  };

  // Auto-move to foundations
  const autoMoveToFoundations = () => {
    let moved = false;
    const newTableau = [...tableau];
    const newFoundations = [...foundations];

    // Check each tableau pile
    for (let i = 0; i < newTableau.length; i++) {
      if (newTableau[i].length > 0) {
        const topCard = newTableau[i][newTableau[i].length - 1];
        if (!topCard.faceDown) {
          // Try each foundation
          for (let j = 0; j < 4; j++) {
            if (canMoveToFoundation(topCard, newFoundations[j])) {
              newFoundations[j].push(newTableau[i].pop());

              // Flip face-down card if exposed
              if (newTableau[i].length > 0) {
                const newTopCard = newTableau[i][newTableau[i].length - 1];
                if (newTopCard.faceDown) {
                  newTopCard.faceDown = false;
                }
              }

              moved = true;
              break;
            }
          }
        }
      }
    }

    if (moved) {
      setTableau(newTableau);
      setFoundations(newFoundations);
      setMoveCount(moveCount + 1);

      // Check for win
      const totalFoundationCards = newFoundations.reduce(
        (sum, f) => sum + f.length,
        0
      );
      if (totalFoundationCards === 40) {
        setGameWon(true);
      }
    }
  };

  // Initialize game on mount
  useEffect(() => {
    dealCards();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Game Header */}
      <div className="flex justify-between items-center mb-6 bg-emerald-900/40 backdrop-blur-sm rounded-lg p-4 border border-amber-700/30">
        <h1 className="text-3xl font-bold text-amber-100">
          Solitario Napoletano
        </h1>
        <div className="flex gap-4 items-center">
          <span className="text-amber-200">Mosse: {moveCount}</span>
          <button
            onClick={dealCards}
            className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg transition-colors"
          >
            Nuova Partita
          </button>
          <button
            onClick={autoMoveToFoundations}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            Auto-Completa
          </button>
        </div>
      </div>

      {/* Foundations */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-amber-200 mb-2">
          Fondazioni
        </h2>
        <div className="flex gap-4 justify-center">
          {foundations.map((foundation, index) => (
            <div
              key={index}
              onClick={() => handleFoundationClick(index)}
              className="relative w-32 h-48 border-2 border-amber-600/50 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-amber-500 transition-colors bg-emerald-900/20"
            >
              {foundation.length === 0 ? (
                <span className="text-amber-600/50 text-6xl">A</span>
              ) : (
                <div className="absolute inset-0">
                  {foundation.map((card, cardIndex) => (
                    <div
                      key={card.id}
                      className="absolute inset-0"
                      style={{ zIndex: cardIndex }}
                    >
                      <ItalianPlayingCard
                        suit={card.suit}
                        rank={card.rank}
                        faceDown={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <div className="grid grid-cols-5 gap-4">
        {tableau.map((pile, pileIndex) => (
          <div
            key={pileIndex}
            className="relative min-h-[200px]"
            onClick={() => handleEmptyPileClick(pileIndex)}
          >
            {pile.length === 0 ? (
              <div className="w-32 h-48 border-2 border-amber-600/30 border-dashed rounded-lg" />
            ) : (
              pile.map((card, cardIndex) => (
                <div
                  key={card.id}
                  className={`absolute cursor-pointer transition-all ${
                    selectedCard?.card.id === card.id
                      ? "ring-4 ring-amber-400 z-20"
                      : ""
                  }`}
                  style={{
                    top: `${cardIndex * 30}px`,
                    zIndex:
                      cardIndex + (selectedCard?.card.id === card.id ? 20 : 0),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(card, "tableau", pileIndex);
                  }}
                >
                  <ItalianPlayingCard
                    suit={card.suit}
                    rank={card.rank}
                    faceDown={card.faceDown}
                  />
                </div>
              ))
            )}
          </div>
        ))}
      </div>

      {/* Win Message */}
      {gameWon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-emerald-900 p-8 rounded-xl border-4 border-amber-600 text-center">
            <h2 className="text-4xl font-bold text-amber-100 mb-4">
              Congratulazioni!
            </h2>
            <p className="text-xl text-amber-200 mb-6">
              Hai vinto in {moveCount} mosse!
            </p>
            <button
              onClick={dealCards}
              className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-lg font-semibold transition-colors"
            >
              Gioca Ancora
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolitarioNapoletano;
