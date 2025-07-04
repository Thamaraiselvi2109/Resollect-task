import { useState } from "react";
import { AddTaskPopUp } from "./AddTaskPopUp";

export const Addbtn = () => {
  const [entry, setEntry] = useState<boolean>(false);
  const closePopup = () => {
    setEntry(false);
  };

  return (
    <>
      <div className="mb-5">
        <button
          className="text-lg font-semibold md:mx-5"
          onClick={() => setEntry(true)}
        >
          <span className="text-voilet">+</span> Add Task
        </button>
        {entry && (
          <div className="PopupOverlay">
            <AddTaskPopUp onClose={closePopup} />
          </div>
        )}
      </div>
    </>
  );
};
