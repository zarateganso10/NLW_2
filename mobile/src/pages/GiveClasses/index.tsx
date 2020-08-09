import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function GiveClasses() {
    const { goBack } = useNavigation();

    function handleNavigateGoBack() {
        goBack()
    }

    return(
        <View style={styles.container}>
            <ImageBackground resizeMode="contain" source={giveClassesBgImage} style={styles.content}>
                <Text style={styles.title}>
                    Quer ser um Proffy
                </Text>
                <Text style={styles.description}>
                    Para comecar, voce precisa se cadastrar como professor na nossa plataforma web
                </Text>
            </ImageBackground>
                

            <RectButton onPress={handleNavigateGoBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo Bem</Text>
            </RectButton>
        </View>
    )
}
