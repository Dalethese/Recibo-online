export const formatDocument = (value: string) => {
  // Remove tudo que não for número
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 11) {
    // Máscara CPF: 000.000.000-00
    return digits
      .replace(/(\{10})/, "") // Limite de segurança
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    // Máscara CNPJ: 00.000.000/0000-00
    return digits
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
};

export const formatCurrency = (value: string): string => {
  // Remove tudo que não é dígito e converte para número
  const digits = value.replace(/\D/g, "");
  const amount = Number(digits) / 100;

  // Formata como Real Brasileiro
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "");

  // (99) 99999-9999 ou (99) 9999-9999
  return digits
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2") // Ajuste para fixo ou celular
    .substring(0, 15); // Limita o tamanho
};
