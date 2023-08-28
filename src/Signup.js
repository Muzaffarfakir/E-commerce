import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import axios from "axios"
function Signup() {
    let nav = useNavigate();
    let [name, setName] = useState();
    let [email, setEmail] = useState();
    let [pass, setPass] = useState();
    let [mob, setMob] = useState();
    let [des, setDes] = useState();
    let k = (e) => {

        let data = new FormData();
        let file = e.target.files[0];
        data.append("img", file)

        axios({
            method: "post",
            url: "http://localhost:8000/signdataImg",
            data: data,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }


            }
        })
    }




    function send() {
        


        if (name == undefined || pass == undefined || email == undefined || mob == undefined || des == undefined) {
            alert("Please Write Somethings First Here !")
        }
        else {
            axios.post("http://localhost:8000/signData", { name, pass, email, mob, des }).then((res)=>{
                console.log(res)
                if(res.data=="cExist"){
                    alert("This Email or Password is Already exist")
                    window.location.reload(true);

                }
                else if(res.data=="not"){
                    alert("Your SignUp is Complete Now Go For Login ")
                }
              
                
            })
            nav("/login")


        }



    }













    return (
        <>
            <h1 class="text-center">SignUp </h1>
            <form encType="multipart/form-data">


                <div class="card my-6 mx-3 mb-6 ">


                    <div class="input-group mb-3  " style={{ marginTop: "3rem" }}>
                        <input type="file" name="img" encType="multipart/form-data" placeholder="Enter a Image here" onChange={k} class="form-control" aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                        </div>
                    </div>
                    <div class="input-group mb-3  " style={{ marginTop: "3rem" }}>
                        <input type="text" name="Name" placeholder="Enter a Name here" onChange={(e) => { setName(e.target.value) }} class="form-control" aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                        </div>
                    </div>
                    <div class="input-group mb-3  " name="Email" onChange={(e) => { setEmail(e.target.value) }} style={{ marginTop: "3rem" }}>
                        <input type="text" class="form-control" placeholder="Enter a Email Here" aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                        </div>
                    </div>
                    <div class="input-group mb-3  " name="Pass" onChange={(e) => { setPass(e.target.value) }} style={{ marginTop: "3rem" }}>
                        <input type="text" class="form-control" placeholder="Eneter a Passward Here " aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                        </div>
                    </div>
                    <div class="input-group mb-3  " name="Mobile" onChange={(e) => { setMob(e.target.value) }} style={{ marginTop: "3rem" }}>
                        <input type="number" class="form-control" placeholder="Eneter a Mobile No Here " aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                        </div>
                    </div>

                    <div class="input-group mb-3  " name="Des" onChange={(e) => { setDes(e.target.value) }} style={{ marginTop: "3rem" }}>
                        <input type="text" class="form-control" placeholder="Eneter a Description Here " aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                        </div>
                    </div>





                    <button class="btn btn-outline-secondary" onClick={send} type="button" style={{ marginTop: "2rem" }}>SignUp</button>
                    <h5 class="text-center my-3">I Already I have Account <button onClick={() => { nav('/Login') }} class="btn  bg-primary">Login me</button></h5>
                </div>


            </form>

        </>
    )

}
export default Signup;