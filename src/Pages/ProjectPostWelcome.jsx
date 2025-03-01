import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Welcome from '../Resources/PostWelcome.png';

const ProjectPostWelcome = () => {
    const [username, setUsername] = useState('');
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUsername(response.data.username);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);
    return (
        <>
            <div className="WelcomeArea bg-[#181818] h-[89.8vh] flex justify-center items-center">
                <div className='animated-text font-Gruppo flex justify-between w-3/4 text-6xl font-medium text-white'>
                    <div>
                        <h1>
                            Welcome <span className='font-Popins'> {username}!</span><br />
                            <span>Ready to Create Your <br />Project? ✒️</span>
                        </h1>
                        <div className="tips-list font-Gruppo my-5 ml-4 text-base leading-loose">
                            <p>🎯Provide a clear and concise project description.</p>
                            <p>🎯Use relevant keywords, clear descriptions.</p>
                            <p>🎯Define project scope, deliverables, and timelines.</p>
                        </div>
                        <Link to="/user/project_post/details">
                            <button className="font-Popins rounded-xl shadow-red-500 hover:bg-orange-700 p-3 text-xl font-medium text-white transition-all bg-orange-600 shadow-2xl">
                                Get Started
                            </button>
                        </Link>
                    </div>
                    <img src={Welcome} />
                </div>
            </div>
        </>
    )
}

export default ProjectPostWelcome;