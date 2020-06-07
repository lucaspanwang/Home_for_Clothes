import React, { Component} from 'react';
import { NavBar ,ImagePicker,Toast ,Modal } from 'antd-mobile';

import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../../images/fanhui_1.png';
import lrz from 'lrz';
import { Input } from 'antd';
const { TextArea } = Input;

const alert = Modal.alert;
var dd = 0;
var cont = '';
const showAlert = () => {
  const alertInstance = alert('警告', cont, [
    { text: '确定', onPress: () => console.log('确定') },
  ]);
  setTimeout(() => {
    // 可以调用close方法以在外部close
    console.log('auto close');
    alertInstance.close();
  }, 500000);
};
export default class ArticleAdd extends Component {
    constructor(){
        super();
       
        this.state = {
            value: '',
            cimg: [],
            content:[],
            isSend:true        
        };
    }
    componentDidMount() {
        console.log(localStorage.getItem('shareImg'));
        if(localStorage.getItem('shareImg')){
            this.setState({
                cimg:[{url:'http://47.98.163.228:3000/image/111mote.jpg',id:'0'}]
            })  
        }else{
            this.setState({
                cimg:[]
            })
        }
        var today = new Date();
        var month = '';
        if(today.getMonth()<10){
            month = '0'+(today.getMonth()+1);
        }else{
            month = today.getMonth()+1;
        }

        var date = today.getFullYear() + '-' + month + '-' + today.getDate(); 
        fetch('http://47.98.163.228:3000/report/'+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            {             
                this.setState({
                    content: res,
                })
                if(res.length!==0 && res[0].derp!==null){
                    var time = res[0].time.split('T')[0]
                    var days = this.getDaysDiffBetweenDates(new Date(time), new Date(date))
                    console.log(days)
                    var day1=res[0].derp.split('帖')[1];
                    var day2 = day1.split('天')[0];
                    console.log(day2);
                    if(days<=day2){
                        this.setState({
                            isSend: false,
                        })
                        dd = day2-days;
                        if(dd == 0){
                            cont = '你发表的文章被举报，明天才可以发帖！！！'
                        }else{
                            cont = '你发表的文章被举报，'+ dd+'天后才可以发帖！！！'
                        }
                    }else{
                        this.setState({
                            isSend: false,
                        })
                    }
                }
                console.log(this.state.content)
            }
        }) 
    }
    
    getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
        (dateFinal - dateInitial) / (1000 * 3600 * 24);
    
    onToastSuccess=()=>{
        Toast.loading('文章上传中...',2, () => {
            window.location.href=window.location.href.split('#')[0]+"#/myarticle/"+this.props.match.params.id
        });
        localStorage.removeItem('shareImg');      
    }
    onToastFail=()=>{
        Toast.offline('文章不能为空!!!',2);
    }
    onPost=()=> { 
        if(!this.state.isSend){
            showAlert()
            // Toast.offline('您发表的文章被举报，现禁止发帖！',5);
        }else{
            if(this.state.value == '' && this.state.cimg == ''){
                this.onToastFail();
            }
            if(this.state.value !== '' && this.state.cimg == ''){
                var today = new Date();
                var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
                fetch('http://47.98.163.228:3004/articleAdd',{
                    method: 'post', 
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Credentials" : true,
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
                var shareImg = localStorage.getItem('shareImg');
                if(localStorage.getItem('shareImg')){
                    cimgName = ['.jpg'];
                    shareImg=shareImg.split('"')[1];
                    var cimg = [shareImg];
                    if(this.state.cimg.length===1){
                        let promise = new Promise(resolve =>{
                            lrz(this.state.cimg[0].url, {quality:0.2})
                            .then((res)=>{
                                cimg.push(res.base64);
                                resolve({cimg:cimg,cimgName:cimgName});
                            });
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
                    }else{
                        let promise = new Promise(resolve =>{
                            lrz(this.state.cimg[0].url, {quality:0.2})
                            .then((res)=>{
                                cimg.push(res.base64);
                            });
                            for(var i=1;i<this.state.cimg.length;i++){
                                cimgName.push('.'+this.state.cimg[i].file.name.split(".")[1]);
                                lrz(this.state.cimg[i].url, {quality:0.2})
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
                }else{
                    let promise = new Promise(resolve =>{
                        for(var i=0;i<this.state.cimg.length;i++){
                            cimgName.push('.'+this.state.cimg[i].file.name.split(".")[1]);
                            lrz(this.state.cimg[i].url, {quality:0.2})
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
            }
            localStorage.setItem('come',1);
        }
        
    }
    onChange1 = ({ target: { value } }) => {
        this.setState({ value });
    };
    onChange = (cimg, type, index) => {
        this.setState({
            cimg,
        });
        if(localStorage.getItem('shareImg')){
            var filesType = ['.jpg'];
            for(var i=1;i<this.state.cimg.length;i++){
                console.log(this.state.cimg[i].file.name.split(".")[1]);
                filesType[i]='.'+this.state.cimg[i].file.name.split(".")[1];
            }
        }else{
            var filesType = [];
            console.log(1)
            for(var i=0;i<this.state.cimg.length;i++){
                console.log(this.state.cimg[i].file.name.split(".")[1]);
                filesType[i]='.'+this.state.cimg[i].file.name.split(".")[1];
            }
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
                    <Link to={"/myarticle/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fanadd"/></Link>
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