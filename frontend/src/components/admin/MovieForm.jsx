/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import TagInput from "./TagInput";
import LiveSearch from "./LiveSearch";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
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

  const { title, storyLine, director, writers } = movieInfo;
  return (
    <div>
      <h1 className="text-center text-xl font-semibold">Add movie</h1>
      <form
        onSubmit={handleSubmit}
        className="card-body p-0 flex gap-4 flex-row"
      >
        <div className="w-[70%]">
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
              className="input input-bordered outline-none rounded-sm px-2 text-xs pt-2 resize-none h-24"
            ></textarea>
          </div>
          <TagInput name="tags" onChange={updateTags} />
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
            <LabelWithBadge label={"Writers"} badge={writers.length} />
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
        <div className="section bg-slate-200 h-60 w-[30%]"></div>
      </form>
    </div>
  );
};

export default MovieForm;

const LabelWithBadge = ({ label, badge }) => {
  return (
    <div className="flex justify-between">
      <div className="indicator">
        <span className="indicator-item badge indicator-top translate-y-[40%] w-3 h-3 p-1 bg-transparent text-[8px]">
          {badge <= 9 ? badge : "9+"}
        </span>
        <label className="label">
          <span className="label-text text-[12px] leading-4">{label}</span>
        </label>
      </div>
      <button className="text-[10px]">View all</button>
    </div>
  );
};
