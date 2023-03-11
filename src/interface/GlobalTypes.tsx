export type TypeTitle = {
    title: string;
}

export type TypeValueInput = { // tipando que vai ser uma string o valor digitado no input para ser mostrado na tela.
    value: string;
    
}

export type TypeInfoCep = { // tipando as informações que vem da API ao digitar o cep.
    localidade: string;
    bairro: string;
    logradouro: string;

}
