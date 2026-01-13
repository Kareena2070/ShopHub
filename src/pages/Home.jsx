
import {useProducts} from '../queries/queries'
import ProductCart from '../components/ProductCard'

function Home(){
    const {data, isLoading, error} = useProducts()

    if(isLoading){
        return <p>Loading....</p>
    }

    if(error){
        return <p>Error loading products</p>
    }

    return(
        <div>
            {data.map((product)=>{
                <ProductCart key={product.id} product={product}/>
            })}
        </div>
    )
}

export default Home