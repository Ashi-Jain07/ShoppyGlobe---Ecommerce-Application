import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItem, additem } from "../utils/cartSlice";

function CartItem(props) {

    const dispatch = useDispatch();

    //Add item to cart and remove item from cart using redux store
    function handleRemoveItem(item) {
        dispatch(removeItem(item))
    }

    function handleAddItem(item) {
        dispatch(additem(item))
    }


    return (
        <>
            <div className="flex justify-center">
                <div className="md:flex md:justify-evenly align-middle w-2/3 mt-11 mb-5 border border-black p-5 text-center shadow-md shadow-black">
                    <div className="flex justify-center">
                        <Link to={`/productdetail/ ${props.items.id}`} key={props.items.id}>
                            <img src={props.items.images[0]} className="h-44  "></img>
                        </Link>
                    </div>
                    <div>
                        <h1 className="text-2xl"><b>{props.items.title}</b></h1>
                        <h1 className="text-xl"><b>Ratings: {props.items.rating} out of 5</b></h1>
                        <p className="text-xl"><b>Quantity:</b></p>
                        <p>
                            <button onClick={() => handleRemoveItem(props.items)} className="border border-black pl-1 pr-1">-</button>
                            <span className="ml-1 mr-1"> {props.items.quantity} </span>
                            <button onClick={() => handleAddItem(props.items)} className="border border-black pl-1 pr-1">+</button>
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem;