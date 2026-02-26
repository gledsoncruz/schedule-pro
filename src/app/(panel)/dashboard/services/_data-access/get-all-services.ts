"use server"

import { apiFetch } from "@/lib/api"
import { Service } from "@/types/service"

export async function getAllServices() {

  const res = await apiFetch(
    "/services?skip=0&limit=100&is_active=true",
  )

  console.log(res)

  if (!res.ok) {
    throw new Error("Erro ao buscar serviços")
  }

  return res.json() as Promise<Service[]>
}