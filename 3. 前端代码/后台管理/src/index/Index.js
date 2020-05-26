import React, { Component } from 'react'
import ReactHighCharts from 'react-highcharts'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

import ECharts from 'echarts';
import 'echarts/map/js/china';
import { Flex } from 'antd-mobile';
import In from '../images/in.png';
import Out from '../images/out.png';
var date=new Date()
export default class Index extends Component {
    constructor(){
        super();
        this.state=({
            xdata:[],
            ydata:[],
            month:date.getMonth()+1,
            now:0,
            before:0
        })
    }
    
    


    componentDidMount(){
        var month=date.getMonth()+1
        var before=month-1;
        //文章数量
        fetch('http://47.98.163.228:3003/article/'+month)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                now:res
            })
            console.log('当月'+res)
        })
        fetch('http://47.98.163.228:3003/article1/'+before)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                before:res
            })
            console.log('上一个月'+res)
        })

        //饼状图start
        var myChart = echarts.init(document.getElementById('main'));
        fetch("http://47.98.163.228:3003/radius")
        .then(res=>res.json())
        .then(res=>{
            var girl=0;
            var boy=0;
            res.forEach(function(res){
                if(res=='女'){
                    girl++;
                }else{
                    boy++;
                }
            })
            myChart.setOption({
                series : [
                    {
                        name: '男女比例',
                        type: 'pie',    // 设置图表类型为饼图
                        radius: '68%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                        data:[          // 数据数组，name 为数据项名称，value 为数据项值
                            {value:girl, name:'女:'+girl},
                            {value:boy, name:'男:'+boy},
                        ]
                    }
                ]
            })
            // console.log('判断男女'+girl,boy)
        })
        //饼状图end

    //    折线图start
        fetch('http://47.98.163.228:3003/number')
        .then(res=>res.json())
        .then(res => {
            var obj = {};
            var xdata=[];
            var ydata=[]
            for (var i = 0, l = res.length; i < l; i++) {
                var item = res[i];
                obj[item] = (obj[item] + 1) || 1;
            }
            for(i in obj){
                var index=String(i)+'月'
                xdata.push(index);
                ydata.push(obj[i]);
            }
            this.setState({
                xdata:xdata,
                ydata:ydata
            })
        
        })




        fetch('http://47.98.163.228:8086/article')
        .then(res=>res.json())
        .then(res=>{      
            this.setState({
                num:res.length
            })
        })
        fetch('http://47.98.163.228:8088/users')
        .then(res=>res.json())
        .then(res=>{      
            this.setState({
                num2:res.length
            })
        })    
        fetch('http://47.98.163.228:3001/user-china')
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            var xizang0=0,qinghai0=0,ningxia0=0,hainan0=0,gansu0=0,guizhou0=0,xinjiang0=0,
            yunnan0=0,chongqing0=0,jilin0=0,shanxi0=0,tianjin0=0,jiangxi0=0,guangxi0=0,
            shanxi20=0,heilongjiang0=0,neimenggu0=0,anhui0=0,beijing0=0,
            fujian0=0,shanghai0=0,hubei0=0,hunan0=0,sichuan0=0,liaoning0=0,hebei0=0,
            henan0=0,zhejiang0=0,shandong0=0,jiangsu0=0,guangdong0=0;
            for(var i=0;i<res.length;i++){
                switch(res[i].userProvince){
                    case '西藏':
                        xizang0++;
                        break;
                    case '青海':
                        qinghai0++;
                        break;
                    case '宁夏':
                        ningxia0++;
                        break; 
                    case '海南':
                        hainan0++;
                        break;
                    case '甘肃':
                        gansu0++;
                        break;
                    case '贵州':
                        guizhou0++;
                        break;
                    case '新疆':
                        xinjiang0++;
                        break;
                    case '云南':
                        yunnan0++;
                        break;
                    case '重庆':
                        chongqing0++;
                        break;
                    case '吉林':
                        jilin0++;
                        break;
                    case '山西':
                        shanxi0++;
                        break;
                    case '天津':
                        tianjin0++;
                        break;
                    case '江西':
                        jiangxi0++;
                        break;
                    case '广西':
                        guangxi0++;
                        break;
                    case '陕西':
                        shanxi20++;
                        break;
                    case '黑龙江':
                        heilongjiang0++;
                        break;
                    case '内蒙古':
                        neimenggu0++;
                        break;
                    case '安徽':
                        anhui0++;
                        break;
                    case '北京':
                        beijing0++;
                        break;
                    case '福建':
                        fujian0++;
                        break;
                    case '上海':
                        shanghai0++;
                        break;
                    case '湖北':
                        hubei0++;
                        break;
                    case '湖南':
                        hunan0++;
                        break;
                    case '四川':
                        sichuan0++;
                        break;
                    case '辽宁':
                        liaoning0++;
                        break;
                    case '河北':
                        hebei0++;
                        break;
                    case '河南':
                        henan0++;
                        break;
                    case '浙江':
                        zhejiang0++;
                        break;
                    case '山东':
                        shandong0++;
                        break;
                    case '江苏':
                        jiangsu0++;
                        break;
                    case '广东':
                        guangdong0++;
                        break;
                    case '香港':
                        var xianggang;
                        break;
                    case '澳门':
                        var aomen;
                        break;
                }
            }
            this.setState({
                xizang:xizang0,qinghai:qinghai0,ningxia:ningxia0,hainan:hainan0,gansu:gansu0,
                guizhou:guizhou0,xinjiang:xinjiang0,yunnan:yunnan0,chongqing:chongqing0,jilin:jilin0,
                shanxi:shanghai0,tianjin:tianjin0,jiangxi:jiangxi0,guangxi:guangxi0,shanxi2:shanxi20,
                heilongjiang:heilongjiang0,neimenggu:neimenggu0,anhui:anhui0,beijing:beijing0,
                fujian:fujian0,shanghai:shanghai0,hubei:hubei0,hunan:hunan0,sichuan:sichuan0,
                liaoning:liaoning0,hebei:hebei0,henan:henan0,zhejiang:zhejiang0,shandong:shandong0,
                jiangsu:jiangsu0,guangdong:guangdong0
            },function(){
                console.log(this.state)
                this.createMap(this.mapNode);
            })
        })

    }
    setMapElement = n => {
        this.mapNode = n;
    };
    createMap = element => {
        const myChart = ECharts.init(element);
        const option = {
          tooltip: {
            trigger: 'item',
          },
          dataRange: {
            orient: 'horizontal',
            min: 0,
            max: 10,
            text: ['高', '低'], // 文本，默认为数值文本
            splitNumber: 0,
            color: ['#2d70d6', '#80b5e9', '#e6feff'],
          },
          series: [
            {
              name: '衣舍用户分布',
              type: 'map',
              mapType: 'china',
              mapLocation: {
                x: 'left',
              },
              // selectedMode: 'multiple',
              itemStyle: {
                normal: { label: { show: true, color: '#333' }, borderWidth: 0 },
                // emphasis: { label: { show: true } },
                // borderWidth: 0,
                // borderColor: '#eee',
              },
              data: [
                { name: '西藏', value:this.state.xizang},
                { name: '青海', value: this.state.qinghai},
                { name: '宁夏', value: this.state.ningxia},
                { name: '海南', value: this.state.hainan},
                { name: '甘肃', value: this.state.gansu},
                { name: '贵州', value: this.state.guizhou},
                { name: '新疆', value: this.state.xinjiang},
                { name: '云南', value: this.state.yunnan},
                { name: '重庆', value: this.state.chongqing},
                { name: '吉林', value: this.state.jilin},
                { name: '山西', value: this.state.shanxi},
                { name: '天津', value: this.state.tianjin},
                { name: '江西', value: this.state.jiangxi},
                { name: '广西', value: this.state.guangxi},
                { name: '陕西', value: this.state.shanxi2},
                { name: '黑龙江', value: this.state.heilongjiang},
                { name: '内蒙古', value: this.state.neimenggu},
                { name: '安徽', value: this.state.anhui},
                { name: '北京', value: this.state.beijing},
                { name: '福建', value: this.state.fujian},
                { name: '上海', value: this.state.shanghai},
                { name: '湖北', value: this.state.hubei },
                { name: '湖南', value: this.state.hunan },
                { name: '四川', value: this.state.sichuan},
                { name: '辽宁', value: this.state.liaoning },
                { name: '河北', value: this.state.hebei},
                { name: '河南', value: this.state.henan},
                { name: '浙江', value: this.state.zhejiang},
                { name: '山东', value: this.state.shandong},
                { name: '江苏', value: this.state.jiangsu},
                { name: '广东', value: this.state.guangdong},
              ],
            },
          ],
          animation: false,
        };
        myChart.setOption(option, true);
    };
    render() {
        // 折线图的数据
        var config = {
            title: {
                useHTML:true,
                text: '2020年注册人数折线图',
                style:{
                    color:'white',
                    fontSize:'25px'
                }
            },
            legend:{
                itemStyle:{
                    color:'rgba(111,15,153,0.7)'
                }
            },
            
            yAxis: {
                title: {
                    text: '注册人数',
                    style:{
                        color:'white'
                    },
                },
                labels:{
                    style:{
                        color:'white'
                    }
                },
                // plotBands:[{
                //     color:'red'
                // }]
            },
            xAxis:{
                // categories:['2010','2011','2012','2013','2014','2015','2016','2017'],
                categories:this.state.xdata,
                labels:{
                    style:{
                        color:'white'
                    }
                }
            },
            series: [{
                name: '注册人数',
                // data: [4,3,2,6,6,7,3],
                data: this.state.ydata,
                color:'rgba(111,15,153,0.7)',
            }],
            chart:{
                backgroundColor:'rgba(18,21,54,0.9)',
                plotBorderColor: "red",//图表的边框颜色
                borderRadius: 7,
                borderRaduis:30,
                // borderColor:'red',
                // borderWidth:1,
                height:250,
                width:500
            },
            };
        return (
            <div style={{marginTop:30}}>
                <div style={{position:'relative',marginBottom:10, 
                borderRadius:10,width:250,height:100,backgroundColor:'rgba(18,21,54,0.9)'}}>
                    <div style={{
                        height:85,width:85,
                        position:'absolute',top:'5%',left:'10%',
                        borderWidth:8,borderColor:'rgba(111,15,153,0.7)',borderStyle:'solid'
                        ,borderRadius:'50%',paddingLeft:10,paddingTop:4}}>
                            <p style={{
                                color:'white',
                                fontSize:12
                            }}><span style={{paddingLeft:10}}>{this.state.month}月</span><br/>发表文章<br/>数量：{this.state.now}</p>
                    </div>
                    <div style={{position:'absolute',right:'10%',textAlign:'center'}}>
                        <p style={{color:'white'}}>相比上一个月</p>
                        <img src={this.state.now>this.state.before?Out:In} style={{width:50,height:50}}/>
                    </div>
                </div>
                <ReactHighCharts config={config}/>
                <div id="main" style={{ width: 350, height: 350 ,float:'right',marginTop:-300}}></div>
                <div style={{marginLeft:'100px', width: '800px', height: '800px'}} ref={this.setMapElement} />
            </div>
        )
    }
}
