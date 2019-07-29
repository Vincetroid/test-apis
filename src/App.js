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
        return axios.get(`${API_PATH}?${qs.stringify(queryParams)}`, { method: httpMethod }).then(response => {
            console.log('With axios')
            // console.log(response.data)
            return response.data;
        })
        .catch(error => {
            console.log('Respuesta de error')
            console.log(error);
            return error;
        });
            
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
            
        return response;
        // .then(response => {
        //     console.log('With axios')
        //     console.log(response.data)
        // })
        // .catch(error => {
        //     console.log('Respuesta de error')
        //     console.log(error);
        // });
    }

    async createProfile() {
        const methodParams = {
            method: 'profile.create'
        };

        const response = await this.makeApiCall(methodParams);

        console.log('response createProfile', response)

        return response;
    }

    async getProfile() {
        const methodParams = {
            method: 'profile.get'
        }

        const response = await this.makeApiCall(methodParams);

        console.log('response getProfile', response);

        return response;
    }

    componentDidMount() {
        // console.log(API_PATH)
        // console.log(this.getOauthParameters())
        // console.log('Food: ')
        // console.log(this.getFood(33691));
        console.log('Comida', this.getFood(33691));

        console.log('Crear perfil', this.createProfile())

        console.log('Obtener perfil', this.getProfile())
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