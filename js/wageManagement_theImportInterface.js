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
var zCheckNodes/* = JSON.parse(localStorage.getItem('cmts') || '[]');*/         /*定义全局变量 用于保存树节点数据*/


function beforeClick(treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeCheck");
    zTree.expandNode(treeNode);
}

var checkedNodes;                    //定义全局变量用于存储被选中的人员名单
//工资管理界面导入人员名单
$('#importPersion').unbind('click').bind('click',function () {
    $.ajax({
        type: 'POST',
        url: './archiveManagement.php',
        dataType: 'json',
        async: false,
        data:{
            'flag': 0
        },
        success:function (data) {
            zCheckNodes = data;
            $.fn.zTree.init($("#treeCheck"), setting, zCheckNodes);     //初始化树
            // console.log(data)
        },
        error:function () {
            console.log('操作失败！')
        }
    })
    $('#confimImport').unbind('click').bind('click',function () {
        var checkedId = [];               //记录被选择的人的ID
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
               td = td +  '<td>√</td>'
           }else{
               td = td + '<td></td>'
           }
       }
       for(let i = 0;i < checkedNodes.length; i++){
           //向后台发起 ajax 请求获取工号
           $.ajax({
               type: 'POST',
               url: './archiveManagement.php',
               // dataType: 'json',
               async: false,
               data:{
                   'id': checkedNodes[i].personId,
                   'flag': 6
               },
               success:function (data) {
                   checkedNodes[i].jobNum = data;
               },
               error:function () {
                    alert('操作失败!')
               }
           })
           $("#peopleTable").append(
               '<tr>' +
               '<td class = "personId">'+ checkedNodes[i].jobNum + '</td><td>'+ checkedNodes[i].name + td +'<td><img src = "imgs/delete.png" class = "peopleDel" title = "删除"></td></tr>'
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
    //保存需要导入的属性
    checkedProperty = [];    //保存选择的属性
    length = 0;
    for(let i = 0; i < $('.checkbox').length;i++){
        if($('.checkbox:eq('+i+')').prop('checked')){
            checkedProperty[length++] = $('.checkbox:eq('+i+')').prop('title');
        }
    }
    var checkedArr = [];                //用来保存需要导入的人的工号
    var checkedArrLength = 0;           //checkedArr数组的长度
    $('#peopleTable tr').each(function () {
        if($(this).children('td:eq(0)').text() != ''){
            checkedArr[checkedArrLength++] = $(this).children('td:eq(0)').text();
        }
    })
    //尝试向后台发起 ajax 请求 将工资批量导入数据库表中
    if(checkedArr.length != 0 && checkedProperty.length != 0){
        $('#modalImport').modal({})                             //打开模态框
        $('#importConfirm').unbind('click').bind('click',function () {
            $.ajax({
                type: 'POST',
                url: './archiveManagement.php',
                // dataType: 'json',
                async: true,
                data:{
                    'checkedNodes': checkedArr,
                    'checkedProperty': checkedProperty,
                    'selectedPersonJobNum': $('#salarySlipTable').find('td:first').text(),
                    'flag': 7
                },
                success:function (data) {
                    console.log(data)
                },
                error:function () {
                    console.log('操作失败！！！！！！！！！！')
                }
            })
            $('#modalImport').modal('toggle')          /*关闭模态框*/
        })
    }
    else{
        alert('请选择属性')
    }

})
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

