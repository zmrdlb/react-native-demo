/**
 *  首页底部导航tabbar
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

export default class Tabbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: this.props.curtab || 'home'
        };
        //tab数据
        this.tablist = [{
            name: 'home',
            title: '首页',
            icon: require('../static/common/home.png'),
            selectedIcon: require('../static/common/home.selected.png')
        },{
            name: 'message',
            title: '通知',
            icon: require('../static/common/message.png'),
            selectedIcon: require('../static/common/message.selected.png'),
            badgeText: 1,
            renderBadge: true
        },{
            name: 'owner',
            title: '我的',
            icon: require('../static/common/owner.png'),
            selectedIcon: require('../static/common/owner.selected.png')
        }];
    }
    //渲染每个tab的各自页面
    renderItemView(index){
        var item = this.tablist[index];
        return (
            // <View style={styles.itemCon}><Text style={styles.text}>{item.title}</Text></View>
            <View></View>
        );
    }

    renderBadge(index) {
        var item = this.tablist[index];
        return <View style={styles.badge}><Text>{item.badgeText}</Text></View>
    }

    renderTabItem() {
        return this.tablist.map((item,index)=>{
            return (
                <TabNavigator.Item key={index}
                    selected={this.state.selectedTab === item.name}
                    title={item.title}
                    renderIcon={()=><Image source={item.icon} style={styles.icon} />}
                    renderSelectedIcon={()=><Image source={item.selectedIcon} style={styles.icon} />}
                    badgeText={item.badgeText || null}
                    renderBadge={item.renderBadge? this.renderBadge.bind(this,index): null}
                    onPress={()=>{
                        this.setState({selectedTab: item.name})
                    }}
                >

                    {this.renderItemView(index)}
                </TabNavigator.Item>
            );
        });
    }

    render() {
        return (
            <View style={{flex: 0, height: 60, overflow: 'hidden'}}>
                <TabNavigator sceneStyle={styles.scene} tabBarStyle={styles.tabbar}>
                    {this.renderTabItem()}
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        //paddingBottom: 80,
        //backgroundColor: 'green'
    },
    tabbar: {
        backgroundColor: '#6ac2e8',
        height: 60,
        alignItems: 'center'
    },
    icon: {
        width: 32,
        height: 32
    },
    itemCon: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    text: {

    },
    badge: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
