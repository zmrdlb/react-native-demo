/**
 * 底部滑上去的pick, 就像html select
 */
import React, {Component} from 'react';
import {
    StyleSheet,View,Picker,Animated,Easing,TouchableOpacity
} from 'react-native';

/**
 * props 说明
 *      pickdata = {
 *          selectedValue: pick当前选中值
 *          list: [{
 *              label
 *              value
 *          }]
 *      }
 *
 *      onValueChange {Function} (value)
 */
export default class PickBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            hide: true //当前组件是否隐藏
        };
    }
    render() {
        if(this.state.hide){
            return null;
        }else{
            return (
                <View style={[styles.container]}>
                    <Animated.View style={[styles.mask]}>
                        <TouchableOpacity style={{flex: 1}} onPress={() => {
                            this.out();
                        }}></TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[styles.pickcon, {
                        transform: [{
                            translateY: this.state.offset.interpolate({
                                inputRange: [0,1],
                                outputRange: [300,0]
                            })
                        }]
                    }, {
                        opacity: this.state.opacity
                    }]}>
                        <Picker
                            style={styles.pick}
                            selectedValue={this.props.pickdata.selectedValue}
                            onValueChange={(value) => {
                                this.props.onValueChange(value);
                            }}>
                            {this.props.pickdata.list.map((item,i) => {
                                return <Picker.Item key={i} label={item.label} value={item.value} />;
                            })}
                        </Picker>
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
    pickcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 300,
        backgroundColor: '#fff'
    },
    pick: {
        justifyContent: 'center',
        //maxHeight: 300
        flex: 1
    }
 });
