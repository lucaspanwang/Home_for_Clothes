import React, { Component } from 'react'
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

import mote from '../images/mote_1.png'
import mote2 from '../images/mote_2.png'
import xiaoren from '../images/xiaoren.png'

const data = [{
  url: mote,
  id: '2121',
}, {
  url: mote2,
  id: '2122',
}];
const data2 = [{
  url: xiaoren,
  id: '2121',
}];

export default class Model extends Component {
    state = {
      files2:data2,
        files: data,
        multiple: false,
        ress:[],
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
        fetch('http://47.98.163.228:8088/clo')
        .then(res=>res.json())
        .then(res=>{    
          var arr=this.state.ress;
          for(var i = 0;i<res.length;i++){
            var name = res[i].cloSmallPic.split('/')[2]       
            // console.log(name);
            var str = 'http://47.98.163.228:8088/images/'+name;
            // arr.push('http://47.98.163.228:8088/images/'+name) 
            var obj={
              id:i,
              url:str,
            }
            arr.push(obj)
          }
            this.setState({
                ress:arr
            },function(){
                console.log(this.state.ress)
            })
        })
    }
    render() {
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                <WingBlank>
                <p>模特</p>
                <ImagePicker style={{width:'70%'}}
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 7}
                multiple={this.state.multiple}
                />
                <p>小人模型</p>
                <ImagePicker style={{width:'70%'}}
                files={this.state.files2}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files2.length < 7}
                multiple={this.state.multiple}
                />
                <p>衣服模型</p>
                <ImagePicker style={{width:'70%'}}
                files={this.state.ress}
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
