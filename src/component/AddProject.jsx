import React, { useState } from "react";
import ErrorModal from "./ErrorModal";

// 1 rem = 16px
// 35 * 16 = 560
function AddProject() {
  const [modal, setModal] = useState(false);
  const [formField, setFormField] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleSave = () => {
    if (!formField.title || !formField.description || !formField.date) {
      setModal(true);
      return;
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="w-[35rem] mt-16">
      {modal && <ErrorModal handleClose={closeModal} hi={"daskndma ksjnd "} />}

      <div className="flex justify-end gap-4 my-4">
        <button className="text-stone-800 hover:text-rose-700"> Cancel</button>
        <button
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          onClick={handleSave}
        >
          {" "}
          Save
        </button>
      </div>

      {/* form area */}
      <div>
        <div>
          <label
            className="text-sm font-bold uppercase text-stone-500"
            htmlFor="title"
          >
            title
          </label>
          <input
            id="title"
            name="title"
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          />
        </div>
        <div>
          <label
            className="text-sm font-bold uppercase text-stone-500"
            htmlFor="DESCRIPTION"
          >
            DESCRIPTION
          </label>
          <textarea
            id="DESCRIPTION"
            name="DESCRIPTION"
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          />
        </div>
        <div>
          <label
            className="text-sm font-bold uppercase text-stone-500"
            htmlFor="title"
          >
            title
          </label>
          <input
            id="title"
            name="title"
            type="date"
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          />
        </div>
      </div>
    </div>
  );
}

export default AddProject;
