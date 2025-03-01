import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [showFirstHeader, setShowFirstHeader] = useState(true);
    const [showSecondHeader, setShowSecondHeader] = useState(false);
    const [latestProjects, setLatestProjects] = useState([]);

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
                    setTimeout(() => {
                        setShowFirstHeader(false);
                        setShowSecondHeader(true);
                    }, 1000);
                    fetchLatestProjects(token);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const fetchLatestProjects = async (token) => {
        try {
            const response = await axios.get('http://localhost:3000/projects', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const sortedProjects = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const latestThreeProjects = sortedProjects.slice(0, 3);
            setLatestProjects(latestThreeProjects);
        } catch (error) {
            console.error('Error fetching latest projects:', error);
        }
    };

    return (
        <div className='bg-[#181818] min-h-screen w-full h-auto pb-5'>
            <div className='font-Popins ml-36 w-10/12 p-5 pt-16 text-4xl font-normal text-white'>
                <div className='flex justify-between'>
                    <div>
                        {showFirstHeader && (
                            <h1 className='font-Gruppo animate-move-up-and-fade-out font-extrabold'>Hi, {username} <span className='animate-pulse'>👋</span></h1>
                        )}
                        {showSecondHeader && (
                            <h1 className='animate-fade-in-and-move-up'>Your Workspace</h1>
                        )}
                    </div>
                    <button className='rounded-xl h-11 px-3 text-base bg-orange-600'>
                        <Link to="/user/project_post/welcome">
                            + Post a Project
                        </Link>
                    </button>
                </div>
                <div className="my-8 p-2 text-[28px] text-white">
                    <h1>💡Remember these to stand out and get accepted fast.</h1>
                    <div className='gap-x-8 flex mt-6 text-base'>
                        <div className='w-auto p-5 rounded-lg bg-[#1F2224] flex items-center'>
                            <h1 className='leading-8'>Highlight Your Unique Skills in Bio.<br />Showcase what makes you stand out.</h1>
                            <img src='https://img.playbook.com/WFfo43LzPWEglhk4aPyjbE9dWy3FH3JHjix75ld8AyE/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljL2NjNzJiMDk1/LWJhMjItNGZjMi04/MTUxLThmNTlhNTA4/N2UyYg' className='w-20' alt="Highlight Skills" />
                        </div>
                        <div className='w-auto p-5 rounded-lg bg-[#1F2224] flex items-center'>
                            <h1 className='leading-8'>Be Professional and Polite in conversation.<br />Maintain a respectful and professional tone.</h1>
                            <img src='https://img.playbook.com/8uE5i-sxsIvtqCG_Tc-xN9lf8jYbthsdDPByHPN9Lhc/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzhhNzk1NDMz/LTNjNzQtNDEwOS05/ZWRhLTM3OWEzMWRi/YWIyMA' className='w-20' alt="Be Professional" />
                        </div>
                    </div>
                </div>
                <h1 className='mt-20 mb-10 text-2xl'>Newly Added Projects</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {latestProjects.map((project) => (
                        <div key={project.id} className='bg-[#1F2224] rounded-md p-5 text-white'>
                            <img src={project.Thumbnail} alt={project.Title} className='h-52 object-cover w-full mb-3' />
                            <h2 className='text-sm leading-7'>{project.Title}</h2>
                        </div>
                    ))}
                </div>
                <div className='Warning h-72 w-full mt-40 bg-[#344955]  rounded-xl flex justify-between'>
                    <div className='w-2/3 p-10'>
                        <h1 className='mb-3 text-base'>🧐 Reminder For You</h1>
                        <h1 >Stay Safe on FriendZone.</h1>
                        <p className='mt-5 text-base leading-7'>
                            Feel confident exploring our platform! While safety is our priority, remember to stay cautious, especially for now as you use this platform to find projects. Your trust is crucial—we're dedicated to improving security for a vibrant, safe community. Join us in building this secure and welcoming space together!
                        </p>
                    </div>
                    <img src='https://img.playbook.com/gsZkTQt-dmTglKXTlzqXJrRRsmX1laxK-EnRV7liL5c/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljL2U4YzE4NDk1/LWZmNjUtNDE0MS05/ODBiLWRjMWQ2NDMz/YThmYg' className='h-auto pr-10' />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
