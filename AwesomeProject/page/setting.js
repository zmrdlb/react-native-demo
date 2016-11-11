/**
 * 设置页面
 */
 import React, { Component } from 'react';
 import {
   StyleSheet,
   View,
   Alert,
   Text,
   TextInput
 } from 'react-native';

 export default class Setting extends Component {
     constructor(props){
         super(props);
         this.state = {
             username: '',
             age: '20'
         };
     }

     render() {
         return (
             <View style={styles.container}>
                <Text style={styles.text}>username: {this.state.username}</Text>
                <TextInput style={styles.input}
                    placeholder="姓名"
                    maxLength={10}
                    selectionColor="#007eff"
                    autoFocus={true}
                    value={this.state.username}
                    onChangeText={(username) => this.setState({username})}
                />
                <Text style={styles.text}>age: {this.state.age}</Text>
                <TextInput style={styles.input}
                    placeholder="年龄"
                    keyboardType="numeric"
                    value={this.state.age}
                    onChangeText={(age) => {
                        console.log('age change');
                        this.setState({age})
                    }}
                    onEndEditing={(e) => { //当输入框失去焦掉，或者submit时调用
                        console.log('age end');
                        console.log(e.nativeEvent.text);
                    }}
                />
             </View>
         );
     }

     //控制不要重复渲染
     shouldComponentUpdate(nextProps,nextState){
         return nextProps.viewrender;
     }
 }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        padding: 20
    },
    text: {
        marginBottom: 10
    },
    //经测试，height和width包含了padding和border
    //但是如果设置了padding,则border会盖在padding上
    input: {
        fontSize: 16,
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 20
    }
});
