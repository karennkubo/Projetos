import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { goBack } from '../routes/Coordinator';
import { countries } from '../constants/Countries'
import useForm from '../hooks/useForm';
import { useGetData } from '../hooks/useGetData'
import {BASE_URL} from '../constants/Url';
import axios from 'axios';
import { Botao, Form, MainContainerColumn, Input, Select } from '../styles/Style';

export const ApplicationFormPage = () => {
  const navigate = useNavigate();

  const {form, onChange, cleanFields} = useForm({ name: "", age: "", applicationText: "", profession: "", country: "", trip: ""});

  const [trips] = useGetData(`${BASE_URL}trips`)

  const apply = (event) => {
    event.preventDefault();
    axios
    .post(`${BASE_URL}trips/${form.trip}/apply`, form)
    .then((res)=>{
      alert(`Application sent successfully!`)
    })
    .catch((err)=>{
      alert(err.response.data.message)
    })
    cleanFields();
  }
  
  return (

      <MainContainerColumn>
        <div>
      <Botao onClick={() => goBack(navigate)}>Voltar</Botao>
      </div>
      <Form onSubmit={apply}>
        <Select onChange={onChange} name="trip" value={form.trip} required>
          <option value={''}>Escolha uma viagem</option>
          {trips && trips.trips.map((trip) => {
            return (
              <option key={trip.id} value={trip.id}>
                {trip.name} - {trip.planet} 
              </option>
            )
          })}
        </Select>
        <Input name='name' placeholder='Nome' value={form.name} onChange={onChange} required pattern={'^.{3,}'} title="Deve-se ter no mínimo 3 caracteres."/>
        <Input name='age' placeholder='Idade' value={form.age} onChange={onChange} type={'number'} required min={18} title="Apenas maiores de 18 anos"/>
        <Input name='applicationText' placeholder='Texto de candidatura' value={form.applicationText} onChange={onChange} pattern={'^.{30,}'} title={"Deve-se ter no mínimo 30 caracteres."} required />
        <Input name='profession' type="text" placeholder='Profissão' value={form.profession} onChange={onChange} pattern={'^.{4,}'} title={"Deve-se ter no mínimo 4 caracteres."} required />
        <Select onChange={onChange} name="country" value={form.country} required>
          <option value={''}>Escolha um país</option>
          {countries && countries.map((country) => {
            return (
              <option key={country.ordem} value={country.nome}>
                {country.nome}
              </option>
            )
          })}
        </Select>
        <Botao type='submit'>Enviar</Botao>
      </Form>
      </MainContainerColumn>
        )
}
