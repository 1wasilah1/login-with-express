import { useRouter } from "next/router"
import { useEffect } from "react"

const Logout = () => {

    const router = useRouter()
    useEffect(() => {
        sessionStorage.clear()
        router.push("/login")
    },[]) 

    return (<p>Logout....</p>)
}

export default Logout