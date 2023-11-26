import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

// Defina a função handler para a rota
export async function GET(
  request: NextRequest,
  { params }: { params: { carrinhoId: string } }
) {
  const carrinhoId = params.carrinhoId;

  if (!carrinhoId) {
    return NextResponse.json({ error: "nome não fornecido" });
  }

  try {
   
    const carrinho = await prisma.carrinho.findUnique({
      where: {
        id: String(carrinhoId)
      }
    })


    const clienteId = carrinho?.cliente_id;


    if(!clienteId){
      return new NextResponse('Não encontrado cliente id', {status: 105})
    }


    const cliente = await prisma.cliente.findUnique({
      where: {
        id: String(clienteId)
      } 

    })

    if(!cliente){
      return new NextResponse('Não encontrado cliente id', {status: 105})
    }
    

   return NextResponse.json(cliente);
  } catch (error) {
    console.error("Erro na busca de produtos:", error);
    return NextResponse.json({ error: "Erro interno na busca de produtos" });
  }
}