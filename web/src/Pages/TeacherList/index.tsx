import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';


export default function TeacherList() {
    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(event: FormEvent) {
        event.preventDefault();

        try {
            const response = await api.get('classes', {
                params: {
                    subject,
                    week_day,
                    time
                }
            })
            setTeachers(response.data);

        } catch (error) {
            alert('Error with form data')
        }
        
    }


    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes sao os proffys disponiveis">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Materia"
                        options={[
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Matematica', label: 'Matematica' },
                            { value: 'Geometria', label: 'Geometria' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Historia', label: 'Historia' },
                            { value: 'Gramatica', label: 'Gramatica' },
                            { value: 'Literatura', label: 'Literatura' },
                            { value: 'Artes', label: 'Artes' },
                        ]}
                        value={subject}
                        onChange={event => setSubject(event.target.value)}
                        required
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da semana"
                        options={[
                            { value: '0', label: 'Segunda-feira' },
                            { value: '1', label: 'Terca-feira' },
                            { value: '2', label: 'Quarta-feira' },
                            { value: '3', label: 'Quinta-feira' },
                            { value: '4', label: 'Sexta-feira' },
                            { value: '5', label: 'Sabado' },
                            { value: '6', label: 'Domingo' },
                        ]}
                        value={week_day}
                        onChange={event => setWeek_day(event.target.value)}
                        required
                    />
                    <Input name="time" label="Hora" type="time" value={time} onChange={event => setTime(event.target.value)} required/>
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>
            <main>
                {
                    teachers && teachers.map((teacher: Teacher) => (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                        />
                    ))
                }
            </main>
        </div>
    )
}