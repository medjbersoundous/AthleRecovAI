import { Button, Input } from 'antd'

export default function Auth() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Auth Page
        </h1>
        <Input placeholder="Email" className="mb-4" />
        <Input.Password placeholder="Password" className="mb-6" />
        <Button type="primary" block>
          Login
        </Button>
      </div>
    </div>
  )
}
