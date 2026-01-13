import { Link } from "react-router-dom";

import {useCart} from '../queries/queries'

function Navbar(){
    const {data} = useCart()

    return(
        <nav>
            <Link to="/">ShopHub </Link>
            <Link to= "/cart"> Cart ({data?.length || 0})</Link>
        </nav>
    )
}

export default Navbar