import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Alert } from 'react-native';

import api from '../api';

import user from '../assets/user.png';

export default function AutoresList({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        function loadAutores() {
            console.log('Carregando autores...');
            api.get('/autores')
                .then((response) => {
                    setAutores(response.data.reverse());
                    console.log('Autores carregado!');
                })
                .catch((error) => {
                    Alert.alert('Erro ao buscar da api!', error.message);
                    navigation.navigate('Home');

                    console.log(error.message);
                });
        }

        loadAutores();
    }, []);
    return (
        <SafeAreaView style={estilos.container}>
            <Text style={loading ? estilos.mostrarLoading : { display: 'none' }}>
                Carregando dados...
            </Text>

            <FlatList
                style={loading ? { display: 'none' } : { display: 'flex' }}
                data={autores}
                renderItem={({ item }) => (
                    <View style={estilos.card} key={item.id}>
                        <View>
                            <View style={estilos.boxImg}>
                                <Image source={user} style={estilos.img} />
                            </View>
                        </View>

                        <View style={{ flexGrow: 1, paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={estilos.nome}>{item.nome.trim()}</Text>
                            </View>

                            <Text style={estilos.email}>{item.email.trim()}</Text>
                        </View>
                    </View>

                )}
            />
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F171E'
    },

    card: {
        backgroundColor: '#1B2530',
        borderRadius: 15,
        marginHorizontal: 15,
        marginVertical: 10,
        flexDirection: 'row',
        padding: 15
    },
    boxImg: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(000, 170, 255, 0.2)'
    },
    img: {
        height: 30,
        width: 30
    },
    nome: {
        flex: 1,
        flexWrap: 'wrap',
        color: '#fff',
        fontSize: 18
    },
    email: {
        color: '#999',
    },
    mostrarLoading: {
        display: 'flex',
        color: '#fff',
        fontSize: 18,
        padding: 20,
        alignSelf: 'center'
    }
});