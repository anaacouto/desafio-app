import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider as PaperProvider, Card, TextInput, Button, HelperText } from 'react-native-paper';
import api from '../../services/api';
import { styles, theme } from '../../components/Styles';
import Toast from 'react-native-simple-toast';

export default function TarefaCreate({ route, navigation }) {

    const { projeto } = route.params;

    const [titulo, setTitulo] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [hasError, setHasError] = React.useState(false);

    async function salvar() {
        if (titulo.length == 0) {
            setHasError(true);
        } else {
            try {
                const response = await api.post('tarefa', {
                    titulo: titulo,
                        descricao: descricao,
                        projeto: { id: projeto.id }
                });
                Toast.show('Tarefa criada com sucesso.');
                navigation.navigate('Home');
            } catch (error) {
                alert(error.response.data.errors);
            }
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

