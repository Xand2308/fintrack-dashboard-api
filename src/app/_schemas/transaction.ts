import { TransactionType, TransactionCategory, TransactionPaymentMethod } from "@prisma/client"
import { z } from "zod"


export const createTransactionFormSchema = z.object({
    name: z.string().trim().nonempty("O nome é obrigatório."),
    amount: z.coerce.number().positive({ error: "O valor deve ser positivo." }),
    type: z.enum(TransactionType, { error: "O tipo é obrigatório." }),
    category: z.enum(TransactionCategory, { error: "A categoria e obrigatória." }),
    paymentMethod: z.enum(TransactionPaymentMethod, { error: "O método de pagamento é obrigatório." }),
    date: z.coerce.date()
  })
  
export type createTransactionFormData = z.infer<typeof createTransactionFormSchema>