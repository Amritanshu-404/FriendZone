import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Explore = () => {
    const [projects, setProjects] = useState([]);
    const [sortOption, setSortOption] = useState('Available');
    const [searchInput, setSearchInput] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userId, setUserId] = useState('');
    const [sortedProjects, setSortedProjects] = useState([]);

    const decodeToken = () => {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken && decodedToken.userId) {
            setUserId(decodedToken.userId);
        }
    };

    useEffect(() => {
        if (token) {
            decodeToken();
        }
    }, [token]);

    useEffect(() => {
        axios.get('http://localhost:3000/projects')
            .then(response => {
                setProjects(response.data);
                setFilteredProjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    useEffect(() => {
        const filtered = projects.filter(project =>
            project.Title.toLowerCase().includes(searchInput.toLowerCase()) ||
            project.Category.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredProjects(filtered);
    }, [searchInput, projects]);

    useEffect(() => {
        const sorted = [...filteredProjects].filter(project => {
            const isDeadlineReached = moment(project.Deadline).diff(moment()) < 0;
            switch (sortOption) {
                case 'Available':
                    return !project.FreelancerId && !isDeadlineReached;
                case 'Met Partner':
                    return project.FreelancerId && !isDeadlineReached;
                case 'Reached Deadline':
                    return isDeadlineReached;
                default:
                    return true;
            }
        });
        setSortedProjects(sorted);
    }, [sortOption, filteredProjects]);


    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleAddProject = (projectId) => {
        const token = localStorage.getItem('token');

        const projectToJoin = projects.find(project => project._id === projectId);

        if (!projectToJoin) {
            toast.error('Project not found');
            return;
        }

        if (projectToJoin.FreelancerId) {
            toast.error('This project is already in working.');
            return;
        }

        if (projectToJoin.ClientId === userId) {
            toast.error('You cannot join a project you created');
            return;
        }

        axios.post('http://localhost:3000/add_myProject', {
            projectId: projectId,
            userId: userId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log('Project added successfully:', response.data);
                toast.success('Project added successfully!');
            })
            .catch(error => {
                console.error('Error adding project:', error);
                toast.error('Error adding project. Please try again.');
            });
    };

    return (
        <div className='ExploreArea bg-[#181818] min-h-screen h-auto py-10 px-20'>
            <div className='flex justify-center w-full mb-5'>
                <div className='SearchProject w-3/5 bg-[#1F2224] rounded-md h-52  text-white px-10 py-5 font-Popins flex flex-col gap-y-5'>
                    <div className='text-2xl text-center'>
                        <h1>Find Your Interested Projects Here</h1>
                    </div>
                    <div className='flex justify-center w-full text-black'>
                        <input
                            type="search"
                            name="Search"
                            placeholder='🔎  Project Title, Category or keywords......'
                            className='rounded-xl border-zinc-700 w-3/4 h-10 p-5 border-4'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center'>
                        <h1>Popular Search : </h1>
                        <ul className='searched justify-evenly flex'>
                            <li>Graphic Design</li>
                            <li>UI Design</li>
                            <li>Web Development</li>
                            <li>Content</li>
                            <li>Video</li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
            <div className='font-Popins px-7 flex items-center justify-between mt-5 text-2xl text-white'>
                <h1>Project List</h1>
                <div className='gap-x-5 flex items-center'>
                    <label htmlFor="Sort By">Sort by:</label>
                    <select value={sortOption} onChange={handleSortChange} className='bg-[#1F2224] h-10 px-4 py-2 text-base text-white border border-zinc-900 rounded-lg'>
                        <option value="Available">Available</option>
                        <option value="Met Partner">Met Partner</option>
                        <option value="Reached Deadline">Reached Deadline</option>
                    </select>
                </div>
            </div>
            <div className='ProjectArea font-Gruppo gap-x-5 flex flex-wrap mt-5 text-white'>
                {sortedProjects.map(project => {
                    const isDeadlineReached = moment(project.Deadline).diff(moment()) < 0;
                    const isAvailable = !project.FreelancerId && !isDeadlineReached;
                    const isMetPartner = project.FreelancerId && !isDeadlineReached;

                    if ((sortOption === 'Available' && isAvailable) || (sortOption === 'Met Partner' && isMetPartner) || sortOption === 'Reached Deadline') {
                        return (
                            <div key={project._id} className='ProjectCard hover:border border-gray-500 hover:transition-all hover:scale-105 w-[30%] bg-[#1F2224] rounded-md shadow-lg flex flex-col gap-y-1 shadow-zinc-90'>
                                <div className='p-2'>
                                    {project.Thumbnail ? (
                                        <img
                                            src={project.Thumbnail}
                                            className='max-h-32 rounded-xl w-full overflow-hidden'
                                            alt='Project'
                                            onError={(e) => {
                                                e.target.src = 'https://img.freepik.com/free-vector/image-upload-concept-illustration_114360-996.jpg?t=st=1711968381~exp=1711971981~hmac=41fc8643347cce2b4b1cf99e43211bd12876d867c5ad4732ff6dc895d0240acb&w=740';
                                            }}
                                        />
                                    ) : (
                                        <div className='font-MonaSans flex items-center justify-center h-32 text-lg font-bold text-gray-600'>
                                            <p>🖼️ No thumbnail available</p>
                                        </div>
                                    )}
                                </div>
                                <div className='Title text-wrap font-Gruppo p-2 font-bold'>
                                    <h1>🧾 {project.Title}</h1>
                                </div>
                                <div className='Description h-24 p-2 text-sm'>
                                    <p>{project.Description.length > 100 ? project.Description.slice(0, 200) + '...' : project.Description}</p>
                                </div>
                                <div className='Category font-Popins gap-x-1 flex flex-wrap items-center p-2'>
                                    {project.Category.split(',').slice(0, 2).map((category, index) => (
                                        <h1
                                            key={index}
                                            className={`rounded-2xl px-4 py-1 mr-2 mb-2 ${index % 2 === 0 ? 'bg-blue-500 text-white' : 'bg-green-500 text-black'}`}
                                        >
                                            {category.trim()}
                                        </h1>
                                    ))}
                                </div>
                                <hr className='mx-2 border-[#2E3301]' />
                                <div className='font-Popins flex justify-between p-2'>
                                    {sortOption === 'Reached Deadline' ? (
                                        <p>Ended</p>
                                    ) : (
                                        <p>⌛ {moment(project.Deadline).diff(moment(), 'days')} days left</p>
                                    )}
                                    <p>🗓️ {moment(project.Created_at).format('D MMM YY')}</p>
                                </div>
                                <hr className='border-4 border-[#181818]' />
                                {sortOption !== 'Met Partner' && sortOption !== 'Reached Deadline' && (
                                    <div className='flex items-center justify-center p-2'>
                                        <button onClick={() => handleAddProject(project._id)}>Add Project</button>
                                    </div>
                                )}
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Explore;
