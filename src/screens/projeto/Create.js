import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider as PaperProvider, Card, TextInput, Button, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { styles, theme } from '../../components/Styles';
import api from '../../services/api';

export default function ProjetoCreate({ navigation }) {

    const [titulo, setTitulo] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [dataPrevisaoEntrega, setDataPrevisaoEntrega] = React.useState('');

    const [dataPicker, setDataPicker] = React.useState(new Date());

    const [hasError, setHasError] = React.useState(false);
    const [show, setShow] = React.useState(false);

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

    const salvar = () => {
        if (titulo.length == 0 || dataPrevisaoEntrega.length == 0) {
            setHasError(true);
        } else {
            fetch(api + 'projeto', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: titulo,
                    descricao: descricao,
                    dataPrevisaoEntrega: format(new Date(dataPicker), 'yyyy-MM-dd')
                })
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.errors.length != 0) {
                        alert(json.errors[0]);
                    } else {
                        navigation.navigate('Home');
                    }
                })
                .catch(() => alert('Não foi possível criar o projeto'));
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
                    <HelperText type="error" visible={hasError}>
                        Os campos com * são obrigatórios e não podem ser vazios.
                    </HelperText>
                    <Button style={styles.button} labelStyle={styles.buttonLabel} onPress={salvar}>Salvar</Button>
                </Card>
            </View>
        </PaperProvider>
    );
}