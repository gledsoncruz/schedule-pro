import getSession from "@/lib/getSession"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await getSession()

  const res = await fetch(`${process.env.API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  })

  const user = await res.json()

  return (
    <>
      <div>Dashboard</div>
      <h1>Bem-vindo {user.email}</h1>
      <p>Empresa: {session?.companyId}</p>
    </>
  )
}