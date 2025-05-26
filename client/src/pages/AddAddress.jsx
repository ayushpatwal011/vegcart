import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

// input feild component
const InputFeild = ({ type, placeholder, name, handleChange, address }) => {
  return (
    <input
      className="w-full px-2 py-3 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
    />
  );
};
const AddAddress = () => {
  const { axios, navigate, user } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((preAddress) => ({
      ...preAddress,
      [name]: value,
    }));
  };
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      
      const { data } = await axios.post("/api/address/add", {
        address,
      });
      
      if (data.success) {
       toast.success("Address saved successfully!");
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart")
    }
  } , [user])

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping
        <span className="font-semibold text-primary"> Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputFeild
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />

              <InputFeild
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <InputFeild
              handleChange={handleChange}
              address={address}
              name="email"
              type="text"
              placeholder="Email Address"
            />
            <InputFeild
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street"
            />
            <div className="flex gap-3">
              <InputFeild
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputFeild
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>

            <div className="flex gap-3">
              <InputFeild
                handleChange={handleChange}
                address={address}
                name="pincode"
                type="text"
                placeholder="Pincode"
              />
              <InputFeild
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>
            <InputFeild
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone"
            />

            <button
              onClick={() => {}}
              className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition uppercase"
            >
              Save Address
            </button>
          </form>
        </div>
        <img src={assets.add_address_iamge} alt="add_address" />
      </div>
    </div>
  );
};

export default AddAddress;
