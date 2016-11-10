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

import Home from './home';
import List from './list';

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
            selectedIcon: require('../static/common/home.selected.png'),
            viewrender: true,
            comp: Home
        },{
            name: 'message',
            title: '通知',
            icon: require('../static/common/message.png'),
            selectedIcon: require('../static/common/message.selected.png'),
            badgeText: 1,
            renderBadge: true,
            viewrender: true,
            comp: List
        },{
            name: 'owner',
            title: '我的',
            icon: require('../static/common/owner.png'),
            selectedIcon: require('../static/common/owner.selected.png'),
            viewrender: true
        }];
    }
    /**
     * 渲染每个tab对应的view.初始化会全部渲染，每次点击tab(最终判断是selected属性变化)也会全部重新渲染
     * 虽然每次都重复渲染，但是待渲染的组件已经初始化过，则不会重复调用相应的componentDidMount方法
     */
    renderItemView(index){
        var item = this.tablist[index];
        var viewrender = item.viewrender;
        if(item.viewrender){ //控制是否应该重新渲染
            item.viewrender = false;
        }
        if(index != 2){
            let Comp = item.comp;
            var _p = this.props;
            return <Comp {...this.props} viewrender={viewrender} ></Comp>
        }else{
            return (
                <View style={styles.itemCon}><Text style={styles.text}>{item.title}</Text></View>
            );
        }
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
                    onPress={()=>{ //首次不会触发onpress,点击后触发。而且点击当前已经selected的tab也会触发
                        //加了控制，避免重复点击已选中的tab。实验证明，只有selected属性改变的时候，才会触发tab全部渲染，包括对应的view
                        if(this.state.selectedTab !== item.name){
                            console.log('onpress');
                            this.setState({selectedTab: item.name})
                        }
                    }}
                >

                    {this.renderItemView.bind(this)(index)}
                </TabNavigator.Item>
            );
        });
    }

    render() {
        return (
            <TabNavigator sceneStyle={styles.scene} tabBarStyle={styles.tabbar}>
                {this.renderTabItem()}
            </TabNavigator>
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
