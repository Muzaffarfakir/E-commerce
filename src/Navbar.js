import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import "./Navbar.css"
import { Link, BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom"
import Home from "./Home";
import Addcart from "./Addcart";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import { useCookies } from "react-cookie"
function Navbar() {
    let [cookies, setCookies] = useCookies(["access_token"])
    //let his=useHistory();
   

    return (
        <>
            <BrowserRouter>
                <nav>
                    <h6>E-cOmMeRc</h6>
                    <ul>

                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/Addcart'}>Addcart</Link>
                        </li>
                        <li>
                            <Link to={'/Signup'}>Signup</Link>
                        </li>
                        {!cookies.access_token ? (
                            <li>
                                <Link to={'/Login'}>Login</Link>
                            </li>) : (<Link to={"/Profile"}>Profile</Link>)}





                    </ul>
                </nav>

                <Routes>
                    <Route
                        path="/"
                        element={<Home />} />

                    <Route
                        path="/Addcart"
                        element={<Addcart />}


                    />
                    <Route
                        path="/Signup"
                        element={<Signup />}
                    />
                    <Route
                        path="/Login"
                        element={<Login Head="Login" />}
                    />
                    <Route
                    path={"/Profile"}
                    element={<Profile name="Mudar"  pass="*******"/>}

                    />
                </Routes>

            </BrowserRouter>

            <hr />

            <Footer />
        </>
    )
}
export default Navbar