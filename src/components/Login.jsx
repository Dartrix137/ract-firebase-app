import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from './Alert'
const Login = () => {
  const initialState = {
    email: "",
    password: ""
  }
  const { login, loginWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [fields, setFields] = useState(initialState)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await login(fields.email, fields.password)
      navigate("/")
    } catch (error) {
      if (error.code === "auth/internal-error") {
        setError("Correo o contraseña inválido")
      } else {
        setError(error.message)
      }
    }
  }
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const handleGoogleSingin = () => {
    try {
      loginWithGoogle()
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  const handleResetPassword=()=>{
    if(!fields.email) return (setError("Please enter your email"))

    try {
      resetPassword()
      setError('We sent an email with link to reser your passsword')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className='w-full max-w-xs m-auto'>
      {error && <Alert message={error} />}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-fold mb-2" htmlFor="email">Email</label>
          <input className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="yuoremail@company.com" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-fold mb-2" htmlFor="password">Password</label>
          <input className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="password" onChange={handleChange} placeholder="******" />
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus-outline">Login</button>

          <a href="#!" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={handleResetPassword}>Forgot password?</a>
        </div>

      </form>

      <p className="my-4 text-sm flex justify-between px-3">Don't have an Account <Link to="/Register">Register</Link></p>
      <button className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full" onClick={handleGoogleSingin}>Login with Google</button>
    </div>
  )
}

export default Login