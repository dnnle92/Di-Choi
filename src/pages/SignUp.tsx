import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { CounterContext } from "../context/CounterContext";
import airplaneLogo from "../assets/airplane.png";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [haveError, setHaveError] = useState(false);

  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const counterContext = useContext(CounterContext);
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };

  const path = useLocation().pathname;

  const signup = async (event) => {
    setLoading(true);
    event.preventDefault();

    const { error } = await context?.signup(phoneNumber, name);

    if (error == null) {
      sessionStorage.setItem("canVerify", "true");
      sessionStorage.setItem("phoneNumber", phoneNumber!);
      counterContext?.initiateCounter(0);
      navigate("/verify");
    } else {
      setHaveError(true);
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex mt-10">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-lg py-1 px-16 ">
        <div className="min-h-full flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img className="mx-auto w-auto" src={airplaneLogo} alt="logo" />
              <h2 className="mt-1 font-semibold text-3xl text-gray-900 text-center">
                {path == "/" ? "Welcome!" : "Sign up"}
              </h2>
            </div>
            <form className="mt-8">
              <div className="mb-5">
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 w-full rounded-md sm:text-sm"
                  defaultCountry="US"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              </div>
              <div className="mt-3">
                <label className="text-sm font-bold text-slate-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none w-full rounded-md sm:text-sm disabled:shadow-none"
                  placeholder="Enter name here"
                  value={name}
                  onChange={handleName}
                />
              </div>
              <div className="mt-10 text-xs w-full text-gray-500 text-center">
                ​By creating an account, you agree to receive SMS messages.
              </div>
              <div
                className="text-center"
                title={
                  phoneNumber === "" || name === ""
                    ? "Phone number and name are required!"
                    : ""
                }
              >
                <PrimaryButton
                  content="Sign up"
                  customClickEvent={signup}
                  fullWidth={true}
                  loading={loading}
                  disabled={name === "" || phoneNumber === "" || loading}
                  children={undefined}
                  component={undefined}
                />
              </div>
            </form>
            {haveError ? (
              <div className="mt-4 text-red-400 text-xs text-center">
                <FontAwesomeIcon icon={faCircleExclamation} />
                &nbsp;{message}
              </div>
            ) : (
              <></>
            )}
            <div className="text-center text-gray-400 text-sm">
              <p>
                Already have an account?&nbsp;
                <Link to="/signin" className="text-blue-600">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
