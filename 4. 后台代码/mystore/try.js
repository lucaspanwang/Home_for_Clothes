// var arr=[1,4,2,7,8,5,4];

// function fromStoB(a,b){
//     return b-a;
// }
// console.log(arr.sort(fromStoB));

// function tre(name){
//     return function(age){
//         console.log(name+'年龄:'+age)
//     }
// }

// tre('张三')(20)


// console.log(eval(5*8))


// function getUrlParam(sUrl,sKey){
//     var arr=[]
//     arr=sUrl.split('?');
//     var arr1=[]
//     arr1=arr[1].split('&')
//     arr1.shift()
//     if(!sKey){
//         return 
//     }else{
//         return 0
//     }
// }
// console.log(getUrlParam('ldkjfshf?lksjdf&key=1'))

// function count(str){
//     var obj={};
//     var arr=str.split('');
//     for(var i=0;i<arr.length;i++){
//         var value;
//         var num=0;
//         if(arr[i]!=''){
//             value=arr[i];
//             for(var j=i;i<arr.length;j++){
//                 if(arr[j]==arr[i]){
//                     arr.splice(j,1)
//                     num++;
//                 }
//             }
//             obj+=arr[i]+':'+num;
//         }
//     }
//     return obj
// }
// console.log(count('hello world')
// 
var a=5;
var i = (a--);
console.log(a)
console.log(i);