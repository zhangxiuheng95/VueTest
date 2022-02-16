let n=100;
function add(x,y)
{
    return x+y;
}

function demo(string){
    return string;
}

//暴露出去让其他模块可引用
module.exports={
    n:n,add:add,demo
};