import { Link } from "react-router-dom"
import { TbArrowLeft } from "react-icons/tb"

export default function SignUp() {
    return (
        <div>
            <Link to="/">
                <TbArrowLeft />
            </Link>
        </div>
    )
}