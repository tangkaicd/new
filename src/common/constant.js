import $ from 'jquery'
// var pjPath="/";
var ctx="http://192.168.0.128:9093";
var ctx1="http://192.168.0.128:9095/finance";
// var ctx="http://localhost:9093";
// var ctx1="http://localhost:9095/finance";
if (process.env.NODE_ENV === 'production') {
    // pjPath='/' + location.pathname.split('/')[1]+'/',
    // ctx=location.protocol+'//' +location.host+'/' + location.pathname.split('/')[1];
    ctx=location.protocol+'//' +location.host;
    ctx1=location.protocol+'//' +location.hostname+":9095/finance";
    if(ctx1.indexOf("rules.chfcloud.com") != -1){
        ctx1=location.protocol+'//' +location.hostname+"/finance";
    }

    // $.ajax({
    //     type : 'post',
    //     async:false,
    //     url : ctx+'/index/getPath.do',
    //     success : function(result){
    //         if(!result.success){
    //             alert(result.msg);
    //             return;
    //         }
    //         console.log(result);
    //         ctx1=result.data.ctx1;
    //     }
    // })
}
export default{
    array_pageSize:[10,20,50,100],
    ctx:ctx,
    ctx1:ctx1,
    array_yesOrNo:[
        {'label':'否','value':0},
        {'label':'是','value':1},
    ],
    obj_yesOrNo:{
            0:"否",
            1:"是",
    },
    array_isPass:[
        {'label':'否','value':2},
        {'label':'是','value':3},
    ],
    array_type:[
        {'label':'所有','value':'0'},
        {'label':'中央','value':'1'},
        {'label':'地方','value':'2'}
    ],
    obj_policyCategory:{
        '0':'所有',
        '1':'中央',
        '2':'地方',
    },

    array_policyRelation:[
        {'label':'无替换','value':'0'},
        {'label':'替换','value':'1'},
    ],
    obj_policyRelation:{
        '0':'无替换',
        '1':'替换',
    },

    array_fileStatus:[
        {'label':'有效','value':1},
        {'label':'失效','value':0},
    ],
    obj_fileStatus:{
        0:'失效',
        1:'有效',
    },

    array_auditState:[
        {'label':'未提交审核','value':0},
        {'label':'审核中','value':1},
        {'label':'审核不通过','value':2},
        {'label':'审核通过','value':3},
    ],
    obj_auditState:{
        0:'未提交审核',
        1:'审核中',
        2:'审核不通过',
        3:'审核通过',
    },
    obj_datasourceType:{
        '0':'文档导入',
        '1':'数据库采集',
    },
    array_datasourceType:[
        {'label':'文档导入','value':0},
        {'label':'数据库采集','value':1},
    ],
};