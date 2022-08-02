import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../screens/Login"
import SignUp from "../screens/SignUp"
import Feed from "../screens/Feed"
import Post from "../screens/Post"
import Error from "../screens/Error";

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="feed" element={<Feed />} />
                    <Route path="feed/post/:id" element={<Post />} />
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router;