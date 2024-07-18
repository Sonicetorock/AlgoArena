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
        <div className="sticky top-0 z-30 w-full">
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
                                to= {user?.role == "admin" ? "/admin/dashboard" : "/user/dashboard"}
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500" : "text-blue-gray-900"
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={user?.role == "admin" ? "/admin/account" : "/user/account"}
                                className={({ isActive }) =>
                                    isActive ? "text-blue-500" : "text-blue-gray-900"
                                }
                            >
                                Account
                            </NavLink>
                        </li>
                        { user.role === 'admin' && (<li>
                       <NavLink
                        to="/admin/allproblems"
                        className={({ isActive }) =>
                            isActive ? "text-blue-500" : "text-blue-gray-900"
                        }
                        >
                        All Problems
                        </NavLink>
                    </li>)}
                    </>
                )}
            </ul>
            <div className="flex items-center gap-x-2">
                {!user ? (
                    <>
                        <Link to="/login">
                            <button className="bg-amber-700 text-amber-400 border border-amber-400 border-b-4 font-medium overflow-hidden relative px-2 py-1 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                            <span className="bg-amber-400 shadow-amber-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-300 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                Log In
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="bg-zinc-950 text-zinc-400 border border-zinc-400 border-b-4 font-medium overflow-hidden relative px-2 py-1 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                            <span className="bg-zinc-400 shadow-zinc-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                Sign Up
                            </button>
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="bg-rose-950 text-rose-400 border border-rose-400 border-b-4 font-medium overflow-hidden relative px-2 py-1 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                         <span className="bg-rose-400 shadow-rose-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
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

