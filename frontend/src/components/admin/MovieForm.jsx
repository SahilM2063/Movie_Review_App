/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import TagInput from "./TagInput";

const MovieForm = () => {
  return (
    <div>
      <h1 className="text-center text-xl font-semibold">Add movie</h1>
      <form className="card-body p-0 flex gap-4 flex-row">
        <div className="w-[70%]">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[12px] leading-4">Title</span>
            </label>
            <input
              type="text"
              name="title"
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
              name="storyline"
              placeholder="Movie description"
              rows={10}
              className="input input-bordered outline-none rounded-sm px-2 text-xs pt-2 resize-none h-24"
            ></textarea>
          </div>
          <TagInput />
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