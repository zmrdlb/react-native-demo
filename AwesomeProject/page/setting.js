/**
 * 设置页面
 */
 import React, { Component } from 'react';
 import {
   StyleSheet,
   View,
   Alert,
   Text,
   TextInput,
   TouchableOpacity
 } from 'react-native';
import PickBottom from '../ui/pickBottom';

const {VerifyString,VerifyPassword,VerifyNumber} = require('react-native-form-verify');

 export default class Setting extends Component {
     constructor(props){
         super(props);
         this.state = {
             username: '',
             email: '',
             age: '10',
             password: '',
             sex: 'woman',
             errmsg: {
                 username: '',
                 email: '',
                 age: '',
                 password: ''
             }
         };
     }

     render() {
         return (
             <View style={styles.container}>
                <Text style={styles.text}>username: {this.state.username}</Text>
                {this.state.errmsg.username != '' && <Text style={[styles.text,{color: 'red'}]}>{this.state.errmsg.username}</Text>}
                <TextInput style={styles.input}
                    ref="username"
                    placeholder="姓名"
                    selectionColor="#007eff"
                    autoFocus={true}
                    value={this.state.username}
                    onChangeText={(username) => this.setState({username})}
                    onEndEditing={(e) => {
                        //this._verifyresult('username');
                    }}

                    required={true}
                    minLength={5}
                    maxLength={10}
                    errmsg={{
                        required: '姓名不能为空'
                    }}

                />

                <Text style={styles.text}>email: {this.state.email}</Text>
                {this.state.errmsg.email != '' && <Text style={[styles.text,{color: 'red'}]}>{this.state.errmsg.email}</Text>}
                <TextInput style={styles.input}
                    ref="email"
                    placeholder="邮箱"
                    selectionColor="#007eff"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                    onEndEditing={(e) => {
                        this._verifyresult('email');
                    }}

                    required={true}
                    verifytype='email'
                    errmsg={{
                        verifytype: '邮箱格式不正确'
                    }}

                />

                <Text style={styles.text}>age: {this.state.age}</Text>
                {this.state.errmsg.age != '' && <Text style={[styles.text,{color: 'red'}]}>{this.state.errmsg.age}</Text>}
                <TextInput style={styles.input}
                    ref="age"
                    placeholder="年龄"
                    keyboardType="numeric"
                    value={this.state.age}
                    onChangeText={(age) => {
                        this.setState({age})
                    }}
                    onEndEditing={(e) => { //当输入框失去焦掉，或者submit(点击enter)时调用
                        //this._verifyresult('age');
                    }}

                    required={true}
                    isinteger={true}
                    min={-1}
                    max={10}
                    //decimaldigits={2}
                    errmsg={{
                        typeerror: '此项必须是数字'
                    }}
                />

                {this.state.errmsg.password != '' && <Text style={[styles.text,{color: 'red'}]}>{this.state.errmsg.password}</Text>}
                <TextInput style={styles.input}
                    ref="password"
                    placeholder="密码"
                    secureTextEntry={true}
                    defaultValue=''

                    /**
                     * 这个例子中，没有写入以下代码，那么从props.value中是取不到值的，这个时候调用.verify(value)手动传入value值
                     */
                    // value={this.state.password}
                    // onChangeText={(password) => {
                    //     console.log(password);
                    // }}

                    onEndEditing={(e) => { //当输入框失去焦掉，或者submit(点击enter)时调用
                        this.setState({
                            password: e.nativeEvent.text
                        });
                        //this._verifyresult('password',e.nativeEvent.text);
                    }}

                    required={true}
                    minLength={6}
                />

                <TouchableOpacity
                    style={[styles.opacityitem]}
                    onPress={() => {
                        this.refs.sex.toggle();
                    }}
                    >
                        <Text style={styles.opacitytxt}>性别: {this.state.sex}</Text>
                        <Text style={styles.arrow}>></Text>
                </TouchableOpacity>
                <PickBottom ref="sex"
                    pickdata={{
                        selectedValue: this.state.sex,
                        list: [{
                            label: '男',
                            value: 'man'
                        },{
                            label: '女',
                            value: 'woman'
                        },{
                            label: '其他',
                            value: 'other'
                        }]
                    }}
                    onValueChange={(sex) => {
                        this.setState({sex});
                    }}
                >

                </PickBottom>
             </View>
         );
     }

     //控制不要重复渲染
     shouldComponentUpdate(nextProps,nextState){
         return nextProps.viewrender;
     }

     componentDidMount(){
         this._verify = {};
         this._verify.username = new VerifyString(this.refs.username);
         this._verify.email = new VerifyString(this.refs.email);
         this._verify.password = new VerifyPassword(this.refs.password);
         this._verify.age = new VerifyNumber(this.refs.age);
     }
     /**
      * verify
      * @param {String} *refname 命名
      * @param {String} val 值
      */
     _verifyresult(refname,val){
         var args = [];
         if(val != undefined){
             args = [val];
         }
         var _errmsg = this._verify[refname].verify(...args);
         if(_errmsg == null){
             _errmsg = '';
         }
         var errmsg = this.state.errmsg;
         errmsg[refname] = _errmsg;
         this.setState({
             errmsg: errmsg
         });
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
    },
    opacitytxt: {
        fontSize: 16,
        lineHeight: 40,
        flex: 1
    },
    opacityitem: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
        flexDirection: 'row'
    },
    arrow: {
        marginLeft: 10,
        lineHeight: 40
    }
});
