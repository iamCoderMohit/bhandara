import { Link } from "react-router"
import logo from "../assets/logo.png"

function Navbar() {
  return (
    <div className="flex items-center justify-around px-20 py-4">
        <div>
            <Link to={'/'}><img src={logo} width={200} className="cursor-pointer" alt="logo" /></Link>
        </div>
        <div>
            <Link to={'/signin'}><button className="text-white font-cream font-bold text-xl bg-orange-600 px-5 py-2 rounded-md cursor-pointer">Join Bros</button></Link>
        </div>
    </div>
  )
}

export default Navbar