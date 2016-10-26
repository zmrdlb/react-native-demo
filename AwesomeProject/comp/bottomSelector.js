/**
 * 底部滑上去的选择框
 */
import React, {Component} from 'react';
import {
    StyleSheet,View,Text,TouchableHighlight,Animated,Easing,Dimensions
} from 'react-native';
import Link from '../comp/link';

export default class BottomSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            hide: true //当前组件是否隐藏
        };
        this.listdata = [{
            txt: '列表页',
            name: 'list'
        }];
    }
    //获取选择容器的高度
    getSelectorHeight() {
        return (this.listdata.length+1) * (16+20*2+10);
    }
    //render item
    renderItem(item,i) {
        return (
            <Link style={[styles.item]} key={i} onPress={() => this.onItemClick(item,i)}>{item.txt}</Link>
        )
    }
    //单项点击
    onItemClick(item,i) {
        this.out();
        this.props.navigator.push({
            name: this.listdata[i].name
        });
        if(this.props.itemclickCal){
            this.props.itemclickCal(item.txt);
        }
    }
    render() {
        if(this.state.hide){
            return null;
        }else{
            var initBottom = this.getSelectorHeight();
            return (
                <View style={[styles.container]}>
                    <Animated.View style={[styles.mask]}>
                    </Animated.View>
                    <Animated.View style={[styles.selector, {
                        transform: [{
                            translateY: this.state.offset.interpolate({
                                inputRange: [0,1],
                                outputRange: [initBottom,0]
                            })
                        }]
                    }, {
                        opacity: this.state.opacity
                    }]}>
                        {this.listdata.map((item,i) => this.renderItem(item,i))}
                        <Link style={[styles.item]} onPress={this.out.bind(this)}>取消</Link>
                    </Animated.View>
                </View>
            );
        }
    }
    //动画－展出
    in() {
        Animated.parallel([
            Animated.timing(this.state.offset,{
                toValue: 1
            }),
            Animated.timing(this.state.opacity,{
                toValue: 1
            })
        ]).start();
    }
    //动画－收回
    out() {
        Animated.parallel([
            Animated.timing(this.state.offset,{
                toValue: 0
            }),
            Animated.timing(this.state.opacity,{
                toValue: 0
            })
        ]).start((finished) => this.setState({hide: true}));
    }
    //选择层togge
    toggle() {
        if(this.state.hide){
            this.setState({
                hide: false
            },this.in);
        }else {
            this.out();
        }

    }
}
 const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    mask: {
        backgroundColor: '#000',
        opacity: 0.4,
        flex: 1
    },
    selector: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        marginHorizontal: 20
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10
    }
 });
