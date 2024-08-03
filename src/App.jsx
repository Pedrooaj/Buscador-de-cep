import './App.css'
import { useState, useEffect } from 'react'
import { FaMapMarked } from "react-icons/fa";
import { GiBrazil } from "react-icons/gi";
import { FaCity } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { TbBuildingEstate } from "react-icons/tb";
import { BsFillTelephoneFill } from "react-icons/bs";

function App() {
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState({})
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    async function getCep() {
      if (cep.length === 8) {
        setLoading(true)
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await response.json()
        setAddress(data)
      }
      setTimeout(() => {
        setLoading(false)
      }, 500) 

    }


    getCep()

  }, [cep])

  function handleInput(e) {
    const InputValue = e.target.value;

    if (e.target.value.length < 9) {
      setCep(InputValue)
    } else {
      alert('Digite um Cep válido')
    }

  }

  const Conteudo = () => {
    return (
      <>
        <div className='true'>{address.cep ? <><GiBrazil color='green' size={25} /> {address.cep}</> : ""}</div>
        <div className='true'>{address.localidade ? <><FaCity color='yellow' size={25} /> {address.localidade}</> : ""}</div>
        <div className='true'>{address.uf ? <><TbBuildingEstate color='blue' size={25} />{address.uf}</> : ""}</div>
        <div className={address.bairro ? "true" : "false"}>{address.bairro ? <><SiOpenstreetmap size={25} /> {address.bairro}</> : ""}</div>
        <div className='true'>{address.ddd ? <><BsFillTelephoneFill size={25} />{address.ddd}</> : ""}</div>
      </>
    )
  }


  return (
    <div className="App">
      <div className='Div-Input'>
        <h1><FaMapMarked size={60} />Buscador de Cep </h1>
        <input placeholder='Digite um Cep' value={cep} onChange={(e) => handleInput(e)} type="number" />
        {loading ? <h2>Carregando...</h2> : <Conteudo />}
      </div>
    </div>
  )
}

export default App
