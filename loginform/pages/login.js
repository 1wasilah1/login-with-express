 'use client'; // penggunaannya karena menggunakan command use maka di awal di kasih use juga
import { useRouter } from "next/router"
import { useState, useRef } from "react"


const LoginForm2 = () => {
    
    const [username, setUsername] = useState("") // ini ga di pake lagi karena sudah tergantikan useRef
    const [password, setPassword] = useState("") // ini ga di pake lagi karena sudah tergantikan useRef

    const form = useRef() // define secara serialize dengan metode key pengganti state agar tidak define satu2 statenya

    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()
        
        const { username, password } = form.current; //jadikan serialize inputan dari form
        try{
            const contentJSON = JSON.stringify({
                username : username.value,  //json data yang akan di lempar ke backend dan masuk session
                password: password.value
            })
            const res = await fetch(`${process.env.BE}/api/login`, { // env dari nex.config.js
                method: "POST",
                headers:{
                    "Content-Type":"application/json" // agar tidak terkena CORS di FE
                },
                body: contentJSON
            })
            
            const dataResp = await res.json()
            const data = dataResp.data

            
            if(data.status==true){ //jika response dari BE adalah true
                sessionStorage.setItem("data", contentJSON)
                router.push("/dashboard")
                alert(data.message)
            }else{
                alert(data.message)
            }

        }catch(err){
            console.log(err);
        }


    }
    
    return (
        <>
            <form ref={form} style={{ margin: 10 }} action="#">
                <input onChange={e => setUsername(e.target.value)} placeholder="Username" name='username'></input>
                <br/>
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" name='password'></input>
                <br />
                <button onClick={handleLogin}>Login</button>
            </form>
        </>
    )    
}

export default LoginForm2