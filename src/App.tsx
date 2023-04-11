import "./css/App.css";
import { useState, useEffect } from "react";
import { supabase } from "./helpers/SupabaseClient";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CounterProvider from "./context/CounterContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Verify from "./pages/Verify";
import ProfileInfo from "./pages/Profile";
import AuthProvider from "./context/AuthContext";
import CustomerForm1 from "./pages/CustomerForm1";

const App = () => {
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session!);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session!);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="App h-screen bg-slate-100">
      <CounterProvider>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            {session ? (
              <Route path="/profile" element={<ProfileInfo />} />
            ) : (
              <Route path="/signin" element={<SignIn />} />
            )}
            {session ? (
              <Route path="/form1" element={<CustomerForm1 />} />
            ) : (
              <Route path="/signin" element={<SignIn />} />
            )}
            <Route path="/verify" element={<Verify />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </CounterProvider>
      <Footer />
    </div>
  );
};

export default App;
