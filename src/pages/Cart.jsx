
import {useCart, useUpdateCartItem, useDeleteCartItem} from '../queries/queries'

function Cart(){
    const {data} = useCart()
    const updateItem = useUpdateCartItem();
    const deleteItem = useDeleteCartItem();

    if(!data || data.length ===0){
        return <h2>Your cart is empty</h2>
    }

    const subtotal = data.reduce(
        (sum, item) => sum+ item.price*item.quantity, 0
    )

    const tax = subtotal*0.1;
    const total = subtotal+tax;

    return(
        <div>
            {data.map((item)=>{
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>

                    <button
                        disabled = {item.quantity ===1}
                        onClick={()=>{
                            updateItem.mutate({
                                id: item.id,
                                quantity: item.quantity-1
                            })
                        }}
                    >
                        -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                        onClick={()=>{
                            updateItem.mutate({
                                id: item.id,
                                quantity: item.quantity+1
                            })
                        }}
                    >
                        +
                    </button>

                    <button 
                        onClick={()=>{
                            deleteItem.mutate(item.id)
                        }}
                    >
                        Remove
                    </button>

                    <hr />

                    <p>Subtotal: Rs{subtotal}</p>
                    <p>Tax: Rs{tax}</p>
                    <h3>Toatal: Rs{total}</h3>
                </div>
            })}
        </div>
    )
}

export default Cart
