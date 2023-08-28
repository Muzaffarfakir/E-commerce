import React, { useEffect, useState } from "react"
import axios from "axios"

import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
function Home() {
    let [d, Sd] = useState([]);
    let nav = useNavigate();
    async function info() {
        await fetch("https://fakestoreapi.com/products").then((res) => res.json()).then((data) => {
            Sd(data);
        })

        axios({
            method: "post",
            url: 'https://e-bcak.onrender.com/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: window.localStorage.getItem("Token"),
                data: "Muju"
            }
        }).then((res)=>{
            console.log(res)
            if(res.data.mess=="invalid"){
                alert("Please Login Otherwise You Cant Use Our Service ")
            }
           
        })

    }
    useEffect(() => {
        info();
    }, [])


    function addcart(el) {
        axios.post('https://e-bcak.onrender.com/products',
            { el })
        nav("/addcart")




    }


    return (
        <>

            <div class="my-5 text-center ">
                <h3>WelCoMe To OuR ShOp </h3>
            </div>

            <div class="input-group mb-3  " style={{ marginTop: "3rem" }}>
                <input type="text" class="form-control" placeholder="Search items here " aria-describedby="basic-addon2" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">Serach</button>
                </div>
            </div>


            <hr class="my-4" />
            {d.map((product) => {
                return <div class="card my-6" >
                    <img class="card-img-top" src={`${product.image}`} alt="Card image cap" />
                    <p><b>Category : {product.category}</b></p>
                    <p><b>Description : {product.description}</b></p>
                    <p><b>Rating : {product.rating.count}</b></p>
                    <p><b> Price : {product.price}$</b></p>
                    <button onClick={() => addcart(product)} type="button" style={{ width: "90px" }} class="btn btn-outline-secondary">Addcart</button>


                </div>

            })}





        </>
    )

}
export default Home;
