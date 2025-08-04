import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/applications')

const applicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  role: String,
  message: String,
})

const Applicant = mongoose.model('Applicant', applicantSchema)

app.post('/api/applicants', async (req, res) => {
  const applicant = new Applicant(req.body)
  await applicant.save()
  res.json({ success: true })
})

app.get('/api/applicants', async (req, res) => {
  const all = await Applicant.find()
  res.json(all)
})

app.delete('/api/applicants/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Applicant.findByIdAndDelete(id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' })
  }
})


app.listen(3000, () => console.log('Server running on port 3000'))
