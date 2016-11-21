import Ioconfig from './ioconfig';
import Io from '../common/io';
const extend = require('extend');

import {
  Alert
} from 'react-native';

/**
 * 设置自己的配置
 */
Ioconfig.fail.filter = function(result){
    if(result.code != 'A0001'){
        return true; //说明发生了业务错误
    }else{
        return false;
    }
}

Ioconfig.ioparams.error = function(error){
    //error或有或无 error.message
    Alert.alert('系统消息',error.message || '亲，忙不过来了');
}

Ioconfig.ioparams.fail = function(result,response){
    if(result.code == 'A0002'){
        Alert.alert('系统消息','未登录');
    }else{
        Alert.alert('系统消息',result.errmsg || '亲，忙不过来了');
    }
}

/**
 * 调用以下方法的时候，opt如ioparams。但是一般只传以下参数就可以了：
 *   data success complete
 *   以下方法已经统一处理了，如果想覆盖自行传入
 *   error fail
 */
export default {
    //listdata接口
    listdata(opt){
        Io.request(extend(true,{
            request: {
                method: 'POST'
            },
            url: 'http://127.0.0.1:8000/listdata'
        },opt));
    }
};
