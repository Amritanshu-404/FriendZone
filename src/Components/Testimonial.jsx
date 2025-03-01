import React from 'react';
import Decoration from '../Resources/Decoration.png';
import Star from '../Resources/Star.png'


const Testimonial = () => {
    return (
        <div>
            <div className='Testimonial w-[150%] bg-[#181818] py-10 overflow-hidden mt-40'>
                <h1 className='font-Raleway text-4xl font-medium text-white ml-[580px] mb-10 w-96 leading-normal text-center '>Testimonials That Speak to
                    <span className='relative ml-3 text-orange-600'>
                        Our Results
                        <img src={Star} className='-left-14 -top-5 relative' />
                        <img src={Decoration} className='-top-20 -right-5 absolute' />
                    </span> </h1>
                <div className='Row1 flex h-auto mb-10'>
                    <div className='ImageBox'>
                        <img src="https://img.freepik.com/free-photo/smiley-man-posing-medium-shot_23-2149915893.jpg?t=st=1713118343~exp=1713121943~hmac=287523cda7c1dabfe772c5b1353e632243a7ac9564e1a99acfe9bfd50f3f5839&w=360" className='object-cover w-full h-full rounded-md' />
                        <h1>Rahul Patel</h1>
                        <p>B.Tech, ITS Engineering College</p>
                    </div>
                    <div className='TextBox'>
                        <p>"As a college student, this platform has been a game-changer for me! I've connected with peers from different majors and colleges, collaborated on projects, and exchanged valuable insights. It's incredible how this website has facilitated meaningful connections and enhanced my learning experience."</p>
                    </div>
                    <div className='ImageBox'>
                        <img src="https://img.freepik.com/premium-photo/portrait-teen-girl-checkered-dress_270447-245.jpg?w=360" className='object-cover w-full h-full rounded-md' />
                        <h1>Jennifer</h1>
                        <p>From New York</p>
                    </div>
                    <div className='TextBox'>
                        <p>"Finding project partners is a breeze with this website. Highly recommended for effective collaboration!"</p>
                    </div>
                    <div className='ImageBox'>
                        <img src="https://img.freepik.com/free-photo/handsome-young-indian-student-man-holding-notebooks-while-standing-street_231208-2771.jpg?t=st=1713118113~exp=1713121713~hmac=999adfaada5940bda7a2bf146e7385a80179881112d6dd02e8f18458e71b20c8&w=360" className='object-cover w-full h-full rounded-md' />
                        <h1>Harsh Gujral</h1>
                        <p>12th Student, DPS School</p>
                    </div>
                    <div className='TextBox'>
                        <p>"From astrophysics to literature, this platform connects me with peers passionate about diverse subjects – it's like a tailored study group!"</p>
                    </div>
                </div>
                <div className='Row2 -ml-[180px] flex h-auto'>
                    <div className='TextBox'>
                        <p>"Adding a feature for users to provide feedback or rate their collaboration experiences could help in continuously improving the platform's functionality and user satisfaction."</p>
                    </div>
                    <div className='ImageBox'>
                        <img src="https://img.freepik.com/premium-photo/man-walking-with-bag-bag-photography_1048944-951199.jpg?w=360" className='object-cover w-full h-full rounded-md' />
                        <h1>Ritik Singh</h1>
                        <p>Amity University, Noida</p>
                    </div>
                    <div className='TextBox'>
                        <p>"I stumbled upon this website while searching for a platform to connect with students outside my college. Little did I know that it would become my go-to place for academic collaboration!."</p>
                    </div>
                    <div className='ImageBox ml-5'>
                        <img src="https://img.freepik.com/free-photo/impressed-young-caucasian-boy-holding-note-pad-pencil-isolated-purple-wall-with-copy-space_141793-80239.jpg?t=st=1713118184~exp=1713121784~hmac=d6eae8e0a3836a852c5cee04010858db8677cd0220e096744846f05c4127bd62&w=826" className='object-cover w-full h-full rounded-md' />
                        <h1>Rishi Raj</h1>
                        <p>Student Of St.Xavier School</p>
                    </div>
                    <div className='TextBox'>
                        <p>"A lifesaver for remote learning! Easy navigation and comprehensive features make collaboration a breeze."</p>
                    </div>
                    <div className='TextBox'>
                        <p>"My go-to for academic collaboration! Diverse projects and customizable profiles make finding study partners a snap."</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial
