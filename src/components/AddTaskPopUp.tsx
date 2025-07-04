import { useDispatch } from "react-redux";
import { AddTaskAction } from "../Redux/Slices/taskSlice";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { nanoid } from "@reduxjs/toolkit";
import { TaskCategories, StatusCategories, TaskList, CategoryProps, StatusProps } from "../modal/modal";

interface AddTaskPopUpProps {
  onClose: () => void;
}

export const AddTaskPopUp = ({ onClose }: AddTaskPopUpProps) => {
  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState({
    taskTitle: "",
    taskDescription: "",
    category: "",
    dueDate: "",
    status: "Todo",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(""); // Clear error on change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!TaskCategories.includes(taskData.category as CategoryProps)) {
      setError("Please select a valid category for the task.");
      return;
    }

    const newTask: TaskList = {
      id: nanoid(),
      task: taskData.taskTitle,
      description: taskData.taskDescription,
      duedate: new Date(taskData.dueDate),
      category: taskData.category as CategoryProps,
      status: taskData.status as StatusProps,
      isDone: false,
      isSelected: false,
    };

    dispatch(AddTaskAction(newTask));

    setTaskData({
      taskTitle: "",
      taskDescription: "",
      category: "",
      dueDate: "",
      status: "Todo",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-[850px] h-[500px] overflow-y-auto rounded-xl">
        <div className="flex justify-between shadow items-center p-5">
          <h2 className="title m-0">Create Task</h2>
          <h2 className="cursor-pointer font-bold" onClick={onClose}>
            <IoClose size="20" />
          </h2>
        </div>

        <div className="p-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="taskTitle"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task title"
                value={taskData.taskTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 font-semibold">Description</label>
              <ReactQuill
                theme="snow"
                value={taskData.taskDescription}
                onChange={(value) =>
                  setTaskData({ ...taskData, taskDescription: value })
                }
                placeholder="Write your task details here..."
              />
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="mb-4 w-full md:w-[30%]">
                <h4 className="font-semibold mb-2">Task Category</h4>
                <div className="flex gap-2">
                  {TaskCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`filter_btn ${taskData.category === category
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray"
                        }`}
                      onClick={() =>
                        setTaskData({ ...taskData, category })
                      }
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>

              <div className="mb-4 w-full md:w-[30%]">
                <h4 className="font-semibold mb-2">Due Date</h4>
                <input
                  type="date"
                  name="dueDate"
                  className="outline-none bg-transparent w-full p-2 border rounded"
                  value={taskData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4 w-full md:w-[30%]">
                <h4 className="font-semibold mb-2">Task Status</h4>
                <select
                  name="status"
                  className="w-full p-2 border rounded"
                  value={taskData.status}
                  onChange={handleChange}
                  required
                >
                  {StatusCategories.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end items-end gap-3 pt-5">
              <button
                type="button"
                className="filter_btn border-[black] border-[1px] px-4 py-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="Add_btn bg-blue-500 text-white px-4 py-2"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
