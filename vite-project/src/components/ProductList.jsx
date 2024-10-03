import useFetch from "../utils/useFetch.js";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

function ProductList() {

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    //Fetching all products using Get api and Custom useFetch hook
    const { data, error, loading } = useFetch("http://localhost:5100/products", {
        method: "GET"
    });

    //If data, set filteredItems and item to data
    useEffect(() => {
        if (data) {
            setFilteredItems(data);
            console.log(data);
            setItems(data);
        }
    }, [data]);

    //Handle error
    if (error) {
        return <p className="text-center text-3xl mt-44">{error}</p>
    }

    if (loading) {
        return <p className="text-center text-3xl mt-44">Loading...</p>
    }

    //Implement Search functionality
    function handleSearch() {
        const searchItem = items.filter((Item) => Item.title.toLowerCase().includes(search.toLowerCase()));
        setFilteredItems(searchItem);
        setSearch("")
    }

    return (
        <>
            <div className="text-center">
                <h1 className="text-5xl mt-10"><b>All Products</b></h1>
                <input className="w-6/12 h-10 text-2xl rounded-lg mt-10 mr-2 border border-black " type="text" onChange={(e) => setSearch(e.target.value)}></input>
                <button className="text-2xl border-2 rounded-md p-1 border-black" onClick={handleSearch}>Search</button>
            </div>
            <div className="flex justify-center">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 w-9/12 mt-24 gap-10 h-72">
                    {
                        filteredItems.map((item) => (
                            <ProductItem item={item} key={item._id} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ProductList;