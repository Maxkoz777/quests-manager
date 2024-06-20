import { Link, useNavigate } from "react-router-dom";
import { VITE_AUTH_REGISTER_URL } from "../../utils/ApiUtils";
import axios, { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface RegisterModel {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterModel>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterModel> = async ({
    firstName,
    lastName,
    username,
    email,
    password,
  }) => {
    const payload: RegisterModel = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    try {
      const response = await toast.promise(
        axios.post<RegisterModel>(
          VITE_AUTH_REGISTER_URL,
          JSON.stringify(payload),
          {
            headers: { "Content-Type": "application/json" },
          }
        ),
        {
          pending: "Registering...",
          success: "User successfully registered!",
          error: "Error registering new user",
        }
      );

      if (response.status === 204) {
        reset();

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      if (isAxiosError(err)) {
        console.log("Error registering new user");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col text-xl *:my-2 *:md:my-3">
        <div className="flex flex-col w-full">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            required
            id="username"
            className="text-sm p-1"
            placeholder="Enter username"
            {...register("username", { required: true })}
          />
        </div>
        {errors.username && <span>This field is required</span>}
        <div className="flex flex-col w-full">
          <label htmlFor="firstName" className="text-sm">
            First Name
          </label>
          <input
            required
            id="firstName"
            className="text-sm p-1"
            placeholder="Enter first name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <span>This field is required</span>}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="lastName" className="text-sm">
            Last Name
          </label>
          <input
            required
            id="lastName"
            className="text-sm p-1"
            placeholder="Enter last name"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && <span>This field is required</span>}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="text-sm">
            Email Address
          </label>
          <input
            required
            id="email"
            type="email"
            className="text-sm p-1"
            placeholder="Enter email address"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            required
            id="password"
            type="password"
            className="text-sm p-1"
            placeholder="Enter password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>

        <button
          type="submit"
          className="bg-red-500 text-white text-xl border-none py-1 active:bg-red-600 hover:bg-red-600 w-full rounded-lg shadow-lg hover:shadow-xl"
        >
          Register
        </button>
        <div className="text-sm flex flex-col items-end">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </form>
  );
};
