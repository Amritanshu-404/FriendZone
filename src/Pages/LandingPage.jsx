import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowOutward } from "react-icons/md";
import Group from '../Resources/StudentGroup.jpg';
import { LuMouse } from "react-icons/lu";
import Team from '../Resources/TeamWork.png';
import Features from '../Data/FeaturesData';
import Man1 from '../Resources/Man1.jpg';
import Man2 from '../Resources/Man2.jpg';
import Girl1 from '../Resources/Girl1.jpg';
import Girl2 from '../Resources/Girl2.jpg';
import Working from '../Components/Working';
import Slogan from '../Components/Slogan';
import Testimonial from '../Components/Testimonial';
import Footer from '../Components/LandingPageFooter';
import Popular from '../Components/Popular';


const LandingPage = () => {
    return (
        <div>
            <div className='min-h-screen bg-[#F9FAFC] overflow-hidden mb-5'>

                {/* Top Part */}
                <div className='Top font-Gruppo gap-x-72 flex font-bold list-none border-2 border-white bg-[#181818]'>
                    <h1 className='ml-28 font-Popins flex items-center px-2 text-2xl text-orange-700 border-r-2 border-white'>
                        FriendZone.
                    </h1>
                    <ul className='gap-x-16 flex items-center justify-center flex-1 text-3xl text-white'>
                        <li><Link to="/"><button className="NavItem">Home</button></Link></li>
                        <li><Link to="/explore"><button className="NavItem">Explore</button></Link></li>
                    </ul>
                    <div className='flex items-center px-10 py-3 border-l-2 border-white'>
                        <Link to="/login"><button className='gap-x-4 flex items-center px-5 py-2 text-xl text-black bg-white rounded-full'>Login<MdArrowOutward /></button></Link>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className='pt-14 pb-14 gap-x-36 flex items-center bg-[#181818]'>
                    <div className='ml-44 w-2/3'>
                        <h1 className='font-Popins mb-10 text-5xl font-medium leading-relaxed text-white'>"Overwhelmed by projects ?"<br /> Get Some Help From Your <span className='text-orange-700'>
                            <br />FriendZone
                        </span> </h1>
                        <hr />
                        <div className='font-Gruppo mt-9 flex justify-between text-4xl text-white'>
                            <div>
                                <h1 className='w-3/4'>
                                    A Vibrant Platform to boost You.
                                </h1>
                            </div>
                            <p>Just For Brilliant's Mind</p>
                        </div>
                    </div>
                    <div className='relative w-1/2'>
                        <img src={Group} className='Group relative rounded-2xl w-[70%] z-10' />
                        <div className='Back rounded-2xl top-2 left-4 z-0 h-full absolute w-[70%] bg-orange-700'>
                        </div>
                        <div className='Students font-Popins text-slate-700 -left-16 top-2 shadow-[#181818] absolute z-50 w-48 text-sm text-center bg-white rounded-lg shadow-2xl hover:scale-105 animate-bounce delay-1000 pointer-events-none'>
                            <h1 className='text-lg font-bold text-black'>20+</h1>
                            <p>Satisfied Students</p>
                            <div className='flex justify-center'>
                                <img src={Man1} />
                                <img src={Man2} />
                                <img src={Girl1} />
                                <img src={Girl2} />
                            </div>
                        </div>
                    </div>
                </div>


                {/* key Features */}
                <div className=' flex mt-20'>
                    <div className='items-center w-2/5 ml-10'>
                        <h1 className='font-Popins mb-12 ml-10 text-5xl font-extrabold leading-relaxed'>Here's Why You Should Choose Us</h1>
                        <img src={Team} />
                    </div>
                    <div className='FeaturesCardArea flex flex-wrap w-[80%] gap-6 py-3'>
                        {Features.map((feature, index) => (
                            <div key={index} className='FCard w-72 h-72 rounded-xl font-Popins p-3 text-black bg-[#FFFFFF]'>
                                <div style={{ backgroundColor: feature.bgColor }} className='w-14 rounded-2xl p-2 mt-3'>
                                    <img src={feature.image} alt={feature.heading} />
                                </div>
                                <h1 className='font-Mukta mt-7 text-2xl font-extrabold'>{feature.heading}</h1>
                                <p className='text-slate-500 font-Raleway mt-2 text-sm font-medium leading-loose'>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <Popular />
                <div className=' font-Gruppo gap-x-3 text-slate-600 flex items-center justify-center mt-16 text-lg'>
                    <LuMouse size={40} />
                    <h1>Scroll Down</h1>
                </div>
                <div id='Working'>
                    <Working />
                </div>
                <Testimonial />
                <Slogan />
                <Footer />
            </div>

        </div>
    );
};

export default LandingPage;
