Perfeito 👌
Vou te entregar **uma seção de README pronta pra copiar/colar**, pensada exatamente para **novos devs**, usando **DevContainer + Next.js + Prisma**, e já reforçando o `.env`.

Depois deixo **2 sugestões profissionais** pra melhorar ainda mais esse passo.

---

## 📦 Setup do Projeto (Novos Desenvolvedores)

Esta aplicação utiliza **DevContainer** para padronizar o ambiente de desenvolvimento.
Com isso, **não é necessário instalar Node.js, npm ou dependências localmente** — apenas Docker e VS Code.

---

### ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* Docker Desktop (com suporte a WSL)
* WSL 2 (Ubuntu recomendado)
* Visual Studio Code
* Extensão **Dev Containers** no VS Code

---

### 🚀 Passo a passo para subir o projeto

#### 1️⃣ Clonar o repositório

No terminal do WSL:

```bash
git clone https://github.com/gledsoncruz/schedule-pro.git
cd schedule-pro
```

---

#### 2️⃣ Configurar variáveis de ambiente

Este projeto **não versiona o arquivo `.env`** por segurança.

👉 Existe um arquivo de exemplo chamado `.env.example` com **todas as chaves necessárias**.

Crie o arquivo `.env` a partir dele:

```bash
cp .env.example .env
```

Agora **edite o `.env`** e preencha os valores corretos (ex: banco de dados, URLs, segredos, etc.).

> ⚠️ **Importante:**
> O projeto **não sobe corretamente sem o `.env` configurado**.

---

#### 3️⃣ Abrir o projeto no VS Code (do jeito correto)

Ainda no terminal do WSL, execute:

```bash
code .
```

> ⚠️ **Não abra o VS Code pelo ícone do Windows**.
> Abrir pelo terminal garante que o ambiente WSL seja usado corretamente.

---

#### 4️⃣ Subir o DevContainer

No VS Code:

```
Ctrl + Shift + P
→ Dev Containers: Reopen in Container
```

Na primeira vez, o VS Code irá:

* Construir a imagem Docker
* Subir o container de desenvolvimento
* Instalar as dependências (`npm install`)
* Gerar o Prisma Client (`npx prisma generate`)

⏳ Isso pode levar alguns minutos apenas na primeira execução.

---

#### 5️⃣ Rodar o projeto

Dentro do DevContainer, no terminal integrado:

```bash
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

---

## 🔄 Rebuild do ambiente (se algo der errado)

Se ocorrer qualquer problema com dependências ou build:

```
Ctrl + Shift + P
→ Dev Containers: Rebuild Without Cache
```

Isso recria o ambiente do zero.

---

## 🧠 Observações importantes

* ❌ **Nunca versionar o arquivo `.env`**
* ✅ Sempre manter o `.env.example` atualizado
* ✅ Qualquer nova variável de ambiente deve ser adicionada ao `.env.example`
* ❌ Não rodar `npm install` fora do DevContainer

---