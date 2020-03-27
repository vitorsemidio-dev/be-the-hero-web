import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.table({
      name, email, whatsApp, city, uf,
    })
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero Logo"/>

          <h1>Cadastro</h1>

          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para Logon
          </Link>
        </section>


        <form>
          <input 
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome da ONG"
          />
          <input 
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email" placeholder="E-mail"
          />
          <input 
            value={whatsApp}
            onChange={e => setWhatsApp(e.target.value)}
            placeholder="WhatsApp"
          />

          <div className="input-group">
            <input
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Cidade"
            />
            <input
              value={uf}
              onChange={e => setUf(e.target.value)}
              placeholder="UF" style={{ width: 80 }}
            />
          </div>

          <button onClick={handleRegister} type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
