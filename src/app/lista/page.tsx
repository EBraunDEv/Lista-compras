import prismaClient from "@/prismaClient";
import { revalidatePath } from "next/cache";
import AvailableCheckbox from "./AvailableCheckbox";
import DeleteButton from "./DeleteButton";


export default async function Lista() {
  let produtos = await prismaClient.produtos.findMany();

  async function createProdutos(data: FormData) {
    "use server";

    const produtos = await prismaClient.produtos.create({
      data: {
        nome: data.get("nome") as string,
        preco: Number(data.get("price")),
        categoria: data.get("category") as string,
        isAvailable: data.get("isAvailable") === "on",
      
      },
    });

    revalidatePath("/lista");

    return produtos;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Lista de compras Família Braun</h1>

      <form action={createProdutos} className="mb-8">
      <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Produto"
            name="nome"
            className="p-2 border rounded"
          />
          <input
            type="Float"
            placeholder="Preço"
            name="price"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Categoria"
            name="category"
            className="p-2 border rounded col-span-2"
          />
          <label className="flex items-center">
            Disponível?
            <input type="checkbox" name="isAvailable" className="ml-2" />
          </label>
        </div>


        <button 
        type="submit"
        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >Cadastrar
        </button>
      </form>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Id</th>
            <th className="p-2">Nome</th>
            <th className="p-2">Preço</th>
            <th className="p-2">Categoria</th>
            <th className="p-2">Ainda tem</th>
            <th className="p-2">Excluir</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td className="p-2">{produto.id}</td>
              <td className="p-2">{produto.nome}</td>
              <td className="p-2">{produto.preco}</td>
              <td className="p-2">{produto.categoria}</td>
              <td className="p-2">
                <AvailableCheckbox
                  isAvailable={produto.isAvailable}
                  id={produto.id}
                />
              </td>
              <td className="p-2">
                <DeleteButton id={produto.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}