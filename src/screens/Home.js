import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProjetoList from './projeto/List';
import TarefaList from './tarefa/List';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Home() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Projetos') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Tarefas') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#000080',
          inactiveTintColor: 'gray',
        }}
        >
          <Tab.Screen name="Projetos" component={ProjetoList} />
          <Tab.Screen name="Tarefas" component={TarefaList} />
        </Tab.Navigator>
    );
}
