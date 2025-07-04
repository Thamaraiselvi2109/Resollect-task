import { FaListUl } from "react-icons/fa";
import { CiViewBoard } from "react-icons/ci";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { boardClick, ListClick } from "../Redux/Slices/layoutSlice";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

export const BoardOrList = () => {

    const dispatch = useAppDispatch();
    const {list, board} = useSelector((state:RootState)=>state.layout)

    return (
        <>
            <div className="w-1/2">
                <h3 className='title'>Task - application</h3>
                <div className="menus">
                    <button className={`${list? "border-b-2" : null}`} onClick={() => dispatch(ListClick())}><FaListUl />List</button>
                    <button className={`${board? "border-b-2" : null}`} onClick={() => dispatch(boardClick())}><CiViewBoard />Board</button>
                </div>
            </div>
        </>
    )
}