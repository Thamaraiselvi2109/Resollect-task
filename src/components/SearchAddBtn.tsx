import { useState } from "react";
import { AddTaskPopUp } from "./AddTaskPopUp";


export const SearchAddBtn = () => {
    const [entry, setEntry] = useState<boolean>(false);

    const closePopup = () => {
        setEntry(false);
    };

    return (
        <>
            <div className="SearchComponent py-5">
                <button className="Add_btn bg-blue-500 text-white px-4 py-2" onClick={() => setEntry(true)}> Add Task </button>
            </div>
            {entry && (
                <div className="PopupOverlay">
                    <AddTaskPopUp onClose={closePopup} />
                </div>
            )}
        </>
    );
};
