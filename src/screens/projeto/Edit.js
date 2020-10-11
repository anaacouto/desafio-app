import React, { useEffect } from 'react';
import { View, StatusBar, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Card, TextInput, Button } from 'react-native-paper';
import api from '../../services/api';
import { styles, theme } from '../../components/Styles';

export default function ProjetoEdit({ route, navigation }) {

    const { projeto } = route.params;

    const [titulo, setTitulo] = React.useState(projeto.titulo);
    const [descricao, setDescricao] = React.useState(projeto.descricao);
    const [dataPrevisaoEntrega, setDataPrevisaoEntrega] = React.useState(projeto.dataPrevisaoEntrega);

    const salvar = () => {
        fetch(api + 'projeto', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: projeto.id,
                titulo: titulo,
                descricao: descricao,
                dataPrevisaoEntrega: dataPrevisaoEntrega
            })
        }).then(() => navigation.navigate('Home')).catch(() => alert('Não foi possível editar o projeto'));
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Card style={styles.card}>
                    <TextInput
                        style={styles.input}
                        label="Título do Projeto"
                        value={titulo}
                        underlineColor='#808080'
                        theme={theme}
                        onChangeText={titulo => setTitulo(titulo)}
                    />
                    <TextInput
                        style={styles.input}
                        label="Descrição do Projeto"
                        value={descricao}
                        underlineColor='#808080'
                        theme={theme}
                        onChangeText={descricao => setDescricao(descricao)}
                    />
                    <TextInput
                        style={styles.input}
                        label="Data de Entrega"
                        value={dataPrevisaoEntrega}
                        underlineColor='#808080'
                        theme={theme}
                        onChangeText={dataPrevisaoEntrega => setDataPrevisaoEntrega(dataPrevisaoEntrega)}
                    />
                    <Button style={styles.button} labelStyle={styles.buttonLabel} onPress={salvar}>Salvar</Button>
                </Card>
            </View>
        </PaperProvider>
    );
}