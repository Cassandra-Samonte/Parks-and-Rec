import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { signUp, logIn } from '../../../utils/backend';
// import searchVideo from '../../assets/search.mp4'; 

export default function AuthFormPage({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const { formType } = useParams();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    let actionText = formType === 'login' ? 'Log In' : 'Sign Up';

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response;
        
        if (formType === 'login') {
            response = await logIn(formData);
        } else {
            response = await signUp(formData);
        }
        // Check if response includes a token
        if (response && response.token) {
            // Save JWT token in localStorage
            localStorage.setItem('userToken', response.token);
            // Update login state
            setIsLoggedIn(true);
            // Navigate to homepage
            navigate('/');
        } else {
            // Handle failure (e.g., display an error message)
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