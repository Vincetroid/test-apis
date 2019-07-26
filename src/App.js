import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

class App extends Component {

    componentDidMount() {
        axios.post('https://platform.fatsecret.com/rest/server.api')
            .then(response => {
                console.log('Respuesta gral')
                console.log(response.data) 
            });

        axios.get('https://platform.fatsecret.com/rest/server.api?oauth_signature_method=HMAC-SHA1')
            .then(response => {
                console.log('Respuesta oauth_signature_method')
                console.log(response.data) 
            });

        // fetch('https://platform.fatsecret.com/rest/server.api')
        //     .then(response => console.log(response.json())
        //     .then(responseJson => console.log(responseJson))
        //     .catch(error => console.error('Mensaje de error: ' + error))

        axios.get('https://platform.fatsecret.com/rest/server.api?a=foo&oauth_consumer_key=oauth_consumer_key&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1564181121&oauth_nonce=mbn&oauth_version=1.0')
            .then(response => {
                console.log('OAuth 1.0')
                console.log(response.data)
            })
            .catch(error => {
                console.log('Respuesta de error')
                console.log(error);
            });
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