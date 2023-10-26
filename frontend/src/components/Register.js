import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const registerAccount = async (e) => {
    e.preventDefault();
    console.log("registering");
    await Axios.post("http://localhost:3838/api/register", formData).then(
      (response) => {
        console.log("register success");
        navigate("/login");
      }
    );
  };
  return (
    <div className="">
      <dialog id="my_modal_1" className="modal modal-open">
        <div className="modal-box">
          <form onSubmit={registerAccount} id="registrationForm">
            <h3 className="text-lg font-bold">Register</h3>
            <div className="mt-5 flex flex-col">
              <label htmlFor="username" className="mt-2 text-sm font-semibold">
                Username
              </label>
              <input
                type="text"
                required={true}
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="input border-solid border-black"
              />
              <label htmlFor="email" className="mt-2 text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                required={true}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                name="email"
                className="input border-solid border-black"
              />
              <label htmlFor="password" className="mt-2 text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                required={true}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                name="password"
                className="input border-solid border-black"
              />
            </div>

            <button type="submit" className="btn bg-blue-500 w-28 mt-4">
              Register
            </button>
            {/* <button className="btn bg-red-500 w-28">Cancel</button> */}
          </form>
        </div>
      </dialog>
    </div>
  );
}
