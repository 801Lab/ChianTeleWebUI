var setting = {
    view:{
        dblClickExpand: false
    },
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback:{
        beforeClick: beforeClick,
        // onClick: ztreeOnclick1,
    }
};
var zCheckNodes = JSON.parse(localStorage.getItem('cmts') || '[]');         /*从localStorage获取数据*/

var code;

function setCheck() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        py = $("#py").attr("checked")? "p":"",
        sy = $("#sy").attr("checked")? "s":"",
        pn = $("#pn").attr("checked")? "p":"",
        sn = $("#sn").attr("checked")? "s":"",
        type = { "Y":py + sy, "N":pn + sn};
    zTree.setting.check.chkboxType = type;
    showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
}
function showCode(str) {
    if (!code) code = $("#code");
    code.empty();
    code.append("<li>"+str+"</li>");
}

function beforeClick(treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeCheck");
    zTree.expandNode(treeNode);
}

$(document).ready(function(){
    $.fn.zTree.init($("#treeCheck"), setting, zCheckNodes);
    setCheck();
    $("#py").bind("change", setCheck);
    $("#sy").bind("change", setCheck);
    $("#pn").bind("change", setCheck);
    $("#sn").bind("change", setCheck);
});

//点击树状图人员，将人员工资信息导入到右侧工资信息栏
// function ztreeOnclick1(event,treeId, treeNode){
//     if(treeNode.level == 2){
//         $("#salarySlipTable tr:last").remove();
//         console.log(treeNode.工号 )
//         $('#salarySlipTable').append(
//             '<tr><td>'+ treeNode.工号 +'</td><td>'+ treeNode.name +'</td><td>'+ treeNode.工资.级别 +'</td><td>'+ treeNode.工资.高新技术补贴 +'</td></tr>'
//         )
//     }
// }


var checkedNodes;                    //定义全局变量用于存储被选中的人员名单
//工资管理界面导入人员名单
$('#importPersion').unbind('click').bind('click',function () {
    $('#confimImport').unbind('click').bind('click',function () {
        var zTreeObj = $.fn.zTree.getZTreeObj("treeCheck");
        checkedNodes = zTreeObj.getCheckedNodes();
       for(let i=0; i < checkedNodes.length; i++){
           if(checkedNodes[i].pId < 10){
               checkedNodes.splice(i,1);
               i--;
           }
       }
       var td = '';
       for(let i = 0; i < $('.checkbox').length;i++){
           if($('.checkbox:eq('+i+')').prop('checked')){
               // console.log($('.checkbox:eq('+i+')').prop('title'))
               td = td +  '<td>√</td>'
           }else{
               td = td + '<td></td>'
           }
       }
       for(let i = 0;i < checkedNodes.length; i++){
           $("#peopleTable").append(
               '<tr>' +
               '<td>'+ checkedNodes[i].name + '</td><td>'+ checkedNodes[i].性别 + td +'<td><img src = "imgs/delete.png" class = "peopleDel" title = "删除"></td></tr>'
           );
           $('.peopleDel').unbind('click').bind('click',function () {
               $(this).parents("tr").remove();              //使用 parents() 方法寻找其祖先结点 ,等效于 $(this).parent().parent().remove()
           })
       }
        $('#myModalImport').modal('toggle')
    })
});

//导入人员确定按钮
$('#peopleImportConfirm').unbind('click').bind('click',function () {
    var zTree = $.fn.zTree.getZTreeObj("treeCheck");
    var tds=$('#salarySlipTable tr:last td');                 //获取第二行第一列的工号
    var selectedTreeNode = zTree.getNodeByParam('工号',tds.eq(0).html());     //根据工号获取treeNode
    for(let i = 0;i<checkedNodes.length;i++){
        zCheckNodes.forEach(function (item) {
            if(item.工号 == checkedNodes[i].工号){
                for(let j = 0; j < $('.checkbox').length;j++){
                    if($('.checkbox:eq('+j+')').prop('checked')){
                        var props = $('.checkbox:eq('+j+')').prop('title');
                        item.工资[props] = selectedTreeNode.工资[props];
                    }
                }
            }
        })
    }
    localStorage.setItem('cmts',JSON.stringify(zCheckNodes));       //将新数据保存到localStorage中
    $('#modalImport').modal({})                             //打开模态框
})
// $('#peopleImportConfirm').unbind('click').bind('click',function () {
//     console.log('111111111')
// })
//form表单样式
layui.use(['layer', 'form'], function(){
    var layer = layui.layer
        ,form = layui.form;
});

