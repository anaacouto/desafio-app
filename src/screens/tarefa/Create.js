import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider as PaperProvider, Card, TextInput, Button, HelperText } from 'react-native-paper';
import api from '../../services/api';
import { styles, theme } from '../../components/Styles';

export default function TarefaCreate({ route, navigation }) {

    const { projeto } = route.params;

    const [titulo, setTitulo] = React.useState('');
    const [descricao, setDescricao] = React.useState('');

    const [hasError, setHasError] = React.useState(false);

    const salvar = () => {
        if (titulo.length == 0) {
            setHasError(true);
        } else {
            fetch(api + 'tarefa', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: titulo,
                    descricao: descricao,
                    projeto: { id: projeto.id }
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
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Card style={{ backgroundColor: '#fff' }}>
                    <Card.Title title={"Projeto " + projeto.titulo} titleStyle={{ color: '#000' }} />
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
                    <HelperText type="error" visible={hasError}>
                        Os campos com * são obrigatórios e não podem ser vazios.
                    </HelperText>
                    <Button style={styles.button} labelStyle={styles.buttonLabel} onPress={salvar}>Salvar</Button>
                </Card>
            </View>
        </PaperProvider>
    );
}

