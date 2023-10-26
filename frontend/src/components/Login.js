import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("loggin in");
    await Axios.post("http://localhost:3838/api/login", formData).then(
      (response) => {
        // console.log(response);
        if (response.data.status == "ok") {
          alert("Login Success");
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          alert("Failed to login");
        }
        // console.log(response.data);
      }
    );
  };

  return (
    <div className="">
      <dialog id="my_modal_1" className="modal modal-open">
        <div className="modal-box">
          <form onSubmit={handleLogin} id="taskForm">
            <h3 className="text-lg font-bold">Login</h3>
            <div className="mt-5 flex flex-col ">
              <h1>Username</h1>
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
              <h1>Password</h1>
              <input
                type="password"
                required={true}
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="input border-solid border-black"
              />
            </div>
            <button className="btn bg-green-500 w-28 mt-4">Login</button>
            <button
              type="submit"
              onClick={() => navigate("/register")}
              className="btn bg-red-500 w-28"
            >
              register
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
