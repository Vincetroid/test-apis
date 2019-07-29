import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import qs from 'query-string';
import hmacsha1 from 'hmacsha1';
import { API_PATH, ACCESS_KEY, OAUTH_SIGNATURE_METHOD, OAUTH_VERSION, APP_SECRET } from './constants';

class App extends Component {

    getOauthParameters() {
        // debugger;
        const timestamp = Math.round(new Date().getTime() / 1000);
        return {
          oauth_consumer_key: ACCESS_KEY,
          oauth_nonce: `${timestamp}${Math.floor(Math.random() * 1000)}`,
          oauth_signature_method: OAUTH_SIGNATURE_METHOD,
          oauth_timestamp: timestamp,
          oauth_version: OAUTH_VERSION,
        };
    }

    getSignature(queryParams, httpMethod = 'GET') {
        const signatureBaseString = [
            httpMethod,
            encodeURIComponent(API_PATH),
            encodeURIComponent(qs.stringify(queryParams)),
        ].join('&');

        console.table('signatureBaseString', signatureBaseString)
        const signatureKey = `${APP_SECRET}&`;
        const nnn = hmacsha1(signatureKey, signatureBaseString);
        console.log('nnn', nnn)
        return nnn;
    }

    makeApiCall(methodParams, httpMethod = 'GET') {
        const queryParams = {
            ...this.getOauthParameters(),
            ...methodParams,
            format: 'json',
        };
        queryParams['oauth_signature'] = this.getSignature(queryParams, httpMethod);
        console.log('queryParams', queryParams)
        console.log('qs stringified', qs.stringify(queryParams))
        // return fetch(`${API_PATH}?${qs.stringify(queryParams)}`, { method: httpMethod });
        // return fetch(`${API_PATH}?${qs.stringify(queryParams)}`, { method: httpMethod });
        // "https://platform.fatsecret.com/rest/server.api?food_id=33691&format=json&method=food.get&oauth_consumer_key=2cd910c9a7234f34b4b72415855f3662&oauth_nonce=1564419767245&oauth_signature=4ZVr5VKy8P4sgzbYn1MQzKOFzMU%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1564419767&oauth_version=1.0"
        return axios.get(`${API_PATH}?${qs.stringify(queryParams)}`, { method: httpMethod })
            
    }
    // }


    async getFood(foodId) {
    // async getFood(foodId) {
        const methodParams = {
          method: 'food.get',
          food_id: foodId,
        };
        // debugger;
        const response = await this.makeApiCall(methodParams);
        console.log('response', response)
        // return response.json();
        console.log('response.data', response.data)
        return response.data;
        // .then(response => {
        //     console.log('With axios')
        //     console.log(response.data)
        // })
        // .catch(error => {
        //     console.log('Respuesta de error')
        //     console.log(error);
        // });
    }

    componentDidMount() {
        // axios.post('https://platform.fatsecret.com/rest/server.api')
        //     .then(response => {
        //         console.log('Respuesta gral')
        //         console.log(response.data) 
        //     });

        // axios.get('https://platform.fatsecret.com/rest/server.api?oauth_signature_method=HMAC-SHA1')
        //     .then(response => {
        //         console.log('Respuesta oauth_signature_method')
        //         console.log(response.data) 
        //     });

        // fetch('https://platform.fatsecret.com/rest/server.api')
        //     .then(response => console.log(response.json())
        //     .then(responseJson => console.log(responseJson))
        //     .catch(error => console.error('Mensaje de error: ' + error))

        //signature
        // axios.post('https://platform.fatsecret.com/rest/server.api?a=foo&oauth_consumer_key=2cd910c9a7234f34b4b72415855f3662&oauth_nonce=abc&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1564181121&oauth_version=1.0&z=bar')
        //     .then(response => {
        //         console.log('Signature')
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.log('Respuesta de error')
        //         console.log(error);
        //     });

        // //signature encoded
        // axios.post('https%3A%2F%2Fplatform.fatsecret.com%2Frest%2Fserver.api')
        //     .then(response => {
        //         console.log('Signature encoded')
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.log('Respuesta de error Signature encoded')
        //         console.log(error);
        //     });

        // //signature encoded
        // axios.post('https%3A%2F%2Fplatform.fatsecret.com%2Frest%2Fserver.api&a%3Dfoo%26oauth_consumer_key%3D2cd910c9a7234f34b4b72415855f3662%26oauth_nonce%3Dabc%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1564181121%26oauth_version%3D1.0%26z%3Dbar')
        //     .then(response => {
        //         console.log('Signature encoded')
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.log('Respuesta de error')
        //         console.log(error);
        //     });

        // axios.get('https://platform.fatsecret.com/rest/server.api?food_id=33691&method=food.get&oauth_consumer_key=2cd910c9a7234f34b4b72415855f3662&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1564181121&oauth_nonce=mbn&&oauth_signature=65738f57fc2e47d29d12605326322990&oauth_version=1.0')
        //     .then(response => {
        //         console.log('OAuth 1.0')
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.log('Respuesta de error')
        //         console.log(error);
        //     });
        
        // const timestamp = Math.round(new Date().getTime() / 1000);
        // axios.get('https://platform.fatsecret.com/rest/server.api?food_id=33691&format=json&method=food.get&oauth_consumer_key=2cd910c9a7234f34b4b72415855f3662&oauth_nonce=1564419767245&oauth_signature=4ZVr5VKy8P4sgzbYn1MQzKOFzMU%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp=' + timestamp + '&oauth_version=1.0')
        //     .then(response => {
        //         console.log('With axios')
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.log('Respuesta de error')
        //         console.log(error);
        //     });

        console.log(API_PATH)
        console.log(this.getOauthParameters())
        console.log('Food: ')
        console.log(this.getFood(33691));
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