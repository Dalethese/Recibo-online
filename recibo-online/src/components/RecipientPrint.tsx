import React from "react";
import type { ReceiptData } from "../types/recipient";

interface Props {
  data: ReceiptData;
}

export const ReceiptPrint = React.forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        className="p-10 bg-white text-black font-serif border-2 border-gray-300"
        style={{
          width: "100%",
          // maxWidth: "19cm",
          minHeight: "10cm",
        }}
      >
        <div className="border-4 border-double border-black p-6">
          <header className="flex justify-between items-center mb-8 border-b-2 border-black pb-4">
            <h1 className="text-4xl font-bold uppercase">Recibo</h1>
            <div className="text-2xl font-bold border-2 border-black px-4 py-2 bg-gray-100">
              {data.valor}
            </div>
          </header>

          <section className="text-lg leading-loose space-y-4">
            <p>
              Recebi(emos) de{" "}
              <span className="font-bold underline">
                {data.pagador || "____________________"}
              </span>
              {data.docPagador ? (
                <>
                  , {data.docPagador.length <= 14 ? ", CPF" : ", CNPJ"} nº{" "}
                  <span className="font-bold">{data.docPagador}</span>
                </>
              ) : (
                ""
              )}
              , a importância de <span className="font-bold">{data.valor}</span>
              {" referente "}
              {data.preposicao}{" "}
              <span className="italic">"{data.referente}"</span>.
            </p>

            <p>
              Pagamento realizado via{" "}
              <span className="font-bold">{data.formaPagamento}</span>.
            </p>
          </section>

          <footer className="mt-16">
            <p className="text-right mb-12">
              {data.cidade}, {data.data.split("-").reverse().join("/")}
            </p>

            <div className="flex flex-col items-center">
              <div className="w-2/3 border-t border-black mb-1"></div>
              <p className="font-bold uppercase">{data.emissor}</p>
              <p className="text-sm">CPF/CNPJ: {data.docEmissor}</p>
              {data.telefone && <p className="text-sm">Tel: {data.telefone}</p>}
            </div>
          </footer>
        </div>

        {data.duasVias && (
          <div className="mt-20 border-t-2 border-dashed border-gray-400 pt-20">
            {/* Aqui você pode repetir o código acima para a segunda via */}
            <p className="text-center text-gray-400 uppercase text-xs">
              Segunda Via
            </p>
          </div>
        )}
      </div>
    );
  },
);
