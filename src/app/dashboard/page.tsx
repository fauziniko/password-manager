'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Plus, 
  Search, 
  Settings, 
  LogOut, 
  Router as RouterIcon, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Shield
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface Modem {
  id: string
  name: string
  type: string
  ipAddress: string
  username: string
  password: string
  description?: string
  createdAt: string
  updatedAt: string
}

const modemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  ipAddress: z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$/, 'Invalid IP address'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  description: z.string().optional()
})

type ModemForm = z.infer<typeof modemSchema>

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [modems, setModems] = useState<Modem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingModem, setEditingModem] = useState<Modem | null>(null)
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set())

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ModemForm>({
    resolver: zodResolver(modemSchema)
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchModems()
    }
  }, [status, router])

  const fetchModems = async () => {
    try {
      const response = await fetch('/api/modems')
      if (response.ok) {
        const data = await response.json()
        setModems(data)
      }
    } catch (error) {
      console.error('Failed to fetch modems:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ModemForm) => {
    try {
      const url = editingModem ? `/api/modems/${editingModem.id}` : '/api/modems'
      const method = editingModem ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await fetchModems()
        setShowModal(false)
        reset()
        setEditingModem(null)
      }
    } catch (error) {
      console.error('Failed to save modem:', error)
    }
  }

  const handleEdit = (modem: Modem) => {
    setEditingModem(modem)
    setValue('name', modem.name)
    setValue('type', modem.type)
    setValue('ipAddress', modem.ipAddress)
    setValue('username', modem.username)
    setValue('password', modem.password)
    setValue('description', modem.description || '')
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this modem?')) {
      try {
        const response = await fetch(`/api/modems/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          await fetchModems()
        }
      } catch (error) {
        console.error('Failed to delete modem:', error)
      }
    }
  }

  const togglePasswordVisibility = (modemId: string) => {
    const newVisible = new Set(visiblePasswords)
    if (newVisible.has(modemId)) {
      newVisible.delete(modemId)
    } else {
      newVisible.add(modemId)
    }
    setVisiblePasswords(newVisible)
  }

  const filteredModems = modems.filter(modem =>
    modem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    modem.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    modem.ipAddress.includes(searchQuery)
  )

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">ModemManager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {session?.user?.name || session?.user?.email}
              </span>
              <button
                onClick={() => router.push('/profile')}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={() => signOut()}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Modems</h2>
            <span className="text-sm text-gray-500">({filteredModems.length} total)</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search modems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
              />
            </div>
            <button
              onClick={() => {
                setEditingModem(null)
                reset()
                setShowModal(true)
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Modem</span>
            </button>
          </div>
        </div>

        {/* Modems Grid */}
        {filteredModems.length === 0 ? (
          <div className="text-center py-12">
            <RouterIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No modems</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first modem.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Add Modem
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredModems.map((modem) => (
              <div key={modem.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{modem.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(modem)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(modem.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Type:</span>
                      <span className="ml-2 text-gray-900">{modem.type}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">IP:</span>
                      <span className="ml-2 text-gray-900">{modem.ipAddress}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Username:</span>
                      <span className="ml-2 text-gray-900">{modem.username}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-500">Password:</span>
                      <span className="ml-2 text-gray-900">
                        {visiblePasswords.has(modem.id) ? modem.password : '••••••••'}
                      </span>
                      <button
                        onClick={() => togglePasswordVisibility(modem.id)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        {visiblePasswords.has(modem.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {modem.description && (
                      <div>
                        <span className="font-medium text-gray-500">Description:</span>
                        <span className="ml-2 text-gray-900">{modem.description}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingModem ? 'Edit Modem' : 'Add New Modem'}
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    {...register('name')}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <input
                    {...register('type')}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                  />
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">IP Address</label>
                  <input
                    {...register('ipAddress')}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                  />
                  {errors.ipAddress && (
                    <p className="mt-1 text-sm text-red-600">{errors.ipAddress.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    {...register('username')}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    {...register('password')}
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      reset()
                      setEditingModem(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                  >
                    {editingModem ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
