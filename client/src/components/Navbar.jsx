import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlgoArena from '../assests/AlgoArenaLogos/logo-transparent-svg.svg'
const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="sticky top-0 z-10 w-full">
          <nav className="px-4 py-2 bg-white shadow-md text-lg">
    <div className="flex items-center justify-between text-blue-gray-900">
        {/* <div > */}
        <img src={AlgoArena} alt="AA logo" className='h-12'/>
        {/* </div> */}
        <div className="flex items-center gap-5">
            <ul className="flex gap-6 ">
                {!user && (
                    <>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500" : "text-blue-gray-900"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500" : "text-blue-gray-900"
                                }
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500" : "text-blue-gray-900"
                                }
                            >
                                About Us
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <NavLink
                                to="/user/dashboard"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500" : "text-blue-gray-900"
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/user/account"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500" : "text-blue-gray-900"
                                }
                            >
                                Account
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
            <div className="flex items-center gap-x-2">
                {!user ? (
                    <>
                        <Link to="/login">
                            <button className="px-4 py-2 text-sm font-bold text-gray-900 uppercase bg-gray-100 rounded-lg">
                                Log In
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="px-4 py-2 text-sm font-bold text-white uppercase bg-gray-800 rounded-lg">
                                Sign Up
                            </button>
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="px-4 py-2 text-xs font-bold text-white uppercase bg-gray-800 rounded-lg">
                        Logout
                    </button>
                )}
            </div>
        </div>
    </div>
</nav>
        </div>
    );
};

export default Navbar;


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/');
//     };

//     return (
//         <nav>
//             <ul>
//                 {!user && (
//                     <>
//                         <li><Link to="/">Home</Link></li>
//                         <li><Link to="/login">Login</Link></li>
//                         <li><Link to="/register">Signup</Link></li>
//                     </>
//                 )}
//                 {user  && (//&& user.role === 'user'
//                     <>
//                         <li><Link to="/userDashboard">Dashboard</Link></li>
//                         <li><Link to="/userDashboard/account">Account</Link></li>
//                         <li><button onClick={handleLogout}>Logout</button></li>
//                     </>
//                 )}
//                 {/* {user && user.role === 'admin' && (
//                     <>
//                         <li><Link to="/adminDashboard">Admin Dashboard</Link></li>
//                         <li><button onClick={handleLogout}>Logout</button></li>
//                     </>
//                 )} */}
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;

