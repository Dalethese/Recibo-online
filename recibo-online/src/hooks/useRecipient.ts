import { useState } from "react";
import type { ReceiptData } from "../types/recipient";
import { formatDocument, formatCurrency, formatPhone } from "../utils/masks";

export const useRecipient = () => {
  const [data, setData] = useState<ReceiptData>({
    valor: "",
    pagador: "",
    docPagador: "",
    preposicao: "à",
    referente: "",
    emissor: "",
    docEmissor: "",
    telefone: "",
    cidade: "",
    data: new Date().toISOString().split("T")[0], // Data de hoje por padrão
    formaPagamento: "Dinheiro",
    duasVias: false,
  });

  const handleClear = () => {
    // Reseta os dados para o estado inicial
    setData({
      valor: "",
      pagador: "",
      docPagador: "",
      preposicao: "à",
      referente: "",
      emissor: "",
      docEmissor: "",
      telefone: "",
      cidade: "",
      data: new Date().toISOString().split("T")[0],
      formaPagamento: "Dinheiro",
      duasVias: false,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    let finalValue: string | boolean = type === "checkbox" ? checked : value;

    const camposDeTexto = ["pagador", "emissor", "cidade"];

    if (camposDeTexto.includes(name) && typeof finalValue === "string") {
      // Remove tudo que for número (0-9)
      finalValue = finalValue.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    }

    // Aplicação das Máscaras
    if (name === "docPagador" || name === "docEmissor") {
      finalValue = formatDocument(value);
    } else if (name === "valor") {
      finalValue = formatCurrency(value);
    } else if (name === "telefone") {
      finalValue = formatPhone(value);
    }

    setData((prev) => ({ ...prev, [name]: finalValue }));
  };

  return { data, handleChange, handleClear };
};
