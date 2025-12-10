import { Button } from '@/components/ui/button'

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />

        <Button className="w-full">Sign In</Button>
      </div>
    </div>
  )
}
