import React from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  return createPortal(children, document.getElementById("modal-root"));
};

function ErrorModal(props) {
  const {handleClose} = props
  return (
    <Portal>

      <div className="bg-white p-4 rounded-md shadow-md opacity-100  w-[500px] top-[30%]  left-[40%]  fixed	 z-20 ">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops ... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
        <form method="dialog" className="mt-4 text-right">
          <button onClick={handleClose} className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
            Okay
          </button>
        </form>
      </div>

    </Portal>
  );
}

export default ErrorModal;
