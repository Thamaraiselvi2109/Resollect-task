import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { StatusProps, task, TaskList } from "../../modal/modal";


const initialState: task = {
    singleTask: [{
        id: nanoid(),
        task: "Wake Up at 9",
        description: "description",
        duedate: new Date(),
        category: 'Work',
        status: 'Todo',
        isDone: false,
        isSelected: false
    },
    {
        id: nanoid(),
        task: "Brush",
        description: "description",
        duedate: new Date(),
        category: 'Work',
        status: 'Todo',
        isDone: false,
        isSelected: false
    },
    {
        id: nanoid(),
        task: "Bath",
        description: "description",
        duedate: new Date(),
        category: 'Personal',
        status: 'Todo',
        isDone: false,
        isSelected: false
    },
    {
        id: nanoid(),
        task: "Eat",
        description: "description",
        duedate: new Date(),
        category: 'Work',
        status: 'Todo',
        isDone: false,
        isSelected: false
    },
    {
        id: nanoid(),
        task: "Do Work",
        description: "description",
        duedate: new Date(),
        category: 'Work',
        status: 'Onprogress',
        isDone: false,
        isSelected: false
    }, {
        id: nanoid(),
        task: "Sleep",
        description: "description",
        duedate: new Date(),
        category: 'Work',
        status: 'Completed',
        isDone: true,
        isSelected: false
    }
    ]
}

const TaskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        AddTaskAction: (state, action: PayloadAction<TaskList>) => {
            state.singleTask.push(action.payload);
        },
        RemoveTaskAction: (state, action: PayloadAction<string>) => {
            state.singleTask = state.singleTask.filter((task) => task.id !== action.payload);
        },
        UpdateTaskStatus: (state, action: PayloadAction<{ id: string; status: StatusProps }>) => {
            const task = state.singleTask.find((t) => t.id === action.payload.id);
            if (task) {
                task.status = action.payload.status;
                task.isDone = action.payload.status === "Completed";
            }
        },
        EditTaskAction: (state, action: PayloadAction<{ id: string; updates: Partial<TaskList> }>) => {
            const task = state.singleTask.find((task) => task.id === action.payload.id);
            if (task) {
                Object.assign(task, action.payload.updates);
            }
        }
    }
})


export default TaskSlice.reducer;
export const { AddTaskAction, RemoveTaskAction, UpdateTaskStatus, EditTaskAction } = TaskSlice.actions;