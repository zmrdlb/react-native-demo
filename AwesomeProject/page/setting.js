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

 import VerifyInput from '../common/verify/verifyinput';
 import VerifyPassword from '../common/verify/verifypassword';

 export default class Setting extends Component {
     constructor(props){
         super(props);
         this.state = {
             username: '',
             age: '20',
             password: '',
             errmsg: {
                 username: '',
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
                    maxLength={10}
                    selectionColor="#007eff"
                    autoFocus={true}
                    value={this.state.username}
                    onChangeText={(username) => this.setState({username})}
                    onEndEditing={(e) => {
                        this._verifyresult('username');
                    }}

                    required={true}
                    minLength={5}
                    maxLength={10}
                    errmsg={{
                        required: '姓名不能为空'
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
                        //console.log('age end');
                        //console.log(e.nativeEvent.text);
                        //this._verify.age.verify();
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
                        this._verifyresult('password',e.nativeEvent.text);
                    }}

                    required={true}
                    minLength={6}
                />
             </View>
         );
     }

     //控制不要重复渲染
     shouldComponentUpdate(nextProps,nextState){
         return nextProps.viewrender;
     }

     componentDidMount(){
         this._verify = {};
         this._verify.username = new VerifyInput(this.refs.username);
         this._verify.password = new VerifyPassword(this.refs.password);
        //  this._verify.age = new VerifyInput(this.refs.age,{
        //      errnode: this.refs.errmsgAge
        //  });
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
    }
});
