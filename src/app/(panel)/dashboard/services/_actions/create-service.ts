"use server"

import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome do serviço é obrigatório" }),
  price: z.string().min(1, { message: "O preço do serviço é obrigatório" }),
  duration_minutes: z.number().min(1, { message: "Duração inválida" }),
})

type FormSchema = z.infer<typeof formSchema>

export async function createNewService(formData: FormSchema) {

  const session = await auth()

  if (!session?.accessToken) {
    return {
      error: "Não autenticado",
    }
  }

  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message
    }
  }

  try {

    const res = await fetch(`${process.env.API_URL}/services/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`
      },
      body: JSON.stringify({
        name: formData.name,
        price: formData.price,
        duration_minutes: formData.duration_minutes
      })
    })

    if (!res.ok) {
      throw new Error("Erro ao criar serviço")
    }

    revalidatePath("/dashboard/services")

    return {
      data: "Serviço criado com sucesso"
    }

  } catch (err) {
    console.error(err)
    return {
      error: "Falha ao cadastrar serviço",
    }
  }
}