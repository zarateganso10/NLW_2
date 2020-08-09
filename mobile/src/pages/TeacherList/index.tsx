import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const weekDays = [ 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sabado', 'domingo']

export default function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id)
                setFavorites(favoritedTeachersIds);
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites();
    })

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();
        const nameDay = weekDays.filter(day => day.includes(week_day));
        const day = weekDays.indexOf(nameDay[0]);
        const response = await api.get('classes', {
            params: {
                subject,
                week_day: day,
                time
            }
        })
        setTeachers(response.data);
    }

    return(
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponiveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}  
            >
                {
                    isFiltersVisible && (
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>
                                Materia
                            </Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Qual a materia?"
                                placeholderTextColor="#c1bcc"
                                value={subject}
                                onChangeText={text => setSubject(text)}
                            />
                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>
                                        Dia da semana
                                    </Text>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="Qual o dia?"
                                        placeholderTextColor="#c1bcc"
                                        value={week_day}
                                        onChangeText={text => setWeek_day(text)}
                                    />
                                </View>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>
                                        Horario 
                                    </Text>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="Qual horario?"
                                        placeholderTextColor="#c1bcc"
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                    />
                                </View>
                            </View>
                            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>
                                    Filtrar
                                </Text>
                            </RectButton>

                        </View>
                    )
                }
                
            </PageHeader>

            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {
                    teachers.map((teacher: Teacher) => (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    ))
                }
            </ScrollView>
            
        </View>
    )
}