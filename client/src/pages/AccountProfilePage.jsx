import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext
import toast from 'react-hot-toast';
import axios from 'axios';

const ProfilePage = () => {
  const { user ,updateUser} = useAuth();
  const API_URL = 'http://localhost:8000/api';
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  //remember we are directly accessing from local storage not calling any api like getAccountDetails
  const intialformData = {
    fullname: user?.fullname || '',
    password: '',
    bio: user?.bio || '',
    forgotPassQ: user?.forgotPassQ || '',
    forgotPassA: user?.forgotPassA || '',
    phone: user?.phone || '',
  };
  const [formData, setFormData] = useState(intialformData);

  useEffect(() => {
    // Update form data when user data changes
    console.log("Setting form data!")
    setFormData({
      fullname: user?.fullname || '',
      password: '',
      bio: user?.bio || '',
      forgotPassQ: user?.forgotPassQ || '',
      forgotPassA: user?.forgotPassA || '',
      phone: user?.phone || '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password) {
        toast.error('Enter your old password for verification!');
        return;
    }
    let updatedData = { ...formData };
    if (!newPassword) {
        console.log("new pass word is empty so only sending old pass-> ", formData.password);
        updatedData.password = formData.password;
    } else {
        console.log("new pass want empty so setting new password as , attching to lauch", newPassword);
        updatedData.password = newPassword;
    }
    //sending email also for fetching in controller
    updatedData.email = user?.email;
    const payload = {
      oldPassword: formData.password,
      updatedData: updatedData,
  };
  console.log(payload)
    // Proceed with updating user data here (e.g., call API, update context, etc.)
    try {
        const response = await axios.put(`${API_URL}/user/accountDetails`, payload);
        toast.success('Account details updated successfully!');
        console.log('Response Data:', response.data);
        //setting global user
        // Updating AuthContext and formData state with the updated user data
        updateUser(response.data.user);

        // setFormData((prevData) => ({
        //     ...prevData,
        //     ...updatedData,
        //     password: '', // Reset the password field
        // }));
        // Reset new password field
        setNewPassword('');
        setIsEditing(false);
    } catch (error) {
        toast.error(error.response?.data?.error || error.msg || 'Error updating profile');
        console.error('Error:', error);
    }

};


  return (
    <div className="m-5 flex items-center justify-center font-[sans-serif]">
      <div className="max-w-3xl w-full p-8 bg-white border border-gray-300 rounded-lg shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] flex">
        <div className="w-1/2 pr-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-800 text-3xl font-extrabold">Profile</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {setFormData(intialformData);setIsEditing(!isEditing)}}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                id= "email"
                disabled
                className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-200 text-gray-700"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dob" className="text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={user?.dob ? user.dob.split('T')[0] : ''}
                disabled
                className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-200 text-gray-700"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fullname" className="text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder='Enter your Name'
                className={`border border-gray-300 rounded-lg px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-200'} text-gray-700`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                Old Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder={isEditing ?'Enter Your Old password': '*******'}
                value={formData.password}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border border-gray-300 rounded-lg px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-200'} text-gray-700`}
              />
            </div>
            {isEditing && (
              <div className="flex flex-col">
                <label htmlFor="newPassword" className="text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your new password"
                />
              </div>
            )}
          </form>
        </div>
        <div className="w-1/2 pl-8 border-l">
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="bio" className="text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                disabled={!isEditing}
                className={`border border-gray-300 rounded-lg px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-200'} text-gray-700`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder='Enter Your phone No'
                className={`border border-gray-300 rounded-lg px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-200'} text-gray-700`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="forgotPassQ" className="text-sm font-medium text-gray-700 mb-1">
                Forgot Password Question
              </label>
              <select
                name="forgotPassQ"
                value={formData.forgotPassQ}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border border-gray-300 rounded-lg px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-200'} text-gray-700`}
                >
                <option value="">Select a question</option>
                <option value="What is your pet's name?">What is your pet's name?</option>
                <option value="Which city are you from?">Which city are you from?</option>
                <option value="What is your favorite food?">What is your favorite food?</option>
                <option value="Which programming language do you love most?">Which programming language do you love most?</option>
                <option value="What is your first salary?">What is your first salary?</option>
                <option value="Your dream company?">Your dream company?</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="forgotPassA" className="text-sm font-medium text-gray-700 mb-1">
                Forgot Password Answer
              </label>
              <input
                type="text"
                name="forgotPassA"
                value={formData.forgotPassA}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border border-gray-300 rounded-lg px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-200'} text-gray-700`}
                placeholder="Answer to selected question (keep it short)"
              />
            </div>
      {isEditing && (
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white mt-4 py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Changes
          </button>
        </div>
      )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
