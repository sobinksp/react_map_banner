import { useState } from "react";
import Modal from "./Modal";

const Nav = () => {
  const [modalState, setModalState] = useState(false);
  const [shopName, setShopName] = useState("");
  const [shopLatitude, setShopLatitude] = useState("");
  const [shopLongtitude, setShopLongtitude] = useState("");
  const [shopUrl, setShopUrl] = useState("");
  const handleChange = (e) => {};
  return (
    <div>
      <nav className="flex flex-col items-center bg-slate-200 h-screen w-1/6 shadow-md rounded-md m-2">
        <h1 className="text-3xl mx-auto my-5 text-bold font-bold">SHOP LIST</h1>
        <button onClick={() => setModalState(true)} className="btn w-3/4">
          + Add new shop
        </button>
      </nav>
      <Modal modalState={modalState}>
        <form className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">Add New Shop</h3>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="name"
            className="input w-full border-black"
          />
          <input
            type="number"
            value={shopLatitude}
            onChange={(e) => setShopLatitude(e.target.value)}
            placeholder="latitude"
            className="input w-full border-black"
          />
          <input
            type="number"
            value={shopLongtitude}
            onChange={(e) => setShopLongtitude(e.target.value)}
            placeholder="longtitude"
            className="input w-full border-black"
          />
          <input
            type="text"
            value={shopUrl}
            onChange={(e) => setShopUrl(e.target.value)}
            placeholder="image url"
            className="input w-full border-black"
          />
        </form>
        <div className="flex mt-3 justify-between ">
          <button className="btn bg-blue-500 w-28">Save</button>
          <button
            onClick={() => setModalState(false)}
            className="btn bg-red-500 w-28"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Nav;
