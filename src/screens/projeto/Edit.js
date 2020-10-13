import * as React from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Provider as PaperProvider, Card, TextInput, Button, RadioButton, HelperText } from 'react-native-paper';
import api from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, addDays } from 'date-fns';
import { styles, theme } from '../../components/Styles';

export default function ProjetoEdit({ route, navigation }) {

    const { projeto } = route.params;

    const [titulo, setTitulo] = React.useState(projeto.titulo);
    const [descricao, setDescricao] = React.useState(projeto.descricao);
    const [dataPrevisaoEntrega, setDataPrevisaoEntrega] = React.useState(format(addDays(new Date(projeto.dataPrevisaoEntrega), 1), 'dd-MM-yyyy'));
    const [status, setStatus] = React.useState(projeto.status.toString());

    const [dataPicker, setDataPicker] = React.useState(addDays(new Date(projeto.dataPrevisaoEntrega), 1));
    const [show, setShow] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    const onChange = (event, selectedDate) => {
        if (selectedDate != undefined) {
            const selected = format(new Date(selectedDate), 'dd-MM-yyyy');
            setDataPrevisaoEntrega(selected);
            setDataPicker(selectedDate);
        } else {
            setDataPicker(dataPicker);
        }
        setShow(false);
    };

    async function salvar () {
        if (titulo.length == 0 || dataPrevisaoEntrega.length == 0) {
            setHasError(true);
        } else {
            try {
                const response = await api.put('projeto', {
                    id: projeto.id,
                        titulo: titulo,
                        descricao: descricao,
                        dataPrevisaoEntrega: format(new Date(dataPicker), 'yyyy-MM-dd'),
                        status: status
                });
                navigation.navigate('Home');
            } catch (error) {
                alert(error.response.data.errors[0]);
            }
        }
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Card style={styles.card}>
                    <TextInput
                        style={styles.input}
                        label="Título do Projeto *"
                        value={titulo}
                        underlineColor='#808080'
                        theme={theme}
                        onChangeText={titulo => setTitulo(titulo)}
                    />
                    <TextInput
                        style={styles.input}
                        label="Descrição do Projeto"
                        value={descricao}
                        underlineColor='#808080'
                        theme={theme}
                        onChangeText={descricao => setDescricao(descricao)}
                    />
                    <TextInput
                        style={styles.input}
                        label="Data da Previsão de Entrega *"
                        value={dataPrevisaoEntrega.toString()}
                        underlineColor='#808080'
                        theme={theme}
                        onTouchStart={() => setShow(true)}
                        onTouchEnd={() => setShow(false)}
                    />
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dataPicker}
                            mode="date"
                            display="default"
                            onChange={onChange}
                            onTouchEnd={() => setShow(false)}
                        />
                    )}
                    <Text style={{ marginLeft: 16 }}>Projeto entregue?</Text>
                    <RadioButton.Group onValueChange={status => setStatus(status)} value={status}>
                        <RadioButton.Item color='#000080' label="Sim" value="true" />
                        <RadioButton.Item color='#000080' label="Não" value="false" />
                    </RadioButton.Group>
                    <HelperText type="error" visible={hasError}>
                        Os campos com * são obrigatórios e não podem ser vazios.
                    </HelperText>
                    <Button style={styles.button} labelStyle={styles.buttonLabel} onPress={salvar}>Salvar</Button>
                </Card>
            </View>
        </PaperProvider>
    );
}