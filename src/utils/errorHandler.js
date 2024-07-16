export default function trataErro(erro) {
    console.log(erro.code);

    if (erro.code === "ER_DUP_ENTRY") {
        return { code: 400, error: `Registro duplicado.` };
    }
    return { code: 500, error: `Erro interno.` };
}
