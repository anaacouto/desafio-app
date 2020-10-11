import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider as PaperProvider, Card, TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles, theme } from '../../components/Styles';
import api from '../../services/api';

export default function ProjetoCreate({ navigation }) {

    const [titulo, setTitulo] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [dataPrevisaoEntrega, setDataPrevisaoEntrega] = React.useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dataPrevisaoEntrega;
        setShow(Platform.OS === 'ios');
        setDataPrevisaoEntrega(currentDate);
      };


    const salvar = () => {
        fetch(api + 'projeto', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo,
                descricao: descricao,
                dataPrevisaoEntrega: dataPrevisaoEntrega
            })
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.errors.length != 0) {
                    alert(json.errors[0]);
                } else {
                    navigation.navigate('Home');
                }
            })
            .catch(() => alert('Não foi possível criar o projeto'));
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
                        label="Data da Previsão de Entrega"
                        value={dataPrevisaoEntrega.toString()}
                        underlineColor='#808080'
                        theme={theme}
                        onTouchStart={() => setShow(true)}
                    />
                    {show && (
                    <DateTimePicker
                        style={styles.input}
                        testID="dateTimePicker"
                        value={dataPrevisaoEntrega}
                        mode="date"
                        display="default"
                        onChange={onChange}
                        underlineColor='#808080'
                        theme={theme}
                    />
                    )}
                    <Button style={styles.button} labelStyle={styles.buttonLabel} onPress={salvar}>Salvar</Button>
                </Card>
            </View>
        </PaperProvider>
    );
}