import { useEffect, useState } from "react";
import Modal from "./Modal";
import Axios from "axios";
import {
  useLoadScript,
  useJsApiLoader,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { BiCog } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
const Nav = () => {
  const [modalState, setModalState] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [newShopName, setNewShopName] = useState("");
  const [newShopLatitude, setNewShopLatitude] = useState("");
  const [newShopLongtitude, setNewShopLongtitude] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopLatitude, setShopLatitude] = useState("");
  const [shopLongtitude, setShopLongtitude] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [shopList, setShopList] = useState([]);
  const [lat, setLat] = useState(13.729893750131108);
  const [lng, setLng] = useState(100.5558004865322);
  const [bannerImg, setBannerImg] = useState("");
  let temp;
  // const baseUrl = process.env.BASEURL || "localhost:3838";
  const api_key2 = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: api_key2,
  });

  useEffect(() => {
    getShop();
    const token = localStorage.getItem("token");
    Axios.post("http://localhost:3838/api/auth", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.data.status == "ok") {
        // alert("authen success");
      } else {
        alert("authen failed");
        localStorage.removeItem("token");
        window.location = "/login";
      }
    });
    getShop();
  }, []);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };
  const getShop = async () => {
    Axios.get("http://localhost:3838/api/get").then((response) => {
      setShopList(response.data);
      // console.log(response.data);
    });
  };
  const handleUpdate = async (shopId) => {
    setModalEdit(false);
    await Axios.put(`http://localhost:3838/api/update/${shopId}`, {
      shopName: newShopName,
      shopLatitude: newShopLatitude,
      shopLongtitude: newShopLongtitude,
    }).then(() => {
      setNewShopName("");
      setNewShopLatitude("");
      setNewShopLongtitude("");
      getShop();
    });
    console.log(shopId);
  };

  const handleDel = async (shopId) => {
    await Axios.delete(`http://localhost:3838/api/delete/${shopId}`);

    window.location.reload();
  };

  const handleSave = async () => {
    setModalState(false);
    await Axios.post("http://localhost:3838/api/insert", {
      shopName: shopName,
      shopLatitude: shopLatitude,
      shopLongtitude: shopLongtitude,
      imageUrl: imageUrl,
    }).then(() => {
      setModalState(false);
      setShopName("");
      setShopLatitude("");
      setShopLongtitude("");
      setImageUrl("");
      getShop();
      //   alert("Successful Insert");
    });
  };
  const handleMarker = (lat, lng, img) => {
    setLat(Number(lat));
    setLng(Number(lng));
    setBannerImg(img);
    console.log("this is image", img);
    console.log(bannerImg);
    console.log("success");
  };
  if (!isLoaded) return <div>Loading</div>;

  return (
    <div className="flex">
      <nav className="flex flex-col items-center bg-slate-200 h-screen w-96 shadow-md rounded-md m-2 gap-3">
        <h1 className="text-3xl mx-auto my-5 text-bold font-bold">SHOP LIST</h1>
        <button
          onClick={() => setModalState(true)}
          className="btn w-52 bg-blue-500"
        >
          + Add new shop
        </button>
        {shopList.map((value) => (
          <div key={value.shop_id} className="flex w-100">
            <button
              //   key={value.shop_id}
              onClick={() => {
                handleMarker(
                  value.latitude,
                  value.longtitude,
                  value.banner_img
                );
              }}
              className="btn w-56 mr-1"
            >
              {value.shop_name}
            </button>
            <button onClick={() => setModalEdit(true)} className="btn mr-1">
              <BiCog size={30} />
            </button>
            <button
              onClick={() => {
                handleDel(value.shop_id);
              }}
              className="btn"
            >
              {/* {value.latitude} */}
              <BsFillTrashFill size={30} />
            </button>
            <Modal modalState={modalEdit}>
              <h1>{value.shop_id}</h1>
              <form className="flex flex-col gap-3">
                <h3 className="text-lg font-bold">New Data</h3>
                <input
                  type="text"
                  value={newShopName}
                  onChange={(e) => setNewShopName(e.target.value)}
                  placeholder="new name"
                  className="input w-full border-black"
                />
                <input
                  type="number"
                  value={newShopLatitude}
                  onChange={(e) => setNewShopLatitude(e.target.value)}
                  placeholder="new latitude"
                  className="input w-full border-black"
                />
                <input
                  type="number"
                  value={newShopLongtitude}
                  onChange={(e) => setNewShopLongtitude(e.target.value)}
                  placeholder="new longtitude"
                  className="input w-full border-black"
                />
              </form>
              <div className="flex mt-3 justify-between ">
                <button
                  onClick={() => handleUpdate(value.shop_id)}
                  className="btn bg-blue-500 w-28"
                >
                  Save
                </button>
                <button
                  onClick={() => setModalEdit(false)}
                  className="btn bg-red-500 w-28"
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
        ))}
        <button onClick={handleLogout} className="btn w-52 bg-red-500">
          Logout
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
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="image url"
            className="input w-full border-black"
          />
        </form>
        <div className="flex mt-3 justify-between ">
          <button onClick={handleSave} className="btn bg-blue-500 w-28">
            Save
          </button>
          <button
            onClick={() => setModalState(false)}
            className="btn bg-red-500 w-28"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <div className="border-2 border-black mx-auto my-auto">
        {bannerImg && (
          <img
            src={bannerImg}
            className="absolute z-10  ml-44 mt-16 border-2 border-solid border-black w-1/5 h-1/6"
          />
        )}
        <GoogleMap
          zoom={18}
          center={{ lat: lat, lng: lng }}
          mapContainerStyle={{
            position: "relative",
            width: " 130vh",
            height: "90vh",
          }}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      </div>
    </div>
  );
};

export default Nav;
