import React, { useState } from 'react';
import { View, Image, Text, Linking, AsyncStorage } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutLineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles'
import api from '../../services/api';


export interface Teacher {
    name: string;
    avatar: string;
    cost: number;
    subject: string;
    whatsapp: string;
    bio: string;
    id: number;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [ isFavorited, setIsFavorited] = useState(favorited);

    async function handleLinkWhatsapp() {
        await api.post('connections', {
            user_id: teacher.id,
        })

        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = []

            if(favorites) {
                favoritesArray = JSON.parse(favorites);
            }

        if(isFavorited){
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => teacherItem.id === teacher.id)
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);
        } else {
            favoritesArray.push(teacher);
            setIsFavorited(true);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return(
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{ uri: teacher.avatar}} style={styles.avatar} />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preco/hora {' '}
                    <Text style={styles.priceValue}>
                        {teacher.cost}
                    </Text>
                </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton 
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton, 
                            isFavorited && styles.favorited
                        ]}
                    >
                        { 
                            isFavorited 
                            ? <Image source={heartOutLineIcon} />
                            : <Image source={unfavoriteIcon} />
                        }
                    </RectButton>
                    <RectButton onPress={handleLinkWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>

                </View>
            </View>
        </View>
    )
}

export default TeacherItem