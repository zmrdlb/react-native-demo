/**
 * 首页
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';
import Mytext from '../comp/mytext';
import Link from '../comp/link';
import BottomSelector from '../comp/bottomSelector';
import Tabbar from './tabbar';

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  }
});

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '未获取'
        };
    }
    render() {
        const gstyle = this.props.globalstyle;
        return (
              <View style={{flex: 1}}>
                  <Tabbar curtab="home" {...this.props} ></Tabbar>
                  <BottomSelector ref="bottomSelector" navigator={this.props.navigator} itemclickCal={this.onSelectorItemClick.bind(this)} />
              </View>
        );
    }

    onSelectorItemClick(txt){
        //Alert.alert('系统消息','选择了'+txt);
    }
    rightcall() {
        this.refs.bottomSelector.toggle();
    }

    componentDidMount() {
        this.props.route.rightcall = this.rightcall.bind(this);
    }
}
