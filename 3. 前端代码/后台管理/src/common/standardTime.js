//时间显示函数
export function standardTime(timestamp){
    var mius=Math.round(new Date())-Math.round(new Date(timestamp));
    if(mius<(1000*60)){
        return Math.floor(mius/1000)+'秒前';
    }else if(mius<(1000*60*60)){
        return Math.floor(mius/(1000*60))+'分钟前';
    }else if(mius<(1000*60*60*24)){
        return Math.floor(mius/(1000*60*60))+'小时前';
    }else if(mius<(1000*60*60*24*30)){
        return Math.floor(mius/(1000*60*60*24))+'天前';
    }else if(mius<(1000*60*60*24*30*12)){
        return Math.floor(mius/(1000*60*60*24*30))+'个月前';
    }else{
        return Math.floor(mius/(1000*60*60*24*30*12))+'年前';
    }
}