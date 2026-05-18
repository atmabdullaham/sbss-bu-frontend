import { Link, useLocation, useNavigate } from "react-router";

import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();

  //   const handleLogin = (data) => {
  //     console.log(data);
  //     signInUser(data.email, data.password).then((result) => {
  //       console.log(result);
  //       navigate(location.state || "/");
  //     });
  //   };
  return (
    <div className="card bg-base-100 w-full  h-full">
      <form className="card-body">
        {/* <fieldset className="fieldset">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                maxLength: 12,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-green-500 text-white mt-4">Login</button>
        </fieldset> */}
      </form>
      <div className="flex flex-col items-center space-y-4 pb-4">
        <SocialLogin />
        <p className="text-center">
          New to website?{" "}
          <Link
            className="text-green-600"
            state={location.state}
            to={"/register"}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
