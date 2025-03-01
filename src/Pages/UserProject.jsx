import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import Fallback from "../Resources/FallbackImage.png";

const UserProject = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [freelancerEmails, setFreelancerEmails] = useState({});
    const [clientEmails, setClientEmails] = useState({});
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await axios.get(
                        "http://localhost:3000/user/projects",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (!response.data || !Array.isArray(response.data)) {
                        throw new Error("Invalid data format for projects");
                    }

                    const updatedProjects = response.data.map((project) => {
                        const deadlineTimestamp = new Date(project.Deadline).getTime();
                        const nowTimestamp = new Date().getTime();
                        const differenceInDays = Math.ceil(
                            (deadlineTimestamp - nowTimestamp) / (1000 * 60 * 60 * 24)
                        );
                        return { ...project, DeadlineDays: differenceInDays };
                    });

                    setProjects(updatedProjects);
                    setError(null);
                    setInterval(updateDeadlineDays, 1000);

                    const freelancerIds = updatedProjects.map(
                        (project) => project.FreelancerId
                    );
                    fetchFreelancerEmails(freelancerIds);
                    const clientIds = updatedProjects.map((project) => project.ClientId);
                    fetchClientEmails(clientIds);
                } else {
                    throw new Error("No access token found");
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const fetchFreelancerEmails = async (freelancerIds) => {
        try {
            const emails = {};
            for (const id of freelancerIds) {
                const response = await axios.get(
                    `http://localhost:3000/freelancer/${id}`
                );
                const { email } = response.data;
                emails[id] = email;
            }
            setFreelancerEmails(emails);
        } catch (error) {
            console.error("Error fetching freelancer emails:", error);
        }
    };

    const fetchClientEmails = async (clientIds) => {
        try {
            const emails = {};
            for (const id of clientIds) {
                const response = await axios.get(`http://localhost:3000/client/${id}`);
                const { email } = response.data;
                emails[id] = email;
            }
            setClientEmails(emails);
        } catch (error) {
            console.error("Error fetching Client emails:", error);
        }
    };

    const handleImageError = (event) => {
        console.error("Error loading image:", event.target.src);
    };

    const filteredProjects = projects.filter((project) =>
        project.Title.toLowerCase().includes(searchInput.toLowerCase())
    );

    const updateDeadlineDays = () => {
        setProjects((prevProjects) =>
            prevProjects.map((project) => {
                const nowTimestamp = new Date().getTime();
                const deadlineTimestamp = new Date(project.Deadline).getTime();
                const differenceInSeconds = Math.floor(
                    (deadlineTimestamp - nowTimestamp) / 1000
                );
                const differenceInDays = Math.floor(
                    differenceInSeconds / (60 * 60 * 24)
                );
                return { ...project, DeadlineDays: differenceInDays };
            })
        );
    };

    const handleProjectOptionClick = (projectId) => {
        setSelectedProjectId((prevId) => (prevId === projectId ? null : projectId));
    };

    const handleExitFromProject = async (projectId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token available');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.patch(
                `http://localhost:3000/user/projects/${projectId}/exit`,
                null,
                config
            );

            toast.success(response.data.message);
            setSelectedProjectId(null);
        } catch (error) {
            console.error('Error exiting project:', error);
            toast.error(error.response?.data?.message || 'Error exiting project');
        }
    };


    const handleDeleteProject = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token available");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const projectId = selectedProjectId;
            if (!projectId) {
                throw new Error("No project ID selected");
            }

            await axios.delete(
                `http://localhost:3000/user/projects/${projectId}`,
                config
            );
            toast.success("Project deleted successfully");
            setSelectedProjectId(null);
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("You are not authorized to delete this project");
        }
    };

    const handleMarkAsComplete = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token available");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const projectId = selectedProjectId;
            if (!projectId) {
                throw new Error("No project ID selected");
            }

            const response = await axios.patch(
                `http://localhost:3000/user/projects/${projectId}`,
                { status: "completed" },
                config
            );
            console.log(response.data);
            setSelectedProjectId(null);
            toast.success("Project updated to Completed");
        } catch (error) {
            console.error("Error marking project as complete:", error);
            toast.error("You are not authorized to update this project");
        }
    };

    return (
        <div className="bg-[#181818] min-h-screen w-full h-auto pb-5 ">
            <div className="ProjectsArea left-16 relative w-11/12 px-8 pt-20">
                <div className="flex items-center justify-between">
                    <h1 className="font-Popins inline-block text-3xl text-white">
                        Your All Projects at One Place
                    </h1>
                    <div className="gap-x-6 flex">
                        <input
                            type="search"
                            name="Search"
                            className="w-48 h-10 p-2 text-lg border-none rounded-md"
                            placeholder="🔎 Search Project"
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        {projects.length >= 0 && (
                            <NavLink to="/user/project_post/welcome">
                                <button className="hover:bg-orange-700 gap-x-3 flex justify-center px-4 py-2 font-bold text-white transition-all bg-orange-600 rounded">
                                    <IoMdAdd className="size-6" />
                                    Create Project
                                </button>
                            </NavLink>
                        )}
                    </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="gap-y-5 flex flex-col w-full px-10 my-10">
                    {loading ? (
                        <p className="font-Popins text-3xl italic text-orange-700">
                            Loading projects...
                        </p>
                    ) : filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <div
                                key={project._id}
                                className="Project p-3 font-Gruppo text-white bg-[#1F2224] rounded-xl shadow-xl shadow-[#181818] w-full flex items-center gap-x-10 relative"
                            >
                                <div className="w-1/2 h-full">
                                    {project.Thumbnail ? (
                                        <img
                                            src={project.Thumbnail}
                                            alt={project.Title}
                                            className="shadow-zinc-950 object-cover w-full mb-5 rounded-md shadow-lg"
                                            onError={handleImageError}
                                        />
                                    ) : (
                                        <div className="font-Raleway flex flex-col items-center justify-center text-2xl font-medium">
                                            <img src={Fallback} className="w-1/2" />
                                            <p>No Thubnail Uploaded</p>
                                        </div>
                                    )}
                                </div>
                                <div className="w-1/2 pr-5">
                                    <h2 className=" mb-2 text-2xl font-semibold">
                                        🧾 {project.Title}
                                    </h2>
                                    <div
                                        className="mb-4 text-base font-light leading-relaxed text-justify"
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {project.Description}
                                    </div>

                                    <div className="font-Popins my-2">
                                        {project.Category.split(",")
                                            .slice(0, 3)
                                            .map((category, index) => {
                                                const trimmedCategory = category.trim();
                                                const colorIndex = index % 3;
                                                const color =
                                                    colorIndex === 0
                                                        ? "#337AFF"
                                                        : colorIndex === 1
                                                            ? "#22C55E "
                                                            : "#FF5733";
                                                return (
                                                    <p
                                                        key={index}
                                                        className="rounded-2xl inline-block px-4 py-1 mb-2 mr-2"
                                                        style={{ backgroundColor: color, color: "#FFFFFF" }}
                                                    >
                                                        {trimmedCategory}
                                                    </p>
                                                );
                                            })}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="w-11/12">
                                            <div className="font-Popins gap-x-4 flex items-center text-base divide-x-2">
                                                <div className="gap-x-2 flex items-center pl-2">
                                                    <p>ℹ️ {project.Status}</p>
                                                </div>
                                                <div className="gap-x-2 flex items-center pl-2">
                                                    {project.DeadlineDays > 0 ? (
                                                        <p>⌛{project.DeadlineDays} days</p>
                                                    ) : (
                                                        <p>
                                                            Deadline was :{" "}
                                                            {new Date(project.Deadline).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col mt-2">
                                                {project.FreelancerId ? (
                                                    <>
                                                        <p>
                                                            {" "}
                                                            👨‍💼 Leader: 📧 {clientEmails[project.ClientId]}
                                                        </p>
                                                        <p>
                                                            {" "}
                                                            👨‍💻 Partner: 📧{" "}
                                                            {freelancerEmails[project.FreelancerId]}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <div className="flex items-center mt-4 text-xl">
                                                        <p> 👨‍💻: No Partner Joined.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleProjectOptionClick(project._id)}
                                        >
                                            <SlOptionsVertical size={30} />
                                        </button>
                                        {selectedProjectId === project._id && (
                                            <div className="right-16 bottom-2 absolute z-10 p-2 mt-10 mr-2 bg-gray-800 rounded-lg shadow-md">
                                                <button onClick={() => handleExitFromProject(selectedProjectId)}
                                                    className="hover:bg-sky-700 hover:text-white block w-full px-3 py-2 text-left text-white rounded-md">
                                                    Exit From Project
                                                </button>
                                                <button
                                                    onClick={handleDeleteProject}
                                                    className="hover:bg-red-500 hover:text-white block w-full px-3 py-2 text-left text-white rounded-md"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={handleMarkAsComplete}
                                                    className="hover:bg-green-500 hover:text-white block w-full px-3 py-2 text-left text-white rounded-md"
                                                >
                                                    Mark as Complete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="font-Popins text-3xl italic text-orange-700">
                            No projects created or Joined.
                        </p>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserProject;
