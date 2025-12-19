'use client'

import { useState } from 'react'
import Input from '../components/TextInput'

const SignInPage = () => {
  const [exampleValue, setExampleValue] = useState('')

  return (
    <div>
      <h1 className="mb-6 text-center text-4xl font-semibold">Sign In</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          type="text"
          placeholder="Example"
          value={exampleValue}
          onChange={setExampleValue}
        />
        <Input
          type="text"
          placeholder="Example"
          value={exampleValue}
          onChange={setExampleValue}
        />
        <Input
          type="text"
          placeholder="Example"
          value={exampleValue}
          onChange={setExampleValue}
          className="col-span-2"
        />
        <Input
          type="text"
          placeholder="Example"
          value={exampleValue}
          onChange={setExampleValue}
          className="col-span-2"
        />
      </div>
    </div>
  )
}

export default SignInPage
