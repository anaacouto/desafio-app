import * as React from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Provider as PaperProvider, Card, TextInput, Button, RadioButton, HelperText } from 'react-native-paper';
import api from '../../services/api';
import { styles, theme } from '../../components/Styles';

export default function TarefaEdit({ route, navigation }) {

    const { projeto, tarefa } = route.params;

    const [titulo, setTitulo] = React.useState(tarefa.titulo);
    const [descricao, setDescricao] = React.useState(tarefa.descricao);
    const [status, setStatus] = React.useState(projeto.status.toString());

    const [hasError, setHasError] = React.useState(false);

    const salvar = () => {
        if (titulo.length == 0) {
            setHasError(true);
        } else {
        fetch(api + 'tarefa', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: tarefa.id,
                titulo: titulo,
                descricao: descricao,
                status: status,
                projeto: { id: projeto.id }
            })
        }).then(() => navigation.navigate('Home')).catch(() => alert('Não foi possível criar o projeto'));
        }
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Card style={{backgroundColor: '#fff'}}>
                    <Card.Title title={"Projeto " + projeto.titulo} titleStyle={{color: '#000'}} />
                </Card>
                <Card style={styles.card}>
                    <TextInput
                        style={styles.input}
                        label="Título da Tarefa *"
                        value={titulo}
                        underlineColor='#808080'
                        theme={theme}
                        onChangeText={titulo => setTitulo(titulo)}
                    />
                    <TextInput
                        style={styles.input}
                        label="Descrição da Tarefa"
                        value={descricao}
                        underlineColor='#808080'
                        theme={theme}
                        onChangeText={descricao => setDescricao(descricao)}
                    />
                    <Text style={{marginLeft: 16}}>Tarefa concluída?</Text>
                    <RadioButton.Group onValueChange={status => setStatus(status)} value={status}>
                        <RadioButton.Item color='#000080' label="Sim" value="true" />
                        <RadioButton.Item color='#000080' label="Não" value="false" />
                    </RadioButton.Group>
                    <HelperText type="error" visible={hasError}>
                        Os campos com * são obrigatórios e não podem ser vazios.
                    </HelperText>
                    <Button style={styles.button} labelStyle={styles.buttonLabel} onPress={salvar}>Salvar</Button>
                </Card>
            </View>
        </PaperProvider>
    );
}