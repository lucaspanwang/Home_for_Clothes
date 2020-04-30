import React, { Component} from 'react';
import { NavBar ,ImagePicker,Toast  } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../../images/fanhui_1.png';
import lrz from 'lrz';
import { Input } from 'antd';
const { TextArea } = Input;

export default class ArticleAdd extends Component {
    constructor(){
        super();
        this.state = {
            value: '',
            cimg: [],
        };
    }
    onToastSuccess=()=>{
        Toast.loading('文章上传中...',2, () => {
            window.location.href=window.location.href.split('#')[0]+"#/myarticle/"+this.props.match.params.id
        });
    }
    onToastFail=()=>{
        Toast.offline('文章不能为空!!!',2);
    }
    onPost=()=> { 
        if(this.state.value == '' && this.state.cimg == ''){
            this.onToastFail();
        }if(this.state.value !== '' && this.state.cimg == ''){
            var today = new Date();
            var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            fetch('http://47.98.163.228:3004/articleAdd',{
                method: 'post', 
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8'
                },
                body: JSON.stringify({userId:this.props.match.params.id,content:this.state.value,time:date,cimg:[]})
            });
            this.onToastSuccess();
        }else{
            var today = new Date();
            var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            var cimgName = [];
            var cimg = [];
            let promise = new Promise(resolve =>{
                for(var i=0;i<this.state.cimg.length;i++){
                    cimgName.push('.'+this.state.cimg[i].file.name.split(".")[1]);
                    lrz(this.state.cimg[i].url, {quality:0.1})
                    .then((res)=>{
                        cimg.push(res.base64);
                        console.log(cimg);
                        resolve({cimg:cimg,cimgName:cimgName});
                    });
                }
            }).then((value)=>{
                fetch('http://47.98.163.228:3004/articleAdd',{
                    method: 'post', 
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Credentials" : true,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=utf-8'
                    },
                    body: JSON.stringify({userId:this.props.match.params.id,content:this.state.value,time:date,cimg:value.cimg,cimgName:value.cimgName}) 
                });
                this.onToastSuccess();
            })
        }
        localStorage.setItem('come',1);
    }
    onChange1 = ({ target: { value } }) => {
        this.setState({ value });
    };
    onChange = (cimg, type, index) => {
        this.setState({
            cimg,
        });
    }
    render() {
        return (
            <div>
                <NavBar 
                style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                leftContent={[
                    <Link to={"/myarticle/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan"/></Link>
                ]}
                rightContent={[
                    <span style={{backgroundColor:'#fc9d9a',color:'white',fontSize:'18px'}} onClick={this.onPost}>发布</span>
                ]}
                >社区发布文章</NavBar>
                <NavBar></NavBar>
                <TextArea style={{marginTop:'5%',marginLeft:'3%',width:'94%',backgroundColor:'rgb(252,251,251)'}}
                    value={this.state.value}
                    onChange={this.onChange1}
                    placeholder="这一刻，我想说..."
                    autoSize={{ minRows: 5, maxRows: 15 }}
                    />
                 <ImagePicker
                    files={this.state.cimg}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                />
            </div>
        )
    }
}