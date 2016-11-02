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
import Tabbar from '../comp/tabbar';

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
                  <View style={gstyle.layCenterCon}>
                      <Mytext style={[gstyle.layCenterSection,styles.welcome]}>Welcome to ZMRApp</Mytext>
                      <Mytext style={[gstyle.layCenterSection]}>用户名：{this.state.username}</Mytext>
                      <Link style={[gstyle.layCenterSection]}
                          onPress={this._onPress.bind(this)}>点我跳转到个人主页
                      </Link>
                      <BottomSelector ref="bottomSelector" navigator={this.props.navigator} itemclickCal={this.onSelectorItemClick.bind(this)} />
                  </View>
                  <Tabbar curtab="home"></Tabbar>
              </View>
        );
    }

    _onPress() {
        const {navigator} = this.props;
        navigator.push({
            name: 'owner',
            params: {
                from: 'main:首页',
                setUser: function(username){
                    this.setState({
                        username: username
                    });
                }.bind(this)
            }
        });
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
