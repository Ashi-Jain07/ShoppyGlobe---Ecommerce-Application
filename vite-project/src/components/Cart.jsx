import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";

function Cart() {

    //using useSelector to display state on UI
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    //Using the dispatch function
    function handleClearCart() {
        dispatch(clearCart())
    }

    return (
        <>
            <h1 className="text-center text-5xl mt-5"><b>My Cart</b></h1>
            <div className="flex justify-start">
                <button onClick={handleClearCart} className="border border-black text-xl p-1 mt-5">Clear Cart</button>
            </div>

            {/* using map method to render CartItem */}
            {
                cartItems.map((item) =>
                    <CartItem items={item} key={item.id} />
                )
            }

        </>
    )
}

export default Cart;