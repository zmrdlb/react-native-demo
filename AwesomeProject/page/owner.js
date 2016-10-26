/**
 * 个人主页
 */
 import React, { Component } from 'react';
 import {
   View
 } from 'react-native';
 import Mytext from '../comp/mytext';
 import Link from '../comp/link';

 export default class Owner extends Component {
   render() {
       const gstyle = this.props.globalstyle;
       return (
             <View style={gstyle.layCenterCon}>
                 <Mytext style={[gstyle.layCenterSection,gstyle.basefont]}>来源：{this.props.from}</Mytext>
                 <Link style={[gstyle.layCenterSection]}
                     onPress={this._onPress.bind(this)}>点我返回
                 </Link>
             </View>
       );
   }

   _onPress() {
       const {navigator,setUser} = this.props;
       setUser('zmrdlb');
       navigator.pop();
   }
 }
