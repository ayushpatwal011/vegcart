import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext()
  const [email, setEmail] = useState("admin@example.com")
  const [password, setPassword] = useState("1234")

  useEffect(() => {
    if (isSeller) {
      navigate("/seller")
    }
  }, [isSeller])

  const onSubmitHandler = async (e) => {
    try {
      event.preventDefault()
      const { data } = await axios.post("/api/seller/login", {email, password})
      if (data.success) {
        setIsSeller(true)
        navigate("/seller")
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return !isSeller && (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
    >
      <div className="flex flex-col gap-5 w-full max-w-sm bg-white shadow-lg p-8 rounded-xl text-sm ">
        <p className="text-xl font-semibold text-center text-primary">
          Seller<span className="text-gray-600"> Login</span>
        </p>

        <div className="w-full">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>


        <div className="w-full">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
        >
          Login
        </button>
      </div>
    </form>
  )
}

export default SellerLogin
