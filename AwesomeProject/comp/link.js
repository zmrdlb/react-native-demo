//公共link
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';
import GlobalStyle from '../static/common/global';

const styles = StyleSheet.create({
    textActive: {
        color: 'orange',
        fontWeight: 'bold'
    }
});

export default class Link extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false //high是否处于活动
        };
    }
    render(){
        return (
            <TouchableHighlight style={this.props.style}
                underlayColor="#f6e2b2" activeOpacity={0.8}
                onShowUnderlay={this.onhighshow.bind(this)}
                onHideUnderlay={this.onhighhide.bind(this)}
                onPress={this.props.onPress}>
                <Text style={[GlobalStyle.basefont,this.state.active && styles.textActive]}>{this.props.children}</Text>
            </TouchableHighlight>
        );
    }
    //highlight显示时调用
    onhighshow() {
        this.setState({
            active: true
        });
    }
    //highlight隐藏时调用
    onhighhide() {
        this.setState({
            active: false
        });
    }
}
