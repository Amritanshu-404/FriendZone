import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';

const Navbar = () => {
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:3000/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUsername(response.data.username);
                    setProfileImage(response.data.image);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = () => {
        setShowConfirm(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
        navigate('/login');
    };

    return (
        <div className='Navbar font-Gruppo gap-x-52 flex font-bold list-none border-2 border-white bg-[#181818]'>
            <h1 className='font-Popins flex items-center px-2 ml-32 mr-10 text-2xl text-orange-700 border-r-2 border-white'>
                FriendZone.
            </h1>
            <ul className='gap-x-16 flex items-center justify-center text-3xl text-white'>
                <li><Link to="/dashboard"><button className="NavItem">Home</button></Link></li>
                <li><Link to="/explore"><button className="NavItem">Explore</button></Link></li>
                <li><Link to="/user/projects"><button className="NavItem">My Project</button></Link></li>
            </ul>
            <div className='gap-x-5 flex items-center justify-between text-white border-l-2 border-white'>
                <Link to="/my_profile" className="Profile gap-x-2 flex items-center ml-5 text-xl">
                    <div className="ProfileIconWrapper relative">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="ProfileImage w-10 h-10 rounded-full" />
                        ) : (
                            <div>
                                <CgProfile size={30} />
                            </div>
                        )}
                        <div className="DecorativeCircle absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="Username">{username}</span>
                </Link>
                <div className='LogoutButton flex items-center px-2 py-3'>
                    <button className='LogoutButton gap-x-2 flex items-center px-4 py-2 text-xl text-black bg-white rounded-full' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            {showConfirm && (
                <div className="font-Gruppo fixed inset-0 z-50 flex items-center justify-center font-bold">
                    <div className="hover:scale-105 p-8 transition-all duration-300 transform scale-100 bg-white rounded-lg shadow-lg">
                        <p className="text-slate-700 mb-4 text-lg font-semibold">Are you sure you want to logout?</p>
                        <div className="flex justify-end">
                            <button className="hover:text-gray-800 mr-4 text-gray-600" onClick={() => setShowConfirm(false)}>Cancel</button>
                            <button className="hover:text-red-800 text-red-600" onClick={confirmLogout}>Confirm Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
