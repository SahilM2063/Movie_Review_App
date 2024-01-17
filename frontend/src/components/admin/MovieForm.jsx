/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import TagInput from "./TagInput";
import LiveSearch from "./LiveSearch";
import { IoClose } from "react-icons/io5";
import CastForm from "./CastForm";
import PosterSelector from "./PosterSelector";
import { PiTreeStructureLight } from "react-icons/pi";
import { genres } from "../../utils/genres.js";

export const profileData = [
  {
    id: 1,
    name: "Alice Smith",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Bob Johnson",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
  },
  {
    id: 4,
    name: "Diana Miller",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
  },
];

export const renderItems = (data) => {
  return (
    <>
      <img
        src={data.avatar}
        alt={data.name}
        className="rounded-full w-8 h-8 mr-3"
      />
      <span className="font-semibold">{data.name}</span>
    </>
  );
};

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};

const MovieForm = () => {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [selectedPosterUI, setSelectedPosterUI] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;

    if (name === "poster") {
      const poster = files[0];
      updatePosterUI(poster);
      return setMovieInfo({ ...movieInfo, poster });
    }
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  const updateDirectors = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };

  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id) {
        return;
      }
    }

    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };

  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  const handleWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);

    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);

    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  const updatePosterUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedPosterUI(url);
  };

  const { title, storyLine, director, writers, cast, tags } = movieInfo;
  return (
    <div>
      <h1 className="text-center text-xl font-semibold">Add movie</h1>
      <form
        onSubmit={handleSubmit}
        className="card-body p-0 flex xs:flex-col sm:flex-col md:flex-col flex-row-reverse gap-4"
      >
        {/* <div className="section bg-slate-200 h-60 xs:w-full sm:w-full md:w-full w-[26%] mt-2"></div> */}
        <PosterSelector
          name={"poster"}
          onChange={handleChange}
          selectedPoster={selectedPosterUI}
          accept={"image/jpeg, image/jpg, image/png"}
        />
        <div className="w-full">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[12px] leading-4">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="Movie title"
              className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[12px] leading-4">
                Storyline
              </span>
            </label>
            <textarea
              name="storyLine"
              value={storyLine}
              onChange={handleChange}
              placeholder="Movie description"
              rows={10}
              className="input input-bordered outline-none rounded-sm px-2 text-xs pt-2 resize-none h-24 custom-scrollbar"
            ></textarea>
          </div>
          <TagInput name="tags" onChange={updateTags} value={tags} />
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[12px] leading-4">
                Directors
              </span>
            </label>
            <LiveSearch
              name={"directors"}
              value={director.name}
              onChange={updateDirectors}
              onSelect={updateDirectors}
              placeholder="Search profiles"
              profileData={profileData}
              renderItems={(data) => {
                return (
                  <>
                    <img
                      src={data.avatar}
                      alt={data.name}
                      className="rounded-full w-8 h-8 mr-3"
                    />
                    <span className="font-semibold">{data.name}</span>
                  </>
                );
              }}
            />
          </div>
          <div className="form-control">
            <LabelWithBadge
              htmlFor={"writer_modal"}
              label={"Writers"}
              badge={writers.length}
              viewBtn={writers.length > 0 ? true : false}
            />
            <LiveSearch
              name={"Writers"}
              value={writers.map((writer) => writer.name)}
              onChange={updateWriters}
              onSelect={updateWriters}
              placeholder="Search profiles"
              profileData={profileData}
              renderItems={(data) => {
                return (
                  <>
                    <img
                      src={data.avatar}
                      alt={data.name}
                      className="rounded-full w-8 h-8 mr-3"
                    />
                    <span className="font-semibold">{data.name}</span>
                  </>
                );
              }}
            />
            <WritersModalModule
              profiles={writers}
              OnRemoveClick={handleWriterRemove}
            />
          </div>
          <div className="form-control">
            <CastForm onCastSubmit={updateCast} cast={cast} />
            <CastModalModule profiles={cast} OnRemoveClick={handleCastRemove} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[12px] leading-4">
                Release date
              </span>
            </label>
            <input
              type="date"
              name="releaseDate"
              // value={title}
              onChange={handleChange}
              className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
            />
          </div>
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text text-[12px] leading-4">Genre</span>
            </label>
            <div>
              <label
                onClick={() =>
                  document.getElementById("genre_modal").showModal()
                }
                className="btn px-3 min-h-8 h-9 rounded-sm text-xs capitalize"
              >
                <PiTreeStructureLight />
                Select Genre
              </label>
            </div>
            <GenreSelectorModal />
          </div>
          <div className="form-control mt-4">
            <button
              className="btn btn-primary px-3 min-h-8 h-9 rounded-sm text-xs"
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;

export const LabelWithBadge = ({
  label,
  badge = 0,
  htmlFor,
  viewBtn,
  labelClasses = "",
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="indicator">
        {badge > 0 ? (
          <span className="indicator-item badge indicator-top translate-y-[30%] w-3 h-3 p-1 bg-transparent text-[8px]">
            {badge <= 9 ? badge : "9+"}
          </span>
        ) : (
          ""
        )}
        <label className={"label" + labelClasses}>
          <span className="label-text text-[12px] leading-4">{label}</span>
        </label>
      </div>
      {viewBtn && (
        <label
          className="text-[10px] cursor-pointer"
          onClick={() => document.getElementById(htmlFor).showModal()}
        >
          View all
        </label>
      )}
    </div>
  );
};

const WritersModalModule = ({ profiles, OnRemoveClick }) => {
  if (profiles.length <= 0) return null;

  return (
    <>
      <dialog id="writer_modal" className="modal">
        <div className="modal-box max-h-[40%] xs:max-h-[68%] md:max-h-[50%] sm:max-h-[68%] grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 gap-4 rounded-md max-w-md overflow-scroll overflow-x-hidden custom-scrollbar">
          {profiles.map(({ id, name, avatar }) => {
            return (
              <div key={id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={avatar}
                    alt={name}
                    className="rounded-full w-10 h-10 mr-3"
                  />
                  <span className="font-semibold">{name}</span>
                </div>
                <button onClick={() => OnRemoveClick(id)}>
                  <IoClose size={18} />
                </button>
              </div>
            );
          })}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

const CastModalModule = ({ profiles, OnRemoveClick }) => {
  if (profiles.length <= 0) return null;

  return (
    <>
      <dialog id="cast_modal" className="modal">
        <div className="modal-box max-h-[40%] xs:max-h-[68%] md:max-h-[50%] sm:max-h-[68%] grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 gap-4 rounded-md max-w-md overflow-scroll overflow-x-hidden custom-scrollbar">
          {profiles.map(({ profile, roleAs, leadActor }) => {
            return (
              <div
                key={profile.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="rounded-full w-10 h-10 mr-3"
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">
                      {profile.name}
                    </span>
                    <span className="text-[9.5px] opacity-60">
                      {roleAs} {leadActor ? "( LeadActor )" : null}
                    </span>
                  </div>
                </div>
                <button onClick={() => OnRemoveClick(profile.id)}>
                  <IoClose size={18} />
                </button>
              </div>
            );
          })}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

const GenreSelectorModal = () => {
  return (
    <>
      <dialog id="genre_modal" className="modal">
        <div className="modal-box max-h-[40%] xs:max-h-[68%] md:max-h-[50%] sm:max-h-[68%]  rounded-md max-w-md overflow-scroll overflow-x-hidden custom-scrollbar">
          <h1 className="text-xl text-center font-semibold mb-4">
            Select genres
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            {genres.map((gen, i) => {
              return (
                <kbd
                  className="kbd text-[11px] cursor-pointer rounded-sm"
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
