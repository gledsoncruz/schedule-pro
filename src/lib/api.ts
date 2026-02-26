import { cookies } from "next/headers"

export async function apiFetch(
  url: string,
  options?: RequestInit
) {

  const cookieStore = await cookies()

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ")

  return fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      Cookie: cookieHeader, // 👈 repassa cookie do usuário
    },
    cache: "no-store"
  })
}