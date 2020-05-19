import React, { Component } from 'react';
import { message,Form,Input,Button,Upload } from 'antd';
import { Link } from 'react-router-dom';
import { UploadOutlined,LoadingOutlined,PlusOutlined } from '@ant-design/icons';
import '../tab.css';

export default class AddOfficial extends Component {
    constructor(){
        super();
        this.state=({
            loading: false,
            imageUrl:''
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
    //封面图片base64
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    //封面图片插入
    handleChange = info => {
        console.log(info);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    //消息插图
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {return e;}
        return e && e.fileList;
    }
    //提交消息
    onFinish = (value) => {
        console.log(value);
        // if(this.state.value == ''){
        //     this.error();
        // }else{
        //     console.log(this.state.value);
        //     var today = new Date();
        //     var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        //     fetch('http://47.98.163.228:8086/officeAdd',{
        //         method: 'post', 
        //         "Access-Control-Allow-Origin" : "*",
        //         "Access-Control-Allow-Credentials" : true,
        //         credentials: 'include',
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         },
        //         body: JSON.stringify({content:this.state.value,time:date,city:'石家庄'}) 
        //     });
        //     this.success();
        // }
    }
    render() {
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div className="middle">
                <div style={{height:'30px',borderBottom:'1px dashed #ddd',marginBottom:'25px'}}>
                    <Link to='/tab/official' style={{color:'black'}}>&#60; &nbsp;官方消息</Link>
                </div>
                <Form layout={"horizontal"} labelCol={{span:2}} wrapperCol={{span:21}} onFinish={this.onFinish}>
                    <Form.Item label="标题" name="title" rules={[{ required: true, whitespace: true, message: '标题是必须输入的内容' }]}>
                        <Input placeholder="请输入发布消息的标题" />  
                    </Form.Item>
                    <Form.Item label="内容" name="content">
                        <Input.TextArea placeholder="请输入发布消息的内容" />
                    </Form.Item>
                    <Form.Item label="封面" name="cover" rules={[{ required: true,message: '封面是必须的' }]}>
                        <Upload 
                            name="avatar" 
                            listType="picture-card"  
                            accept=".jpg, .jpeg, .png"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            onChange={this.handleChange}
                        >{imageUrl ? <img src={imageUrl} alt="封面" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="插图" name="picture" valuePropName="fileList" getValueFromEvent={this.normFile} >
                        <Upload accept=".jpg, .jpeg, .png, .gif" listType='picture'>
                            <Button><UploadOutlined />上传图片</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:2}}>
                        <Button type="primary" htmlType="submit">发布</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
// const DataForm = () => {
//     const fileList = [
//         {
//             uid: '-1',
//             name: 'xxx.png',
//             status: 'done',
//             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//             thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//         },
//         {
//             uid: '-2',
//             name: 'yyy.png',
//             status: 'error',
//         },
//     ];
//     const props = {
//         action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//         accept: ".jpg, .jpeg, .png, .gif",
//         listType: 'picture',
//         defaultFileList: [...fileList],
//     };
//     const normFile = (e) => {
//         console.log('Upload event:', e);
//     }
//     // const changeHandle = (e) => {
//     //     console.log('Upload img:', e);
//     // }
//     const onFinish = (value) => {
//         console.log(value);
//     }
//     return (
//         <Form layout={"horizontal"} labelCol={{span:2}} wrapperCol={{span:21}} onFinish={onFinish}>
//             <Form.Item label="标题" name="title" 
//             rules={[{ required: true, whitespace: true, message: '标题是必须输入的内容' }]}>
//                 <Input placeholder="请输入发布消息的标题" />  
//             </Form.Item>
//             <Form.Item label="内容" name="content">
//                 <Input.TextArea placeholder="请输入发布消息的内容" />
//             </Form.Item>
//             <Form.Item label="图片" name="upload" valuePropName="fileList" getValueFromEvent={normFile} >
//                 <Upload props>
//                     <Button><UploadOutlined />上传图片</Button>
//                 </Upload>
//             </Form.Item>
//             <Form.Item wrapperCol={{offset:2}}>
//                 <Button type="primary" htmlType="submit">发布</Button>
//             </Form.Item>
//         </Form>
//     )
    
// }