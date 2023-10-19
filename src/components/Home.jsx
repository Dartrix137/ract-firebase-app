import { useContext } from 'react'
import { useAuth } from '../context/authContext'

const Home = () => {
  const { user, logout, loading } = useAuth()
  const handlelogout = () => {
    try {
      logout()
    } catch (error) {
      console.log(error)
    }
  }
  if (loading) return <h1>Loading...</h1>
  return (
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl mb-4">Welcome {user.displayName || user.email}</h1>
        <button className="bg-slate-200 hover:bg-salte-300 rounded py-2 px-4 text-black" onClick={handlelogout}>logout</button>
      </div>
    </div>
  )
}

export default Home