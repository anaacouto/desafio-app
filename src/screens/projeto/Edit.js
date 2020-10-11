import React from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Provider as PaperProvider, Card, TextInput, Button, RadioButton } from 'react-native-paper';
import api from '../../services/api';
import { styles, theme } from '../../components/Styles';

export default function ProjetoEdit({ route, navigation }) {

    const { projeto } = route.params;

    const [titulo, setTitulo] = React.useState(projeto.titulo);
    const [descricao, setDescricao] = React.useState(projeto.descricao);
    const [dataPrevisaoEntrega, setDataPrevisaoEntrega] = React.useState(projeto.dataPrevisaoEntrega);
    const [status, setStatus] = React.useState(projeto.status.toString());

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
                dataPrevisaoEntrega: dataPrevisaoEntrega,
                status: status
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.errors.length !=0) {
                alert(json.errors[0]);
            } else {
                navigation.navigate('Home');
            }
        })
        .catch(() => alert('Não foi possível editar o projeto'));
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
                    <Text style={{marginLeft: 16}}>Projeto entregue?</Text>
                    <RadioButton.Group onValueChange={status => setStatus(status)} value={status}>
                        <RadioButton.Item color='#000080' label="Sim" value="true" />
                        <RadioButton.Item color='#000080' label="Não" value="false" />
                    </RadioButton.Group>
                    <Button style={styles.button} labelStyle={styles.buttonLabel} onPress={salvar}>Salvar</Button>
                </Card>
            </View>
        </PaperProvider>
    );
}