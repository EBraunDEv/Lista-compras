"use server";

import prismaClient from "@/prismaClient";
import { revalidatePath } from "next/cache";


export async function updateAvailability(id: string, isAvailable: boolean) {
  "use server";

  const produtos= await prismaClient.produtos.update({
    where: {
      id,
    },
    data: {
      isAvailable,
    },
  });

  revalidatePath("/lista");

  return produtos;
}

export async function deleteProdutos(id: string) {
  "use server";

  const produtos = await prismaClient.produtos.delete({
    where: {
      id,
    },
  });

  revalidatePath("/lista");

  return produtos;
}
