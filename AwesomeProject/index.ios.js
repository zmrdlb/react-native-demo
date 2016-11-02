/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  Navigator,
  Text
} from 'react-native';
import GlobalStyle from './static/common/global';

import Util from './common/util';

import Main from './page/main';
import Owner from './page/owner';
import List from './page/list';

class AwesomeProject extends Component {
  static _compMap = {
      'main': {
          title: '首页',
          comp: Main
      },
      'owner': {
          title: '个人主页',
          comp: Owner
      },
      'list': {
          title: '列表页',
          comp: List
      }
  }
	render() {
		return (
			<Navigator
				initialRoute = {{name: 'main'}}
				renderScene = {(route,navigator) => {
                      let item = AwesomeProject._compMap[route.name];
                      Util.merge(route,item,false,false);
    					let Comp = item.comp;
    					return (
                              <View style={GlobalStyle.root}>
                                  <Comp {...route.params} navigator={navigator} route={route} globalstyle={GlobalStyle} />
                              </View>
                        );
				}}
                navigationBar = {
                    <Navigator.NavigationBar
                        routeMapper = {{
                            LeftButton: (route,navigator,index,navState) => {
                                if(index == 0){
                                    return null;
                                }
                                return (
                                    <Text style={[NavigatorStyle.font,NavigatorStyle.left]} onPress={()=>{
                                        navigator.pop();
                                    }}>返回</Text>
                                )
                            },
                            RightButton: (route,navigator,index,navState) => {
                                return (
                                    <Text style={[NavigatorStyle.font,NavigatorStyle.right]} onPress={() => {
                                        if(route.rightcall){
                                            route.rightcall();
                                        }
                                    }}>...</Text>
                                )
                            },
                            Title: (route,navigator,index,navState) => {
                                return (<Text style={[NavigatorStyle.font,NavigatorStyle.title]}>{route.title}</Text>)
                            }
                        }}
                        style = {NavigatorStyle.root}
                    />
                }
			/>


		);
	}
}

/**
 * 导航样式
 * @type {Object}
 */
const NavigatorStyle = {
    //根容器
    root: {
        backgroundColor: 'blue'
    },
    font: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 10
    },
    left: {
        paddingLeft: 10
    },
    right: {
        paddingRight: 10,
        position: 'relative',
        top: -5
    },
    title: {
    }
};

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
