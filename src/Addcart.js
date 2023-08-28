import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

function Addcart() {
    let [d, sD] = useState([]);
    async function info() {
        await fetch("https://e-bcak.onrender.com/getProduct").then((res) => res.json()).then((data) => {
            sD(data)


        })




    }
  

    function del(id) {
        axios.delete(`https://e-bcak.onrender.com/delOne${id}`)
        window.location.reload()

    }
    async function Pay(price, des) {
        axios.post("https://e-bcak.onrender.com/amount", { price, des })
        await fetch("https://e-bcak.onrender.com/Pay").then((res) => res.json()).then((data) => {
            window.location = data.url;
        })
    }

    useEffect(() => {
        info();
    }, [])



    return (
        <>
            <h2 class="text-center">Your Cart </h2>
            <hr />
            {d.map((el) => {
                return <div class="card my-3" >
                    <img class="card-img-top" src={`${el.Img}`} alt="Card image cap" />
                    <p><b>Category : {el.Category}</b></p>
                    <p><b>Description : {el.Description}</b></p>
                    <p><b> Price : {el.Price}$</b></p>
                    <div className="d-flex">

                        <button onClick={() => Pay(el.Price, el.Description)} type="button" style={{ width: "90px" }} class="btn btn-outline-primary">Pay</button>
                        <button onClick={() => del(el._id)} type="button" style={{ width: "90px" }} class="btn btn-outline-danger">Delete</button>

                    </div>


                </div>

            })}

        </>
    )

}
export default Addcart;
