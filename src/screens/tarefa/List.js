import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider, ActivityIndicator, Colors, Button, Card, Title, Paragraph, Searchbar, Dialog, Portal } from 'react-native-paper';
import { View, FlatList, RefreshControl } from 'react-native';
import { styles, theme } from '../../components/Styles';
import api from '../../services/api';

export default function TarefaList({ navigation }) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [ id, setId] = useState('');
    const [visible, setVisible] = React.useState(false);

    const showDialog = (id) => {
        setId(id);
        setVisible(true);
    };

    const hideDialog = () => setVisible(false);

    const url = api + 'tarefa/';

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        if (query.length == 0) {
            getData(url);
        } else if (query.length > 2) {
            getData(url + '/busca/' + query);
        }
    };

    const deleteData = () => {
        setLoading(true);
        fetch(url + id, { method: 'DELETE' })
            .then((response) => response.json())
            .then((json) => getData(url))
            .catch((errors) => console.error(errors));
        hideDialog();
    }

    const getData = (uri) => {
        fetch(uri)
            .then((response) => response.json())
            .then((json) => setData(json.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    useEffect(() => getData(url), []);
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
                            <RefreshControl refreshing={isLoading} onRefresh={() => getData(url)} />
                        }
                        keyExtractor={({ id }, index) => id.toString()}
                        renderItem={({ item }) => (
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Title style={{color: '#000'}}>{item.titulo}</Title>
                                    <Paragraph style={{color: '#000'}}>{item.descricao}</Paragraph>
                                    <Paragraph style={{color: '#000'}}>Projeto: {item.projeto.titulo}</Paragraph>
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


