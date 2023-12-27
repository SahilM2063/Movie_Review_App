/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import TagInput from "./TagInput";
import LiveSearch from "./LiveSearch";

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
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setMovieInfo({...movieInfo, [name]: value });
  };

  const { title, storyLine, director } = movieInfo;
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
          <TagInput name="tags" />
          <LiveSearch />
          <div className="form-control mt-4">
            <button className="btn btn-primary px-3 min-h-8 h-9 rounded-sm text-xs">
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
