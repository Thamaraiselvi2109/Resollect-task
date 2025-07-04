import { MdEdit } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { RemoveTaskAction, UpdateTaskStatus } from "../Redux/Slices/taskSlice";
import { StatusProps } from "../modal/modal";
import { useEffect, useRef } from "react";

interface MorePopUpProps {
  id: string;
  onEdit: () => void;
}

export const MorePopUp: React.FC<MorePopUpProps> = ({ id, onEdit }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="selectpop right-6 -bottom-9 gap-2 ">
      <button onClick={onEdit}><MdEdit /><span>Edit</span></button>
      <button className="text-red" onClick={() => dispatch(RemoveTaskAction(id))}>
        <MdDeleteSweep /><span>Delete</span>
      </button>
    </div>
  );
};


interface StatusPopupProps{
    id : string,
    onClose: () => void;
}

export const StatusPopup: React.FC<StatusPopupProps> = ({ id, onClose }) => {
    const dispatch = useAppDispatch();
    const popupRef = useRef<HTMLDivElement>(null);

    const handleStatus = (status: StatusProps) => {
        dispatch(UpdateTaskStatus({ id, status }));
        onClose(); // Close after selection
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={popupRef} className="selectpop left-7 absolute z-10">
            <button onClick={() => handleStatus("Todo")}>Todo</button>
            <button onClick={() => handleStatus("Onprogress")}>Onprogress</button>
            <button onClick={() => handleStatus("Completed")}>Completed</button>
        </div>
    );
};


