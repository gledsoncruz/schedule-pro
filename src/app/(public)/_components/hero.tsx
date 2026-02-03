import { Button } from "@/components/ui/button";
import Image from "next/image";
import secretaryImg from "../../../../public/secretary_transparent.png"

export function Hero() {
  return (
    <section className="bg-sky-50 py-5">
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <main className="flex items-center justify-center">
          <article className="flex-2 space-y-8 max-w-3xl flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-bold max-w-2xl">Encontre os melhores profissionais em um único local</h1>
            <p className="text-base md:text-lg text-gray-600">
              Nós somos uma plataforma para profissionais com foco em
              agilizar seu atendimento de forma simplificada e organizada
            </p>
            <Button className="bg-sky-800 hover:bg-sky-700 cursor-pointer w-fit px-6 font-semibold">
              Encontre uma empresa para agendar um serviço
            </Button>
          </article>
          <div className="hidden lg:block">
            <Image
              src={secretaryImg}
              alt="Secretária atendimento"
              width={340}
              height={400}
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </main>
      </div>
    </section>
  )
}