//动画样式
layui.use('jquery', function(){
    var $ = layui.$;

    //演示动画
    $('.site-doc-icon .layui-anim').on('click', function(){
        var othis = $(this), anim = othis.data('anim');

        //停止循环
        if(othis.hasClass('layui-anim-loop')){
            return othis.removeClass(anim);
        }

        othis.removeClass(anim);

        setTimeout(function(){
            othis.addClass(anim);
        });
        //恢复渐隐
        if(anim === 'layui-anim-fadeout'){
            setTimeout(function(){
                othis.removeClass(anim);
            }, 1300);
        }
    });
});

// layui.use('table',)
//table表单样式
// layui.use('table', function(){
//     var table = layui.table;
//     table.render({
//         elem: '#test'
//         ,url:'/test/table/demo1.json'
//         ,toolbar: '#toolbarDemo'
//         ,title: '用户数据表'
//         ,width: 600
//         // ,cellMinWidth: 160
//         ,cols: [[
//             // {type: 'checkbox', fixed: 'left'}
//             ,{field:'id', title:'工号', width:60, fixed: 'left', unresize: true}
//             ,{field:'name', title:'姓名', width:60, edit: 'text'}
//             ,{field:'email', title:'级别', width:60, edit: 'text', templet: function(res){
//                     return '<em>'+ res.email +'</em>'
//                 }}
//             ,{field:'sex', title:'技术补贴', width:60, edit: 'text'}
//             ,{field:'city', title:'请假扣款', width:60}
//             ,{field:'sign', title:'应发工资',width:60}
//             ,{field:'experience', title:'基本薪酬',/* width:60,*/ /*sort: true*/}
//             ,{field:'ip', title:'住房补贴', width:60}
//             ,{field:'logins', title:'违纪扣款', width:60, sort: true}
//             ,{field:'joinTime', title:'实发工资', width:60}
//             ,{field:'joinTime', title:'加班薪酬', width:60}
//             ,{field:'joinTime', title:'交通补贴', width:60}
//             ,{field:'joinTime', title:'五险一金', width:60}
//             ,{fixed: 'right', title:'操作', toolbar: '#barDemo'}
//         ]]
//         ,page: true
//     });
//
//     //头工具栏事件
//     table.on('toolbar(test)', function(obj){
//         var checkStatus = table.checkStatus(obj.config.id);
//         switch(obj.event){
//             case 'getCheckData':
//                 var data = checkStatus.data;
//                 layer.alert(JSON.stringify(data));
//                 break;
//             case 'getCheckLength':
//                 var data = checkStatus.data;
//                 layer.msg('选中了：'+ data.length + ' 个');
//                 break;
//             case 'isAll':
//                 layer.msg(checkStatus.isAll ? '全选': '未全选');
//                 break;
//         };
//     });
//
//     //监听行工具事件
//     table.on('tool(test)', function(obj){
//         var data = obj.data;
//         //console.log(obj)
//         if(obj.event === 'del'){
//             layer.confirm('真的删除行么', function(index){
//                 obj.del();
//                 layer.close(index);
//             });
//         } else if(obj.event === 'edit'){
//             layer.prompt({
//                 formType: 2
//                 ,value: data.email
//             }, function(value, index){
//                 obj.update({
//                     email: value
//                 });
//                 layer.close(index);
//             });
//         }
//     });
// });

