import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import airplaneLogo from "../assets/airplane.png";
import { CounterContext } from "../context/CounterContext";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [haveError, setHaveError] = useState(false);

  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const counterContext = useContext(CounterContext);

  const signin = async (event) => {
    setLoading(true);
    event.preventDefault();

    const { error } = await context?.login(phoneNumber);

    if (error == null) {
      sessionStorage.setItem("canVerify", "true");
      sessionStorage.setItem("phoneNumber", phoneNumber!);
      counterContext?.initiateCounter(0);
      navigate("/verify");
    } else {
      setLoading(false);
      setHaveError(true);
      setMessage(error.message);
    }
  };

  return (
    <div className="flex mt-10">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-lg py-1 px-16">
        <div className="min-h-full flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-md w-full space-y-8">
            <div className=" text-center">
              <img className="mx-auto w-auto" src={airplaneLogo} alt="logo" />
              <h2 className="mt-1 font-semibold text-3xl text-gray-900 ">
                Sign in
              </h2>
              &nbsp;
              <p className="text-gray-400 text-md">
                Welcome! Please sign in to continue.
              </p>
            </div>
            <form className="mt-8">
              <div className="mb-4">
                <label className="block text-sm font-bold text-slate-700">
                  Phone Number *
                </label>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 rounded-md"
                  defaultCountry="US"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              </div>
              <div className="mt-10 text-xs w-full text-gray-500 text-center">
                ​By signing in, you agree to receive SMS messages.
              </div>
              <div
                className="my-3"
                title={
                  phoneNumber === "" || password === ""
                    ? "Phone number is required!"
                    : ""
                }
              >
                <PrimaryButton
                  content="Next"
                  customClickEvent={signin}
                  fullWidth={true}
                  loading={loading}
                  disabled={phoneNumber === "" || loading}
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
            <div className="text-center text-gray-400  text-sm">
              <p>
                Don't have an account?&nbsp;
                <Link to="/signup" className="text-blue-600">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
