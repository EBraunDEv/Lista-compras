"use client";

import { deleteProdutos } from "./actions";
import { useTransition } from "react";

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  let [isPending, startTransition] = useTransition();

  return (
    <label>
      {isPending && <span>...</span>}
      <button
        type="button"
        onClick={(ev) => {
          startTransition(() => {
            deleteProdutos(id);
          });
        }}
      >
        Excluir
      </button>
    </label>
  );
}
