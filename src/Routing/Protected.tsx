import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../modal/modal";
import { RootState } from "../Redux/store";


const ProtectedRoute =  ({ children }: ProtectedRouteProps) => {
  const { userDetails } = useSelector((state: RootState) => state.authentication);

  // If the user is not authenticated, redirect to the Sign-In page
  if (!userDetails.name) {
    return <Navigate to="/sign-in" />;
  }

  // Otherwise, render the child components (protected content)
  return <>{children}</>;
};

export default ProtectedRoute;
