import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios"
import { useCookies } from "react-cookie";
import 'bootstrap/dist/css/bootstrap.css';
import "./Profile.css"

function Profile(props) {
    let [cookies, setCookies] = useCookies(["access_token"]);
    let [ProfileData, setProfileData] = useState([]);


    let nav = useNavigate();
    function Logout() {
        setCookies("access_token", "");




        window.localStorage.removeItem("Token");

        axios.delete("https://e-bcak.onrender.com/del");


        nav('/')


    }

    async function pro() {
        await fetch("https://e-bcak.onrender.com/profile").then((res) => res.json()).then((data) => {

            setProfileData(data)

            console.log(cookies)

        })


    }
    useEffect(() => {
        pro();
    }, [])







    return (
        <>




            <h2 class="text-center">

                Your Profile Here

            </h2>
            <div class="card text-center my-6 mb-3 mx-3">
                {ProfileData.map((el) => {
                    return <div>
                        <img class="img" src={`${el.img}`} alt="Your Img" />
                        <h3>Name : {el.name}</h3>
                        <p>Email :{el.email}</p>
                        <p>Pass  : {el.pass}</p>
                        <p>Mobile :{el.mob}</p>
                        <p>Description : {el.des}</p>


                    </div>

                })}



                <button onClick={Logout} class=" text-center my-6 btn btn-outline-danger">Logout</button>

            </div>


        </>
    )
}
export default Profile;
