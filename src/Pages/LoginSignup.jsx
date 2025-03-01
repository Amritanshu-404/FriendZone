import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginPic from "../Resources/LoginBanner.png";
import SignupPic from "../Resources/SignUpImage.png";
import ForgotPasswordForm from "../Components/ForgotPasswordForm";

const LoginSignup = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [college, setCollege] = useState("");
    const [passwordValidationMsg, setPasswordValidationMsg] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [flipForm, setFlipForm] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/signup", {
                username,
                college,
                email,
                password,
            });
            toast.success("Signup successful! You can now login. 🥳");
            setSignupSuccess(true);
        } catch (error) {
            console.error("Error:", error.response.data);
            toast.error(error.response.data.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email,
                password,
            });
            if (response.status === 200) {
                const { token } = response.data;
                toast.success("Login successful! 🥳.");
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("token", token);
                setTimeout(() => {
                    window.location.reload();
                    navigate(`/dashboard`);
                }, 2000);
            } else {
                console.error("Login failed .");
                toast.error("Login failed. Please check your credentials 🫤.");
            }
        } catch (error) {
            console.error("Error:", error.response.data);
            toast.error(error.response.data.message);
        }
        formRef.current.reset();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    };

    const toggleForm = () => {
        setShowLogin(!showLogin);
        setPassword("");
        setEmail("");
        setUsername("");
        setPasswordValidationMsg("");
        setSignupSuccess(false);
        setFlipForm(true);
        setTimeout(() => setFlipForm(false), 500);
    };

    return (
        <div className="container bg-[#181818] relative flex items-center justify-center h-screen">
            <ToastContainer />
            {showForgotPassword && (
                <ForgotPasswordForm onClose={toggleForgotPassword} />
            )}
            {showLogin ? (
                <div
                    className={`Login-container bg-[#F5F6FA] w-full pl-24 py-14 h-screen flex ${flipForm ? "flip" : ""}`}
                >
                    <div className="PosterSide rounded-3xl w-full bg-[#181818]">
                        <img
                            src={LoginPic}
                            alt="Login"
                            className="Poster left-24 relative w-3/5 select-none"
                        />
                        <div className="font-MonaSans px-10 text-xs font-normal leading-relaxed text-white">
                            <h1 className="Heading font-FengardoNeue mb-4 text-3xl">
                                Welcome Glad You Back.
                                <div className="gap-x-1 flex mt-1">
                                    <hr className=" w-24 border-2" />
                                    <hr className="w-3 border-2 rounded-md" />
                                </div>
                            </h1>
                            <p>
                                Unlock a world of opportunities and inspiration by logging in
                                today to embark on a journey of growth and success with our
                                empowering platform!
                            </p>
                        </div>
                    </div>
                    <div className="UserSide rounded-r-3xl w-full mr-10">
                        <form
                            className="LoginForm font-Mukta text-slate-100 flex flex-col items-center w-full h-full"
                            onSubmit={handleLogin}
                            ref={formRef}
                        >
                            <h1 className="Heading font-Popins mt-10 text-5xl font-extrabold text-center text-orange-700">
                                FriendZone.
                            </h1>
                            <div className="UserInput mt-14 flex flex-col items-center w-3/4 h-auto">
                                <p className="InputContainer text-slate-950 font-Mukta font-extrabold text-[20px] flex flex-col w-11/12 mb-10">
                                    <h1 className="text-slate-600 font-bold">Email Address</h1>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Your Email Address"
                                        className="Input rounded-lg mt-4 h-11 border border-[#D5DADF] border-solid placeholder:text-[#C1C8CF] text-[15px] font-normal pl-4"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </p>
                                <p className="InputContainer text-slate-950 font-extrabold text-[20px] flex flex-col w-11/12 relative">
                                    <h1 className="text-slate-600 font-bold">Password</h1>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        placeholder="Enter your password"
                                        className="Input rounded-lg mt-3 h-11 border border-[#D5DADF] border-solid placeholder:text-[#C1C8CF] text-[15px] font-normal pl-4 pr-10"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className="PasswordToggle top-10 right-3 absolute transform translate-y-1/2"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                    {passwordValidationMsg && (
                                        <p className="text-sm text-red-500">
                                            {passwordValidationMsg}
                                        </p>
                                    )}
                                </p>
                                <div className="text-slate-600 font-Popins flex justify-center w-11/12 mt-5 text-base font-medium">
                                    <h4 className="cursor-pointer" onClick={toggleForgotPassword}>
                                        Forgot Password?
                                    </h4>
                                </div>
                            </div>
                            <div className="UserButton gap-y-4 flex flex-col items-center justify-center w-full mt-6">
                                <button
                                    type="submit"
                                    className="Button bg-[#191919] w-4/6 h-10 rounded-lg text-[15px] text-white"
                                >
                                    Login
                                </button>
                                <div className="font-Nunito flex items-center justify-center gap-1">
                                    <h2 className="text-[#181818] text-base">
                                        Don't Have an Account?
                                    </h2>
                                    <button
                                        type="button"
                                        className="Button text-[15px] text-orange-600 font-Popins text-center"
                                        onClick={toggleForm}
                                    >
                                        Signup
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div
                    className={`Signup-container bg-[#F5F6FA] w-full pl-24 py-14 h-screen flex ${flipForm ? "flip" : ""}`}
                >
                    <div className="PosterSide bg-[#181818]  rounded-3xl w-full">
                        <img
                            src={SignupPic}
                            alt="Signup"
                            className="Poster left-24 relative w-3/5 select-none"
                        />
                        <div className="font-MonaSans px-10 text-xs font-normal leading-relaxed text-white">
                            <h1 className="Heading font-FengardoNeue mb-4 text-3xl">
                                Join the success squad?
                                <div className="gap-x-1 flex mt-1">
                                    <hr className=" w-24 border-2" />
                                    <hr className="w-3 border-2 rounded-md" />
                                </div>
                            </h1>
                            <p>
                                Join our vibrant community of achievers today! Sign up now to
                                kickstart your journey towards success and connect with
                                like-minded individuals who share your passion and drive
                            </p>
                        </div>
                    </div>
                    <div className="UserSide rounded-r-3xl w-full mr-10">
                        <form
                            className="SignupForm font-Mukta text-slate-100 flex flex-col items-center w-full h-full"
                            onSubmit={handleSignup}
                            ref={formRef}
                        >
                            <h1 className="Heading font-Popins mt-10 text-5xl font-extrabold text-center text-orange-700">
                                FriendZone.
                            </h1>
                            <div className="UserInput mt-14 flex flex-col items-center w-3/4 h-auto">
                                <div className="gap-x-5 flex w-full px-6">
                                    <p className="text-slate-950 font-Mukta font-extrabold text-[20px] flex flex-col w-11/12 mb-5">
                                        <h1 className="text-slate-600 font-bold">Username</h1>
                                        <input
                                            type="text"
                                            name="username"
                                            required
                                            placeholder="Full Name"
                                            className="EmailInput rounded-lg mt-4 h-11 border border-[#D5DADF] border-solid placeholder:text-[#C1C8CF] text-[15px] font-thin pl-4"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </p>
                                    <p className="text-slate-950 font-Mukta font-extrabold text-[20px] flex flex-col w-11/12 mb-5">
                                        <h1 className="text-slate-600 font-bold">
                                            College/University
                                        </h1>
                                        <input
                                            type="text"
                                            name="college"
                                            required
                                            placeholder="You College/University Name"
                                            className="EmailInput rounded-lg mt-4 h-11 border border-[#D5DADF] border-solid placeholder:text-[#C1C8CF] text-[15px] font-thin pl-4"
                                            onChange={(e) => setCollege(e.target.value)}
                                        />
                                    </p>
                                </div>
                                <p className="text-slate-950 font-Mukta font-extrabold text-[20px] flex flex-col w-11/12 mb-5">
                                    <h1 className="text-slate-600 font-bold">Email</h1>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Email Address"
                                        className="EmailInput rounded-lg mt-4 h-11 border border-[#D5DADF] border-solid placeholder:text-[#C1C8CF] text-[15px] font-thin pl-4"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </p>
                                <p className="text-slate-950 font-Mukta font-extrabold text-[20px] flex flex-col w-11/12 relative">
                                    <h1 className="text-slate-600 font-bold">Password</h1>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        placeholder="Enter your password"
                                        className="PassInput rounded-lg mt-3 h-11 border border-[#D5DADF] border-solid placeholder:text-[#C1C8CF] text-[15px] font-thin pl-4 pr-10"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className="top-10 right-3 absolute transform translate-y-1/2"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                    {passwordValidationMsg && (
                                        <p className="text-[12px] text-red-500">
                                            {passwordValidationMsg}
                                        </p>
                                    )}
                                </p>
                            </div>
                            <div className="UserButton gap-y-4 flex flex-col items-center justify-center w-full mt-6">
                                <button
                                    type="submit"
                                    className="bg-[#191919] w-4/6 h-10 rounded-lg text-[15px] text-white"
                                >
                                    Signup
                                </button>
                                <div className=" font-Nunito flex items-center justify-center gap-1">
                                    <h1 className="text-[#181818] text-base">
                                        Already Have an Account?
                                    </h1>
                                    <button
                                        type="button"
                                        className="text-[15px] text-orange-600 font-Popins text-center"
                                        onClick={toggleForm}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginSignup;
