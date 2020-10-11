import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import ProjetoCreate from './src/screens/projeto/Create';
import ProjetoDetails from './src/screens/projeto/Details';
import ProjetoEdit from './src/screens/projeto/Edit';
import TarefaCreate from './src/screens/tarefa/Create';
import TarefaEdit from './src/screens/tarefa/Edit';


const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>{
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Create" component={ProjetoCreate}
                    options={{ title: 'Criar projeto' }} />
                <Stack.Screen name="Details" component={ProjetoDetails}
                    options={({ route }) => ({ title: route.params.projeto.titulo })} />
                <Stack.Screen name="Edit" component={ProjetoEdit}
                    options={{ title: 'Editar projeto' }} />
                    <Stack.Screen name="TarefaCreate" component={TarefaCreate}
                    options={{ title: 'Criar Tarefa' }} />
                <Stack.Screen name="TarefaEdit" component={TarefaEdit}
                    options={{ title: 'Editar tarefa' }} />
            </Stack.Navigator>
        }</NavigationContainer>
    );
}