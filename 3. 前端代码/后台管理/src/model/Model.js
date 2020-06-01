import React, { Component } from 'react'
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

import mote from '../images/mote_1.png'
import mote2 from '../images/mote_2.png'
import xiaoren from '../images/xiaoren.png'
import boy from '../images/boy.gif'
import girl from '../images/girl.gif'

const data = [{
  url: mote,
  id: '2121',
}, {
  url: mote2,
  id: '2122',
}];
const data2 = [{
  url: boy,
  id: '2121',
}, {
  url: girl,
  id: '2122',
}];

export default class Model extends Component {
    state = {
        files2:data2,
        files: data,
        multiple: false,
        ress:[],
        ress2:[],
      }
      onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
      }
      onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
          multiple: index === 1,
        });
      }
      componentDidMount(){
        var arr=[],i=0;
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/dadishan_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/chenshan_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/gezishan_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/duanxiu_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/mianfu_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/weiyi_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/yundongyi_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/dayitao_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/xizhuangwaitao_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/maoxianwaitao_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/xizhuangwaitao_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/yundongwaitao_s.png'}
        arr.push(obj)
        this.setState({
          ress:arr
       })
       arr=[];
       var obj={id:i++,url:'http://47.98.163.228:3001/aaa/beidaiku_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/duanku_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/zhitongku_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/yundongku_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/xizhuangku_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/diaodaiqun_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/gongzuoqun_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/suihuaqun_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/yundongqun_s.png'}
        arr.push(obj)
        var obj={id:i++,url:'http://47.98.163.228:3001/aaa/liqun_s.png'}
        arr.push(obj)
        this.setState({
          ress2:arr
       })
    }
    render() {
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                <WingBlank>
                <p>模特</p>
                <ImagePicker style={{width:'40%'}}
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 2}
                multiple={this.state.multiple}
                />
                <p>小人模型</p>
                <ImagePicker style={{width:'40%'}}
                files={this.state.files2}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files2.length < 2}
                multiple={this.state.multiple}
                />
                <p>衣服模型</p>
                <ImagePicker style={{width:'40%',float:'left'}}
                files={this.state.ress}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.ress.length < 7}
                multiple={this.state.multiple}
                />
                {/* <p>衣服模型</p> */}
                <ImagePicker style={{width:'40%',float:'left'}}
                files={this.state.ress2}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.ress.length < 7}
                multiple={this.state.multiple}
                />
                </WingBlank>
                </div>
            </div>
        )
    }
}
