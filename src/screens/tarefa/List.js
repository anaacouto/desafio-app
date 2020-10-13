import * as React from 'react';
import { Provider as PaperProvider, ActivityIndicator, Colors, Button, Card, Searchbar } from 'react-native-paper';
import { View, FlatList, RefreshControl } from 'react-native';
import { styles, theme } from '../../components/Styles';
import DeleteDialog from '../../components/DeleteDialog';
import CardContent from '../../components/CardContent';
import api from '../../services/api';
import Toast from 'react-native-simple-toast';

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
        setLoading(true);
        try {
        const response = await api.delete('tarefa/' + id);
        Toast.show('Tarefa deletada com sucesso.');
        getData();
        } catch (error) {
        alert(response.data.errors[0]);
        }
        hideDialog();
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
                            keyExtractor={({ id }) => id.toString()}
                            renderItem={({ item }) => (
                                <Card style={styles.card}>
                                    <CardContent
                                        title={item.titulo}
                                        description={item.descricao}
                                        description2={"Projeto: " + item.projeto.titulo}
                                        status={item.status}
                                    />
                                    <Card.Actions>
                                        <Button onPress={() => navigation.navigate('TarefaEdit', { projeto: item.projeto, tarefa: item })}>Editar</Button>
                                        <Button onPress={() => showDialog(item.id)}>Deletar</Button>
                                    </Card.Actions>
                                </Card>
                            )}
                        />
                        <DeleteDialog
                            visible={visible}
                            hideDialog={() => hideDialog()}
                            content="Deseja realmente deletar essa tarefa?"
                            deleteData={() => deleteData()}
                        />
                    </>
                )}
            </View>
        </PaperProvider>
    );
}


