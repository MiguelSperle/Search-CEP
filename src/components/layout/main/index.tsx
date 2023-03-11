import Button from '@mui/material/Button'; // FRAMEWORK CSS
import TextField from '@mui/material/TextField'; // FRAMEWORK CSS
import { ThemeProvider } from '@emotion/react'; // FRAMEWORK CSS


import {  useState } from 'react'; // useState

import { TypeValueInput } from '../../../interface/GlobalTypes'; // tipagens
import { TypeInfoCep } from '../../../interface/GlobalTypes'; // tipagens
import { TypeTitle } from '../../../interface/GlobalTypes';

import { api } from '../../../services/api';
import { theme } from '../../../styles/muiTheme';


export default function Main(props: TypeTitle){

  

    const [info, setInfo] = useState<TypeValueInput>({ // estado onde ta recebendo o value(mensagem digitada) no input (sofre tipagem)
        value: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // função que mostra o que estou digitando na tela
        setInfo({ 
            value: e.target.value // esse e.target.value seria o valor(número/mensagem digitada) do input
        })
    }

    const [cepInfo, setCepInfo] = useState<TypeInfoCep>({ 
        localidade: '',
        logradouro: '',
        bairro: ''
    })

     const [showInfoCompletely, setShowInfoCompletely]= useState(false)

    const handleSearch = () => { // button que vai pesquisar o cep e retorna-lo (ONCLICK)
       if(info.value === ''){
        return alert('Coloque algo!')
       }  else if (info.value.length !== 8){
        return alert('Coloque um CEP Válido de 8 números.')
       } 
        const fetchCep = async() => {
            try{
                const response = await api.get(`${info.value}/json`);  // transformando o CEP que eu colocar em json para retornar
                setCepInfo(response.data)
            }catch(e){
                console.log(e)
            }
        }
        fetchCep() 

         setShowInfoCompletely(!showInfoCompletely) // aqui eu to fazendo com que o estado seja diferente de falso ai vou fazer 
        // // a verificação ali embaixo para mostrar o componente.
    }

    return (
        <div className="container">
          <h1 className="title">{props.title}</h1>

          <ThemeProvider theme={theme}>
            <TextField 
            id="filled-basic"
            label="Digite o CEP" 
            variant="standard"
            color='primary'
            onChange={handleChange}
            value={info.value.replace(/\D/g, '')} // substuindo todas as letras  por nada (usando o replace)
            // (replace basicamente elimina caracteres)
            autoComplete='off'
            InputLabelProps={{
                style: { color: '#fff' }, 
            }}
            />
            <Button onClick={handleSearch} variant='outlined' color='primary'>BUSCAR</Button>
          </ThemeProvider>
            <div className='container-button-valueSent'>
               <p>{info.value.replace(/\D/g, '')}</p>
            </div>
             
           {showInfoCompletely && (
             <div className='container-about-information'>
                <p>Estado: {cepInfo.localidade}</p>
                <p>Bairro: {cepInfo.logradouro}</p>
                <p>Rua: {cepInfo.bairro}</p>
             </div>
           )}
        </div>
       
    )
}