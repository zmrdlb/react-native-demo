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

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  }
});

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '未获取'
        };
    }
    render() {
        const gstyle = this.props.globalstyle;
        return (
              <View style={gstyle.layCenterCon}>
                  <Mytext style={[gstyle.layCenterSection,styles.welcome]}>Welcome to ZMRApp</Mytext>
                  <Mytext style={[gstyle.layCenterSection]}>用户名：{this.state.username}</Mytext>
                  <Link style={[gstyle.layCenterSection]}
                      onPress={this._onPress.bind(this)}>点我跳转到个人主页
                  </Link>
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

    componentDidMount() {
        console.log('home didmount');
    }

    //控制不要重复渲染
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.viewrender;
    }
}
