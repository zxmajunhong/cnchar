import orders from './stroke-order-jian.json'
import strokeTable from './stroke-table.json'

let _ = {};// 工具方法
let arg = {
    letter:'letter',shape:'shape',count:'count',name:'name',detail:'detail',array:'array',order:'order' // array 只是为了兼容 .stroke()
}
function init(){
    if(window && window.CnChar){
        let _old = CnChar._origin.stroke;
        _ = CnChar._;
        let _new = function(...args){
            if(_.has(args,arg.order)){ // 使用order
                return _order(...args);
            }
            return _old(...args)
        }
        CnChar.stroke = _new;
        String.prototype.stroke = function(...args){
            return _new(this,...args);
        }
        CnChar.type.stroke = arg;
        CnChar._.order = true;
        CnChar._.orderWithLetters = orderWithLetters;
        if(CnChar._reinitStrokeOrder){
            CnChar._reinitStrokeOrder();
            delete CnChar._reinitStrokeOrder;
        }
    }else{
        _._throw('必须先引入 cnchar: npm i cnchar')
    }
}

function _order(...args){
    let strs = args[0].split(''); // 待处理的字符串数组
    args = args.splice(1);
    // 多音字参数参数将被忽略
    let res = [];
    for(var i=0;i<strs.length;i++){
        res[i] = orders[strs[i]] // 字母版笔画表
    }
    return orderWithLetters(res,strs,args);
}
// res:字母版笔画数组
function orderWithLetters(res,strs,args){
    if(_.has(args,arg.letter)){
        return res;
    }
    for(var i=0;i<res.length;i++){
        if(typeof res[i] !== 'object'){
            res[i] = getStrokeSingle(strs[i],res[i],args)
        }
    }
    return res;
}
// bug CnChar.stroke('長城','order','count')
function getStrokeSingle(str,order,args){
    if(typeof order === 'undefined'){
        return str;
    }
    var isDetail = _.has(args,arg.detail);
    let name = arg.shape;
    if(!isDetail){
        if(_.has(args,arg.shape)){
            name = arg.shape;
        }else if(_.has(args,arg.name)){
            name = arg.name;
        }else if(_.has(args,arg.count)){
            name = arg.count;
        }
    }
    debugger
    if(name === arg.count){
        return order.length;
    }
    var arr = [];
    for(var i=0;i<order.length;i++){
        if(isDetail){
            arr[i] = strokeTable[order[i]]
        }else{
            arr[i] = strokeTable[order[i]][name];
        }
    }
    return arr;
}

init();