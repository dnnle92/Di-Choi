import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Counter from "../components/Counter";
import airplaneLogo from "../assets/airplane.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function Verify(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [haveError, setHaveError] = useState(false);

  useEffect(() => {
    const canVerify = sessionStorage.getItem("canVerify");
    if (canVerify == "false") {
      navigate("/");
    }
  }, []);

  const handleCode = (event) => {
    setCode(event.target.value);
  };

  const verify = async (event) => {
    setLoading(true);
    event.preventDefault();
    const phoneNumber = sessionStorage.getItem("phoneNumber");

    const { error } = await context?.verify(phoneNumber, code);

    if (error == null) {
      setLoading(false);
      sessionStorage.setItem("canVerify", "false");
      navigate("/form1");
    } else {
      setLoading(false);
      setHaveError(true);
      setMessage(error.message);
    }
  };

  return (
    <div className="flex bg-gray-bg1 my-8 mb-20">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-lg py-1 px-16">
        <div className="min-h-full flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-24 w-auto"
                src={airplaneLogo}
                alt="logo"
              />
              <h2 className="mt-8 font-semibold text-3xl text-center text-gray-900">
                "Verify Your Phone Number"
              </h2>
              <p className="block text-sm font-medium text-center text-slate-500">
                Enter the verification code we sent to your mobile{" "}
                {sessionStorage.getItem("phoneNumber")}
              </p>
            </div>
            <Counter />
            <form className="mt-8 space-y-6">
              <div className="mt-2">
                <input
                  value={code}
                  className="px-3 mt-7 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:shadow-none"
                  onChange={handleCode}
                />
              </div>
              <div className="text-center">
                <PrimaryButton
                  content="Verify"
                  customClickEvent={verify}
                  fullWidth={true}
                  loading={loading}
                  disabled={loading || code.length !== 6}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
