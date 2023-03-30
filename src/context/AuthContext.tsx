import { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../helpers/SupabaseClient";

interface AuthContextType {
  signup: any;
  login: any;
  verify: any;
  logout: any;
  onError: any;
  check: any;
  getIdentity: any;
  session: any;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const authProvider = ({ children }) => {
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
    // return () => {
    //     authListener.subscription.unsubscribe();
    // };
  }, []);

  const signup = async (phoneNumber, name) => {
    try {
      return await supabase.auth.signInWithOtp({
        phone: phoneNumber,
        options: {
          data: {
            full_name: name,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (phoneNumber) => {
    try {
      return await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const verify = async (phoneNumber, otp) => {
    try {
      return await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otp,
        type: "sms",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      return await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const onError = async (error) => {
    console.error(error);
    return { error };
  };

  const check = async () => {
    try {
      return await supabase.auth.getSession();
    } catch (error) {
      console.error(error);
    }
  };

  const getIdentity = async () => {
    try {
      return await supabase.auth.getUser();
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    signup,
    login,
    verify,
    logout,
    onError,
    check,
    getIdentity,
    session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default authProvider;
