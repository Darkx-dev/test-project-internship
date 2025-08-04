import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Admin() {
  const [applicants, setApplicants] = useState([])

  const fetchApplicants = async () => {
    const res = await axios.get('http://localhost:3000/api/applicants')
    setApplicants(res.data)
  }

  const deleteApplicant = async (id) => {
    if (!confirm('Are you sure you want to delete this applicant?')) return
    await axios.delete(`http://localhost:3000/api/applicants/${id}`)
    fetchApplicants()
  }

  useEffect(() => {
    fetchApplicants()
  }, [])

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Applicants</h2>
      {applicants.length === 0 && <p>No applicants yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {applicants.map((a) => (
          <li key={a._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <div><strong>{a.name}</strong> — {a.role}</div>
            <div>{a.email} | {a.phone}</div>
            <div><em>{a.message}</em></div>
            <button onClick={() => deleteApplicant(a._id)} style={{ marginTop: '0.5rem' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
