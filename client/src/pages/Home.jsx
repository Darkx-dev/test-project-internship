import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Internship Portal</h1>
      <Link to="/register">Register</Link> | <Link to="/admin">Admin View</Link>
    </div>
  )
}
