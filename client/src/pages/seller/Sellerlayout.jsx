import React from 'react'
import { useAppContext } from "../../context/AppContext"
import { assets } from '../../assets/assets'
import { Link, NavLink, Outlet } from 'react-router-dom'
import toast from 'react-hot-toast'

const SellerLayout = () => {
  const {  axios,navigate } = useAppContext()

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ]

  const logout = async () => {
    try {
      const {data} = await axios.get("/api/seller/logout")
      if (data.success) {
        toast.success(data.message)
        navigate("/")
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.success(error.message)
    }
  }

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white shadow-sm">
        <NavLink to="/">
                <div className="flex justify-center font-bold text-3xl">
                <img className="h-9" src={assets.logo} alt="Logo" />
                <strong className="pt-1">VegCart</strong>
                </div>
              </NavLink>
        <div className="flex items-center gap-5 text-gray-600">
          <p className="hidden md:font-medium">Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Layout Body */}
      <div className="flex">
        {/* Sidebar */}
        <div className="md:w-64 min-w-16 border-r h-[95vh] border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-all duration-200 
                ${isActive
                  ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary font-medium"
                  : "hover:bg-gray-100/90 text-gray-600"}`
              }
            >
              <img src={item.icon} alt="icon" className="w-6 h-6" />
              <p className="md:block hidden">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-[calc(100vh-60px)]">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default SellerLayout
