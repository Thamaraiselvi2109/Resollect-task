import { useSelector } from "react-redux"
import { RootState } from "../Redux/store"
import { googleSignIn } from "../Redux/Slices/authSlice"
import google from '../assets/google.svg'
import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../hooks/useAppDispatch"





export const SignIn = () => {
    const { error, userDetails, statusIn } = useSelector((state: RootState) => state.authentication)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const handleGoogleSignIn = () => {
        dispatch(googleSignIn());
    };

    useEffect(() => {
        if (userDetails.name && error == null) {
            navigate(`/`);
        }
    }, [userDetails, Navigate])


    return (
        <>
            <div className="SignInPage">
                <div className="cont">
                    <div className="flex items-center h-screen">
                        <div className="sign-left">
                            <h3 className="title">Task - Application</h3>
                            <p className="texts">Streamline your workflow and track progress <br />effortlessly with our all-in-one task management app.</p>
                            <button className="google-btn" onClick={handleGoogleSignIn}><img src={google} alt="google" />{statusIn === 'loading' ? 'Signing in with Google' : 'Continue with Google'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
