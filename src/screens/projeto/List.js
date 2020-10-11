import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider, ActivityIndicator, Colors, Button, Card, Title, Paragraph, FAB, Dialog, Portal } from 'react-native-paper';
import { View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { styles } from '../../components/Styles';
import api from '../../services/api';

export default function ProjetoList({ navigation }) {

    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState([]);

    const [ id, setId] = useState('');

    const [visible, setVisible] = React.useState(false);

    const showDialog = (id) => {
        setId(id);
        setVisible(true);
    };

    const hideDialog = () => setVisible(false);

    const url = api + 'projeto/';

    const getData = () => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                if (json.errors.length != 0) {
                    alert(json.errors[0]);
                }
                setData(json.data);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    const deleteData = () => {
        setLoading(true);
        fetch(url + id, { method: 'DELETE' })
            .then((response) => response.json())
            .then((json) => {
                if (json.errors.length != 0) {
                    alert(json.errors[0]);
                }
                getData();
            })
            .catch((errors) => console.error(errors));
        hideDialog();
    }

    useEffect(() => getData(), []);

    
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
                            keyExtractor={({ id }, index) => id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Details', {
                                        projeto: item,
                                    });
                                }}>
                                <Card style={styles.card}>
                                    <Card.Content>
                                        <Title style={{color: '#000'}}>{item.titulo}</Title>
                                        <Paragraph style={{color: '#000'}}>Data de entrega: {item.dataPrevisaoEntrega}</Paragraph>
                                        <Paragraph style={{ color: item.status ? '#228B22' : '#FF0000', fontWeight: 'bold' }}>{item.status ? 'Entregue' : 'Em andamento'}
                                        </Paragraph>
                                    </Card.Content>
                                    <Card.Actions>
                                        <Button onPress={() => {
                                            navigation.navigate('Details', {
                                                projeto: item,
                                            });
                                        }}>Ver</Button>
                                        <Button onPress={() => navigation.navigate('Edit', { projeto: item })}>Editar</Button>
                                        <Button onPress={() => showDialog(item.id)}>Deletar</Button>
                                    </Card.Actions>
                                </Card>
                                </TouchableOpacity>
                            )}
                        />
                        <Portal>
                            <Dialog visible={visible} onDismiss={hideDialog}>
                                <Dialog.Content>
                                    <Paragraph>Deseja realmente deletar esse projeto?</Paragraph>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={hideDialog}>Não</Button>
                                    <Button onPress={deleteData}>Sim</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
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