import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {

    const itemData = useSelector(state => state.cart.items);

    return (
        <>
            <div className="flex justify-between ml-10 mr-10 border-b border-black ">
                <div className="m-4">
                    <img src="./src/utils/Logo.png" width="70px" height="70px" className="rounded-3xl"></img>
                    <p className="text-sm"><i>ShoppyGlobe</i></p>
                </div>
                <div>
                    {/* Display Nav Links
                        Using routes link it to different routes
                    */}
                    <ul className="sm:flex sm:justify-between m-8 list-none lg:text-4xl text-2xl">
                        <Link to="/">
                            <li className="md:mr-24 sm:mr-10 mr-3 hover:cursor-pointer hover:border-b-4 hover:border-black">Home</li>
                        </Link>
                        <Link to="/productlist">
                            <li className="md:mr-24 sm:mr-10 mr-3 hover:cursor-pointer hover:border-b-4 hover:border-black">All Products</li>
                        </Link>
                        <Link to="/cart">
                            <li >
                                <span className=" hover:cursor-pointer hover:border-b-4 hover:border-black">🛒Cart - </span>
                                <span className="md:mr-24 sm:mr-1 text-xl"> {itemData.length} item</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header;