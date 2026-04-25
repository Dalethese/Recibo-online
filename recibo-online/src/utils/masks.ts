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

export const isValidCPF = (cpf: string): boolean => {
  const cleanCpf = cpf.replace(/\D/g, "");
  if (cleanCpf.length !== 11 || /^(\d)\1+$/.test(cleanCpf)) return false;

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++)
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cleanCpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cleanCpf.substring(10, 11))) return false;

  return true;
};

export const isValidCNPJ = (cnpj: string): boolean => {
  const cleanCnpj = cnpj.replace(/\D/g, "");
  if (cleanCnpj.length !== 14 || /^(\d)\1+$/.test(cleanCnpj)) return false;

  const calculate = (s: string, weight: number[]) => {
    let sum = 0;
    for (let i = 0; i < s.length; i++) sum += parseInt(s[i]) * weight[i];
    const res = sum % 11;
    return res < 2 ? 0 : 11 - res;
  };

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const d1 = calculate(cleanCnpj.substring(0, 12), w1);
  const d2 = calculate(cleanCnpj.substring(0, 13), w2);

  return d1 === parseInt(cleanCnpj[12]) && d2 === parseInt(cleanCnpj[13]);
};
