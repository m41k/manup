import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpdateList() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/updates')
            .then(response => {
                setUpdates(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar atualizações:', error);
            });
    }, []);

    const handleInstall = () => {
        const selectedUpdates = updates.filter(update => update.selected).map(update => update.name);
        axios.post('http://localhost:3000/api/updates/install', { updates: selectedUpdates })
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.error('Erro ao instalar atualizações:', error);
            });
    };

    return (
        <div>
            <h1>Atualizações Pendentes</h1>
            <ul>
                {updates.map(update => (
                    <li key={update.id}>
                        <input type="checkbox" checked={update.selected || false} onChange={() => {
                            setUpdates(updates.map(u => u.id === update.id ? { ...u, selected: !u.selected } : u));
                        }} />
                        {update.name} - {update.version}
                    </li>
                ))}
            </ul>
            <button onClick={handleInstall}>Instalar Atualizações Selecionadas</button>
        </div>
    );
}

export default UpdateList;
