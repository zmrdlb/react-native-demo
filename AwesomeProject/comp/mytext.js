//公共textAlign
import React, { Component } from 'react';
import {
  Text
} from 'react-native';
import GlobalStyle from '../static/common/global';

export default class Mytext extends Component {
    render(){
        return (
            <Text style={[GlobalStyle.basefont,...this.props.style]}>{this.props.children}</Text>
        );
    }
}
