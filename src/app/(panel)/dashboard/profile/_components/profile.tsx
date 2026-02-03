"use client"
import { ProfileFormData, useProfileForm } from "./profile-form"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import imgTest from "../../../../../../public/barbearia.png"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Prisma } from "@/generated/prisma/client"
import { updateProfile } from "../_actions/update-profile"

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true
  }
}>

interface ProfileContentProps {
  user: UserWithSubscription
}

export function ProfileContent({ user }: ProfileContentProps) {
  const form = useProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone,
    status: user.status,
    timeZone: user.timeZone
  });
  const [selectedHours, setSelectedHours] = useState<string[]>(user.times ?? [])
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [labelBtnSelectHours, setLabelBtnSelectHours] = useState<string>("Marcar Todos")
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const [hours, setHours] = useState<string[]>([]);


  function generateTimeSlot(): string[] {
    const hours: string[] = []
    for (let i = 8; i <= 24; i++) {
      for (let m = 0; m < 2; m++) {
        const hour = i.toString().padStart(2, "0")
        const minute = (m * 30).toString().padStart(2, "0")

        hours.push(`${hour}:${minute}`)
      }
    }

    return hours
  }

  useEffect(() => {
    setHours(generateTimeSlot());
  }, []);

  function toggleHour(hour: string) {
    setSelectedHours((prev) => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort())
    setLabelBtnSelectHours("Desmarcar Todos")
  }

  function toggleSelectAll() {
    if (selectedHours.length === 0) {
      setSelectedHours(hours)
      setLabelBtnSelectHours("Desmarcar Todos")
    } else {
      setSelectedHours([])
      setLabelBtnSelectHours("Marcar Todos")
    }

  }

  useEffect(() => {
    const zones = Intl.supportedValuesOf("timeZone").filter((zone) =>
      zone.startsWith("America/Sao_Paulo") ||
      zone.startsWith("America/Cuiaba") ||
      zone.startsWith("America/Fortaleza") ||
      zone.startsWith("America/Recife") ||
      zone.startsWith("America/Bahia") ||
      zone.startsWith("America/Belem") ||
      zone.startsWith("America/Boa_Vista") ||
      zone.startsWith("America/Manaus")
    );
    setTimeZones(zones);
  }, []);

  async function onSubmit(values: ProfileFormData) {

    const response = await updateProfile({
      name: values.name,
      address: values.address,
      phone: values.phone,
      status: values.status === "active" ? true : false,
      timeZone: values.timeZone,
      times: selectedHours || []
    })

    console.log("resposta", response)

  }



  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden">
                  <Image
                    src={user.image ? user.image : imgTest}
                    alt="Foto"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite seu nome" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite seu endereço" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite seu Celular" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value ? "active" : "inactive"}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o status da empresa" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="active">ATIVO (Estamos aberto)</SelectItem>
                              <SelectItem value="inactive">INATIVO (Estamos fechado)</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Configurar Horários</Label>
                  <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer">
                        Clique aqui para selecionar horários
                        <ArrowRight />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Horários da empresa</DialogTitle>
                        <DialogDescription>Selecione abaixo os horários</DialogDescription>
                      </DialogHeader>
                      <section className="py-4">
                        <p className="text-sm text-muted-foreground mb-2">Clique nos horários abaixo para marcar ou desmarcar</p>
                        <Button onClick={() => toggleSelectAll()} className="mb-2">{labelBtnSelectHours}</Button>
                        <div className="grid grid-cols-5 gap-2">
                          {hours.map((hour) => (
                            <Button
                              onClick={() => toggleHour(hour)}
                              key={hour}
                              variant="outline"
                              className={cn("border-2 cursor-pointer", selectedHours.includes(hour) && "border-2 border-emerald-500 text-primary")}>
                              {hour}
                            </Button>
                          ))}
                        </div>
                      </section>
                      <Button
                        className="w-full cursor-pointer"
                        onClick={() => setDialogIsOpen(false)}
                      >
                        Fechar
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>

                <FormField
                  control={form.control}
                  name="timeZone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selecione o Fuso Horário</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o Fuso Horário" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {timeZones.map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}

                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="cursor-pointer">
                  Salvar Alterações
                </Button>

              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}