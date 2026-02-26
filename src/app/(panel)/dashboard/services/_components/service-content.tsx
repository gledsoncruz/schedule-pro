import { auth } from "@/lib/auth"
import { getAllServices } from "../_data-access/get-all-services"
import { ServiceList } from "./service-list"
import { redirect } from "next/navigation"

export async function ServicesContent() {

  const session = await auth()

  if (!session?.accessToken) {
    redirect("/")
  }

  const services = await getAllServices()

  return (
    <ServiceList services={services} />
  )
}