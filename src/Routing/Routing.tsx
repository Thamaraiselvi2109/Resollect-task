import { BrowserRouter, Route, Routes } from "react-router-dom"
import { TaskPage } from "../pages/TaskPage"
import { SignIn } from "../pages/SignIn"
import ProtectedRoute from "./Protected"
import { NotFound } from "../pages/NotFound"


export const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <TaskPage />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound/>}/> 
            </Routes>
        </BrowserRouter>
    )
}