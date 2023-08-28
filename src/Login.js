import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"


function Login(props) {
    let [email, setEmail] = useState();
    let [pass, setPass] = useState();
    let [name, setName] = useState();

    let nav = useNavigate();
    let [_, setCookies] = useCookies(["access_token"])



    let infi = () => {

        axios.post("http://localhost:8000/login", { email, pass, name }).then((res) => {
            if (res.data.mess == "exits") {
                setCookies("access_token", res.data.token);
                window.localStorage.setItem("Token", res.data.token)
               

                nav("/profile")
            }
            else {
                alert("You Enter a wrong criendtils");

            }
        })

    }





    return (
        <>
            <h1 class="text-center">{props.Head}</h1>
            <div class="card my-6 mx-3 mb-6 ">
                <div class="input-group mb-3  " onChange={(e) => { setName(e.target.value) }} style={{ marginTop: "3rem" }}>
                    <input type="text" class="form-control" placeholder="Eneter a Name Here " aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    </div>
                </div>
                <div class="input-group mb-3  " style={{ marginTop: "3rem" }}>
                    <input type="text" onChange={(e) => { setEmail(e.target.value) }} class="form-control" placeholder="Enter a Email Here" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    </div>
                </div>
                <div class="input-group mb-3  " onChange={(e) => { setPass(e.target.value) }} style={{ marginTop: "3rem" }}>
                    <input type="text" class="form-control" placeholder="Eneter a Passward Here " aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                    </div>
                </div>






                <button onClick={infi} class="btn btn-outline-secondary" type="button" style={{ marginTop: "2rem" }}>Login</button>

            </div>




        </>
    )

}
export default Login;