import React, { Component} from 'react';
import { NavBar ,ImagePicker  } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../images/返回 (1).png';
import { Input } from 'antd';
const { TextArea } = Input;

export default class DiaryAdd extends Component {
    constructor(){
        super();
        var id = Number(Math.random().toString().substr(3,20) + Date.now()).toString(36);
        var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()+' '+today.getHours()+':'+today.getMinutes();
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
    onPost=()=> { 
        var userId = this.props.match.params.id;   
        this.setState({
            userId:userId
        })  
        console.log(this.props.match.params.id);//获取到的用户id 
        fetch('http://47.98.163.228:8081/dd',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8'
            },
            body:JSON.stringify({diaryId:this.state.diaryId,userId:this.state.userId,value:this.state.value,filesType:this.state.filesType,files:this.state.files,diarytime:this.state.diarytime}) 
        })
        console.log(this.state.files);

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
                    <Link to={"/rijitab/"+this.props.match.params.id} style={{backgroundColor:'#fc9d9a',color:'white',fontSize:'18px'}} onClick={this.onPost}>完成</Link>
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
