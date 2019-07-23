import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

class App extends Component {

    componentWillMount() {
        axios.get('https://platform.fatsecret.com/rest/server.api')
            .then(response => console.log(response.data));

        // fetch('https://platform.fatsecret.com/rest/server.api')
        //     .then(response => console.log(response.json())
        //     .then(responseJson => console.log(responseJson))
        //     .catch(error => console.error('Mensaje de error: ' + error))
    }

    render() {
        return(
            <View>
                <Text>Fat Secret</Text>
            </View>
        );
    }
}

export default App;