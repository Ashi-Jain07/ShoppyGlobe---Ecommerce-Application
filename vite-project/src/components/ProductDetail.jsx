import { useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { useEffect, useState } from "react";

function ProductDetail() {

    const [items, setItems] = useState([]);
    const param = useParams();

    //Fetching product using custom useFetch hook
    const { data, error, loading } = useFetch("http://localhost:5100/products", {
        method: "GET"
    });

    //If data, set items to data
    useEffect(() => {
        if (data) {
            setItems(data);
        }

    }, [data])

    //Handle error
    if (error) {
        return <p> {alert(`Error in fetching data ${error}`)}</p>;
    }

    if (loading) {
        return <p className="text-center text-3xl mt-44">Loading...</p>;
    }

    //Filter the items based on id using params id
    const filteredItems = items.find((item) => item._id == param.id);

    if (!filteredItems) {
        return <p>Item not found.</p>;
    }

    //Add item to cart using Post api
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

            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <>
            <h1 className="text-center text-4xl mt-11 mb-11"><b>{filteredItems.title}</b></h1>
            <div className="md:flex md:justify-evenly ml-10">
                <div className="w-80">
                    <img src={filteredItems.image} className="w-72 h-72" ></img>
                </div>
                <div className="md:w-2/5 text-xl">
                    <p className="mb-2"><b>Brand:</b> {filteredItems.brand ? filteredItems.brand : "-"}</p>
                    <p className="mb-2"><b>Description: </b>{filteredItems.description}</p>
                    <p className="mb-2"><b>Price:</b> {filteredItems.price}</p>
                    <p className="mb-2"><b>Category: </b>{filteredItems.category}</p>
                    <p className="mb-2"><b>Availability Status:</b> {filteredItems.availabilityStatus}</p>
                    <p className="mb-2"><b>Ratings:</b> {filteredItems.rating}</p>
                    <p className="mb-2"><b>Shipping Details:</b> {filteredItems.shippingInformation}</p>
                    <button className="bg-black text-white p-1 pl-2 pr-2 hover:p-0.5" onClick={() => handleAddItem(filteredItems)} >Add to cart</button>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;