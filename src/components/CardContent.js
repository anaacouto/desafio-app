import * as React from 'react';
import { Card, Title, Paragraph} from 'react-native-paper';

export default function TarefaCardContent(props) {
    return (
        <Card.Content>
            <Title style={{ color: '#000' }}>{props.title}</Title>
            <Paragraph style={{ color: '#000' }}>{props.description}</Paragraph>
            <Paragraph style={{ fontWeight: "bold", color: '#000' }}>{props.description2}</Paragraph>
            <Paragraph style={{ color: props.status ? '#228B22' : '#FF0000', fontWeight: 'bold' }}>{props.status ? 'Entregue' : 'Em andamento'}
            </Paragraph>
        </Card.Content>
    );
}