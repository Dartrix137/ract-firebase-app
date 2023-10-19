import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from './Alert'
const Register = () => {
  const initialState = {
    email: "",
    password: ""
  }
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [fields, setFields] = useState(initialState)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await signup(fields.email, fields.password)
      navigate("/")
    } catch (error) {
      if (error.code === "auth/internal-error") {
        setError("Correo o contraseña inválido")
      }else{
        setError(error.message)
      }
      
    }
  }
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }
  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="email">Email</label>
          <input className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="yuoremail@company.com" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="password">Password</label>
          <input className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="password" onChange={handleChange} placeholder="******" />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
      </form>
      <p className="my-4 text-sm flex justify-between px-3">Already have an account <Link to="/Login">Login</Link></p>
    </div>
  )
}

export default Register