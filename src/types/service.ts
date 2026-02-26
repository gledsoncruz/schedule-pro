export interface Service {
  id: number
  name: string
  description: string
  duration_minutes: number
  price: string
  company_id: number
  is_active: boolean
  created_at: string
  updated_at: string | null
}