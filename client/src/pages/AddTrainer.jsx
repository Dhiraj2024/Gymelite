import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { trainerAPI } from '../utils/api'
import { AuthContext } from '../context/AuthContext'

const AddTrainer = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    speciality: '',
    program: '',
    bio: '',
  })

  if (!user || !user.isAdmin) {
    return (
      <div className='min-h-screen bg-dark flex items-center justify-center py-20'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-red-500 mb-4'>Access Denied</h1>
          <p className='text-gray-400 mb-6'>Only admins can add trainers</p>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!formData.name.trim() || !formData.image.trim() || !formData.speciality.trim()) {
        setError('Name, Image URL, and Speciality are required')
        setLoading(false)
        return
      }

      await trainerAPI.create(formData)
      navigate('/trainers')
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add trainer'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-dark py-20'>
      <div className='max-w-2xl mx-auto px-4'>
        <h1 className='text-5xl font-bold text-center mb-2'>
          <span className='gradient-text'>Add New Trainer</span>
        </h1>
        <p className='text-center text-gray-400 mb-12'>Create a new trainer profile</p>

        <div className='card-dark p-8'>
          {error && (
            <div className='bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-sm font-semibold text-primary mb-2'>Name *</label>
              <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Trainer name' className='w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary' required />
            </div>

            <div>
              <label className='block text-sm font-semibold text-primary mb-2'>Image URL *</label>
              <input type='url' name='image' value={formData.image} onChange={handleChange} placeholder='https://example.com/trainer.jpg' className='w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary' required />
              {formData.image && (
                <div className='mt-3 flex items-center gap-3'>
                  <img src={formData.image} alt='Preview' className='h-16 w-16 rounded object-cover' onError={(e) => e.target.style.display = 'none'} />
                  <span className='text-xs text-gray-400'>Preview</span>
                </div>
              )}
            </div>

            <div>
              <label className='block text-sm font-semibold text-primary mb-2'>Speciality *</label>
              <input type='text' name='speciality' value={formData.speciality} onChange={handleChange} placeholder='e.g., Weight Loss, Strength, Yoga' className='w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary' required />
            </div>

            <div>
              <label className='block text-sm font-semibold text-primary mb-2'>Program</label>
              <input type='text' name='program' value={formData.program} onChange={handleChange} placeholder='e.g., Full Body, HIIT' className='w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary' />
            </div>

            <div>
              <label className='block text-sm font-semibold text-primary mb-2'>Bio</label>
              <textarea name='bio' value={formData.bio} onChange={handleChange} placeholder='About the trainer...' rows='5' className='w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none' />
            </div>

            <div className='flex gap-4 pt-6'>
              <button type='submit' disabled={loading} className='flex-1 btn-neon disabled:opacity-50'>
                {loading ? 'Adding...' : 'Add Trainer'}
              </button>
              <button type='button' onClick={() => navigate('/trainers')} className='flex-1 btn-outline-neon'>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTrainer
