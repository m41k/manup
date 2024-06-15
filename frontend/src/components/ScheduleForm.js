import React, { useState } from 'react';
import axios from 'axios';

function ScheduleForm() {
    const [time, setTime] = useState('');
    const [action, setAction] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/schedule', { time, action })
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                console.error('Erro ao agendar:', error);
            });
    };

    return (
        <div>
            <h1>Agendar Atualização</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Horário:
                    <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} />
                </label>
                <label>
                    Ação:
                    <input type="text" value={action} onChange={(e) => setAction(e.target.value)} />
                </label>
                <button type="submit">Agendar</button>
            </form>
        </div>
    );
}

export default ScheduleForm;
