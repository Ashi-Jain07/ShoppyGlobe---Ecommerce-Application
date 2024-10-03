import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";

function Cart() {

    const [cartItems, setCartItems] = useState([]);

    //Take a accessToken from localStorage
    const item = JSON.parse(localStorage.getItem("accessToken"));

    //Check if Date.now is greater than item.Expiry, then delete a accessToken and firstName from localStorage
    if (item) {
        if (Date.now() > item.expiry) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("firstName");
            return
        }
    };

    //Fetching cart items using Get api and providing accessToken in header for authoriazation
    if (item) {
        const token = item.token;
        console.log(token);
        useEffect(() => {
            const response = fetch("http://localhost:5100/cart", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    authorization: `JWT ${token}`
                }
            });

            const result = response.then((data) => data.json());
            result.then((data) => {
                console.log(data);
                setCartItems(data)
            });
        }, [token])
    }

    //Filter out the remove item from ui
    function handleRemoveItem(itemId) {
        const updatedItems = cartItems.filter(item => item._id !== itemId);
        setCartItems(updatedItems);
    }

    //Clearing the cart using Delete api
    async function handleClearCart() {
        try {
            const response = await fetch("http://localhost:5100/cart", {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            console.log(data);
            window.location.reload();
        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    return (
        <>
            {/* Here doing conditional rendering based on item */}
            {item ?
                <>
                    <h1 className="text-center text-5xl mt-5"><b>My Cart</b></h1>
                    <div className="flex justify-start">
                        <button onClick={handleClearCart} className="border border-black text-xl p-1 mt-5">Clear Cart</button>
                    </div>

                    {/* using map method to render CartItem */}
                    {
                        cartItems.map((item) =>
                            <CartItem items={item} onRemove={handleRemoveItem} key={item._id} />
                        )
                    }
                </>
                :
                <>
                    <h1 className="text-5xl font-semibold text-center mt-24">!Access Denied</h1>
                    <h1 className="text-5xl font-semibold text-center mt-5">Sign In to get cart items</h1>
                    <Link to="/login">
                        <p className="text-2xl text-center mt-10 hover:underline">Go to Sign In page → </p>
                    </Link>
                </>
            }
        </>
    )
}

export default Cart;