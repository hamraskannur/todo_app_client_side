import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { saveProfile, userProfile } from "../axios/axios";
import { EditProfileValidate } from "../components/validation/validation";
import { toast } from "react-hot-toast";

function EditProfile() {
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState([]);

  const handleChange = async (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await userProfile();
        setUserData(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const submit = async () => {
    try {
      const isValid = EditProfileValidate(setErrors, userData);
      if (isValid) {
        const response = await saveProfile(userData);
        if(!response.status){
            toast.error(response.message);
        }
        if (response.status) {
          toast.success(response.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex m-10 items-center justify-center">
        <div>
          <h1 className="text-xl text-black underline decoration-slate-500">
            Edit Profile
          </h1>
          <div className="mt-5">
            <label htmlFor="userName" className="text-base text-gray-500">
              Full name
            </label>
            {errors.fullName && (
              <span className="text-red-500 text-xs">{`*${errors.fullName}`}</span>
            )}
            <input
              className="border w-full p-3 rounded-md"
              id="userName"
              type="text"
              value={userData.userName}
              name="userName"
              onChange={handleChange}
              required
            />
            <label htmlFor="email" className="text-base text-gray-500">
              Email
            </label>
            {errors.emailAddress && (
              <span className="text-red-500 text-xs">{`*${errors.emailAddress}`}</span>
            )}
            <input
              className="border w-full p-3 rounded-md"
              id="email"
              type="text"
              value={userData.emailAddress}
              name="emailAddress"
              onChange={handleChange}
            />
            <label htmlFor="phoneNumber" className="text-base text-gray-500">
              Phone Number
            </label>{" "}
            {errors.phoneNumber && (
              <span className="text-red-500 text-xs">{`*${errors.phoneNumber}`}</span>
            )}
            <input
              className="border w-full p-3 rounded-md"
              id="phoneNumber"
              type="text"
              value={userData.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
            />
            <div className="mt-5 flex justify-center">
              <button
                onClick={submit}
                className="bg-[#6f6f6f]  text-white px-8 py-1 rounded-lg hover:bg-white duration-300 border border-[#6f6f6f] hover:text-[#6f6f6f]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
