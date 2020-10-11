import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc',
    },
    card: {
        margin: 16,
        backgroundColor: '#fff',
        color: '#000'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#000080'
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 10,
        marginHorizontal: 16
    },
    button: {
        backgroundColor: '#000080',
        margin: 16
    },
    buttonLabel: {
        color: '#fff'
    }
});


const stylesDetails = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: '#dcdcdc'
    },
    card: {
      marginBottom: 5,
      backgroundColor: '#fff'
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: '#000080'
  },
    flatList: {
      margin: 10
    }
  });

  const theme = { colors: { text: '#000',  placeholder: '#808080' } };

export { styles, stylesDetails, theme };