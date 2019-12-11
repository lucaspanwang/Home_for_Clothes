import React, { Component } from 'react'
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];
export default class Muxing extends Component {
    state = {
        files: data,
        multiple: false,
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
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 7}
                multiple={this.state.multiple}
                />
                <p>衣服模型</p>
                <ImagePicker style={{width:'70%'}}
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 7}
                multiple={this.state.multiple}
                />
                </WingBlank>
                </div>
            </div>
        )
    }
}
