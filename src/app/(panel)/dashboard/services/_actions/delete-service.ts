"use server"

import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const formSchema = z.object({
  serviceId: z.number()
})

type FormSchema = z.infer<typeof formSchema>

export async function deleteService(formData: FormSchema) {

  const session = await auth()

  if (!session?.accessToken) {
    return {
      error: "Não autenticado",
    }
  }

  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: "ID inválido"
    }
  }

  try {

    const res = await fetch(
      `${process.env.API_URL}/services/${formData.serviceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      }
    )

    if (!res.ok) {
      throw new Error("Erro ao deletar serviço")
    }

    revalidatePath("/dashboard/services")

    return {
      data: "Serviço deletado com sucesso"
    }

  } catch (err) {
    console.error(err)
    return {
      error: "Falha ao deletar serviço",
    }
  }
}