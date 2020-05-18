import React, { Component } from 'react';
import { message,Form,Input,Button,Upload,Rate } from 'antd';
import { Link } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import '../tab.css';

export default class AddOfficial extends Component {
    constructor(){
        super();
        this.state=({
            value:''
        })
    }
    success = () => {
        message.success('消息提交中...',1,()=>{
            window.location.href="/tab/official"
        });
    };
    error = () => {
        message.error('提交不能为空！！！',2);
      };
    onPost=()=> { 
        if(this.state.value == ''){
            this.error();
        }else{
            console.log(this.state.value);
            var today = new Date();
            var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            fetch('http://47.98.163.228:8086/officeAdd',{
                method: 'post', 
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify({content:this.state.value,time:date,city:'石家庄'}) 
            });
            this.success();
        }
    }
    handleChange = (e) =>{
        this.setState({
            value: e.target.value
        })
    }
    normFile = (e) => {
        console.log('Upload event:', e);
        // if (Array.isArray(e)) {
        //     return e;
        // }
        // return e && e.fileList;
    }
    onFinish = (value) => {
        console.log('数据提交成功',value);
    }
    onFinishFailed = (value) => {
        console.log('数据提交失败',value);
    }
    render() {
        return (
            <div className="middle">
                <div style={{height:'30px',borderBottom:'1px dashed #ddd',marginBottom:'25px'}}>
                    <Link to='/tab/official' style={{color:'black'}}>&#60; &nbsp;官方消息</Link>
                </div>
                <Form layout={"horizontal"} labelCol={{span:2}} wrapperCol={{span:21}} onFinish={this.onFinish}onFinishFailed={this.onFinishFailed} >
                    <Form.Item label="标题">
                        <Input placeholder="请输入发布消息的标题" />
                    </Form.Item>
                    <Form.Item label="内容">
                        <Input.TextArea placeholder="请输入发布消息的内容" />
                    </Form.Item>
                    <Form.Item label="图片" valuePropName="fileList" getValueFromEvent={this.normFile} >
                        <Upload listType="picture">
                            <Button><UploadOutlined />上传图片</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:2}}>
                        <Button type="primary" htmlType="submit" onClick={this.onFinish}>发布</Button>
                    </Form.Item>
                </Form>
                {/* <form action="" method="post" onsubmit="return mySubmit(this)">
                    <label for="content">标题</label>
                    <input type="text" />
                    <label for="content">内容</label>
                    <TextArea id="content" onChange={this.handleChange}/>
                    <br />
                    <input type='button' value="submit" onClick={this.onPost}/>
                </form> */}
            </div>
        )
    }
  }
  
    