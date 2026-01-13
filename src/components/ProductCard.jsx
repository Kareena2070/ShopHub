import { Link } from "react-router-dom";
import {useAddToCart} from '../queries/queries'

function ProductCart({product}){
    const addToCart = useAddToCart();

    return(
        <div>
            <img src={product.image} width='150' />
            <h2>{product.title}</h2>
            <p>{product.price}</p>

            <button
                onClick={()=>{
                    addToCart.mutate({
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                    })
                }}
            >
                Add to Cart
            </button>

            <Link to={`/product/${product.id}`}>
                <button>View</button>
            </Link>
        </div>
    )
}

export default ProductCart