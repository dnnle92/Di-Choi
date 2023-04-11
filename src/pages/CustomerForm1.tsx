import { useEffect, useState } from "react";
import { useContext } from "react";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../helpers/SupabaseClient";
import airplaneLogo from "../assets/airplane.png";
import Datepicker from "react-tailwindcss-datepicker";
import emailjs from "@emailjs/browser";

const CustomerForm1 = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [needVisa, setNeedVisa] = useState(false);
  const [tripValue, setTripValue] = useState({
    startDate: null,
    endDate: null,
  });

  const context = useContext(AuthContext);

  const handleTripValueChange = (tripValue) => {
    console.log("tripValue:", tripValue);
    setTripValue(tripValue);
  };

  const handleNeedVisa = () => {
    setNeedVisa((needVisa) => !needVisa);
  };

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { user } = context?.session;

      let { data, error } = await supabase
        .from("profiles")
        .select(`full_name, created_at`)
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setName(data.full_name);
        setPhoneNumber(user.phone);
        setCreatedAt(data.created_at);
      }

      setLoading(false);
    };

    getUser();
  }, [context?.session]);

  const submitCustomer = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { user } = context?.session;

    const updates = {
      id: user.id,
      full_name: name,
      trip_start_date: tripValue.startDate,
      trip_end_date: tripValue.endDate,
      need_visa: needVisa,
      created_at: createdAt,
      updated_at: new Date(),
    };

    const templateParams = {
      name: name,
      phoneNumber: phoneNumber,
      trip_start_date: tripValue.startDate,
      trip_end_date: tripValue.endDate,
      need_visa: needVisa,
      updated_at: new Date().toDateString(),
    };

    let { error } = await supabase.from("customers").upsert(updates);

    if (error == null) {
      emailjs
        .send(
          "service_4sldoph",
          "template_5khfle9",
          templateParams,
          "WA4tEcd8LuLG2FLvk"
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
          },
          (err) => {
            console.log("FAILED...", err);
          }
        );
      setMessage("Saved!");
    } else {
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-100 flex mt-10">
      <div className="relative z-10 w-full h-full p-7 md:p-0 flex justify-center items-center">
        <div className="flex flex-col items-center w-96 bg-white rounded-2xl shadow-lg overflow">
          <br className="w-full mt-6" /> <br className="w-full mt-6" />
          <div className="relative w-full">
            <div className="pb-40%" />
          </div>
          <div className=" text-center">
            <img className="mx-auto w-auto" src={airplaneLogo} alt="logo" />
            <h2 className="mt-1 font-semibold text-3xl text-gray-900 ">
              Trip form
            </h2>
            &nbsp;
            <p className="text-gray-400 text-md">
              Please tell us about your upcoming trip.
            </p>
          </div>
          <form className="mt-8 w-72">
            <div className="mt-3">
              <label className="text-sm font-bold text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none w-full rounded-md sm:text-sm disabled:shadow-none"
                placeholder="John Smith"
                disabled={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label className="text-sm font-bold text-slate-700 mb-1">
                Phone number
              </label>
              <input
                type="text"
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none w-full rounded-md sm:text-sm disabled:shadow-none"
                disabled={true}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label className="text-sm font-bold text-slate-700 mb-1">
                When is your trip? *
              </label>
              <Datepicker
                inputClassName="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none w-full rounded-md sm:text-sm disabled:shadow-none"
                useRange={false}
                value={tripValue}
                onChange={handleTripValueChange}
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
              className="text-center my-3"
              title={
                tripValue.startDate === null || tripValue.endDate === null
                  ? "Trip dates are required!"
                  : ""
              }
            >
              <PrimaryButton
                content="Submit"
                customClickEvent={submitCustomer}
                fullWidth={true}
                loading={loading}
                disabled={
                  tripValue.startDate === null ||
                  tripValue.endDate === null ||
                  loading
                }
                children={undefined}
                component={undefined}
              />
            </div>
          </form>
          {message}
        </div>
      </div>
    </div>
  );
};

export default CustomerForm1;
