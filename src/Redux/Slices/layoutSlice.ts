import { createSlice } from "@reduxjs/toolkit";
import { LayoutProps } from "../../modal/modal";

const initialState: LayoutProps = {
    list: true,
    board: false
}

const LayoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        ListClick: (state) => {
            state.list = true;
            state.board = false;
            console.log(state.board, state.list)
        },
        boardClick: (state) => {
            state.list = false;
            state.board = true;
            console.log(state.board, state.list)
        },
    }
})


export default LayoutSlice.reducer;
export const { ListClick, boardClick } = LayoutSlice.actions
