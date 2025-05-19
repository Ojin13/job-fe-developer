export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: Date
}

export interface CustomerGroup {
  id: string
  name: string
  description: string
  createdAt: Date
  customers: Customer[]
}
