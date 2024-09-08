import { useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { additem } from "../utils/cartSlice";

function ProductDetail() {

    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const param = useParams();
    const { data, error, loading } = useFetch("https://dummyjson.com/products");

    //Fetch data from api using custom UseFetch hook
    useEffect(() => {
        if (data) {
            const Data = data.products;
            setItems(Data);
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
    const filteredItems = items.find((item) => item.id == param.id);

    if (!filteredItems) {
        return <p>Item not found.</p>;
    }

    //using AddItem reducer function from redux store
    function handleAddItem(item) {
        dispatch(additem(item))
    }

    return (
        <>
            <h1 className="text-center text-4xl mt-11 mb-11"><b>{filteredItems.title}</b></h1>
            <div className="md:flex md:justify-evenly ml-10">
                <div className="w-80">
                    <img src={filteredItems.images} className="w-72 h-72" ></img>
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