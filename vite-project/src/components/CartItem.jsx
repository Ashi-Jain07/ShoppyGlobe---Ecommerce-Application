import { Link } from "react-router-dom";
import { useState } from "react";

function CartItem({ items, onRemove }) {

    const [showquantity, setShowQuantity] = useState(items.quantity);

    //Decrease the quantity of item in a cart using Patch api
    async function handleDecreaseQuantity() {

        // Prevent quantity from going below 1
        if (showquantity <= 1) return;

        try {
            const response = await fetch(`http://localhost:5100/cart/${items._id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity: showquantity - 1
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            setShowQuantity(data.quantity);

        } catch (error) {
            console.error('Error updating quantity:', error);
            setShowQuantity(items.quantity);
            alert(error.message);
        } 
    }

    //Increase the quantity of item in a cart using Patch api
    async function handleIncreaseQuantity() {
        try {
            const response = await fetch(`http://localhost:5100/cart/${items._id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity: showquantity + 1
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            setShowQuantity(data.quantity);

        } catch (error) {
            console.error('Error updating quantity:', error);
            setShowQuantity(items.quantity);
            alert(error.message);
        }
    }

    //Remove a item from cart using Delete api
    async function handleRemoveItem() {
        try {
            const response = await fetch(`http://localhost:5100/cart/${items._id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            // Notify parent component to remove item from UI
            onRemove(items._id);

        } catch (error) {
            console.error('Error removing item:', error);
            alert(error.message);
        }
    }

    return (
        <div className="flex justify-center">
            <div className="md:flex md:justify-evenly align-middle w-2/3 mt-11 mb-5 border border-black p-5 text-center shadow-md shadow-black">
                <div className="flex justify-center">
                    <Link to={`/productdetail/${items._id}`} key={items._id}>
                        <img src={items.image} className="h-44" alt="Product" />
                    </Link>
                </div>
                <div>
                    <h1 className="text-2xl"><b>{items.title}</b></h1>
                    <h1 className="text-xl"><b>Ratings: {items.rating} out of 5</b></h1>
                    <p className="text-xl"><b>Quantity:</b></p>
                    <p>
                        <button onClick={handleDecreaseQuantity} className="border border-black pl-1 pr-1">-</button>
                        <span className="ml-1 mr-1">{showquantity}</span>
                        <button onClick={handleIncreaseQuantity} className="border border-black pl-1 pr-1">+</button><br />
                        <button onClick={handleRemoveItem} className="border border-black pl-1 pr-1 mt-5 font-semibold">Remove Item</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
