import useFetch from "../utils/useFetch";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

function ProductList() {

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const { data, error, loading } = useFetch("https://dummyjson.com/products");

    //Fetch data from api using Custom useFetch hook
    useEffect(() => {
        if (data) {
            const Data = data.products;
            setFilteredItems(Data);
            setItems(Data);
        }
        console.log(data);
    }, [data]);

    //Handle error
    if (error) {
        return alert(`Error in fetching data ${error}`);
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
                            <ProductItem item={item} key={item.id} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ProductList;