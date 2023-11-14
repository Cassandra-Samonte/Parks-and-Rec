import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { signUp, logIn } from '../../../utils/backend';
// import searchVideo from '../../assets/search.mp4'; 

export default function AuthFormPage({ setIsLoggedIn }) {
    const navigate = useNavigate();
    // retrieve 'formType' parameter from URL using useParams hook
    const { formType } = useParams();
    // State for form data - initialize with empty email/password
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // 'actionText' variable changes based on formType
    // formType obtained from URL using useParams hook 
    // If formType === login is true, actionText is set to Log In
    // If false actionText is set to Sign Up
    let actionText = formType === 'login' ? 'Log In' : 'Sign Up';

    // Function takes event as parameter - 
    const handleInputChange = (event) => {
        // Update formData state with new values as user types in the input fields
        // spread operator keeps existing formData 
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Function handles form submission - either login or signup user based on form type
    const handleSubmit = async (event) => {
        // Stop default form submission behavior to prevent the page from reloading
        event.preventDefault();
        // Store response from login/signup to variable 'response'
        let response;
        
        // Check the formType and call in either logIn or signUp with the formData
        if (formType === 'login') {
            // Call logIn function and pass formData for login
            response = await logIn(formData);
        } else {
            // Call signUp function and pass formData for signup
            response = await signUp(formData);
        }

        // Check if response includes a token
        if (response && response.token) {
            // Save token in localStorage
            localStorage.setItem('userToken', response.token);
            // Update login state using the setIsLoggedIn prop
            setIsLoggedIn(true);
            // Navigate to homepage after successful login/signup
            navigate('/');
        } else {
            // Handle failure display error message
            console.error('Login/Signup failed:', response);
        }
    };

    return (
        <>
            <div className="relative h-screen overflow-auto"> 
                <video autoPlay loop playsInline muted className="absolute w-full h-full object-cover">
                    <source src="https://drive.google.com/uc?export=download&id=1XSc5LUkQ_O6VDk9X_cpcvnsMR5-DIU8m" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4"> 
                    <div className="flex items-center justify-center h-[90vh]">
                        <form 
                            onSubmit={handleSubmit} 
                            className="text-center mb-8 bg-white bg-opacity-50 rounded-lg p-10 space-y-6 w-full max-w-md shadow-lg"
                        >
                            <h2 className="text-3xl font-bold text-white mb-8">
                                {actionText}
                            </h2>
                            <div>
                                <input
                                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500 "
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"
                                    id="password"
                                    name="password"
                                    type="password"
                                    minLength="6"
                                    required
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="mx-1 px-4 py-2 text-gray-700 hover:text-white hover:bg-gray-800 bg-gray-300 rounded transition duration-200"
                            >
                                {actionText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}