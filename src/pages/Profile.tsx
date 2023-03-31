import { useEffect, useState } from "react";
import { useContext } from "react";
import avatar from "../assets/pp_blank.png";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../helpers/SupabaseClient";

const ProfileInfo = (props) => {
  //const [profilePicture, setProfilePicture] = useState(avatar);
  //const [removeLoading, setRemoveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [profileName, setProfileName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [needVisa, setNeedVisa] = useState(false);

  const context = useContext(AuthContext);

  const handleNeedVisa = () => {
    setNeedVisa((needVisa) => !needVisa);
  };

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const { user } = context?.session;

      let { data, error } = await supabase
        .from("profiles")
        .select(`full_name, address, date_of_birth, need_visa`)
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setName(data.full_name);
        setProfileName(data.full_name);
        setPhoneNumber(user.phone);
        setAddress(data.address);
        setDob(data.date_of_birth);

        if (data.need_visa == null) {
          setNeedVisa(false);
        } else {
          setNeedVisa(data.need_visa);
        }
      }

      setLoading(false);
    };

    getProfile();
  }, [context?.session]);

  const updateProfile = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { user } = context?.session;

    const updates = {
      id: user.id,
      full_name: name,
      address: address,
      date_of_birth: dob,
      need_visa: needVisa,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  // // Detect file change and updates the profile picture
  // const handleFileSelect = async (event) => {
  //   setLoading(true);
  //   await handleFileUpload(event.target.files[0]);
  // };

  return (
    <div className="bg-slate-100 flex mt-10">
      <div className="relative z-10 w-full h-full p-7 md:p-0 flex justify-center items-center">
        <div className="flex flex-col items-center w-96 bg-white rounded-2xl shadow-lg overflow-hidden">
          <br className="w-full mt-6" /> <br className="w-full mt-6" />
          <div className="relative w-full">
            <div className="pb-40%" />
          </div>
          <div className="flex flex-col items-center -mt-14">
            {/* {profilePicture === {avatar}) ? ( */}
            <img
              alt="profile"
              src={avatar}
              className="mt-5 relative z-0 border-6 border-white h-20"
            />
            {/* ) : (
              <img
                alt="profile"
                src={avatar}
                className="mt-5 relative z-0 rounded-full border-6 border-white h-24 w-24"
              />
            )} */}

            <div className="flex mt-2">
              <h3 className="font-body font-bold text-blue-500 text-lg">
                {profileName ? profileName.toUpperCase() : ""}
              </h3>
            </div>
            <div className="text-slate-400 mb-4">
              {phoneNumber ? phoneNumber : ""}
            </div>

            <hr className="w-full mb-3" />
            {/* {profilePicture === require("../images/pp_blank.png") ? (
              <PrimaryButton
                loading={loading}
                content="Upload Profile Photo"
                component={<input
                type="file"
                accept=".png, .jpg, .jpeg"
                className="cursor-pointer absolute block py-2 px-4 opacity-0"
                onChange={undefined} />} 
                children={undefined}              
              /> */}
            {/* ) : (
              <>
                <>
                  <PrimaryButton
                    loading={loading}
                    content="Change Profile Photo"
                    component={<input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="cursor-pointer absolute block py-2 px-4 opacity-0"
                    onChange={handleFileSelect} />} 
                    children={undefined}                  
                  />
                </>
              </>
            )} */}
          </div>
          <hr className="w-full mt-7" />
          <form className="mt-8">
            <div className="mt-3">
              <label className="text-sm font-bold text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none w-full rounded-md sm:text-sm disabled:shadow-none"
                placeholder="Enter name here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label className="text-sm font-bold text-slate-700 mb-1">
                Address
              </label>
              <input
                type="text"
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none w-full rounded-md sm:text-sm disabled:shadow-none"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label className="text-sm font-bold text-slate-700 mb-1">
                Date of birth
              </label>
              <input
                type="text"
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none w-full rounded-md sm:text-sm disabled:shadow-none"
                placeholder="MM/DD/YYYY"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label className="text-sm font-bold text-slate-700 mb-1 flex">
                <input
                  type="checkbox"
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none w-5 h-5 rounded-md sm:text-sm disabled:shadow-none"
                  checked={needVisa}
                  onChange={handleNeedVisa}
                />
                &nbsp; Do you need a Visa?
              </label>
            </div>
            <div
              className="text-center"
              title={name === "" ? "name are required!" : ""}
            >
              <PrimaryButton
                content="Update"
                customClickEvent={updateProfile}
                fullWidth={true}
                loading={loading}
                disabled={name === "" || loading}
                children={undefined}
                component={undefined}
              />
            </div>
          </form>
          {/* <ChangeCredentials /> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
