import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './../Pages/Login/login';
import SignUp from './../Pages/SignUp/signUp';
import SignUpAddress from './../Pages/SignUpAddress/signUpAddress';
import Feed from './../Pages/Feed/feed';
import Restaurant from './../Pages/Restaurant/restaurant';
import Cart from './../Pages/Cart/cart';
import Profile from './../Pages/Profile/profile';

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/signup/address' element={<SignUpAddress/>}/>
                <Route path='/feed' element={<Feed/>}/>
                <Route path='/feed/:restaurantId' element={<Restaurant/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router;