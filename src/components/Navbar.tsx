import { BoardOrList } from './BoardOrList'
import { LogOut } from './LogOut'

export const Navbar = () => {
    return (
        <>
            <div className=" bg-pastel lg:bg-[#ffffff] shadow-md lg:shadow-none">
                <div className="cont flex justify-between  px-2 pt-5 pb-2 lg:pb-0 ">
                    <BoardOrList />
                    <LogOut />
                </div>
            </div>
            <div className='cont'>
                <hr />
            </div>
        </>
    )
}