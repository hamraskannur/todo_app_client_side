import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { userProfile } from "../axios/axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

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

  return (
    <>
      <Header />
      <div className="flex w-full justify-center items-center">
        <div className=" w-[50%] border mt-5 rounded p-3">
          <h1 className="text-base text-gray-500 underline decoration-sky-600">
            PROFILE
          </h1>
          <div className="grid grid-cols-2 w-full mt-5 gap-5">
            <div>
              <h1 className="text-gray-500">Name</h1>
            </div>
            <div>
              <h1 className="text-gray-500">{userData.userName}</h1>
            </div>
            <div>
              <h1 className="text-gray-500">Email</h1>
            </div>
            <div>
              <h1 className="text-gray-500">{userData.emailAddress}</h1>
            </div>

            <div>
              <h1 className="text-gray-500">Phone number</h1>
            </div>
            <div>
              <h1 className="text-gray-500">{userData.phoneNumber}</h1>
            </div>
          </div>
          <div className="w-full h-8 mt-2 relative">
            <button
              onClick={() => {
                navigate("/editProfile");
              }}
              className="bg-[#6f6f6f] absolute right-0   text-white px-4 py-1 rounded-lg hover:bg-white duration-300 border border-[#6f6f6f] hover:text-[#6f6f6f]"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
