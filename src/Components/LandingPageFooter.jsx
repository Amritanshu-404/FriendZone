import React from 'react';
import { Link } from 'react-router-dom';
import Team from '../Resources/Team.png';
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className='bg-[#181818] rounded-xl p-5 mx-5'>
            <div className='Footer h-72 relative flex w-full px-4 py-2'>
                <div className='w-[20%] flex items-center justify-center'>
                    <h1 className='font-Popins px-2 text-3xl font-bold text-center text-orange-700'>
                        FriendZone.
                    </h1>
                </div>
                <div className='ImportantLinks ml-28 font-Nunito flex flex-col w-1/5 pt-10 text-lg leading-relaxed text-white list-none'>
                    <h1 className=' font-Popins pb-4 text-2xl font-bold text-white'>IMPORTANT LINKS</h1>
                    <Link to="/about"><li>About Us</li></Link>
                    <Link to="/login"><li>Login</li></Link>
                    <a href='#Working'>Working Process</a>
                    <a href="#top">Top</a>
                </div>
                <div className='Contact flex flex-col w-1/5 h-[90%] gap-y-4 justify-center text-white leading-relaxed text-lg font-Gruppo'>
                    <h1 className='font-Popins pb-4 text-2xl font-bold text-white'>CONTACTS</h1>
                    <p>amritanshukumarpatel456@gmail.com</p>
                    <p>+91 6200831673</p>
                </div>
                <div>
                    <img src={Team} className='top-10 relative' />
                </div>
                <div className='SocialLinks gap-x-4 flex-col items-center w-[15%] h-[90%] pt-14 text-white'>
                    <div className='gap-y-5 flex flex-col items-center justify-center'>
                        <a href="https://www.facebook.com/"><li><FaFacebook size={24} /></li></a>
                        <a href="https://www.instagram.com/"><li><RiInstagramFill size={20} /></li></a>
                        <a href="https://twitter.com/?lang=en"><li><FaSquareXTwitter size={20} /></li></a>
                    </div>
                </div>
            </div>
            <div className=' text-white bg-[#181818]  pb-4 font-Gruppo w-full px-20  ' >
                <hr />
                <div className='flex justify-between'>
                    <h1 className='mt-2'> ©2024 FriendZone. All rights reserved.
                    </h1>
                    <h1 className='mt-2'>Privacy Policy
                    </h1>
                </div>

            </div>
        </div>
    )
}

export default Footer
