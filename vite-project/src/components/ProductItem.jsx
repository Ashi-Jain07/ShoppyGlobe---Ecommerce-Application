import { Link } from "react-router-dom";

function ProductItem(props) {

    //Add item in a cart using post cart api
    async function handleAddItem(item) {
        try {
            const response = await fetch("http://localhost:5100/cart", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: item._id,
                    title: item.title,
                    image: item.image,
                    rating: item.rating,
                    quantity: item.quantity
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const result = response.json();
            console.log(result);

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    return (
        <>
            <div className="border border-black mb-5 p-5 text-center shadow-md shadow-black">

                <div className="flex justify-center">
                    <div className="relative group">
                        <img src={props.item.image} className="h-44 object-cover transition duration-300 group-hover:blur-sm"></img>
                        <Link to={`/productdetail/${props.item._id}`} key={props.item._id} >
                            <button className="absolute text-2xl inset-0 flex items-center justify-center bg-transparent bg-opacity-50 font-bold opacity-0 group-hover:opacity-100 transition duration-300">View Detail</button>
                        </Link>
                    </div>
                </div>

                <div>
                    <h1><b>{props.item.title}</b></h1>
                    <h1>Ratings: {props.item.rating} out of 5</h1>
                    <button className="bg-black text-white p-3 mt-2 hover:p-2" onClick={() => handleAddItem(props.item)}>Add to cart</button>
                </div>

            </div>
        </>
    )
}

export default ProductItem;