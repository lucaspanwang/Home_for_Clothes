import React, { Component } from 'react';
import { message,Form,Input,Button,Upload } from 'antd';
import { ImagePicker } from 'antd-mobile';
import { Link } from 'react-router-dom';
import lrz from 'lrz';
import { UploadOutlined,LoadingOutlined,PlusOutlined } from '@ant-design/icons';
import '../tab.css';

export default class AddOfficial extends Component {
    constructor(){
        super();
        this.state=({
            loading: false,
            imageUrl:'',
            coverName:'',
            picture:[],
            cover:[]
        })
    }
    success = () => {
        message.success('消息提交中...',1.5,()=>{
            // window.location.href="/tab/official"
            this.props.history.push('/tab/official');
        });
    };
    error = () => {
        message.error('提交不能为空！！！',2);
      };
    // //封面图片base64
    // getBase64 = (img, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }
    // //封面图片插入
    // handleChange = info => {
    //     console.log(info);
    //     if (info.file.status === 'uploading') {
    //         this.setState({ loading: true });
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         this.getBase64(info.file.originFileObj, imageUrl =>
    //             lrz(imageUrl, {quality:0.3})
    //             .then((res)=>{
    //                 this.setState({
    //                     imageUrl:res.base64,
    //                     imageName:'.'+info.file.name.split(".")[1],
    //                     loading: false,
    //                 })
    //             })
    //         );
    //     }
    // };
    //消息插图
    // normFile = (e) => {
    //     console.log('Upload event:', e);
    //     if (Array.isArray(e)) {return e;}
    //     return e && e.fileList;
    // }
    onChange = (picture) => {
        this.setState({
            picture,
        });
    }
    onCoverChange = (cover) => {
        this.setState({
            cover
        });
    }
    //提交消息
    onFinish = (data) => {
        console.log(data);
        var today = new Date();
        var picture = [];
        var picName = [];
        var cover = [];
        var coverName = '';
        var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        let promise = new Promise(resolve =>{
            for(var i=0;i<data.cover.length;i++){
                coverName = '.'+data.cover[i].file.name.split(".")[1];
                lrz(data.cover[i].url, {quality:0.1})
                .then((res)=>{
                    cover.push(res.base64);
                });
            }
            for(var i=0;i<this.state.picture.length;i++){
                picName.push('.'+this.state.picture[i].file.name.split(".")[1]);
                lrz(this.state.picture[i].url, {quality:0.3})
                .then((res)=>{
                    picture.push(res.base64);
                    console.log(picture);
                    resolve({title:data.title,content:data.content,picture:picture,picName:picName,cover:cover[0],coverName:coverName});
                });
            }
        }).then((value)=>{
            // console.log(value);
            // var body = 'title='+value.title+'&cover='+this.state.imageUrl+'&coverName='+this.state.imageName+'&content='+value.content+'&time='+date+'&picture='+picture+'&picName='+picName;
            // var body = JSON.stringify({title:value.title,cover:value.cover,coverName:value.coverName,content:value.content,time:date,picture:picture,picName:picName});
            fetch('http://47.98.163.228:3004/officeAdd',{
                method: 'post', 
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({title:value.title,cover:value.cover,coverName:value.coverName,content:value.content,time:date,picture:picture,picName:picName})
            }).then(res=>{
                // console.log(body);
                console.log('完成提交');
                this.success();
            })
        })
    }
    render() {
        // const uploadButton = (
        //     <div>
        //         {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        //     </div>
        // );
        // const { imageUrl } = this.state;
        return (
            <div className="middle">
                <div style={{height:'30px',borderBottom:'1px dashed #ddd',marginBottom:'25px'}}>
                    <Link to='/tab/official' style={{color:'#1890ff',fontSize:'20px'}}>官方消息管理</Link>
                </div>
                <Form layout={"horizontal"} labelCol={{span:2}} wrapperCol={{span:21}} onFinish={this.onFinish}>
                    <Form.Item label="标题" name="title" rules={[{ required: true, whitespace: true, message: '标题是必须要输入的' }]}>
                        <Input placeholder="请输入发布消息的标题" />  
                    </Form.Item>
                    <Form.Item label="内容" name="content">
                        <Input.TextArea placeholder="请输入发布消息的内容" />
                    </Form.Item>
                    <Form.Item label="封面" name="cover" rules={[{ required: true,message: '封面是必须要插入的' }]}>
                        <ImagePicker
                            files={this.state.cover}
                            onChange={this.onCoverChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={this.state.cover.length < 1}
                            accept="image/gif,image/jpeg,image/jpg,image/png"
                        />
                        {/* <Upload 
                            name="avatar" 
                            listType="picture-card"  
                            accept=".jpg, .jpeg, .png"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            onChange={this.handleChange}
                        >{imageUrl ? <img src={imageUrl} alt="封面" style={{ width: '100%' }} /> : uploadButton}
                        </Upload> */}
                    </Form.Item>
                    <Form.Item label="插图" name="picture" valuePropName="fileList" getValueFromEvent={this.normFile} >
                        <ImagePicker
                            files={this.state.picture}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={this.state.picture.length < 6}
                            accept="image/gif,image/jpeg,image/jpg,image/png"
                        />
                        {/* <Upload accept=".jpg, .jpeg, .png, .gif" listType='picture'>
                            <Button><UploadOutlined />上传图片</Button>
                        </Upload> */}
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:2}}>
                        <Button type="primary" htmlType="submit">发布</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}