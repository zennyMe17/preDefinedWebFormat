import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice';
import { FaUser, FaEnvelope, FaLock, FaChalkboardTeacher } from 'react-icons/fa'; // Import React Icons
import { signupUser } from '../services/api'; // Import signupUser
import { toast } from 'react-toastify'; // Import Toastify
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'react-toastify/dist/ReactToastify.css'; // Ensure the CSS is globally included

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // Default role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const user = await signupUser(formData); // Call the API for signup
      dispatch(signup(user)); // Dispatch the signup action with the user data
      toast.success('Signup Successful! Redirecting to login...', { icon: <FaUser /> }); // Toastify success message

      // Navigate to the Login page
      setTimeout(() => {
        navigate('/login'); // Redirect after a short delay
      }, 1500);
    } catch (error) {
      toast.error(error.message || 'Signup Failed', { icon: <FaUser /> }); // Toastify error message
    }
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <form className="p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Signup</h2>

        {/* Full Name Input */}
        <div className="mb-4 flex items-center bg-gray-700 rounded-lg">
          <FaUser className="text-gray-400 mx-3" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 bg-transparent text-white focus:outline-none rounded-r-lg"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4 flex items-center bg-gray-700 rounded-lg">
          <FaEnvelope className="text-gray-400 mx-3" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 bg-transparent text-white focus:outline-none rounded-r-lg"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 flex items-center bg-gray-700 rounded-lg">
          <FaLock className="text-gray-400 mx-3" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-3 bg-transparent text-white focus:outline-none rounded-r-lg"
            required
          />
        </div>

        {/* Role Selection (Animated Sliding Highlight) */}
        <div className="mb-4 relative w-full flex justify-center items-center bg-gray-700 rounded-lg overflow-hidden">
          {/* Highlight Background */}
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-white bg-opacity-20 rounded-lg transition-transform duration-300 ease-in-out ${
              formData.role === 'user' ? 'translate-x-0' : 'translate-x-full'
            }`}
          ></div>

          {/* User Button */}
          <button
            type="button"
            className={`relative w-1/2 p-3 text-white z-10 flex items-center justify-center gap-2 ${
              formData.role === 'user' ? 'font-semibold' : 'font-normal'
            }`}
            onClick={() => handleRoleChange('user')}
          >
            <FaUser /> User
          </button>

          {/* Instructor Button */}
          <button
            type="button"
            className={`relative w-1/2 p-3 text-white z-10 flex items-center justify-center gap-2 ${
              formData.role === 'instructor' ? 'font-semibold' : 'font-normal'
            }`}
            onClick={() => handleRoleChange('instructor')}
          >
            <FaChalkboardTeacher /> Instructor
          </button>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transform transition duration-300 ease-in-out"
          onClick={handleSignup}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
