
import { useParams } from "react-router-dom";
import {useProductById, useAddToCart} from '../queries/queries'

function ProductDetails(){
    const {id} = useParams()
    const {data, isLoading} = useProductById(id)

    const addToCart = useAddToCart()

    if(isLoading){
        return <p>Loading..........</p>
    }

    return(
        <div>
            <img src={data.image} width='200' />
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <p>{data.price}</p>

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
        </div>
    )
}

export default ProductDetails
