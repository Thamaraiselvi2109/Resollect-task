import { useSelector } from "react-redux"
import { persistor, RootState } from "../Redux/store"
import { FiLogOut } from "react-icons/fi";
import { googleSignOut } from "../Redux/Slices/authSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { SearchAddBtn } from "./SearchAddBtn";



export const LogOut = () => {
    const { userDetails } = useSelector((state: RootState) => state.authentication)
    const dispatch = useAppDispatch();
    const handleGoogleSignOut = () => {
        dispatch(googleSignOut());
        persistor.purge();
    };
    return (
        <>
            <div className="logout">
                <div className="flex gap-2 items-center">
                    <img src={userDetails.img || 'no img found'} alt="" className="user" />
                    <p className="texts">{userDetails.name}</p>
                    <button className="logout_btn" onClick={handleGoogleSignOut}><FiLogOut />Logout</button>
                </div>
                <SearchAddBtn />
            </div>
        </>
    )
}