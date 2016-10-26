/**
 * 全局css
 */
 import {
    StyleSheet
 } from 'react-native';

 export default StyleSheet.create({
    //根容器view样式，相当于设置body的样式
    root: {
        flex: 1,
        paddingTop: 64
    },
    //basefont
    basefont: {
      fontSize: 16,
      color: '#333'
    },
    /*简单整体居中布局*/
    //容器
    layCenterCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    //每个块
    layCenterSection: {
        marginBottom: 10
    }
 });
