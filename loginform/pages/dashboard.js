import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Dashboard = () => {

    const [username, setUsername] = useState("")
    const router = useRouter()

    useEffect(() => {
        const data = sessionStorage.getItem("data")
        if(data === null){
            router.push("/logout")
            return
        }
        const dataJson = JSON.parse(data)
        setUsername(dataJson.username)
    }, [])

    return (
        <>
            <p>This is my dashboard</p>
            <p>Hello {username}</p>
            <p><a href="/logout">Logout</a></p>
        </>
    )
}

export default Dashboard