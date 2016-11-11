/**
 * 实用ListView组件的列表页
 */
 import React, { Component } from 'react';
 import {
   StyleSheet,
   View,
   Image,
   Text,
   ListView,
   RefreshControl,
   TouchableHighlight,
   Alert
 } from 'react-native';
 import Util from '../common/util';
 import Model from '../common/model';

 export default class List extends Component {
     constructor(props){
         super(props);
         var ds = new ListView.DataSource({
             rowHasChanged: (r1,r2) => r1 !== r2,
             sectionHeaderHasChanged: (s1,s2) => s1 !== s2
         });
         //如果是http协议，react native都不发起请求了。但是http的接口还是请求的啊。这个是在ios上测试的结果
         this.truthimg1 = 'https://facebook.github.io/react/img/logo_og1.png';
         this.truthimg2 = 'https://facebook.github.io/react/img/logo_og.png';
         this.defaultimg = require('../static/common/duola.jpg');

         this.loading = false;
         this.listsuccess = false; //list渲染是否成功

         this.state = {
             ds: ds,
             refreshing: false, //是否显示下拉刷新指示器
             firstRender: false, //首屏是否已经加载
             endloading: false, //下拉刷新数据是否正在请求
             imgrender: {}
         };

         this.initdata();
     }
     initdata() {
         this._data = {};
         this.rowIndex = 0;
         this.sectionIndex = 0;
         this.imgrender = {};
     }
     //当新数据到达时，更新DataSource
     /**
      * this._data
      * [rowdata1, rowdata2]  sectionId:s1  rowId: 0~*  cloneWithRows
      * [[rowdata1, rowdata2],[rowdata1, rowdata2]]  sectionId: 0~*  rowId: 0~*  cloneWithRowsAndSections
      */
     onDataArrived(data) {
         this._data['section'+this.sectionIndex] = data;
         this.updateDS();
         //this._data = this._data.concat(data);
         this.sectionIndex++;
     }
     updateDS(data) {
         if(data){
             this.setState({
                 ds: this.state.ds.cloneWithRowsAndSections(data)
             });
             this._data = data;
         }else{
             this.setState({
                 ds: this.state.ds.cloneWithRowsAndSections(this._data)
             });
         }
     }
     //构建数据
     createData(){
         var dataBlob = [];
         for(var i = 0; i < 10; i++){
             dataBlob.push({
                txt: 'row data '+this.rowIndex,
                imgsrc: i%2 == 0? this.truthimg1: this.truthimg2
             });
             this.rowIndex++;
         }
         return dataBlob;
     }
     //获取数据
     getData(){
         if(this.loading){
             return;
         }
         this.loading = true;
         Model.listdata({
             data: {
                 username: 'zmr',
                 sex: '女'
             },
             success: function(list){
                 this.onDataArrived(list);
                 this.listsuccess = true;
             }.bind(this),
             complete: function(){
                 var nowstate = {
                     refreshing: false,
                     endloading: false
                 };
                 if(!this.state.firstRender){
                     nowstate.firstRender = true;
                 }
                 this.setState(nowstate);
                 this.loading = false;
             }.bind(this)
         });
        //  setTimeout(() => {
        //      console.log('chuangjian ');
        //      this.onDataArrived(this.createData());
        //      var nowstate = {
        //          refreshing: false,
        //          endloading: false
        //      };
        //      if(!this.state.firstRender){
        //          nowstate.firstRender = true;
        //      }
        //      this.setState(nowstate);
        //  },1000);
     }
     /**
      * Image嵌套实现背景图。如果图片加载不出来，则默认Image不显示，即显示背景图。
      */
     renderRow(rowData,sectionId,rowId,highlightRow){
         console.log(`${sectionId}-${rowId}`);
         return (
             <TouchableHighlight onPress={()=>{
                 highlightRow(sectionId,rowId);
             }} key={`${sectionId}-${rowId}`}>
                 <View style={styles.row}>
                    <Image source={this.defaultimg} style={styles.img}>
                        <Image source={{uri: rowData.imgsrc}} style={styles.img} />
                    </Image>
                    <Text style={styles.text}>{`${rowData.txt} - ${rowId}`}</Text>
                 </View>
             </TouchableHighlight>
         );
     }
     renderSeparator(sectionId,rowId,adjacentRowHighlighted) {
         return (
             <View key={`${sectionId}-${rowId}`} style={{
                 height: adjacentRowHighlighted? 4: 1,
                 backgroundColor: adjacentRowHighlighted? '#3b5998': '#ccc'
             }}>
             </View>
         );
     }
     renderSectionHeader(sectionData,sectionId) {
         return (
             <View style={styles.section}>
                 <Text style={{color: '#fff'}}>{`this is 块 ${sectionId}`}</Text>
             </View>
         );
     }
     onEndReached(){
         if(!this.listsuccess || this.loading){
             return;
         }
         console.log('onEndReached');
         this.setState({
             endloading: true
         });
         this.getData();
     }
     /**
      * 此处默认做了防爆下拉：当refreshing为true，触发了一次onRefresh，期间再次下来，也不会重复触发onRefresh
      */
     onRefresh() {
         if(this.loading){
             return;
         }
         console.log('onRefresh');
         this.setState({
             refreshing: true
         });
         this.initdata();
         this.getData();
     }
     updatedata(newdata,start,end){
         for(var i = start; i <= end; i++){
             let key = 'section'+i;
             if(newdata[key] == undefined){
                 newdata[key] = [];
                 Util.merge(newdata[key],this._data[key]);
             }
         }
     }
     /**
      * 此处实现的要点在于this._data和rowHasChanged的配合。为什么要新建一个newdata:
      *     因为this._data是引用类型,不是原始数据类型。所以直接改变其中一项，则改变了listview里之前保存的旧数据，
      *     那么旧数据就和新数据一样，在rowHasChanged里面对比的时候，一直相等，所以数据就不会改变。
      */
     onChangeVisibleRows(visibleRows,changedRows) {
         if(!this.state.firstRender){
             return;
         }
         var newdata = {}, change = false, start = 0;
         for(var sectionId in visibleRows){
             let rowObj = visibleRows[sectionId];
             for(var rowId in rowObj){
                 rowId = Number(rowId);
                 let key = sectionId + '-' + rowId;
                 if(this._data[sectionId] && this.imgrender[key] == undefined){
                     this.imgrender[key] = true;
                     change = true;
                     if(newdata[sectionId] == undefined){
                         var end = Number(sectionId.replace('section',''));
                         this.updatedata(newdata,start,end);
                         start = end+1;
                     }
                     newdata[sectionId][rowId].imgsrc = {uri: (rowId%2 == 0? this.truthimg1: this.truthimg2)};
                 }
             }
         }
         if(change){
             Util.merge(newdata,this._data,false,false);
             this.updateDS(newdata);
         }
     }
     render(){
         console.log('list render');
         return (
             <View style={styles.container}>
                 <ListView style={styles.ListView}
                    dataSource={this.state.ds}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={this.renderSeparator.bind(this)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={100}
                    scrollRenderAheadDistance={200}
                    initialListSize={5}
                    // onChangeVisibleRows本身用来实现当列表数据项滚动到可视区域，则加载实际图片，实现先显示背景图，后面展示实际图片的效果。
                    // 配合onChangeVisibleRows来实现实际图片延迟加载，则只显示<Image source={rowData.imgsrc} style={styles.img} />即可。
                    // 但是后来觉得，直接实用嵌套来实现背景图，设置scrollRenderAheadDistance和initialListSize来实现实际图片延迟渲染。
                    //onChangeVisibleRows={this.onChangeVisibleRows.bind(this)}
                    refreshControl={(() => {
                        if(!this.state.firstRender){ //首屏还没渲完，则不返回组件。解决refreshing为false,但是loading还会显示的bug
                            return null;
                        }else{
                            return (
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                    colors={['#ff0000','#00ff00','#0000ff']}
                                    progressBackgroundColor="#ffff00"
                                    tintColor='#ff0000'
                                    title="Loading..."
                                    titleColor="#00ff00"
                                />
                            );
                        }

                    })()}
                 >
                 </ListView>
                 {this.state.endloading && <View style={[styles.more]} ref="more"><Text>loading...</Text></View>}
                 {!this.state.firstRender && <View style={styles.loadingcon}><Text style={styles.loading}>首此加载。。。</Text></View>}
             </View>
         );
     }
     componentDidMount(){
         console.log('list didmount');
         this.getData();
     }

     //控制不要重复渲染
     shouldComponentUpdate(nextProps,nextState){
         console.log('list update ' + !(nextProps.viewrender === false));
         return !(nextProps.viewrender === false);
     }
 }

 const styles = StyleSheet.create({
     container: {
         flex: 1
     },
     listview: {
         flex: 1
     },
     section: {
         backgroundColor: '#007eff',
         padding: 10
     },
     //每一行块的样式
     row: {
         backgroundColor: '#F5FCFF',
         padding: 10,
         flexDirection: 'row'
     },
     imgcon: {
         width: 100,
         height: 143,
         position: 'relative'
     },
     img: {
         width: 100,
         height: 143
     },
     text: {
         flex: 1,
         paddingLeft: 20,
         alignSelf: 'center'
     },
     more: {
         padding: 10,
         alignItems: 'center',
         flex: 0
     },
     loadingcon: {
         position: 'absolute',
         left: 0,
         right: 0,
         top: 0,
         bottom: 0,
         alignItems: 'center',
         justifyContent: 'center'
     }
 });
