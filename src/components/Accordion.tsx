import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { format } from "date-fns";
import { AccordionProps, TaskList } from "../modal/modal";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { AccordionClick } from "../Redux/Slices/accordionopenSlice";
import { useState } from "react";
import { StatusPopup, MorePopUp } from "./SelectPopUp";
import { Addbtn } from "./Addbtn";
import { EditTaskAction } from "../Redux/Slices/taskSlice";

export const Accordion = ({ singleTask, title }: AccordionProps) => {
    const dispatch = useAppDispatch();
    const open = useSelector((state: RootState) => state.accordionopen.Accordion[title]);

    const [more, setMore] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [editId, setEditId] = useState<string | null>(null);
    const [editText, setEditText] = useState<string>("");

    const handleMore = (id: string) => {
        setMore(more === id ? null : id);
    };

    const handleStatusToggle = (id: string) => {
        setStatus(prev => (prev === id ? null : id));
    };

    const handleOutsideClick = () => {
        setStatus(null);
    };

    const handleEdit = (task: TaskList) => {
        setEditId(task.id);
        setEditText(task.task);
        setMore(null);
    };

    const handleEditSubmit = (id: string) => {
        if (editText.trim() !== "") {
            dispatch(EditTaskAction({ id, updates: { task: editText } }));
            setEditId(null);
            setEditText("");
        }
    };

    return (
        <div className="flex flex-col rounded-lg my-5">
            <div className="Accordion">
                <button
                    className={`btn ${title === "Todo" ? "bg-pink" : title === "Onprogress" ? "bg-blue" : title === "Completed" ? "bg-green" : ""}`}
                    onClick={() => dispatch(AccordionClick({ title }))}
                >
                    <span className="accor_title">{title} ({singleTask.length})</span>
                    <span>{open ? <FaAngleUp color="#7B1984" /> : <FaAngleDown color="#7B1984" />}</span>
                </button>

                <div className={`transition-max-height duration-500 ease-in-out lg:px-3 px-2 bg-gray ${open ? "py-5 max-h-[500px]" : "max-h-0"}`}>
                    {title === "Todo" ? <Addbtn /> : null}

                    {singleTask.length === 0 ? (
                        <p className="text-center font-medium py-5">No Tasks in {title}</p>
                    ) : (
                        singleTask.map((task: TaskList) => (
                            <div key={task.id} className="single_accor">
                                
                                {/* Task col */}
                                <div className="w-[80%] md:w-[50%] flex items-center">
                                    {editId === task.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="border px-2 py-1 rounded w-2/3"
                                            />
                                            <button
                                                onClick={() => handleEditSubmit(task.id)}
                                                className="ml-2 bg-blue text-white px-2 py-1 rounded"
                                            >
                                                Save
                                            </button>
                                        </>
                                    ) : (
                                        <p className={`table_text ${title === 'Completed' ? 'line-through' : ''}`}>
                                            {task.task}
                                        </p>
                                    )}
                                </div>

                                {/* Due Date */}
                                <div className="lg:w-[15%] table_text mbl_lay_hidden">
                                    {format(new Date(task.duedate), "dd/MM/yyyy")}
                                </div>

                                {/* Status */}
                                <div className="lg:w-[10%] md:w-[15%] relative md:text-center lg:text-start mbl_lay_hidden">
                                    <button
                                        className="bg-[#DDDADD] px-[5px] py-[3px] table_text rounded-md"
                                        onClick={() => handleStatusToggle(task.id)}
                                    >
                                        {task.status}
                                    </button>

                                    {status === task.id && (
                                        <StatusPopup id={task.id} onClose={handleOutsideClick} />
                                    )}
                                </div>

                                {/* Category */}
                                <div className="w-[10%] table_text md:text-center mbl_lay_hidden">
                                    <button>{task.category}</button>
                                </div>

                                {/* More Button and Pop-up */}
                                <div className="w-[10%] flex justify-end relative">
                                    <MdMoreHoriz size={25} className="cursor-pointer" onClick={() => handleMore(task.id)} />
                                    {more === task.id && (
                                        <MorePopUp id={task.id} onEdit={() => handleEdit(task)} />
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
