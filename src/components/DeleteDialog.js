import * as React from 'react';
import { Provider as PaperProvider, ActivityIndicator, Colors, Button, Paragraph, Searchbar, Dialog, Portal } from 'react-native-paper';

export default function DeleteDialog(props) {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.hideDialog}>
                <Dialog.Content>
                    <Paragraph>{props.content}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={props.hideDialog}>Não</Button>
                    <Button onPress={props.deleteData}>Sim</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}