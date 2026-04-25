import { useRef } from "react";
import "./App.css";
import { useReactToPrint } from "react-to-print";
import { ReceiptPrint } from "./components/RecipientPrint";
import { useRecipient } from "./hooks/useRecipient";
import { InputField } from "./components/InputField";

function App() {
  const { data, handleChange, handleClear, handleDocValidation } =
    useRecipient();
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Recibo_${data.pagador}`,
  });
  // const handleGenerate = () => {
  //   // Validação básica
  //   const newErrors: { [key: string]: boolean } = {};
  //   if (!data.valor || data.valor === "R$ 0,00") newErrors.valor = true;
  //   if (!data.pagador) newErrors.pagador = true;
  //   if (!data.emissor) newErrors.emissor = true;
  //   if (!data.cidade) newErrors.cidade = true;
  //   if (Object.keys(newErrors).length === 0) {
  //     handlePrint(); // Dispara o PDF se não houver erros
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede a página de recarregar
    handlePrint();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center">
        <main className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">
            Recibo Simples
          </h1>

          <div className="no-print">
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Valor"
                name="valor"
                placeholder="R$ 0,00"
                value={data.valor}
                type="text"
                inputMode="numeric"
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  label="Pagador"
                  name="pagador"
                  value={data.pagador}
                  onChange={handleChange}
                  placeholder="Fulano de tal"
                  required
                  className="md:col-span-2"
                />
                <InputField
                  label="CPF ou CNPJ (opcional)"
                  name="docPagador"
                  value={data.docPagador}
                  type="text"
                  inputMode="numeric"
                  onChange={handleDocValidation}
                  maxLength={18}
                />
              </div>

              {/* Referente e Preposições */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                  <label className="text-sm font-bold text-gray-700">
                    Referente
                  </label>
                  <div className="flex gap-2 text-sm">
                    {["à", "a", "às", "ao", "aos"].map((prep) => (
                      <label
                        key={prep}
                        className="flex items-center gap-1 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="preposicao"
                          value={prep}
                          checked={data.preposicao === prep}
                          onChange={handleChange}
                          className="cursor-pointer"
                        />
                        {prep}
                      </label>
                    ))}
                  </div>
                </div>
                <input
                  name="referente"
                  value={data.referente}
                  onChange={handleChange}
                  required
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>

              {/* Emissor e Documento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">
                    Nome do emissor
                  </label>
                  <input
                    name="emissor"
                    value={data.emissor}
                    onChange={handleChange}
                    required
                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">
                    CPF ou CNPJ
                  </label>
                  <input
                    name="docEmissor"
                    type="text"
                    inputMode="numeric"
                    value={data.docEmissor}
                    onChange={handleDocValidation}
                    maxLength={18}
                    required
                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Telefone, Cidade e Data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">
                    Telefone (opcional)
                  </label>
                  <input
                    name="telefone"
                    value={data.telefone}
                    type="text"
                    inputMode="numeric"
                    placeholder="00 00000-0000"
                    onChange={handleChange}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    name="cidade"
                    value={data.cidade}
                    onChange={handleChange}
                    placeholder="Cidade Tal"
                    required
                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">
                    Data do pagamento
                  </label>
                  <input
                    type="date"
                    name="data"
                    value={data.data}
                    onChange={handleChange}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">
                  Forma de Pagamento:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    "Dinheiro",
                    "Pix",
                    "Cheque",
                    "Transferência/Depósito",
                    "Cartão de Crédito/Débito",
                    "Boleto",
                  ].map((metodo) => (
                    <label
                      key={metodo}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      <input
                        type="radio"
                        name="formaPagamento"
                        value={metodo}
                        checked={data.formaPagamento === metodo}
                        onChange={handleChange}
                        className="cursor-pointer"
                      />
                      {metodo}
                    </label>
                  ))}
                </div>
              </div>

              {/* Checkbox Duas Vias */}
              <label className="flex items-center gap-2 font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="duasVias"
                  checked={data.duasVias}
                  onChange={handleChange}
                  className="w-4 h-4 cursor-pointer"
                />
                Duas vias?
              </label>

              <div className="pt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Limpar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-md cursor-pointer"
                >
                  Gerar Recibo
                </button>
              </div>
            </form>
          </div>

          <div className="print-only">
            <ReceiptPrint data={data} ref={contentRef} />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
