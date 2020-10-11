import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Provider as PaperProvider, ActivityIndicator, Colors, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import api from '../../services/api';
import { stylesDetails as styles } from '../../components/Styles';

export default function ProjetoDetails({ route, navigation }) {

  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const { projeto } = route.params;

  const url = api + 'tarefa/projeto/' + projeto.id;

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => getData(), []);

  return (
    <PaperProvider>
      <View style={styles.view}>
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph style={{color: '#000'}}>{projeto.descricao}</Paragraph>
            <Paragraph style={{ fontWeight: "bold", fontSize: 16, color: '#000' }}>Data de entrega: {projeto.dataPrevisaoEntrega}</Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Title style={{color: '#000', backgroundColor: '#fff'}}
            title="Tarefas" titleStyle={{color: '#000'}} />
        </Card>
        {isLoading ? <ActivityIndicator animating={true} color={Colors.red800} /> : (
          <FlatList
            style={styles.flatList}
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
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => navigation.navigate('TarefaEdit', { projeto: projeto, tarefa: item })}>Editar</Button>
                  <Button onPress={() => console.log("delete")}>Deletar</Button>
                </Card.Actions>
              </Card>
            )}
          />
        )}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('TarefaCreate', {projeto: projeto})}
        />
      </View>
    </PaperProvider>
  );
}
