import * as React from 'react';
import { Provider as PaperProvider, ActivityIndicator, Colors, Button, Card, FAB } from 'react-native-paper';
import { View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { format, addDays } from 'date-fns';
import { styles } from '../../components/Styles';
import DeleteDialog from '../../components/DeleteDialog';
import CardContent from '../../components/CardContent';
import api from '../../services/api';
import Toast from 'react-native-simple-toast';

export default function ProjetoList({ navigation }) {

    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [id, setId] = React.useState('');
    const [visible, setVisible] = React.useState(false);

    const showDialog = (id) => {
        setId(id);
        setVisible(true);
    };

    const hideDialog = () => setVisible(false);

    async function getData() {
        try {
            const response = await api.get('projeto');
            setData(response.data.data);
        } catch (error) {
            alert(error.response.data.errors[0]);
        }
        setLoading(false);
    }

    async function deleteData() {
        setLoading(true);
        try {
            const response = await api.delete('projeto/' + id);
            Toast.show('Projeto deletado com sucesso.');
            getData();
        } catch (error) {
            alert(error.response.data.errors[0]);
        }
        hideDialog();
    }

    React.useEffect(() => {
        getData();
    }, []);


    return (
        <PaperProvider>
            <View style={styles.container}>
                {isLoading ? <ActivityIndicator animating={true} color={Colors.red800} /> : (
                    <>
                        <FlatList
                            data={data}
                            refreshControl={
                                <RefreshControl refreshing={isLoading} onRefresh={getData} />
                            }
                            keyExtractor={({ id }) => id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Details', {
                                        projeto: item,
                                    });
                                }}>
                                    <Card style={styles.card}>
                                        <CardContent
                                            title={item.titulo}
                                            description={item.descricao}
                                            description2={"Data de entrega: " + format(addDays(new Date(item.dataPrevisaoEntrega), 1), 'dd-MM-yyyy')}
                                            status={item.status}
                                        />
                                        <Card.Actions>
                                            <Button onPress={() => {
                                                navigation.navigate('Details', {
                                                    projeto: item,
                                                });
                                            }}>Ver</Button>
                                            <Button
                                                onPress={() => navigation.navigate('Edit', { projeto: item })}>
                                                Editar
                                                </Button>
                                            <Button
                                                onPress={() => showDialog(item.id)}>
                                                Deletar
                                            </Button>
                                        </Card.Actions>
                                    </Card>
                                </TouchableOpacity>
                            )}
                        />
                        <DeleteDialog
                            visible={visible}
                            hideDialog={() => hideDialog()}
                            content="Deseja realmente deletar esse projeto?"
                            deleteData={() => deleteData()}
                        />
                    </>
                )}
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={() => navigation.navigate('Create')}
                />
            </View>
        </PaperProvider>
    );
}