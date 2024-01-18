/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { genres } from "../../utils/genres";

const GenreSelectorModal = () => {
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [mainGenre, setMainGenre] = useState([...genres]);

  const handleGenreSelection = (gen) => {
    const updatedSelectedGenre = selectedGenre.includes(gen)
      ? selectedGenre.filter((genre) => genre !== gen)
      : [...selectedGenre, gen];

    setSelectedGenre(updatedSelectedGenre);
    setMainGenre([
      ...genres.filter((genre) => !updatedSelectedGenre.includes(genre)),
    ]);
  };

  const handleGenreRemove = (gen) => {
    if (selectedGenre.includes(gen)) {
      let newSelectedGenre = selectedGenre.filter((genre) => genre !== gen);
      setSelectedGenre(newSelectedGenre);
      setMainGenre([
        ...genres.filter((genre) => !newSelectedGenre.includes(genre)),
      ]);
    } else {
      setSelectedGenre([...selectedGenre, gen]);
    }
  };

  useState(() => {}, [mainGenre, selectedGenre]);

  console.log(selectedGenre);

  return (
    <>
      <dialog id="genre_modal" className="modal">
        <div className="modal-box max-h-[40%] xs:max-h-[68%] md:max-h-[50%] sm:max-h-[68%]  rounded-md max-w-md overflow-scroll overflow-x-hidden custom-scrollbar">
          <h1 className="text-xl text-center font-semibold mb-4">
            Select genres
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            {selectedGenre.map((selectedGen, i) => {
              return (
                <kbd
                  key={i}
                  onClick={() => handleGenreRemove(selectedGen)}
                  className="kbd text-[11px] cursor-pointer rounded-sm"
                >
                  {selectedGen}
                </kbd>
              );
            })}
          </div>
          <hr className="my-2"/>
          <div className="flex items-center gap-2 flex-wrap">
            {mainGenre.map((gen, i) => {
              return (
                <kbd
                  onClick={() => handleGenreSelection(gen)}
                  className="kbd bg-base-100 text-[11px] cursor-pointer rounded-sm"
                  key={i}
                >
                  {gen}
                </kbd>
              );
            })}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default GenreSelectorModal;
