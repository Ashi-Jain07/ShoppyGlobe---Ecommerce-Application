import { Link } from "react-router-dom";

function Header() {

    //Taking accessToken from localStorage
    const token = JSON.parse(localStorage.getItem("accessToken"));

    //Check if Date.now is greater than item.Expiry, then delete a accessToken and firstName from localStorage
    if (token) {
        if (Date.now() > token.expiry) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("firstName");
            return
        }
    };

    //Handle LogOut function
    function handleLogout() {
        localStorage.clear();
        window.location.reload()
    }

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
                    <ul className="sm:flex sm:justify-between list-none lg:text-4xl text-2xl mb-5">
                        <Link to="/">
                            <li className="md:mr-24 sm:mr-10 mr-3 m-8 hover:cursor-pointer">Home</li>
                        </Link>
                        <Link to="/productlist">
                            <li className="md:mr-24 sm:mr-10 mr-3 m-8 hover:cursor-pointer">All Products</li>
                        </Link>
                        <Link to="/cart">
                            <li className="mr-3 m-8 lg:mr-20 hover:cursor-pointer">🛒Cart </li>
                        </Link>
                        <li>
                            {/* Conditional rendering based on Token data */}
                            {!token ?
                                <>
                                    <Link to="/login">
                                        <button className="bg-black w-auto lg:text-2xl lg:w-28 lg:h-11 mt-3 text-white p-1">Sign In</button><br />
                                    </Link>
                                    <Link to="/register">
                                        <button className="lg:text-2xl w-auto p-1 lg:w-28 lg:h-11 border border-black">Sign Up</button>
                                    </Link>
                                </> :
                                <div className="mt-9 relative group">
                                    <img src="./src/utils/user.png" width="50px" height="20px" className="object-cover transition duration-300 group-hover:blur-sm" ></img>
                                    <button className="absolute text-2xl inset-0 flex items-center justify-center bg-transparent bg-opacity-50 font-bold opacity-0 group-hover:opacity-100 transition duration-300" onClick={handleLogout}>Logout</button>
                                </div>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header;