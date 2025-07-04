import { createSlice} from "@reduxjs/toolkit";
import { OpenCloseProps } from "../../modal/modal";



const initialState: OpenCloseProps = {
    Addtask: false,
    Accordion: {
        Todo: false,
        Onprogress: false,
        Completed: false,
    },
}

const AccordionSlice = createSlice({
    name: 'accordionopen',
    initialState,
    reducers: {
        AddClick: (state) => {
            state.Addtask = !state.Addtask;
        },
        AccordionClick: (state, action) => {
            const {title} = action.payload
            state.Accordion[title] = !state.Accordion[title]
            state.Addtask= false
        }
    }
})

export default AccordionSlice.reducer;
export const { AccordionClick, AddClick } = AccordionSlice.actions