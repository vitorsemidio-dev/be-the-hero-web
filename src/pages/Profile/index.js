/** @format */

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ongId,
        },
      })
      .then((response) => {
        setIncidents(response.data);
      });
  }, [ongId]);

  const handleDeleteIncident = async (id) => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='Be The Hero' />
        <span>Bem vindo, {ongName}</span>

        <Link className='button' to='/incidents/new' data-cy='new-incident'>
          Cadastrar Novo Caso
        </Link>

        <button onClick={handleLogout} type='button' data-cy='btn-logout'>
          <FiPower size={18} color='#e02041' />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type='button'
              data-cy='btn-delete'>
              <FiTrash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
