import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_serverUrl,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    //  interceptor request
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        // attach Firebase ID token as Authorization header when available
        if (user) {
          try {
            const idToken = await user.getIdToken();
            config.headers.Authorization = `Bearer ${idToken}`;
          } catch (err) {
            // if token fetch fails, ensure no stale header
            delete config.headers.Authorization;
          }
        } else {
          delete config.headers.Authorization;
        }

        return config;
      },
    );
    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
