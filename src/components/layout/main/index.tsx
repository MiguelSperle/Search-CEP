import Button from '@mui/material/Button'; // FRAMEWORK CSS
import TextField from '@mui/material/TextField'; // FRAMEWORK CSS
import { ThemeProvider } from '@emotion/react'; // FRAMEWORK CSS
import { theme } from '../../../styles/muiTheme'; // FRAMEWORK CSS
import {  useState } from 'react'; // useState
import { TypeValueInput } from '../../../interface/GlobalTypes'; // tipagens
import { TypeInfoCep } from '../../../interface/GlobalTypes'; // tipagens
import { TypeTitle } from '../../../interface/GlobalTypes'; // tipagens
import { api } from '../../../services/api'; // api
import {  toast } from 'react-toastify';



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

    const handleSearch = () => { // button que vai pesquisar o cep e retorna-lo (ONCLICK)
       if(info.value === ''){
        return toast.error('campo vazio!')
       }  else if (info.value.length !== 8){
        return toast.error('Coloque um CEP Válido de 8 números.')
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
        toast.success('CEP encontrado com sucesso.')

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
             
             <div className='container-about-information'>
                <p>{cepInfo.localidade}</p>
                <p>{cepInfo.logradouro}</p>
                <p>{cepInfo.bairro}</p>
             </div> 
        </div>
    )
}