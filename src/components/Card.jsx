import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import wind from "../assets/images/wind.png";
import earth from "../assets/images/earth.png";
import fire from "../assets/images/fire.png";
import dark from "../assets/images/dark.png";
import water from "../assets/images/water.png";
import light from "../assets/images/light.png";
import divine from "../assets/images/divine.png";
import Star from "../assets/images/Star.png";
import Rank_Star from "../assets/images/Rank_Star.png";
import Trap from "../assets/images/Trap.png";
import spell from "../assets/images/spell.png";
import Continuous from "../assets/images/Continuous.png";
import ContinuousTrap from "../assets/images/ContinuousTrap.png";
import Counter from "../assets/images/Counter.png";
import Normal from "../assets/images/Normal.png";
import QuickPlay from "../assets/images/QuickPlay.png";
import Field from "../assets/images/Field.png";
import Ritual from "../assets/images/Ritual.png";
import NormalTrap from "../assets/images/NormalTrap.png";
import Equip from "../assets/images/Equip.png";

Modal.setAppElement("#root");

const Card = ({ data }) => {
  if (!data || data.length === 0) {
    return;
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [relatedCards, setRelatedCards] = useState([]);

  const openModal = (card) => {
    setModalIsOpen(true);
    setSelectedCard(card);
    setRelatedCards([]);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCard(null);
    setRelatedCards([]);
  };

  const handleRelatedCards = async () => {
    try {
      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${selectedCard.archetype}`
      );
      setRelatedCards(
        response.data.data.filter((card) => card.id !== selectedCard.id)
      );
    } catch (error) {
      console.error("Failed to fetch related cards", error);
    }
  };

  return (
    <>
      <div className="flex flex-col  md:items-start items-center justify-center  p-14 pt-20 md:pl-[150px] gap-20  bg-[#d4d4d4] mb-44 mt-32 md:ml-32 md:mr-32 md:rounded-3xl shadow-2xl drop-shadow-xl">
        {data.map((card) => (
          <div
            key={card.id}
            className="relative group flex md:flex-row flex-col md:gap-0 gap-3 items-center justify-center mb-3"
          >
            <img
              className="w-[140px] max-w-[140px] h-100  mx-auto shadow-2xl group-hover:shadow-2xl duration-700 ease-in-out hover:transform group-hover:scale-125 hover:translate-full cursor-pointer"
              src={card.card_images[0].image_url}
              alt={card.name}
              onClick={() => openModal(card)}
            />

            <div className="info-box md:absolute  group  flex flex-col items-start justify-start md:w-[750px]   left-[148px] right-4 p-4 rounded-2xl bg-gray-600 text-white  text-sm opacity-90 group-hover:opacity-100 group-hover:shadow-2xl duration-300 ease-in-out transform group-hover:translate-x-5">
              <div className="flex flex-row justify-start  gap-0 ">
                <div className="md:absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full h-0 w-0 border-t-8 border-t-transparent border-b-8 border-b-transparent rounded-xl border-r-8 border-r-gray-600"></div>
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-lg">{card.name}</div>

                  {card.attribute === "WIND" ? (
                    <div className="flex flex-row gap-2">
                      <img className="w-5 h-5" src={wind} />
                      <p>{card.attribute}</p>
                    </div>
                  ) : card.attribute === "FIRE" ? (
                    <div className="flex flex-row gap-2">
                      <img className="w-5 h-5" src={fire} />
                      <p>{card.attribute}</p>
                    </div>
                  ) : card.attribute === "WATER" ? (
                    <div className="flex flex-row gap-2">
                      <img className="w-5 h-5" src={water} />
                      <p>{card.attribute}</p>
                    </div>
                  ) : card.attribute === "DARK" ? (
                    <div className="flex flex-row gap-2">
                      <img className="w-5 h-5" src={dark} />
                      <p>{card.attribute}</p>
                    </div>
                  ) : card.attribute === "LIGHT" ? (
                    <div className="flex flex-row gap-2">
                      <img className="w-5 h-5" src={light} />
                      <p>{card.attribute}</p>
                    </div>
                  ) : card.attribute === "DIVINE" ? (
                    <div className="flex flex-row gap-2">
                      <img className="w-5 h-5" src={divine} />
                      <p>{card.attribute}</p>
                    </div>
                  ) : card.attribute === "EARTH" ? (
                    <div className="flex flex-row gap-2">
                      <img className="w-5 h-5" src={earth} />
                      <p>{card.attribute}</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <div>
                    {card.type === "XYZ Monster" ? (
                      <div className="flex flex-row gap-2">
                        <img className="w-5 h-5" src={Rank_Star} />
                        <p>{card.level}</p>
                      </div>
                    ) : card.type === "Synchro Monster" ||
                      card.type === "Effect Monster" ||
                      card.type === "Flip Effect Monster" ||
                      card.type === "Union Effect Monster" ||
                      card.type === "Tuner Monster" ||
                      card.type === "Normal Tuner Monster" ||
                      card.type === "Pendulum Effect Monster" ||
                      card.type === "Pendulum Normal Monster" ||
                      card.type === "Pendulum Tuner Effect Monster" ||
                      card.type === "Pendulum Effect Ritual Monster" ||
                      card.type === "Fusion Monster" ||
                      card.type === "Normal Monster" ||
                      card.type === "Token" ||
                      card.type === "Ritual Monster" ||
                      card.type === "Ritual Effect Monster" ? (
                      <div className="flex flex-row gap-2">
                        <img className="w-5 h-5" src={Star} />
                        <p>{card.level}</p>
                      </div>
                    ) : card.type === "Spell Card" ? (
                      <div className="flex flex-row gap-2">
                        <img className="w-5 h-5" src={spell} />
                        <p>{card.type}</p>
                        {card.race === "Quick-Play" ? (
                          <div className="flex flex-row gap-2">
                            <img className="w-5 h-5" src={QuickPlay} />
                            <p>{card.race}</p>
                          </div>
                        ) : card.race === "Normal" ? (
                          <div className="flex flex-row gap-2">
                            <img className="w-5 h-5" src={Normal} />
                            <p>{card.race}</p>
                          </div>
                        ) : card.race === "Field" ? (
                          <div className="flex flex-row gap-2">
                            <img className="w-5 h-5" src={Field} />
                            <p>{card.race}</p>
                          </div>
                        ) : card.race === "Equip" ? (
                          <div className="flex flex-row gap-2">
                            <img className="w-5 h-5" src={Equip} />
                            <p>{card.race}</p>
                          </div>
                        ) : card.race === "Ritual" ? (
                          <div className="flex flex-row gap-2">
                            <img className="w-5 h-5" src={Ritual} />
                            <p>{card.race}</p>
                          </div>
                        ) : card.race === "Continuous" ? (
                          <div className="flex flex-row gap-2">
                            <img className="w-5 h-5" src={Continuous} />
                            <p>{card.race}</p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : card.type === "Trap Card" ? (
                      <div className="flex flex-row gap-2">
                        <img className="w-5 h-5" src={Trap} />
                        <p>{card.type}</p>
                        {card.race === "Continuous" ? (
                          <div className="flex flex-row gap-2">
                            <img className="w-5 h-5" src={ContinuousTrap} />
                            <p>{card.race}</p>
                          </div>
                        ) : card.race === "Normal" ? (
                          <div className="flex flex-row gap-2">
                            <img className="w-5 h-5" src={NormalTrap} />
                            <p>{card.race}</p>
                          </div>
                        ) : card.race === "Counter" ? (
                          <div className="flex flex-row gap-2">
                            <img className="w-5 h-5" src={Counter} />
                            <p>{card.race}</p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full text-left pt-5">
                <p
                  className={`text-content ${
                    card.desc.length > 500 ? "text-sm" : "text-base"
                  }`}
                >
                  {card.desc}
                </p>
              </div>
              <div className="flex flex-row gap-3">
                {card.atk >= 0 ? (
                  <div className="flex flex-row ">
                    <p className="font-bold">ATK</p>/{card.atk}
                  </div>
                ) : (
                  ""
                )}
                {card.def >= 0 ? (
                  <div className="flex flex-row">
                    <p className="font-bold">DEF</p>/{card.def}
                  </div>
                ) : (
                  ""
                )}

                {card.linkval ? (
                  <div className="flex flex-row">
                    <p className="font-bold">Link</p> <p>-</p> {card.linkval}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Card Details"
        className="fixed inset-0 flex items-center justify-center md:p-32  bg-black bg-opacity-5 "
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        {selectedCard && (
          <div className="bg-[#d4d4d4] p-10 m-0  rounded-lg shadow-2xl  md:w-full md:h-auto md:min-w-96 w-[400px] h-[520px] overflow-auto md:overflow-hidden  justify-start items-start gap-8 md:flex md:flex-row  ">
            <img
              className=" md:w-full md:h-full md:max-w-[350px] h-auto shadow-2xl "
              src={selectedCard.card_images[0].image_url}
              alt={selectedCard.name}
            />

            <div className="flex flex-col gap-2">
              <div className="text-xl font-bold">{selectedCard.name}</div>
              <div className="flex items-center gap-1">
                {selectedCard.attribute === "WIND" ? (
                  <div className="flex flex-row gap-2">
                    <img className="w-5 h-5" src={wind} />
                    <p>{selectedCard.attribute}</p>
                  </div>
                ) : selectedCard.attribute === "FIRE" ? (
                  <div className="flex flex-row gap-2">
                    <img className="w-5 h-5" src={fire} />
                    <p>{selectedCard.attribute}</p>
                  </div>
                ) : selectedCard.attribute === "WATER" ? (
                  <div className="flex flex-row gap-2">
                    <img className="w-5 h-5" src={water} />
                    <p>{selectedCard.attribute}</p>
                  </div>
                ) : selectedCard.attribute === "DARK" ? (
                  <div className="flex flex-row gap-2">
                    <img className="w-5 h-5" src={dark} />
                    <p>{selectedCard.attribute}</p>
                  </div>
                ) : selectedCard.attribute === "LIGHT" ? (
                  <div className="flex flex-row gap-2">
                    <img className="w-5 h-5" src={light} />
                    <p>{selectedCard.attribute}</p>
                  </div>
                ) : selectedCard.attribute === "DIVINE" ? (
                  <div className="flex flex-row gap-2">
                    <img className="w-5 h-5" src={divine} />
                    <p>{selectedCard.attribute}</p>
                  </div>
                ) : selectedCard.attribute === "EARTH" ? (
                  <div className="flex flex-row gap-2">
                    <img className="w-5 h-5" src={earth} />
                    <p>{selectedCard.attribute}</p>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  {selectedCard.type === "XYZ Monster" ? (
                    <div className="flex flex-row gap-2">
                      <img className="w-5 h-5" src={Rank_Star} />
                      <p>{selectedCard.level}</p>
                    </div>
                  ) : selectedCard.type === "Synchro Monster" ||
                    selectedCard.type === "Effect Monster" ||
                    selectedCard.type === "Tuner Monster" ||
                    selectedCard.type === "Normal Tuner Monster" ||
                    selectedCard.type === "Pendulum Effect Monster" ||
                    selectedCard.type === "Pendulum Normal Monster" ||
                    selectedCard.type === "Pendulum Tuner Effect Monster" ||
                    selectedCard.type === "Pendulum Effect Ritual Monster" ||
                    selectedCard.type === "Fusion Monster" ||
                    selectedCard.type === "Normal Monster" ||
                    selectedCard.type === "Token" ||
                    selectedCard.type === "Ritual Monster" ? (
                    <div className="flex flex-row gap-2">
                      <img className="w-5 h-5" src={Star} />
                      <p>{selectedCard.level}</p>
                    </div>
                  ) : selectedCard.type === "Spell Card" ? (
                    <div className="flex flex-row gap-2">
                      <img className="w-5 h-5" src={spell} />
                      <p>{selectedCard.type}</p>
                      {selectedCard.race === "Quick-Play" ? (
                        <div className="flex flex-row gap-2">
                          <img className="w-5 h-5" src={QuickPlay} />
                          <p>{selectedCard.race}</p>
                        </div>
                      ) : selectedCard.race === "Normal" ? (
                        <div className="flex flex-row gap-2">
                          <img className="w-5 h-5" src={Normal} />
                          <p>{selectedCard.race}</p>
                        </div>
                      ) : selectedCard.race === "Field" ? (
                        <div className="flex flex-row gap-2">
                          <img className="w-5 h-5" src={Field} />
                          <p>{selectedCard.race}</p>
                        </div>
                      ) : selectedCard.race === "Equip" ? (
                        <div className="flex flex-row gap-2">
                          <img className="w-5 h-5" src={Equip} />
                          <p>{selectedCard.race}</p>
                        </div>
                      ) : selectedCard.race === "Ritual" ? (
                        <div className="flex flex-row gap-2">
                          <img className="w-5 h-5" src={Ritual} />
                          <p>{selectedCard.race}</p>
                        </div>
                      ) : selectedCard.race === "Continuous" ? (
                        <div className="flex flex-row gap-2">
                          <img className="w-5 h-5" src={Continuous} />
                          <p>{selectedCard.race}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : selectedCard.type === "Trap Card" ? (
                    <div className="flex flex-row gap-2">
                      <img className="w-5 h-5" src={Trap} />
                      <p>{selectedCard.type}</p>
                      {selectedCard.race === "Normal" ? (
                        <div className="flex flex-row gap-2">
                          <img className="w-5 h-5" src={NormalTrap} />
                          <p>{selectedCard.race}</p>
                        </div>
                      ) : selectedCard.race === "Continuous" ? (
                        <div className="flex flex-row gap-2">
                          <img className="w-5 h-5" src={ContinuousTrap} />
                          <p>{selectedCard.race}</p>
                        </div>
                      ) : selectedCard.race === "Counter" ? (
                        <div className="flex flex-row gap-2">
                          <img className="w-5 h-5" src={Counter} />
                          <p>{selectedCard.race}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>{selectedCard.scale}</div>
              </div>
              {selectedCard.type === "Spell Card" ||
              selectedCard.type === "Trap Card" ? (
                ""
              ) : (
                <div>
                  {" "}
                  <div className="font-bold">{selectedCard.type}</div>
                  <div className="font-semibold">{selectedCard.race}</div>
                </div>
              )}

              <div className="text-balance mt-2 md:overflow-hidden w-72  md:w-96  ">
                {selectedCard.desc}
              </div>

              <div className="flex flex-row gap-3">
                {selectedCard.atk >= 0 ? (
                  <div className="flex flex-row ">
                    <p className="font-bold">ATK</p>/{selectedCard.atk}
                  </div>
                ) : (
                  ""
                )}
                {selectedCard.def >= 0 ? (
                  <div className="flex flex-row">
                    <p className="font-bold">DEF</p>/{selectedCard.def}
                  </div>
                ) : (
                  ""
                )}

                {selectedCard.linkval ? (
                  <div className="flex flex-row">
                    <p className="font-bold">Link</p> <p>-</p>{" "}
                    {selectedCard.linkval}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <button
              onClick={handleRelatedCards}
              className="md:mt-52 mt-6 md:ml-0 ml-[100px]  text-sm font-semibold shadow-lg md:w-52 w-28 md:h-12 h-8 md:min-w-52 md:min-h-12 bg-red-600 text-white hover:bg-red-500 transition-colors ease-in-out duration-500 cursor-pointer disabled:cursor-auto disabled:hover:bg-red-600 disabled:opacity-30"
              disabled={!selectedCard.archetype}
            >
              Related Cards
            </button>
            {relatedCards.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-4  pb-4 md:w-full  md:h-96 w-auto h-80 bg-[#c8c8c8] z-10 shadow-xl overflow-y-scroll custom-scrollbar rounded-lg ">
                {relatedCards.map((relatedCard) => (
                  <div key={relatedCard.id} className="relative group   ">
                    <img
                      className="md:w-32 md:h-40 w-36 h-52 rounded-md shadow-lg duration-500 ease-in-out hover:transform group-hover:scale-[1.20] hover:translate-full cursor-pointer  "
                      src={relatedCard.card_images[0].image_url}
                      alt={relatedCard.name}
                      onClick={() => openModal(relatedCard)}
                    />
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={closeModal}
              className="absolute top-6 right-3  rounded-sm text-2xl  font-semibold shadow-lg w-10 h-10 bg-red-600 text-white hover:bg-red-500 transition-colors ease-in-out duration-500   "
            >
              X
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Card;
