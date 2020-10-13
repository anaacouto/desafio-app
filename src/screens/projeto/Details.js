import * as React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Provider as PaperProvider, ActivityIndicator, Colors, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { format, addDays } from 'date-fns';
import api from '../../services/api';
import { stylesDetails as styles } from '../../components/Styles';


export default function ProjetoDetails({ route, navigation }) {

  const [isLoading, setLoading] = React.useState(true);

  const [data, setData] = React.useState([]);

  const { projeto } = route.params;

  async function getData () {
    try {
      const response = await api.get('tarefa/projeto/' + projeto.id);
      setLoading(false);
      setData(response.data.data);
    } catch (error) {
      alert(error.response.data.errors[0]);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.view}>
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph style={{color: '#000'}}>{projeto.descricao}</Paragraph>
            <Paragraph style={{ fontWeight: "bold", fontSize: 16, color: '#000' }}>Data prevista para entrega: {format(addDays(new Date(projeto.dataPrevisaoEntrega), 1), 'dd-MM-yyyy')}</Paragraph>
            <Paragraph style={{ color: projeto.status ? '#228B22' : '#FF0000', fontWeight: 'bold' }}>{projeto.status ? 'Entregue' : 'Em andamento'}</Paragraph>
          </Card.Content>
          <Card.Actions>
          <Button onPress={() => navigation.navigate('Edit', { projeto: projeto })}>Editar</Button>
          </Card.Actions>
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
              <RefreshControl refreshing={isLoading} onRefresh={() => getData()} />
            }
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Content>
                  <Title style={{color: '#000'}}>{item.titulo}</Title>
                  <Paragraph style={{color: '#000'}}>{item.descricao}</Paragraph>
                  <Paragraph style={{ color: item.status ? '#228B22' : '#FF0000', fontWeight: 'bold' }}>{item.status ? 'Concluída' : 'Em andamento'}</Paragraph>
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
