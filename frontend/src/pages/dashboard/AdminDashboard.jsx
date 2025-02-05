import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function AdminDashboard() {

    const { logout } = useContext(AuthContext);
    
    return (
        <div className="bg-pink-300 h-screen">
            Admin

            <button onClick={logout}>Logout</button>
        </div>
    )
}