import axios from "axios";

export const api = axios.create({
    baseURL: "https://viacep.com.br/ws/" // baseURL seria a url base da API que eu vou utilizar
})


