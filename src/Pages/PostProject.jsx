import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuggestionsData from '../Data/SuggestionData';
import { AiOutlineCloseCircle } from "react-icons/ai";

const PostProject = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        deadline: '',
        description: '',
        thumbnail: '',
    });
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isNextActive, setIsNextActive] = useState(false);
    const [suggestions, setSuggestions] = useState(SuggestionsData);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const isValid = validateCurrentSlide();
        setIsNextActive(isValid);
    }, [formData, currentSlide]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setShowSuggestions(true);
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => prevSlide + 1);
    };

    const handlePrevious = () => {
        setCurrentSlide((prevSlide) => prevSlide - 1);
    };

    const handleSubmit = async () => {
        try {
            const updatedFormData = {
                ...formData,
                category: selectedCategories.join(', '),
            };

            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/save_projects', updatedFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Project Uploaded 🥳');
            setTimeout(() => {
                navigate('/user/projects', { replace: true });
            }, 2000);
        } catch (error) {
            console.error('Error saving Project data:', error);
            toast.error('Error saving Project data. Please try again 🫤.');
        }
    };
    const validateCurrentSlide = () => {
        switch (currentSlide) {
            case 1:
                return formData.title.trim() !== '';
            case 2:
                return formData.category.trim() !== '';
            case 3:
                return formData.deadline.trim() !== '';
            case 4:
                return formData.description.trim() !== '' && formData.thumbnail.trim() !== '';
            default:
                return false;
        }
    };

    const calculateProgress = () => {
        const totalSlides = 4;
        const progress = ((currentSlide) / totalSlides) * 100;
        return progress + '%';
    };

    const handleSuggestionClick = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            category: value,
        }));
        setSelectedCategories((prevCategories) => [...prevCategories, value]);
        setShowSuggestions(false);
    };

    const handleRemoveCategory = (value) => {
        setSelectedCategories((prevCategories) => prevCategories.filter((category) => category !== value));
    };
    return (
        <div className="PostProjectArea bg-[#181818] h-[89.8vh] flex justify-center">
            {currentSlide === 1 && (
                <div className="Slide gap-x-10 flex w-3/4 h-full pt-32 pl-20 text-white">
                    <div className="TextSide font-Gruppo w-7/12 text-lg leading-relaxed">
                        <h1 className='text-2xl font-semibold'> 👉 1/4 Project Post</h1>
                        <h1 className='my-4 text-6xl'>Let's start with a strong title.</h1>
                        <p>Elevate your Projects post to catch the eye of ideal candidates. This is their initial impression, so make it impactful!</p>
                    </div>
                    <div className="UserSide font-Popins w-1/2 text-lg">
                        <p>Write a title for your Project.</p>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Project Title"
                            className='text-zinc-900 w-full h-10 pl-3 mt-3 rounded-md'
                        />
                        <div className='font-Gruppo pt-10 text-base leading-loose'>
                            <p>Example titles</p>
                            <ul className='pl-10 list-disc'>
                                <li>Designing Solar-Powered Solutions for Homes.</li>
                                <li>Promoting Safe Online Practices among Students.</li>
                                <li>Implementing Green Initiatives in School.</li>
                                <li>Understanding Cryptocurrency and Smart Contracts</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {currentSlide === 2 && (
                <div className="Slide pt-28 gap-x-10 flex w-3/4 h-full pl-20 text-white">
                    <div className="TextSide font-Gruppo w-7/12 text-lg leading-relaxed">
                        <h1 className='text-2xl font-semibold'> 👉 2/4 Project Post</h1>
                        <h1 className='my-4 text-6xl'>Which Categories Does Your Project Belong To?</h1>
                    </div>
                    <div className="UserSide font-Popins relative w-1/2 text-lg">
                        <p>Add Your Own Relevant Category</p>
                        <div>
                            <input
                                type="search"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Search Category"
                                className='text-zinc-900 w-full h-10 px-3 mt-3 rounded-md'
                            />
                            <div className="SelectedCategories gap flex flex-wrap gap-2 mt-2">
                                {selectedCategories.map((category, index) => (
                                    <div key={index} className="SelectedCategory">
                                        <div className='flex'>
                                            <h1 className='gap-x-2 font-Gruppo flex w-auto p-2 text-sm bg-orange-600 border-2 border-none rounded-full'>{category}
                                                <button onClick={() => handleRemoveCategory(category)}><AiOutlineCloseCircle /></button>
                                            </h1>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='top-20 absolute w-full'>
                                {showSuggestions && formData.category && (
                                    <ul className="SuggestionList font-Gruppo text-base leading-relaxed mt-3 pl-3 h-auto max-h-40 overflow-y-auto border-none shadow-lg shadow-black bg-[#202020] rounded-md">
                                        {suggestions
                                            .filter((item) => item.toLowerCase().includes(formData.category.toLowerCase()))
                                            .map((item, index) => (
                                                <li key={index} onClick={() => handleSuggestionClick(item)}>{item}</li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className='font-Gruppo pt-5 text-base leading-loose'>
                            <p>Popular Project Category</p>
                            <ul className='PopularProject flex flex-wrap gap-2 pl-5 mt-2'>
                                <li>Web Development</li>
                                <li>Mobile App Development</li>
                                <li>Digital Marketing</li>
                                <li>Graphic Design</li>
                                <li>Content Creation</li>
                                <li>AI Development</li>
                                <li>Photography</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {currentSlide === 3 && (
                <div className="Slide pt-28 gap-x-10 flex w-3/4 h-full pl-20 text-white">
                    <div className="TextSide font-Gruppo w-7/12 text-lg leading-relaxed">
                        <h1 className='text-2xl font-semibold'> 👉 3/4 Project Post</h1>
                        <h1 className='my-4 text-6xl'>Next, estimate the Duration of your work.</h1>
                        <p>Consider the size of your project and the time it will take.</p>
                    </div>
                    <div className="UserSide font-Popins w-1/2 text-lg">
                        <p>How long will your work take?</p>
                        <input
                            type='date'
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            placeholder="Project Duration"
                            className='text-zinc-900 w-1/2 h-10 px-2 mt-5 rounded-lg'
                            min={new Date().toISOString().split('T')[0]}
                        />

                        <div className='font-Gruppo pt-5 text-base leading-loose'>
                            <p>Recommended Duration for Project Like : </p>
                            <ul className=' flex flex-wrap gap-2 pl-5 mt-2'>
                                <p><strong>Web Development:</strong> 2 to 6 months</p>
                                <p><strong>Graphic Design:</strong> 1 to 3 months</p>
                                <p><strong>Content Creation:</strong> 1 to 2 months</p>
                                <p><strong>AI Development:</strong> 6 to 12 months or more</p>
                                <p><strong>Photography:</strong> Varies depending on the scope of the project, typically ranging from a few days to a few weeks</p>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {currentSlide === 4 && (
                <div className="Slide pt-28 gap-x-10 flex w-3/4 h-full pl-20 text-white">
                    <div className="TextSide font-Gruppo w-7/12 text-lg leading-relaxed">
                        <h1 className='text-2xl font-semibold'>👉 4/4 Project Post</h1>
                        <h1 className='my-4 text-6xl'>Start the conversation.</h1>
                        <p>What skilled individuals are searching for:</p>
                        <ul className='pl-5 list-disc'>
                            <li>Clear expectations about your task or deliverables</li>
                            <li>The skills required for your work</li>
                            <li>Good communication</li>
                            <li>Details about how you or your team like to work</li>
                        </ul>
                    </div>
                    <div className="UserSide font-Popins w-1/2 text-lg">
                        <p>Describe what you need</p>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Already have a description? Paste it here!"
                            className='text-zinc-900 max-h-52 w-full p-3 mt-3 text-sm rounded-md'
                        />
                        <p>Paste URL of Image for Thumbnail</p>
                        <input
                            type="text"
                            name="thumbnail"
                            value={formData.thumbnail}
                            onChange={handleChange}
                            placeholder="Thumbnail URL"
                            className='text-zinc-900 w-full h-10 p-3 mt-3 text-sm rounded-md'
                        />
                    </div>
                </div>

            )}
            <div className="Footer absolute bottom-0 left-0 w-full h-20">
                <hr className='border-slate-700' />
                <div className="Progress border-y-2 border-[#C2410C]" style={{ width: calculateProgress() }}></div>
                <div className='font-Popins flex items-center justify-between px-10 mt-5 text-2xl font-medium text-white'>
                    {currentSlide !== 1 && (
                        <button className="PrevButton border-zinc-800 rounded-3xl px-3 py-1 text-red-600 border-2" onClick={handlePrevious}>Previous</button>
                    )}
                    {currentSlide !== 4 && (
                        <div className='text-end w-full'>
                            <button className={`NextButton ${!isNextActive ? 'pointer-events-none cursor-not-allowed bg-slate-400' : ''} bg-orange-600 rounded-3xl py-1 px-6`} onClick={handleNext}>Next</button>
                        </div>
                    )}
                    {currentSlide === 4 && (
                        <button className={`SubmitButton ${!isNextActive ? 'cursor-not-allowed bg-slate-400' : ''} bg-orange-600 rounded-3xl py-1 px-6`} onClick={handleSubmit}>Post this Project</button>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PostProject;
