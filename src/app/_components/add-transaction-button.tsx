"use client";
import { useRouter } from "next/navigation";
import PlusIcon from "@/src/assets/plus-icon.png";
import Image from "next/image";
import { useState } from "react";

import { Input } from "./ui/input";

import ConfirmIcon from "@/src/assets/confirm-icon.png";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/app/_components/ui/dialog";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useForm, Controller, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "../_constants/transaction";

import {
  createTransactionFormSchema,
  type createTransactionFormData,
} from "../_schemas/transaction";
import { addTransaction } from "../_actions/add-transaction";

export const AddTransactionButton = () => {
  const [open, setIsOpen] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<createTransactionFormData>({
    resolver: zodResolver(createTransactionFormSchema) as unknown as Resolver<createTransactionFormData>,
    defaultValues: {
      name: "" as any,
      amount: "" as any,
      type: "" as any,
      category: "" as any,
      paymentMethod: "" as any,
      date: "" as any,
    },

    mode: "onBlur",
  });

  const onSubmit = async (data: createTransactionFormData) => {
    setSubmitError(null);

    try {
      console.log(data);
      await addTransaction(data);
      reset();
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Falha ao adicionar transação:", error);
      setSubmitError("Não foi possível salvar a transação. Tente novamente.");
    }
  };

  return (
    <section>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setIsOpen(nextOpen);
          if (!nextOpen) reset();
          if (nextOpen) setSubmitError(null);
        }}
      >
        <DialogTrigger asChild>
          <button
            type="button"
            className="rounded-sm bg-purple-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Image src={PlusIcon} alt="Plus Icon" />
            <p>Adicionar</p>
          </button>
        </DialogTrigger>

        <DialogContent className="bg-[#1e293b]">
          <DialogHeader className="p-2">
            <DialogTitle>Nova Transação</DialogTitle>
          </DialogHeader>

          <form
            className="flex flex-col gap-4 pt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <label>Titulo</label>
              <Input
                id="name"
                placeholder="Ex: Almoço, Freela..."
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label>Valor (R$)</label>
              <Input
                id="amount"
                type="number"
                placeholder="0,00"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && (
                <p className="text-xs text-red-500">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label>Tipo</label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <p className="text-xs text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label>Categoria</label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>

                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-xs text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label>Metodo de pagamento</label>
              <Controller
                control={control}
                name="paymentMethod"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o metodo de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.paymentMethod && (
                <p className="text-xs text-red-500">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label>Data</label>
              <Input
                type="date"
                id="date"
                placeholder="__/__/____"
                {...register("date")}
              />
              {errors.date && (
                <p className="text-xs text-red-500">{errors.date.message}</p>
              )}
            </div>

            {submitError && (
              <p role="alert" className="text-sm text-red-500">
                {submitError}
              </p>
            )}

            <DialogFooter className="gap-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setIsOpen(false);
                }}
                className="border border-[#cad5e2] rounded-lg w-1/3 py-2.5 cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#8e51ff] w-2/3 flex items-center justify-center gap-2 rounded-xl cursor-pointer disabled:opacity-60"
              >
                <Image src={ConfirmIcon} alt="Confirm Icon" />
                <p className="font-semibold text-sm">
                  {isSubmitting ? "Salvando..." : "Salvar transação"}
                </p>
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
