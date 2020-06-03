import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, Picker, List, WhiteSpace,ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';
import Back from '../images/fanhui_1.png';
import { createForm } from 'rc-form';
import './store.css';
import { thisTypeAnnotation } from '@babel/types';
let sex;
//图片选择器
const data = [];
//图片选择器

const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', paddingLeft: 15 }}
  >
    <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
      <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
    </div>
  </div>
);

const colorStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '16px',
  height: '16px',
  marginRight: '10px',
};
// 衣服分类
let kindGirl=[
  {
    label:(<span>裤子</span>),
    value:'裤子',
    children:[
      {
        label:(<span>背带裤</span>),
        value:'背带裤'
      },
      {
      label:(<span>牛仔裤</span>),
      value:'牛仔裤'
      },
      
      {
        label:(<span>运动裤</span>),
        value:'运动裤'
      },
      {
        label:(<span>短裤</span>),
        value:'短裤'
      },
      {
        label:(<span>西装裤</span>),
        value:'西装裤'
      },
      {
        label:(<span>直筒裤</span>),
        value:'直筒裤'
      },
  ]
  },
  

  {
    label:(<span>上衣</span>),
    value:'上衣',
    children:[
      {
        label:(<span>运动衣</span>),
        value:'运动衣'
      },
      {
      label:(<span>毛衣</span>),
      value:'毛衣'
      },
      {
        label:(<span>卫衣</span>),
        value:'卫衣'
      },
      {
        label:(<span>打底衫</span>),
        value:'打底衫'
      },
      {
        label:(<span>短袖</span>),
        value:'短袖'
        },
        {
          label:(<span>衬衫</span>),
          value:'衬衫'
        },
        {
          label:(<span>格子衫</span>),
          value:'格子衫'
        },
    ]
  },
  {
    label:(<span>裙子</span>),
    value:'裙子',
    children:[
      {
      label:(<span>半身长裙</span>),
      value:'半身长裙'
      },
      {
        label:(<span>短裙</span>),
        value:'短裙'
      },
      {
        label:(<span>碎花短裙</span>),
        value:'碎花短裙'
      },
      {
        label:(<span>职业短裙</span>),
        value:'职业短裙'
      },
      {
        label:(<span>吊带裙</span>),
        value:'吊带裙'
      },
      {
        label:(<span>工作裙</span>),
        value:'工作裙'
      },
      {
        label:(<span>礼服裙</span>),
        value:'礼服裙'
      },
      {
        label:(<span>碎花长裙</span>),
        value:'碎花长裙'
      },
      {
        label:(<span>休闲裙</span>),
        value:'休闲裙'
      },
      {
        label:(<span>运动裙</span>),
        value:'运动裙'
      },
      
      
    ]
  },
  {
    label:(<span>外套</span>),
    value:'外套',
    children:[
      {
        label:(<span>运动外套</span>),
        value:'运动外套'
      },
      {
        label:(<span>大衣</span>),
        value:'大衣'
      },
      {
        label:(<span>毛线外套</span>),
        value:'毛线外套'
      },
      {
        label:(<span>棉服</span>),
        value:'棉服'
      },
    ]
  },
  {
    label:(<span>鞋子</span>),
    value:'鞋子',
    children:[
      {
      label:(<span>板鞋</span>),
      value:'板鞋'
      },
      {
        label:(<span>长靴</span>),
        value:'长靴'
      },
      {
        label:(<span>帆布鞋</span>),
        value:'帆布鞋'
      },
      {
        label:(<span>高跟鞋</span>),
        value:'高跟鞋'
      },
      {
        label:(<span>厚板鞋</span>),
        value:'厚板鞋'
      },
      {
        label:(<span>凉鞋</span>),
        value:'凉鞋'
      },
      {
        label:(<span>皮鞋</span>),
        value:'皮鞋'
      },
      {
        label:(<span>拖鞋</span>),
        value:'拖鞋'
      },
      {
        label:(<span>运动鞋</span>),
        value:'运动鞋'
      },
      {
        label:(<span>短靴</span>),
        value:'短靴'
      },
    ]
  },
]
let kindBoy=[
  {
    label:(<span>裤子</span>),
    value:'裤子',
    children:[
      
      {
      label:(<span>牛仔裤</span>),
      value:'牛仔裤'
      },
      
      {
        label:(<span>运动裤</span>),
        value:'运动裤'
      }
  ]
  },
  {
    label:(<span>外套</span>),
    value:'外套',
    children:[
      {
      label:(<span>牛仔外套</span>),
      value:'牛仔外套'
      },
      {
        label:(<span>运动外套</span>),
        value:'运动外套'
      },
      {
        label:(<span>风衣</span>),
        value:'风衣'
      },
      {
        label:(<span>衬衫</span>),
        value:'衬衫'
      },
      {
        label:(<span>毛呢大衣</span>),
        value:'毛呢大衣'
      },
    ]
  },
]


// 位置data
const where=[
  {
    label:(<span>{localStorage.getItem("jia")?localStorage.getItem('jia'):'家'}</span>),
      value:localStorage.getItem("jia")?localStorage.getItem('jia'):'家'
  },
  {
    label:(<span>{localStorage.getItem("guizi")?localStorage.getItem('guizi'):'柜子'}</span>),
      value:localStorage.getItem("guizi")?localStorage.getItem('guizi'):'柜子'
  },
  {
    label:(<span>{localStorage.getItem("xinglixiang")?localStorage.getItem('xinglixiang'):'行李箱'}</span>),
      value:localStorage.getItem("xianglixiang")?localStorage.getItem('xinglixiang'):'行李箱'
  },
  {
  label:(<span>{localStorage.getItem("添加")?localStorage.getItem('添加'):''}</span>),
    value:localStorage.getItem("添加")?localStorage.getItem:''
  }
]

// 颜色data
const colors = [
  {
    label:
      (<div>
        <span
          style={{ ...colorStyle, backgroundColor: '#0F0F0F' }}
        />
        <span>黑色</span>
      </div>),
    value: '黑色',
  },
  {
    label:
      (<div>
        <span
          style={{ ...colorStyle, backgroundColor: '#FFFFFF' }}
        />
        <span>白色</span>
      </div>),
    value: '白色',
  },
  {
    label:
      (<div>
        <span
          style={{ ...colorStyle, backgroundColor: '#FF0000' }}
        />
        <span>红色</span>
      </div>),
    value: '红色',
  },
  {
    label:
      (<div>
        <span
          style={{ ...colorStyle, backgroundColor: '#00FF00' }}
        />
        <span>绿色</span>
      </div>),
    value: '绿色',
  },
  {
    label:
      (<div>
        <span
          style={{ ...colorStyle, backgroundColor: '#0000FF' }}
        />
        <span>蓝色</span>
      </div>),
    value: '蓝色',
  },
  
  {
    label:
      (<div>
        <span
          style={{ ...colorStyle, backgroundColor: '#FFFF00' }}
        />
        <span>黄色</span>
      </div>),
    value: '黄色',
  },
  {
    label:
      (<div>
        <span
          style={{ ...colorStyle, backgroundColor: '#EEAEEE' }}
        />
        <span>紫色</span>
      </div>),
    value: '紫色',
  },
];
//页面加载完之前运行的函数
// window.onpageshow=function(){
//   var length=window.location.href.split('/').length;
//   var id=window.location.href.split('/')[length-1];
//   fetch('http://47.98.163.228:3003/insertSex/'+id)
//     .then(res=>res.json())
//     .then(res=>{
//       console.log('男女：',res)
//       sex=res
      // localStorage.setItem('sex',res)
//     })
// }
const picName='';
class Insert extends Component {
  state = {
    where:where,
    kinds:kindBoy,
    picName:'',
    change:'',
    files: data,
    multiple: false,
    data: [],
    // clothing:[],
    zhonglei:[],
    mingzi:[],
    cols: 1,
    visible: false,
    colorValue: [],
    whereValue:[]
  };
  //图片选择器
  onChange = (files, type, index) => {
    console.log(files)
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
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1,
    });
  }
  //图片选择器
  onChangeColor = (color) => {
    console.log(color);
    this.setState({
      colorValue: color,
    });
  };
  onChangeWhere = (where)=>{
    this.setState({
      whereValue:where
    })
  }

  mingzi=(e)=>{
    this.setState({
      mingzi:e.target.value
    })
  }
  todata = () => {
    if (this.state.mingzi == '' |
      this.state.zhonglei == '' |
      this.state.colorValue == '' | 
      this.state.where == '' | 
      this.state.filesType == undefined) 
      {
        alert('不能为空');
    } else {
      // 判断在位置中占第几个用来查找
      var whereId;
      console.log(this.state.whereValue)
      for(var i in where){
        if(where[i].value==this.state.whereValue){
          // console.log('位置：',parseInt(i)+1)
          whereId=parseInt(i)+1;
        };
      }
      console.log(sex);
      console.log(whereId);
      fetch('http://47.98.163.228:3003/insert', {
        method: 'post',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filesType: this.state.filesType,
          userid: this.props.match.params.id, 
          base64: this.state.files,
          zhonglei: this.state.zhonglei,
          weizhi: this.state.whereValue,
          yanse: this.state.colorValue,
          mingzi: this.state.mingzi,
          whereId:whereId,
          sex:sex
        })
      })
      // .then(res=>res.json())
      // .then((res)=>{
      //   console.log('insert',res)
      // });  
       
      // console.log('导入前端post成功');
      window.location.reload()
    }
    }
    
  componentWillMount(){
    // console.log(this.props.match.params.id)
    // fetch('http://47.98.163.228:3003/insertSex/'+this.props.match.params.id)
    // .then(res=>res.json())
    // .then(res=>{
    //   console.log('男女：',res)
    //   if(res=='女'){
    //     this.setState({
    //       kind:kindGirl
    //     })
    //   }
    //   // sex=res
    // })
           
    
  }
  componentDidMount(){
    console.log(localStorage.getItem('添加')?localStorage.getItem('添加'):'')
    // console.log(this.props.match.params.id)
    // console.log(kindGirl)
    // 根据性别判读分类
    fetch('http://47.98.163.228:3003/insertSex/'+this.props.match.params.id)
    .then(res=>res.json())
    .then(res=>{
      sex=res;
      // console.log('男女：',res)
      // console.log(res=='女')
      if(res=='女'){
        this.setState({
          kinds:kindGirl
        })
        // console.log(this.state.kinds)
      }
      // sex=res
    })
  }
  
  render() {
    //图片选择器
    const { files } = this.state;
    //图片选择器
    return (
      <div>
        {/* ----导航栏 */}
        <NavBar
        // style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
          leftContent={
            <Link to={"/apptab/"+this.props.match.params.id+'&store'}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
          }
          style={{ backgroundColor: 'rgb(252, 157, 154)' }}
          >导入
        </NavBar>
        
        {/* ------列表 */}
        <WhiteSpace size="lg" />
        <List style={{ backgroundColor: 'white' }} className="picker-list">
          {/* -----种类选择 */}
          <Picker
            title="种类确定"
            extra="请选择(可选)"
            // data={kind}
            data={this.state.kinds}
            value={this.state.pickerValue}
            onChange={v => this.setState({ pickerValue: v })}
            onOk={v => this.setState({ zhonglei: v })}
          >
            <CustomChildren>种类</CustomChildren>
          </Picker>
          {/* ------种类选择结束 */}

          {/* ----地方选择 */}
          <Picker data={this.state.where}  value={this.state.whereValue} cols={1}
            onChange={this.onChangeWhere} 
             >
            <List.Item arrow="horizontal">地方</List.Item>
          </Picker>
          {/* /----地方选择结束 */}
          {/* ----颜色选择 */}
          <Picker
            data={colors}
            value={this.state.colorValue}
            cols={1}
            onChange={this.onChangeColor}
          >
            <List.Item arrow="horizontal">颜色</List.Item>
          </Picker>
          {/* -----颜色选择结束 */}
        </List>
        {/* ---填写名字 */}
        <div style={{height:"50px",backgroundColor:'#FFFFFF'}}>
          <span style={{padding:'20px 14px',fontSize:'18px'}}>名字</span>
          <input type='text' style={{margin:'8px 30px',height:'30px'}} onChange={this.mingzi}/>
        </div>
        {/* ----填写名字结束 */}
        {/* 添加图片 */}
        <WingBlank >
        <ImagePicker
          length='1'
          files={files}
          onChange={this.onChange}
          selectable={files.length < 7}
          multiple={this.state.multiple}
        style={{width:'300px',height:'100%'}}/>
      </WingBlank>
      {/* 添加图片结束 */}


          <input type="submit" style={{marginLeft:'80%',width:'50px',height:'30px'}} onClick={this.todata}/>
        {/* ----添加图片和提交结束 */}
        {/* {
           console.log(this.state.whereValue),
           console.log(this.state.mingzi),
           console.log(this.state.yanse),
           this.state.zhonglei.map((itme,index)=>(<p>{itme}</p>))

        } */}
      </div>
    )
  }
}
const TestWrapper = createForm()(Insert);
export default TestWrapper;