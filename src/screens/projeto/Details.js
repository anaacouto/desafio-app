import * as React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Provider as PaperProvider, ActivityIndicator, Colors, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { format, addDays } from 'date-fns';
import api from '../../services/api';
import { stylesDetails as styles } from '../../components/Styles';
import CardContent from '../../components/CardContent';
import DeleteDialog from '../../components/DeleteDialog';
import Toast from 'react-native-simple-toast';


export default function ProjetoDetails({ route, navigation }) {

  const { projeto } = route.params;

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
      const response = await api.get('tarefa/projeto/' + projeto.id);
      setLoading(false);
      setData(response.data.data);
    } catch (error) {
      alert(error.response.data.errors[0]);
    }
  }

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

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.view}>
        <Card style={styles.card}>
          <CardContent
            description={projeto.descricao}
            description2={"Data de entrega: " + format(addDays(new Date(projeto.dataPrevisaoEntrega), 1), 'dd-MM-yyyy')}
            status={projeto.status}
          />
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Edit', { projeto: projeto })}>Editar</Button>
          </Card.Actions>
        </Card>
        <Card>
          <Card.Title style={{ color: '#000', backgroundColor: '#fff' }}
            title="Tarefas" titleStyle={{ color: '#000' }} />
        </Card>
        {isLoading ? <ActivityIndicator animating={true} color={Colors.red800} /> : (
          <>
            <FlatList
              style={styles.flatList}
              data={data}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={() => getData()} />
              }
              keyExtractor={({ id }, index) => id.toString()}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <CardContent
                    title={item.titulo}
                    description={item.descricao}
                    description2={"Projeto: " + item.projeto.titulo}
                    status={item.status}
                  />
                  <Card.Actions>
                    <Button onPress={() => navigation.navigate('TarefaEdit', { projeto: projeto, tarefa: item })}>Editar</Button>
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
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('TarefaCreate', { projeto: projeto })}
        />
      </View>
    </PaperProvider>
  );
}
