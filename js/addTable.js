//appraisalManagement的数据自动填入
$(function () {
    //全局变量

    //定义全局结点,结点在JSON中的下标
    var treeNodeInfo,index;
    //根据键获取值
    var temp = localStorage.getItem('table');
    //变为JSON
    var tempJson = JSON.parse(temp);
    //通过回调函数获取日期（年、月）
    var year,month;

    //标记JSON数组中的下标
    var m = 0;

    var curMenu = null, zTree_Menu = null;
    var setting = {
        view: {
            showIcon: false,
            showLine: false,
            selectedMulti: false,
            dblClickExpand: false,
            addHoverDom: addHoverDom,   //增加
            removeHoverDom: removeHoverDom, //删除
            dblClickExpand: false,
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        edit: {
            enable: true,
            showRemoveBtn: true,
            // showRemoveBtn: setRemoveBtn,         //设置结点删除按钮
        },
        callback: {
            beforeClick: beforeClick,
            beforeRemove: beforeRemove,
            onClick: ztreeOnclick
            // beforeRename: beforeRename
        }
    };

    var zNodes = JSON.parse(localStorage.getItem('table') || '[]');         /*从localStorage获取数据*/
    $(document).ready(function(){
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);  //初始化
    });

    // 添加新结点
    var newCount = 1;
    function addHoverDom(treeId, treeNode) {
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId //id
            + "' title='添加' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if (btn) btn.bind("click", function(){
            $("#modalAdd").modal({});        //调用添加模态框
            $('.closeModal,#modalAddconfirm,.close').unbind('click').bind('click',function (event) {
                if(event.target.id == 'modalAddconfirm'){
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:$('#addInput').val()});
                    newCount++;
                    $('#modalAdd #modalBody').empty();
                }else if(event.target.class == 'closeModal'){
                    $('#modalAdd #modalBody').empty();
                }else if(event.target.class == 'close')
                    $('#modalAdd #modalBody').empty();
                $('#modalAdd').modal('toggle');

            });
            return false;
        });
    }

    //删除结点
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    }

    //单击展开
    function beforeClick(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.expandNode(treeNode);
    }

    //删除节点前模态框的提示
    function beforeRemove(treeId, treeNode) {
        $("#modalDel").modal({});   //调用bootstrap模态框
        $('#modalBody').append("确定删除" + treeNode.name + "?");    //为模态框动态添加内容
        $('.close,.closeModal,#confirm').unbind('click').bind('click',function (event) {
            if(event.target.id == 'confirm'){
                var zTree = $.fn.zTree.getZTreeObj(treeId);
                zTree.removeNode(treeNode);
            }else if(event.target.class == 'close'){
                $('#modalDel #modalBody').empty();  //点×时将模态框内容置空
            }
            $('#modalDel #modalBody').empty();  //点取消时将模态框内容置空
            $('#modalDel').modal('toggle');
        });
        return false;
    }

    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#test3' //指定元素
            ,type: 'month'
            ,event:'focus'
            ,done:function (value,date) { //控件选择完毕的回调
                year = JSON.stringify(date.year); //获取年
                month = JSON.stringify(date.month); //获取月
                // 判断结点
                 if(treeNodeInfo!=null&&treeNodeInfo.level==2){
                     //判断年月
                     //  console.log(tempJson[index]["趋势表"]["日期"][0]["月"]);
                     //   console.log(tempJson[index]["趋势表"]["日期"][1]["月"]);
                     if(treeNodeInfo.hasOwnProperty("index")){
                         for(var i=0;i<tempJson[index]["趋势表"]["日期"].length;i++){
                             if(year==tempJson[index]["趋势表"]["日期"][i]["年"]&&
                                     month==tempJson[index]["趋势表"]["日期"][i]["月"]){
                                     //更新表单信息
                                 m = i ;
                                 $("#11z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["1"].直接领导考核);
                                 $("#11j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["1"].分管领导考核);
                                 $("#11bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["1"].备注);
                                 $("#12z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["2"].直接领导考核);
                                 $("#12j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["2"].分管领导考核);
                                 $("#12bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["2"].备注);
                                 $("#13z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["3"].直接领导考核);
                                 $("#13j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["3"].分管领导考核);
                                 $("#13bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["3"].备注);
                                 $("#14z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["4"].直接领导考核);
                                 $("#14j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["4"].分管领导考核);
                                 $("#14bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["4"].备注);
                                 $("#15z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["合计"].直接领导考核);
                                 $("#15j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["合计"].分管领导考核);
                                 $("#15bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["合计"].备注);

                                 $("#21z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["1"].直接领导考核);
                                 $("#21j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["1"].分管领导考核);
                                 $("#21bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["1"].备注);
                                 $("#22z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["2"].直接领导考核);
                                 $("#22j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["2"].分管领导考核);
                                 $("#22bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["2"].备注);
                                 $("#23z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["3"].直接领导考核);
                                 $("#23j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["3"].分管领导考核);
                                 $("#23bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["3"].备注);
                                 $("#24z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["4"].直接领导考核);
                                 $("#24j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["4"].分管领导考核);
                                 $("#24bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["4"].备注);
                                 $("#25z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["合计"].直接领导考核);
                                 $("#25j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["合计"].分管领导考核);
                                 $("#25bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["合计"].备注);

                                 $("#31z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["1"].直接领导考核);
                                 $("#31j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["1"].分管领导考核);
                                 $("#31bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["1"].备注);
                                 $("#32z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["2"].直接领导考核);
                                 $("#32j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["2"].分管领导考核);
                                 $("#32bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["2"].备注);
                                 $("#33z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["3"].直接领导考核);
                                 $("#33j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["3"].分管领导考核);
                                 $("#33bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["3"].备注);
                                 $("#34z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["4"].直接领导考核);
                                 $("#34j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["4"].分管领导考核);
                                 $("#34bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["4"].备注);
                                 $("#35z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["合计"].直接领导考核);
                                 $("#35j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["合计"].分管领导考核);
                                 $("#35bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["合计"].备注);

                                 $("#41z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["1"].直接领导考核);
                                 $("#41j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["1"].分管领导考核);
                                 $("#41bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["1"].备注);
                                 $("#42z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["2"].直接领导考核);
                                 $("#42j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["2"].分管领导考核);
                                 $("#42bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["2"].备注);
                                 $("#43z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["3"].直接领导考核);
                                 $("#43j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["3"].分管领导考核);
                                 $("#43bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["3"].备注);
                                 $("#44z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["4"].直接领导考核);
                                 $("#44j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["4"].分管领导考核);
                                 $("#44bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["4"].备注);
                                 $("#45z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["合计"].直接领导考核);
                                 $("#45j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["合计"].分管领导考核);
                                 $("#45bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["合计"].备注);

                                 $("#5z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["统计"].直接领导考核);
                                 $("#5j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["统计"].分管领导考核);
                                 $("#5bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["统计"].备注);
                                     return;
                             }
                         }
                         //year和month在数组中没有找到
                         alert(year+'年'+month+'月'+"还没有考评表！");
                         $('input').val("");//置空
                     }  //没有index
                     else{
                         // alert("还没有index！");
                         $('input').val("");//置空
                     }
                 }

                 else{
                     $('input').val("");//置空
                 }
            }
        });
    });

    //点击人员后将趋势表信息渲染到右边表格中
    function ztreeOnclick(event,treeId, treeNode){
        treeNodeInfo = treeNode;
        index = treeNodeInfo.index;  //点击结点获取结点在JSON数组中的下表
        // console.log(year+month);
        if(year!=null&&month!=null){
            $('.layui-input #test3').attr("placeholder",year+'-'+month);
            if(treeNode.level == 2&&treeNode.hasOwnProperty("趋势表")){
                //判断日期(测试日期，2019年12月)
                for(var i=0;i<tempJson[index]["趋势表"]["日期"].length;i++){
                    if(year==treeNode.趋势表["日期"][i]["年"]&&
                        month==treeNode.趋势表["日期"][i]["月"]){
                        //table表填内容
                        m = i;
                        $("#11z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["1"].直接领导考核);
                        $("#11j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["1"].分管领导考核);
                        $("#11bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["1"].备注);
                        $("#12z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["2"].直接领导考核);
                        $("#12j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["2"].分管领导考核);
                        $("#12bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["2"].备注);
                        $("#13z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["3"].直接领导考核);
                        $("#13j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["3"].分管领导考核);
                        $("#13bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["3"].备注);
                        $("#14z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["4"].直接领导考核);
                        $("#14j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["4"].分管领导考核);
                        $("#14bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["4"].备注);
                        $("#15z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["合计"].直接领导考核);
                        $("#15j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["合计"].分管领导考核);
                        $("#15bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["个人素质"]["合计"].备注);

                        $("#21z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["1"].直接领导考核);
                        $("#21j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["1"].分管领导考核);
                        $("#21bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["1"].备注);
                        $("#22z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["2"].直接领导考核);
                        $("#22j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["2"].分管领导考核);
                        $("#22bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["2"].备注);
                        $("#23z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["3"].直接领导考核);
                        $("#23j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["3"].分管领导考核);
                        $("#23bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["3"].备注);
                        $("#24z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["4"].直接领导考核);
                        $("#24j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["4"].分管领导考核);
                        $("#24bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["4"].备注);
                        $("#25z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["合计"].直接领导考核);
                        $("#25j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["合计"].分管领导考核);
                        $("#25bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作态度"]["合计"].备注);

                        $("#31z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["1"].直接领导考核);
                        $("#31j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["1"].分管领导考核);
                        $("#31bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["1"].备注);
                        $("#32z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["2"].直接领导考核);
                        $("#32j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["2"].分管领导考核);
                        $("#32bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["2"].备注);
                        $("#33z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["3"].直接领导考核);
                        $("#33j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["3"].分管领导考核);
                        $("#33bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["3"].备注);
                        $("#34z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["4"].直接领导考核);
                        $("#34j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["4"].分管领导考核);
                        $("#34bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["4"].备注);
                        $("#35z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["合计"].直接领导考核);
                        $("#35j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["合计"].分管领导考核);
                        $("#35bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["专业知识"]["合计"].备注);

                        $("#41z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["1"].直接领导考核);
                        $("#41j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["1"].分管领导考核);
                        $("#41bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["1"].备注);
                        $("#42z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["2"].直接领导考核);
                        $("#42j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["2"].分管领导考核);
                        $("#42bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["2"].备注);
                        $("#43z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["3"].直接领导考核);
                        $("#43j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["3"].分管领导考核);
                        $("#43bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["3"].备注);
                        $("#44z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["4"].直接领导考核);
                        $("#44j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["4"].分管领导考核);
                        $("#44bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["4"].备注);
                        $("#45z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["合计"].直接领导考核);
                        $("#45j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["合计"].分管领导考核);
                        $("#45bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["工作能力"]["合计"].备注);

                        $("#5z").val(tempJson[index]["趋势表"]["日期"][i]["表"]["统计"].直接领导考核);
                        $("#5j").val(tempJson[index]["趋势表"]["日期"][i]["表"]["统计"].分管领导考核);
                        $("#5bei").val(tempJson[index]["趋势表"]["日期"][i]["表"]["统计"].备注);


                        return;
                    }else{
                        continue;
                    }
                }
                //没有找到
                alert(year+'年'+month+'月'+"还没有考评表！");
                $('input').val("");//置空
            }else{
                // alert("还没有index！");
                $('input').val("");//置空
            }
        }else {
            $('input').val("");//置空
        }
    }

    //table修改函数
    $('#alter').unbind('click').bind('click',function () {
        $('input').attr("disabled",false);
        alert('你现在可以修改表格！');
    });

    //点击保存按钮将修改的数据保存到localStorage中
    $('#save').unbind('click').bind('click',function () {
        $('.content,.remark').attr('disabled','disabled');
        //判断日期是否准确

            //修改JSON对应的值
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["1"].直接领导考核=$("#11z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["1"].分管领导考核=$("#11j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["1"].备注=$("#11bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["2"].直接领导考核=$("#12z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["2"].分管领导考核=$("#12j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["2"].备注=$("#12bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["3"].直接领导考核=$("#13z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["3"].分管领导考核=$("#13j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["3"].备注=$("#13bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["4"].直接领导考核=$("#14z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["4"].分管领导考核=$("#14j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["4"].备注=$("#14bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["合计"].直接领导考核=$("#15z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["合计"].分管领导考核=$("#15j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["合计"].备注=$("#15bei").val();

            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["1"].直接领导考核=$("#21z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["1"].分管领导考核=$("#21j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["1"].备注=$("#21bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["2"].直接领导考核=$("#22z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["2"].分管领导考核=$("#22j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["2"].备注=$("#22bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["3"].直接领导考核=$("#23z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["3"].分管领导考核=$("#23j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["3"].备注=$("#23bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["4"].直接领导考核=$("#24z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["4"].分管领导考核=$("#24j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["4"].备注=$("#24bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["合计"].直接领导考核=$("#25z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["合计"].分管领导考核=$("#25j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["合计"].备注=$("#25bei").val();

            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["1"].直接领导考核=$("#31z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["1"].分管领导考核=$("#31j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["1"].备注=$("#31bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["2"].直接领导考核=$("#32z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["2"].分管领导考核=$("#32j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["2"].备注=$("#32bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["3"].直接领导考核=$("#33z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["3"].分管领导考核=$("#33j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["3"].备注=$("#33bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["4"].直接领导考核=$("#34z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["4"].分管领导考核=$("#34j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["4"].备注=$("#34bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["合计"].直接领导考核=$("#35z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["合计"].分管领导考核=$("#35j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["合计"].备注=$("#35bei").val();

            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["1"].直接领导考核=$("#41z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["1"].分管领导考核=$("#41j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["1"].备注=$("#41bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["2"].直接领导考核=$("#42z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["2"].分管领导考核=$("#42j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["2"].备注=$("#42bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["3"].直接领导考核=$("#43z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["3"].分管领导考核=$("#43j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["3"].备注=$("#43bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["4"].直接领导考核=$("#44z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["4"].分管领导考核=$("#44j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["4"].备注=$("#44bei").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["合计"].直接领导考核=$("#45z").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["合计"].分管领导考核=$("#45j").val();
            tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["合计"].备注=$("#45bei").val();

            tempJson[index]["趋势表"]["日期"][m]["表"]["统计"].直接领导考核 = $("#5z").val;
            tempJson[index]["趋势表"]["日期"][m]["表"]["统计"].分管领导考核 = $("#5j").val;
            tempJson[index]["趋势表"]["日期"][m]["表"]["统计"].备注 = $("#5bei").val;
            //存入localStorage
            localStorage.setItem('table',JSON.stringify(tempJson));

        alert('保存成功！');
    });

    //趋势键
    $('#tendency').unbind('click').bind('click',function () {
        //如果没有选中信息，判错
        if(treeNodeInfo==null){
            alert('你还没有选中结点！');
        }else{
            window.location.href = "appraisalChart.html";
        }

    });

    //appraisalChart网页JS



    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#test1' //指定元素
            ,type: 'month'
            ,event:'focus'
            ,done:function (value,date) { //控件选择完毕的回调
                year = JSON.stringify(date.year); //获取年
                month = JSON.stringify(date.month); //获取月
                if(treeNodeInfo!=null&&treeNodeInfo.level==2){
                    if(tempJson.hasOwnProperty(index)){
                        for(var j=0;j<tempJson[index]["趋势表"]["日期"].length;j++){
                            if(year==treeNodeInfo.趋势表["日期"][j]["年"]&&
                                month==treeNodeInfo.趋势表["日期"][j]["月"]){
                                m = j;

                                //更改eChart图标信息
                                // 基于准备好的dom，初始化echarts实例
                                var myChart = echarts.init($("#main").get(0),'dark');  //jQuery对象转换成dom对象



                                // 指定图表的配置项和数据
                                var option = {
                                    title: {
                                        text: '考评管理——月考评图'
                                    },
                                    legend: {
                                        // data: ['单项数据', '合计数据'],
                                        // align: 'left'
                                    },
                                    toolbox: {
                                        // 右上方功能键,
                                        feature: {
                                            //数据显示
                                            magicType: {
                                                type: ['stack', 'tiled']
                                            },
                                            //数据视图
                                            dataView: {},
                                            //保存图像
                                            saveAsImage: {
                                                pixelRatio: 2
                                            }
                                        }
                                    },
                                    tooltip: {},
                                    dataset:{
                                        dimensions:['item','1','2','3','4','合计'],
                                        source:[
                                            //第一张表的数据
                                            {item:'个人素质','1':tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["1"].直接领导考核,
                                                '2':tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["2"].直接领导考核,
                                                '3':tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["3"].直接领导考核,
                                                '4':tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["4"].直接领导考核},
                                            {item:'工作态度','1':tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["1"].直接领导考核,
                                                '2':tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["2"].直接领导考核,
                                                '3':tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["3"].直接领导考核,
                                                '4':tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["4"].直接领导考核},
                                            {item:'专业知识','1':tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["1"].直接领导考核,
                                                '2':tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["2"].直接领导考核,
                                                '3':tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["3"].直接领导考核,
                                                '4':tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["4"].直接领导考核},
                                            {item:'工作能力','1':tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["1"].直接领导考核,
                                                '2':tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["2"].直接领导考核,
                                                '3':tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["3"].直接领导考核,
                                                '4':tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["4"].直接领导考核},
                                            // //第二张表的数据
                                            {item:'个人素质','合计':tempJson[index]["趋势表"]["日期"][m]["表"]["个人素质"]["合计"].直接领导考核},
                                            {item:'工作态度','合计':tempJson[index]["趋势表"]["日期"][m]["表"]["工作态度"]["合计"].直接领导考核},
                                            {item:'专业知识','合计':tempJson[index]["趋势表"]["日期"][m]["表"]["专业知识"]["合计"].直接领导考核},
                                            {item:'工作能力','合计':tempJson[index]["趋势表"]["日期"][m]["表"]["工作能力"]["合计"].直接领导考核}

                                        ]
                                    },
                                    xAxis: [{type:'category', silent: false, splitLine: {show: false}, gridIndex: 0},
                                        {type:'category', silent: false, splitLine: {show: false}, gridIndex: 1}],
                                    yAxis: [{gridIndex: 0},{gridIndex: 1}],
                                    grid: [
                                        {bottom: '55%'},
                                        {top: '55%'}
                                    ],
                                    series: [
                                        //第一张表的数据
                                        {type:'bar',
                                            // name:'1',
                                            // data:[2,3,4,5]
                                        },
                                        {type:'bar',
                                            // name:'2',
                                            // data:[2,3,4,5]
                                        },
                                        {type:'bar',
                                            // name:'3',
                                            // data:[2,3,4,5]
                                        },
                                        {type:'bar',
                                            // name:'4',
                                            // data:[2,3,4,5]
                                        },
                                        //第二张表的数据
                                        {type:'bar',xAxisIndex: 1, yAxisIndex: 1},
                                    ],

                                    animationEasing: 'elasticOut',
                                    animationDelayUpdate: function (idx) {
                                        return idx * 5;
                                    }

                                };
                                // 使用刚指定的配置项和数据显示图表。
                                myChart.setOption(option);
                                return;
                            }
                        }
                        alert(year+"年"+month+"月"+"还没有考评表信息！");
                    }else{
                        alert("没有考评表信息！");
                    }
                }else alert("没有选择结点！");
            }
        });
    });
});

