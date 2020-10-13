import * as React from 'react';
import { Provider as PaperProvider, ActivityIndicator, Colors, Button, Card, Title, Paragraph, Searchbar, Dialog, Portal } from 'react-native-paper';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { styles, theme } from '../../components/Styles';
import api from '../../services/api';

export default function TarefaList({ navigation }) {

    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [id, setId] = React.useState('');
    const [visible, setVisible] = React.useState(false);

    const showDialog = (id) => {
        setId(id);
        setVisible(true);
    };

    const hideDialog = () => setVisible(false);

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        if (query.length == 0) {
            getData();
        } else if (query.length > 2) {
            getData('tarefa/busca/' + query);
        }
    };

    async function deleteData() {
        const response = await api.delete('tarefa/' + id);
        if (response.status == 200) {
            setLoading(true);
            getData();
            hideDialog();
        } else {
            alert(response.data.errors[0]);
        }
    }

    async function getData(uri) {
        const url = uri == undefined ? 'tarefa' : uri;
        try {
            const response = await api.get(url);
            setData(response.data.data);
        } catch (error) {
            alert(error.response.data.errors[0]);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        getData();
    }, []);
    return (
        <PaperProvider>
            <View style={styles.container}>
                <Searchbar
                    placeholder="Buscar tarefas"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.card}
                    theme={theme}
                />
                {isLoading ? <ActivityIndicator animating={true} color={Colors.red800} /> : (
                    <>
                        <FlatList
                            data={data}
                            refreshControl={
                                <RefreshControl refreshing={isLoading} onRefresh={() => getData()} />
                            }
                            keyExtractor={({ id }, index) => id.toString()}
                            renderItem={({ item }) => (
                                <Card style={styles.card}>
                                    <Card.Content>
                                        <Title style={{ color: '#000' }}>{item.titulo}</Title>
                                        <Paragraph style={{ color: '#000' }}>{item.descricao}</Paragraph>
                                        <Paragraph style={{ color: '#000' }}>Projeto: {item.projeto.titulo}</Paragraph>
                                        <Paragraph style={{ color: item.status ? '#228B22' : '#FF0000', fontWeight: 'bold' }}>{item.status ? 'Concluída' : 'Em andamento'}
                                        </Paragraph>
                                    </Card.Content>
                                    <Card.Actions>
                                        <Button onPress={() => navigation.navigate('TarefaEdit', { projeto: item.projeto, tarefa: item })}>Editar</Button>
                                        <Button onPress={() => showDialog(item.id)}>Deletar</Button>
                                    </Card.Actions>
                                </Card>
                            )}
                        />
                        <Portal>
                            <Dialog visible={visible} onDismiss={hideDialog}>
                                <Dialog.Content>
                                    <Paragraph>Deseja realmente deletar essa tarefa?</Paragraph>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={hideDialog}>Não</Button>
                                    <Button onPress={deleteData}>Sim</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                    </>
                )}
            </View>
        </PaperProvider>
    );
}


