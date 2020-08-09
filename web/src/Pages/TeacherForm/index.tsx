import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';


export default function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([{ week_day: 0, from: '', to: ''}]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems, 
            {
                week_day: 0,
                from: '',
                to: ''
            }
        ])
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position){
                return { ...scheduleItem, [field]:value }
            }
            return scheduleItem;
        })
        setScheduleItems(updatedScheduleItems);
    }

    function handleForm(event: FormEvent) {
        event.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso')
            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro')
        })
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader  
                title="Que incrivel que voce quer dar aulas"
                description="O primeiro passo e preencher esse formulario de inscricao"
            >
                <main>
                    <form onSubmit={handleForm}>
                        <fieldset>
                            <legend>Seus dados</legend>
                            <Input name="name" label="Nome completo" value={name} onChange={event => setName(event.target.value)} />
                            <Input name="avatar" label="Avatar" value={avatar} onChange={event => setAvatar(event.target.value)} />
                            <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={event => setWhatsapp(event.target.value)}/>
                            <Textarea name="bio" label="Biografia" value={bio} onChange={event => setBio(event.target.value)}/>
                        </fieldset>
                        <fieldset>
                            <legend>Sobre a aula</legend>
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
                            />
                            <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={event => setCost(event.target.value)}/>
                        </fieldset>
                        <fieldset>
                            <legend>
                                Horarios disponiveis
                                <button type="button" onClick={addNewScheduleItem}>
                                    + Novo horario
                                </button>
                            </legend>
                            {
                                scheduleItems.map((item, index) => (
                                    <div key={index} className="schedule-item">
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
                                            value={item.week_day}
                                            onChange={event => setScheduleItemValue(index, 'week_day' ,event.target.value)}
                                        />
                                        <Input name="from" label="Das" type="time" value={item.from} onChange={event => setScheduleItemValue(index, 'from' ,event.target.value)}/>
                                        <Input name="to" label="Ate" type="time" value={item.to} onChange={event => setScheduleItemValue(index, 'to' ,event.target.value)}/>
                                    </div>
                                ))
                            }
                            
                            
                        </fieldset>
                        <footer>
                            <p>
                                <img src={warningIcon} alt="Aviso Importante"/>
                                Importante! <br />
                                Preencha todos os dados
                            </p>
                            <button type="submit">
                                Salvar cadastro
                            </button>
                        </footer>
                    </form>
                </main>
            </PageHeader>
        </div>
    )
}