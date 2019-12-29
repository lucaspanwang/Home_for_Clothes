import React, { Component} from 'react';
import { NavBar ,ImagePicker,Toast} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../images/返回 (1).png';
import { Input } from 'antd';
import lrz from 'lrz';
const { TextArea } = Input;

export default class DiaryAdd extends Component {
    constructor(){
        super();
        var id = Number(Math.random().toString().substr(3,10) + Date.now()).toString(16);
        var today = new Date();
        var hour = '';
        var minutes = '';
        if(today.getHours()<10){
            hour = '0'+today.getHours();
        }else{
            hour = today.getHours();
        }
        if(today.getMinutes()<10){
            minutes = '0'+today.getMinutes();
        }else{
            minutes = today.getMinutes();
        }

        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+' '+hour+':'+minutes+':'+today.getSeconds();
        this.state = {
            value: '',
            files: [],
            diarytime:date,
            diaryId:id,
            filesType:[],
            userId:''
        };
    }
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }
    onToast=()=>{
        Toast.loading('日记上传中...',2, () => {
            window.location.href=window.location.href.split('#')[0]+"#/rijitab/"+this.props.match.params.id
        });
    }
    onFail=()=>{
        Toast.offline('日记不能为空',2);
    }
    onPost=()=> { 
        if(this.state.value == '' && this.state.files == ''){
            this.onFail();
        }if(this.state.value !== '' && this.state.files == ''){
            fetch('http://47.98.163.228:8081/diaryAdd',{
                method: 'post', 
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                // credentials: 'include',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8'
                },
                body:JSON.stringify({diaryId:this.state.diaryId,userId:this.props.match.params.id,value:this.state.value,filesType:this.state.filesType,files:this.state.files,diarytime:this.state.diarytime}) 
            })
            console.log(this.state.files);
            this.onToast();
        }else{
            var filesType = [];
            var files = [];
            let promise = new Promise(resolve =>{
                for(var i=0;i<this.state.files.length;i++){
                    filesType.push('.'+this.state.files[i].file.name.split(".")[1]);
                    lrz(this.state.files[i].url, {quality:0.1})
                    .then((res)=>{
                        files.push(res.base64);
                        console.log(files);
                        resolve({files:files,filesType:filesType});
                    });
                }
            }).then((value)=>{
                console.log(value);
                fetch('http://47.98.163.228:8081/diaryAdd',{
                    method: 'post', 
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Credentials" : true,
                    // credentials: 'include',
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=utf-8'
                    },
                    body:JSON.stringify({diaryId:this.state.diaryId,userId:this.props.match.params.id,value:this.state.value,filesType:value.filesType,files:value.files,diarytime:this.state.diarytime}) 
                })
                console.log(this.state.files);
                this.onToast();
            })
        }
    }
    
    onChange1 = ({ target: { value } }) => {
        this.setState({ value });
    };
    onChange = (files) => {
        this.setState({
            files,
        });
        var filesType = [];
        for(var i=0;i<this.state.files.length;i++){
            console.log(this.state.files[i].file.name.split(".")[1]);
            filesType[i]='.'+this.state.files[i].file.name.split(".")[1];
        }
        this.setState({
            filesType:filesType
        })
    }    
    render() {
        return (
            <div>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to={"/rijitab/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan"/></Link>
                ]}
                rightContent={[
                    <Link style={{backgroundColor:'#fc9d9a',color:'white',fontSize:'18px'}} onClick={this.onPost}>完成</Link>
                ]}
                >发布穿搭日记</NavBar>

                <TextArea style={{marginTop:'5%',marginLeft:'3%',width:'94%',backgroundColor:'rgb(252,251,251)'}}
                    value={this.state.value}
                    onChange={this.onChange1}
                    placeholder="这一刻，我想说..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                 <ImagePicker
                    files={this.state.files}
                    onChange={this.onChange}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                />
            </div>
        )
    }
}