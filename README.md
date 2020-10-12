# desafio-app

Aplicação mobile feita em React Native consumindo da api [deste repositório](https://github.com/anaacouto/desafio-api), portanto é necessário ter a API executando para a execução do projeto. A aplicação foi feita para criar projetos e tarefas associadas, utilizando-se da ferramenta **Expo** durante o desenvolvimento. Abaixo seguem-se instruções para a instalação e execução do projeto:

### React Native e Expo

Haja visto que a aplicação é feita em react native, é necessário tê-lo instalado na sua máquina. Caso não tenha, basta seguir a [documentação oficial](https://reactnative.dev/docs/environment-setup) para instalar. Na documentação também consta os passos para a instalação do Expo que é utilizado aqui para emular/executar a aplicação. Você também deve ter instalado o aplicativo **Expo** em seu android ou iphone. Também é necessário que você tenha o **npm** instalado.

Depois de clonar o projeto e acessar a pasta do mesmo, será necessário executar primeiramente o comando abaixo num terminal para a instalação das dependências utilizadas:

```
npm install
```

O comando acima irá instalar todas as dependências que a aplicação precisa para ser executada e pode demorar um pouco dependendo da velocidade da sua internet.

Após a finalização do comando, abra o projeto num editor de código de sua preferência e acesse o arquivo *api.js* localizado em *src/services*. Dentro do arquivo, substitua o *localhost* pelo ip da sua máquina que está executando a [API](https://github.com/anaacouto/desafio-api) e, caso ela esteja executando em alguma porta que não seja a *8080* altere também essa numeração para a correspondente.

Também é necessário alterar o seguinte arquivo *local.properties*, ele está localizando dentro da pasta *android*. Substitua o caminho dentro de *sdk.dir=* para o caminho que está localizado o sdk do android em sua máquina.

Após esses passos, é necessário acessar novamente o projeto em um terminal e executar o comando abaixo:

```
expo start
```

O comando irá iniciar a sua aplicação pronta para ser lida pelo aplicativo da Expo que deve estar previamente instalado em seu celular. Com a execução desse comando irá aparecer na tela do seu terminal um *qrcode*. Caso esteja usando um smartphone android, basta scanear o qrcode através da opção "*scan QR Code*" dentro do aplicativo Expo. Caso esteja usando um iphone, utilize a câmera para scanear e abrir o aplicativo no Expo (também é necessário a prévia instalação do app Expo).

Caso prefira executar no seu android utilizando o cabo usb, utilize o comando a seguir:

```
react-native run-android
```

