'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Shield, User, Mail, Key } from 'lucide-react'

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address')
})

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ProfileForm = z.infer<typeof profileSchema>
type PasswordForm = z.infer<typeof passwordSchema>

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [isOAuthUser, setIsOAuthUser] = useState(false)

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    setValue: setProfileValue,
    setError: setProfileError
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema)
  })

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    setError: setPasswordError
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema)
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session?.user) {
      setProfileValue('name', session.user.name || '')
      setProfileValue('email', session.user.email || '')
      
      // Check if user is OAuth user by checking accounts
      const checkOAuthUser = async () => {
        try {
          const response = await fetch('/api/user/profile')
          if (response.ok) {
            const userData = await response.json()
            // If user has no password, they're likely an OAuth user
            setIsOAuthUser(!userData.hasPassword)
          }
        } catch (error) {
          console.error('Failed to check user type:', error)
        }
      }
      checkOAuthUser()
    }
  }, [status, session, router, setProfileValue])

  const onProfileSubmit = async (data: ProfileForm) => {
    setIsUpdatingProfile(true)
    
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await update({ name: data.name, email: data.email })
        alert('Profile updated successfully!')
      } else {
        const errorData = await response.json()
        setProfileError('root', { message: errorData.error || 'Update failed' })
      }
    } catch {
      setProfileError('root', { message: 'An error occurred. Please try again.' })
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const onPasswordSubmit = async (data: PasswordForm) => {
    setIsUpdatingPassword(true)
    
    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      })

      if (response.ok) {
        resetPassword()
        alert('Password updated successfully!')
      } else {
        const errorData = await response.json()
        setPasswordError('root', { message: errorData.error || 'Update failed' })
      }
    } catch {
      setPasswordError('root', { message: 'An error occurred. Please try again.' })
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  if (status === 'loading') {
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
              <Link
                href="/dashboard"
                className="mr-4 p-2 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <Shield className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">User Profile</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Information */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
              </div>
              
              <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    {...registerProfile('name')}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                  />
                  {profileErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      {...registerProfile('email')}
                      type="email"
                      className="mt-1 block w-full pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                    />
                  </div>
                  {profileErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                  )}
                </div>

                {profileErrors.root && (
                  <div className="text-red-600 text-sm">
                    {profileErrors.root.message}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-6">
                <Key className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
              </div>
              
              {isOAuthUser ? (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        OAuth Account
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          You signed in with Google. Password changes are managed through your Google account.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    {...registerPassword('currentPassword')}
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                  />
                  {passwordErrors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    {...registerPassword('newPassword')}
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                  />
                  {passwordErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    {...registerPassword('confirmPassword')}
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                  )}
                </div>

                {passwordErrors.root && (
                  <div className="text-red-600 text-sm">
                    {passwordErrors.root.message}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdatingPassword ? 'Updating...' : 'Change Password'}
                  </button>
                </div>
                </form>
              )}
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Account created:</span>
                  <span className="ml-2 text-gray-900">
                    {session?.user ? new Date().toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Last login:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
