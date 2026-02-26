"use client"
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, Plus, X } from 'lucide-react'
import { DialogService } from './dialog-service'
import { formatCurrency } from '@/utils/formatCurrency'
import { Service } from '@/types/service'
import { deleteService } from '../_actions/delete-service'
import { toast } from 'sonner'

interface ServicesListProps {
  services: Service[]
}


export function ServiceList({ services }: ServicesListProps) {

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<null | Service>(null)

  async function handleDeleteService(serviceId: number) {

    const response = await deleteService({ serviceId: serviceId })

    if (response.error) {
      toast.error("Erro ao deletar serviço")
      return
    }

    toast.success(response.data)

  }

  async function handleEditService(service: Service) {
    setEditingService(service)
    setIsDialogOpen(true)
  }


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className='mx-auto'>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-xl md:text-2xl font-bold'>Serviços</CardTitle>
            <DialogTrigger asChild>
              <Button>
                <Plus className='w-4 h-4' />
              </Button>
            </DialogTrigger>

            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault()
                setIsDialogOpen(false)
                setEditingService(null)
              }}
            >
              <DialogService
                closeModal={() => {
                  console.log("close modal")
                  setIsDialogOpen(false);
                  setEditingService(null);
                }}
                serviceId={editingService ? editingService.id : undefined}
                initialValues={editingService ? {
                  name: editingService.name,
                  price: (Number(editingService.price) / 100).toFixed(2).replace(".", ","),
                  hours: Math.floor(editingService.duration_minutes / 60).toString(),
                  minutes: (editingService.duration_minutes % 60).toString()
                } : undefined}
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="space-y-4 mt-5">
              {services.map(service => (
                <article
                  key={service.id}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center space-x-2'>
                    <span className='font-medium'>{service.name}</span>

                    <span className='text-gray-500'>-</span>

                    <span className='text-gray-500'>
                      {formatCurrency(Number(service.price))}
                    </span>
                  </div>

                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditService(service)}
                    >
                      <Pencil className='w-4 h-4' />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => { }}
                    >
                      <X className='w-4 h-4' />
                    </Button>
                  </div>

                </article>
              ))}
            </section>
          </CardContent>

        </Card>

      </section>
    </Dialog>
  )
}