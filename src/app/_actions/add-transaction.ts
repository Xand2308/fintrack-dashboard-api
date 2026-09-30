"use server"

import { revalidatePath } from "next/cache"
import { type createTransactionFormData, createTransactionFormSchema } from "../_schemas/transaction"
import { prisma } from "@/src/lib/prisma"
import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


export const addTransaction = async (params:  createTransactionFormData) => {
    const data = createTransactionFormSchema.parse(params)
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) {
        redirect("/sign-in")
    }

    await prisma.transaction.create({
        data: {
            ...data,
            userId: session.user.id,
        },
    })

    revalidatePath("/")
}