import React, { Component} from 'react';
import { NavBar ,ImagePicker,Toast} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../images/fanhui_1.png';
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
            fbtime:date,
            fbId:id,
            filesType:[],
            fbtel:'',
            userId:''
        };
    }
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }
    onToast=()=>{
        Toast.loading('反馈上传中...',2, () => {
            window.location.href=window.location.href.split('#')[0]+"#/apptab/"+this.props.match.params.id+'&me'
        });
    }
    onFail=()=>{
        Toast.offline('反馈上传不能为空',2);
    }
    onPost=()=> { 
        if(this.state.value == '' && this.state.files == ''){
            this.onFail();
        }if(this.state.value !== '' && this.state.files == ''){
            fetch('http://47.98.163.228:3000/fankui',{
                method: 'post', 
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                // credentials: 'include',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8'
                },
                body:JSON.stringify({fbId:this.state.fbId,userId:this.props.match.params.id,value:this.state.value,filesType:this.state.filesType,files:this.state.files,fbtime:this.state.fbtime,fbtel:this.state.fbtel}) 
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
                fetch('http://47.98.163.228:3000/fankui',{
                    method: 'post', 
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Credentials" : true,
                    // credentials: 'include',
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=utf-8'
                    },
                    body:JSON.stringify({fbId:this.state.fbId,userId:this.props.match.params.id,value:this.state.value,filesType:value.filesType,files:value.files,fbtime:this.state.fbtime,fbtel:this.state.fbtel}) 
                })
                console.log(this.state.files);
                this.onToast();
            })
        }
    }
    
    onChange1 = ({ target: { value } }) => {
        this.setState({ value });
    };
    inputChange = (e)=>{
        this.setState({
            fbtel:e.target.value
        })
    }
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
                style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                leftContent={[
                    <Link to={"/apptab/"+this.props.match.params.id+'&me'}><img src={fanhui} style={{width:'30px'}} key="fan6"/></Link>
                ]}
                rightContent={[
                    <Link to={"/fankuicont/"+this.props.match.params.id} style={{backgroundColor:'#fc9d9a',color:'white',fontSize:'18px'}}>我的反馈</Link>
                ]}
                >反馈意见</NavBar>
                <NavBar></NavBar>
                
                <span style={{marginLeft:'12px'}}>电话：</span><input style={{marginTop:'5%',marginBottom:'3%',width:'70%',height:'30px',backgroundColor:'white',border:'1px solid #008cff',borderRadius:'5px'}} type='tel' onChange={(e)=>this.inputChange(e)}/>
                <br/>
                <span style={{marginLeft:'12px',marginTop:'5%'}}>反馈意见：</span>
                <TextArea style={{marginLeft:'3%',width:'94%',backgroundColor:'rgb(252,251,251)',marginTop:'5px'}}
                    value={this.state.value}
                    onChange={this.onChange1}
                    placeholder="请描述您遇到的问题，我们会尽快为您解决。"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                <button style={{width:'45%',height:'40px',border:'none',backgroundColor:'#008cff',fontSize:'18px',color:'white',marginLeft:'25%',borderRadius:'8px',marginTop:'20px'}} onClick={this.onPost}>提交</button>
            </div>
        )
    }
}
