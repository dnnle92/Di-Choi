import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SignUp from "./SignUp";

const Home = () => {
  const context = useContext(AuthContext);

  return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-0">
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Time to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Di-Choi
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Our landing page template works on all devices, so you only have
                to set it up once, and get beautiful results forever.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  {!context?.session ? (
                    <Link
                      to="/signup"
                      className="my-2 disabled:cursor-not-allowed text-sm whitespace-nowrap inline-flex items-center justify-center text-center px-4 py-2 border border-transparent rounded-md shadow-sm  font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Learn more
                    </Link>
                  ) : (
                    <Link
                      to="/profile"
                      className="my-2 disabled:cursor-not-allowed text-sm whitespace-nowrap inline-flex items-center justify-center text-center px-4 py-2 border border-transparent rounded-md shadow-sm  font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Profile
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {!context?.session ? (
            <section className="bg-gray-100">
              <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
                <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                  {/* Sign Up */}
                </h2>
                <SignUp />
              </div>
            </section>
          ) : (
            <></>
          )}
        </div>
      </div>
  );
};

export default Home;
