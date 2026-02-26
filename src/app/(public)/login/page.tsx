"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e: any) {
    e.preventDefault()

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (!result?.error) {
      router.push("/dashboard")
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  )
}