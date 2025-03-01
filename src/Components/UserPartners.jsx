import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPartners = () => {
    const [otherUsers, setOtherUsers] = useState([]);
    const [hoveredUser, setHoveredUser] = useState(null);
    const [hoveredUserPosition, setHoveredUserPosition] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("http://localhost:3000/user/projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const projects = response.data;
                const loggedInId = getUserIdFromToken(token);
                console.log(`Logged-in user ID: ${loggedInId}`);
                fetchPartnerIds(projects, loggedInId);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }, []);

    const getUserIdFromToken = (token) => {
        const decodedToken = parseJwt(token);
        return decodedToken.userId;
    };

    const parseJwt = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload);
    };

    const fetchPartnerIds = (projects, loggedInId) => {
        const partnerIdsSet = new Set();

        projects.forEach((project) => {
            if (project.ClientId.toString() !== loggedInId) {
                partnerIdsSet.add(project.ClientId.toString());
            }
            if (project.FreelancerId.toString() !== loggedInId) {
                partnerIdsSet.add(project.FreelancerId.toString());
            }
        });

        console.log("Partner IDs:", Array.from(partnerIdsSet));
        fetchUserDetails(Array.from(partnerIdsSet));
    };

    const fetchUserDetails = async (partnerIds) => {
        if (!partnerIds || partnerIds.length === 0) {
            console.error("No partner IDs found.");
            return;
        }

        try {
            const usersData = await Promise.all(
                partnerIds.map(async (partnerId) => {
                    try {
                        const userResponse = await axios.get(
                            `http://localhost:3000/user-details/${partnerId}`
                        );
                        return userResponse.data;
                    } catch (error) {
                        console.error("Error fetching user details:", error);
                        return null;
                    }
                })
            );
            setOtherUsers(usersData.filter((user) => user !== null));
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleUserHover = (user, event) => {
        setHoveredUser(user);
        setHoveredUserPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setHoveredUser(null);
        setHoveredUserPosition({ x: 0, y: 0 });
    };

    return (
        <div className="Workingwith w-2/3 h-4/5 bg-[#1F2224] rounded-lg p-5 mt-3 overflow-y-auto flex gap-x-10">
            {otherUsers.length > 0 ? (
                <div className="w-52 h-52 flex bg-transparent rounded-sm">
                    {otherUsers.map((user) => (
                        <div
                            key={user._id}
                            className="TeamCard border border-[#1d1e1edc] inset-2 rounded-xl font-Popins gap-y-1 flex flex-col items-center p-4 text-white"
                            onMouseEnter={(event) => handleUserHover(user, event)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={
                                    user.profileImage
                                        ? user.profileImage
                                        : "https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
                                }
                                alt={user.username}
                                className="object-cover w-20 h-20 mb-2 bg-no-repeat rounded-full"
                            />
                            <p className="text-2xl font-medium">{user.username}</p>
                            <p className="text-wrap text-xs">{user.email}</p>
                            <p className="text-xs">{user.phoneNo}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center w-full h-full">
                    <img
                        src="https://img.playbook.com/4ExK8E0N2azMErpJSbvaKmhZRuuA-ffB5d8kmW1AsCI/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljL2FhMDVkYTUw/LWNjODEtNDk1MC05/ZTliLWM5MzZkMzQ3/MmE2Mg"
                        alt="Loading..."
                    />
                </div>
            )}
            {hoveredUser && (
                <div
                    className="font-Gruppo max-w-80 max-h-80 absolute p-4 text-sm text-wrap text-gray-400 bg-[#1F2224] rounded-lg shadow-md text-justify leading-5"
                    style={{
                        left: hoveredUserPosition.x,
                    }}
                >
                    <p>👉 {hoveredUser.bio ? hoveredUser.bio : "No Bio "}</p>
                </div>
            )}
        </div>
    );
};

export default UserPartners;
