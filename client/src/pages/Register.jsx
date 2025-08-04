import { useState } from 'react'
import axios from 'axios'

export default function Register() {
  const initialForm = {
    name: '',
    email: '',
    phone: '',
    role: 'Intern',
    message: '',
  }

  const [form, setForm] = useState(initialForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const submit = async () => {
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill all required fields')
      return
    }
    try {
      await axios.post('http://localhost:3000/api/applicants', form)
      alert('Submitted!')
      setForm(initialForm)
    } catch (err) {
      console.error(err)
      alert('Submission failed')
    }
  }

  const fillDemo = () => {
    setForm({
      name: 'Roshan Dev',
      email: 'roshan@example.com',
      phone: '9876543210',
      role: 'Intern',
      message: 'Excited to contribute!',
    })
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Intern / Volunteer Registration</h2>
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="Intern">Intern</option>
        <option value="Volunteer">Volunteer</option>
      </select>
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={submit}>Submit</button>
        <button onClick={fillDemo} type="button">Fill Demo</button>
      </div>
    </div>
  )
}
