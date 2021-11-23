import React, { useEffect } from 'react';
import './App.css';
import { useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash} from "@fortawesome/free-solid-svg-icons";;

const element =  <FontAwesomeIcon icon= {faTrash} />

function App() {

  const [valor, setValor] = useState([])
  const [input, setInput] = useState({label:"", done: false})

  const handlechange = (e) =>{
    setInput({label: e.target.value, done: false})
  }

  
  const agregarItems = () => {
      setValor(nuevoarray => [...nuevoarray, input])
      fetch("https://assets.breatheco.de/apis/fake/todos/user/FelipeM", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([...valor, input])
      })
  }

  
  const removerlista = (i) => {
    const nuevoArray = valor.filter((item, indice) => {
      return indice !== i 
  })
 
    fetch("https://assets.breatheco.de/apis/fake/todos/user/FelipeM", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([...nuevoArray])
    })
    setValor(nuevoArray)
  }

  useEffect(()=> {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/FelipeM", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      return res.json()})
    .then(data => setValor(data))
    .catch(error => console.log(error))

  }, [])

const lista = valor.map((item, indice) => {
	      return <div key ={indice}>
            <li className="w-100">
          <span>{item.label}</span>
        <i className="text-align-center none" onClick ={() => {removerlista(indice)}}>{element}</i></li>
        </div>
      });
      const cantidad = lista.length

  return (
    <div className="App w-25 m-auto">
        <input type="text" className="form-control" id="inputs" aria-describedby="emailHelp" placeholder ="¿ Que quieres hacer hoy ?" onChange = {handlechange} value = {input.label} /> 

        <ul className="p-0 w-100">
            <div className ="w-100">{lista}</div>
        </ul> 
        <p className ="cantidad">{cantidad} items pendientes</p> 
        <button type="button" className="btn btn-primary" onClick = {agregarItems} >Agregar tareas</button>
      
    </div>
  );
}

export default App;
