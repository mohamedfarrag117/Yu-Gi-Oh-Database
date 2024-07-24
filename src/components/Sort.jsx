import React, { useEffect, useState } from "react";
import axios from "axios";

const Sort = () => {
  const [sortedCards, setSortedCards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSortedCards = async () => {
      try {
        const response = await axios.get(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Synchro%20Monster`
        );
        setSortedCards(response.data.data);
      } catch (error) {
        setError("Failed to fetch Synchro Monster cards");
      }
    };

    fetchSortedCards();
  }, []);

  return (
    <div className="bg-white w-screen h-screen min-h-screen overflow-auto">
      {error && <div>{error}</div>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {sortedCards.map((card) => (
          <div key={card.id} className="relative flex flex-col items-center">
            <img
              className="w-full h-auto max-w-xs mx-auto shadow-2xl"
              src={card.card_images[0].image_url}
              alt={card.name}
            />
            <div className="absolute w-96 h-full z-10 p-4 bg-gray-800 text-white text-sm opacity-50 hover:opacity-100 duration-300 ease-in-out transform group-hover:translate-x-full">
              {card.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sort;
