import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { signUp, logIn } from '../../../utils/backend';
import searchVideo from '../../assets/search.mp4'; 


export default function AuthFormPage() {
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

    async function handleSubmit(event) {
        event.preventDefault();
        if (formType === 'login') {
            const response = await logIn(formData);
            // Perform operations with response if needed
        } else {
            const response = await signUp(formData);
            // Perform operations with response if needed
        }
        // Navigate to homepage or other page based on successful response
        navigate('/');
    }

    return (
        <>
            <div className="relative h-screen overflow-auto"> 
                <video autoPlay loop playsInline muted className="absolute w-full h-full object-cover">
                    <source src={searchVideo} type="video/mp4" />
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
