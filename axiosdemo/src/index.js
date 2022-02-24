import axios from 'axios';


// axios.get( 'https://localhost:44320/WeatherForecast?id=1').then(res=>{
//     console.log(res);
// });

// axios.get( 'https://localhost:44320/WeatherForecast' ,{params:{id:1}}).then(res=>{
//     console.log(res);
// });

// axios.post('',{id:1}).then(res=>{
//     console.log(res);
// });

// axios.all([
//     axios.get( 'https://localhost:44320/WeatherForecast?id=1'),
//     axios.get( 'https://localhost:44320/WeatherForecast?id=2'),
//     axios.get( 'https://localhost:44320/WeatherForecast?id=3')
// ]).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })


// axios.all([
//     axios.get( 'https://localhost:44320/WeatherForecast?id=1'),
//     axios.get( 'https://localhost:44320/WeatherForecast?id=2'),
//     axios.get( 'https://localhost:44320/WeatherForecast?id=3')
// ]).then(
//     axios.spread((res1,res2,res3)=>{

//     })
// ).catch(err=>{
//     console.log(err);
// })



// axios.defaults.baseURL='';
// axios.defaults.timeout=5000;
// axios.defaults.transformRequest=function(data) {
//     data=JSON.stringify(data)
//     return data;
// }


axios.interceptors.request.use(
    config=>{
        // 每次发送请求之前判断是否有token
        //如果存在，则统一在http请求的headers都带上token，
        //即使本地存在token，也有可能token过期，所以在响应拦截器中对返回状态进行判断
        const token=window.localStorage.getItem("token");
        token && (config.headers.Authorization=token);
        return config;
    },error=>{
        return Promise.error(error);
    }
)

axios.interceptors.response.use(
    respense=>{
        //如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        //否则的话抛出错误
        if (response.status===200) {
            return Promise.resolve(response);
        }else{
            return Promise.reject(response);
        }
    },
    //服务器状态码不是2开头的情况
    //根据后台状态码协议进行响应的操作
    error=>{
        if (error.response.status) {
            return Promise.reject(error.response);
        }
    }
    
)




let test=axios.create({
    baseURL:"",
    timeout:5000
})

let local=axios.create({
    baseURL:"",
    timeout:3000
})




