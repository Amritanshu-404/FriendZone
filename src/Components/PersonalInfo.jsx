import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalInfo = () => {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [remainingChars, setRemainingChars] = useState(0);
    const [formData, setFormData] = useState({
        username: '',
        college: '',
        password: '',
        phoneNo: '',
        address: '',
        bio: '',
        image: '',
    });


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:3000/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setUserData(response.data);
                    setFormData({
                        username: response.data.username,
                        college: response.data.college,
                        password: response.data.password,
                        phoneNo: response.data.phoneNo || '',
                        address: response.data.address || '',
                        bio: response.data.bio || '',
                        image: response.data.image || 'https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg',
                    });
                    setRemainingChars(900 - response.data.bio.length);
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, []);

    const handleImageInputChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            image: value,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (value.length > 400) {
            return;
        }

        setFormData({
            ...formData,
            [name]: value,
        });
        setRemainingChars(400 - value.length);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Remember the Password Format. Its Between 5-10 using Az-Zz @$!%*?&');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        const { password } = formData;
        if (!validatePassword(password)) {
            return;
        }

        try {
            const response = await axios.patch('http://localhost:3000/user', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('User data updated successfully!');
            setEditMode(false);
        } catch (error) {
            console.error('Error updating user data:', error);
            toast.error('Error updating user data. Something Wrong You Typed.');
        }
    };

    const handleCancel = () => {
        setFormData({
            username: userData.username,
            college: userData.college,
            password: userData.password,
            phoneNo: userData.phoneNo || '',
            address: userData.address || '',
            bio: userData.bio || '',
            image: userData.image || 'https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg',
        });
        setEditMode(false);
    };

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    return (

        <div className=" w-2/3 h-4/5 bg-[#1F2224] rounded-lg flex py-3 px-2 mt-3">
            <div className="ProfileLeftArea w-7/12">
                <div className="ProfName h-44 relative flex items-center justify-around gap-6 mb-5">
                    <img src={formData.image} alt="Profile" className='w-36 h-36 shadow-gray-900 object-cover bg-no-repeat rounded-full shadow-md' />
                    {editMode && (
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleImageInputChange}
                            className='max-w-48 left-6 -bottom-4 absolute px-2 py-1 mt-2 text-xs text-gray-500 bg-transparent border-2 border-gray-400 rounded-md'
                        />
                    )}
                    <div className="font-Popins gap-y-5 flex flex-col text-2xl font-bold text-white">
                        <h1>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="username"
                                    placeholder='Your Name'
                                    value={formData.username}
                                    onChange={handleInputChange}

                                />
                            ) : (
                                userData.username
                            )}
                        </h1>
                        <p className='text-slate-400 text-wrap text-lg font-normal leading-9'>
                            Studying At : {editMode ? (
                                <input
                                    type="text"
                                    name="college"
                                    value={formData.college}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                userData.college
                            )}
                        </p>
                    </div>
                </div>
                <hr className='border-zinc-800 mx-6' />
                <div className='font-Popins text-slate-700 p-6 text-base'>
                    <div className='gap-x-16 grid grid-cols-2 mb-5'>
                        <div>
                            <h1>Password</h1>
                            <p className=' mt-3 text-xl font-semibold text-white'>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder='New Paasword'
                                    />
                                ) : (
                                    userData.password ? userData.password : '*********'
                                )}
                            </p>
                        </div>
                        <div>
                            <h1>Phone Number</h1>
                            <p className='mt-3 text-xl font-medium text-white'>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="phoneNo"
                                        placeholder='+91 '
                                        value={formData.phoneNo}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userData.phoneNo ? userData.phoneNo : 'Nill'
                                )}
                            </p>
                        </div>
                    </div>
                    <div className='gap-y-7 flex flex-col'>
                        <div>
                            <h1>Email</h1>
                            <p className='mt-3 text-xl font-medium text-white'>
                                {userData.email}
                            </p>
                        </div>
                        <div className='w-full'>
                            <h1>Address</h1>
                            <p className='mt-3 text-xl font-medium text-white'>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder='Present Address'
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userData.address ? userData.address : 'Nill'
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ProfileRightArea font-Popins text-slate-700 relative w-1/2 px-3 pt-10 text-base'>
                <h1>Bio</h1>
                <p className='font-Gruppo h-[90%] mt-3 overflow-hidden text-base font-normal leading-7 text-justify text-white break-words'>
                    {editMode ? (
                        <textarea
                            name="bio"
                            placeholder='Write Something About Yourself.......'
                            value={formData.bio}
                            onChange={handleInputChange}
                            maxLength={400}
                            className='max-h-72 border-[#1d1e1edc] p-2 w-full bg-transparent border rounded-md'
                        />
                    ) : (
                        <div
                            className='font-Gruppo mt-3 text-base font-normal leading-7 text-justify text-white break-words'
                            style={{ whiteSpace: 'pre-wrap' }}
                        >
                            {userData.bio ? userData.bio : 'Nill'}
                        </div>
                    )}
                    <div className="text-slate-400 mt-1 text-right">
                        {editMode && (
                            <span>{remainingChars} characters remaining</span>
                        )}
                    </div>
                </p>

                {editMode ? (
                    <div className='flex gap-4'>
                        <button
                            className='bottom-4 right-32 border-slate-700 absolute flex items-center gap-6 px-5 py-2 text-xl font-medium text-white border-2 rounded-full'
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className='bottom-4 right-4 border-slate-700 absolute flex items-center gap-6 px-5 py-2 text-xl font-medium text-white border-2 rounded-full'
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <button
                        className='bottom-1 right-4 border-slate-700 absolute flex items-center gap-3 px-2 py-1 text-xs font-medium text-white border-2 rounded-full'
                        onClick={() => setEditMode(true)}
                    >
                        <h1>Edit</h1>
                        <FaRegEdit />
                    </button>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default PersonalInfo
