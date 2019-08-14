//appraisalManagement的数据自动填入
$(function () {
    //全局变量

    //定义全局结点,结点在JSON中的下标
    var treeNodeInfo,index;
    var ztreeJson,appraisalJson;
    //通过回调函数获取日期（年、月）
    var year,month,tableYear="",tableMonth="",tableID=1;
    var flag1=0;


    $.get("./conn.php",function (data,status) {
          //data为object
          ztreeJson = data;
          darwZtree();
    });

    function darwZtree() {
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
        var zNodes = ztreeJson;         /*从ztreeJson获取数据*/
        $(document).ready(function(){
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);  //初始化
        });
    }


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

    $.get("./conn2.php",function (data,status) {
        //data为object
        appraisalJson = data;
        drawData();
    });

    function drawData(){
        //点击日期查询数据库信息
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
                    if (treeNodeInfo != null && treeNodeInfo.level == 2) {
                        for (var i = 0; i < appraisalJson.length; i++) {
                             tableYear = appraisalJson[i].yearMonth.split('.')[0];
                             tableMonth = appraisalJson[i].yearMonth.split('.')[1];
                             tableID = appraisalJson[i].id;
                            if (year == tableYear && month == tableMonth && treeNodeInfo.id == tableID) {
                                //更新表单信息
                                index = i;
                                $("#11z").val(appraisalJson[i].value111);
                                $("#11j").val(appraisalJson[i].value112);
                                $("#11bei").val(appraisalJson[i].value113);
                                $("#12z").val(appraisalJson[i].value121);
                                $("#12j").val(appraisalJson[i].value122);
                                $("#12bei").val(appraisalJson[i].value123);
                                $("#13z").val(appraisalJson[i].value131);
                                $("#13j").val(appraisalJson[i].value132);
                                $("#13bei").val(appraisalJson[i].value133);
                                $("#14z").val(appraisalJson[i].value141);
                                $("#14j").val(appraisalJson[i].value142);
                                $("#14bei").val(appraisalJson[i].value143);
                                $("#15z").val(appraisalJson[i].value151);
                                $("#15j").val(appraisalJson[i].value152);
                                $("#15bei").val(appraisalJson[i].value153);

                                $("#21z").val(appraisalJson[i].value211);
                                $("#21j").val(appraisalJson[i].value212);
                                $("#21bei").val(appraisalJson[i].value213);
                                $("#22z").val(appraisalJson[i].value221);
                                $("#22j").val(appraisalJson[i].value222);
                                $("#22bei").val(appraisalJson[i].value223);
                                $("#23z").val(appraisalJson[i].value231);
                                $("#23j").val(appraisalJson[i].value232);
                                $("#23bei").val(appraisalJson[i].value233);
                                $("#24z").val(appraisalJson[i].value241);
                                $("#24j").val(appraisalJson[i].value242);
                                $("#24bei").val(appraisalJson[i].value243);
                                $("#25z").val(appraisalJson[i].value251);
                                $("#25j").val(appraisalJson[i].value252);
                                $("#25bei").val(appraisalJson[i].value253);

                                $("#31z").val(appraisalJson[i].value311);
                                $("#31j").val(appraisalJson[i].value312);
                                $("#31bei").val(appraisalJson[i].value313);
                                $("#32z").val(appraisalJson[i].value321);
                                $("#32j").val(appraisalJson[i].value322);
                                $("#32bei").val(appraisalJson[i].value323);
                                $("#33z").val(appraisalJson[i].value331);
                                $("#33j").val(appraisalJson[i].value332);
                                $("#33bei").val(appraisalJson[i].value333);
                                $("#34z").val(appraisalJson[i].value341);
                                $("#34j").val(appraisalJson[i].value342);
                                $("#34bei").val(appraisalJson[i].value343);
                                $("#35z").val(appraisalJson[i].value351);
                                $("#35j").val(appraisalJson[i].value352);
                                $("#35bei").val(appraisalJson[i].value353);

                                $("#41z").val(appraisalJson[i].value411);
                                $("#41j").val(appraisalJson[i].value412);
                                $("#41bei").val(appraisalJson[i].value413);
                                $("#42z").val(appraisalJson[i].value421);
                                $("#42j").val(appraisalJson[i].value422);
                                $("#42bei").val(appraisalJson[i].value423);
                                $("#43z").val(appraisalJson[i].value431);
                                $("#43j").val(appraisalJson[i].value432);
                                $("#43bei").val(appraisalJson[i].value433);
                                $("#44z").val(appraisalJson[i].value441);
                                $("#44j").val(appraisalJson[i].value442);
                                $("#44bei").val(appraisalJson[i].value443);
                                $("#45z").val(appraisalJson[i].value451);
                                $("#45j").val(appraisalJson[i].value452);
                                $("#45bei").val(appraisalJson[i].value453);

                                $("#5z").val(appraisalJson[i].value51);
                                $("#5j").val(appraisalJson[i].value52);
                                $("#5bei").val(appraisalJson[i].value53);
                                return;
                                }else {
                                    continue;
                                }
                            }
                            //year和month在数组中没有找到
                             alert(year+'年'+month+'月'+"还没有考评表！");
                             $('input').val("");//置空
                             return;
                        }else{
                        $('input').val("");//置空
                        return;
                    }
                }
            });
        });
}


    //点击人员后将趋势表信息渲染到右边表格中
    function ztreeOnclick(event,treeId, treeNode){
        treeNodeInfo = treeNode;
        if(year!=null&&month!=null){
            $('#test3.layui-input').attr("placeholder",year+'-'+month);
            if(treeNode.level == 2&&treeNode!=null){
                //判断日期
                for(var i=0;i<appraisalJson.length;i++){
                     tableYear = appraisalJson[i].yearMonth.split('.')[0];
                     tableMonth = appraisalJson[i].yearMonth.split('.')[1];
                     tableID = appraisalJson[i].id;
                    if(year==tableYear&&month==tableMonth&&treeNode.id==tableID){
                        //更新表单信息
                        index = i;
                        $("#11z").val(appraisalJson[i].value111);
                        $("#11j").val(appraisalJson[i].value112);
                        $("#11bei").val(appraisalJson[i].value113);
                        $("#12z").val(appraisalJson[i].value121);
                        $("#12j").val(appraisalJson[i].value122);
                        $("#12bei").val(appraisalJson[i].value123);
                        $("#13z").val(appraisalJson[i].value131);
                        $("#13j").val(appraisalJson[i].value132);
                        $("#13bei").val(appraisalJson[i].value133);
                        $("#14z").val(appraisalJson[i].value141);
                        $("#14j").val(appraisalJson[i].value142);
                        $("#14bei").val(appraisalJson[i].value143);
                        $("#15z").val(appraisalJson[i].value151);
                        $("#15j").val(appraisalJson[i].value152);
                        $("#15bei").val(appraisalJson[i].value153);

                        $("#21z").val(appraisalJson[i].value211);
                        $("#21j").val(appraisalJson[i].value212);
                        $("#21bei").val(appraisalJson[i].value213);
                        $("#22z").val(appraisalJson[i].value221);
                        $("#22j").val(appraisalJson[i].value222);
                        $("#22bei").val(appraisalJson[i].value223);
                        $("#23z").val(appraisalJson[i].value231);
                        $("#23j").val(appraisalJson[i].value232);
                        $("#23bei").val(appraisalJson[i].value233);
                        $("#24z").val(appraisalJson[i].value241);
                        $("#24j").val(appraisalJson[i].value242);
                        $("#24bei").val(appraisalJson[i].value243);
                        $("#25z").val(appraisalJson[i].value251);
                        $("#25j").val(appraisalJson[i].value252);
                        $("#25bei").val(appraisalJson[i].value253);

                        $("#31z").val(appraisalJson[i].value311);
                        $("#31j").val(appraisalJson[i].value312);
                        $("#31bei").val(appraisalJson[i].value313);
                        $("#32z").val(appraisalJson[i].value321);
                        $("#32j").val(appraisalJson[i].value322);
                        $("#32bei").val(appraisalJson[i].value323);
                        $("#33z").val(appraisalJson[i].value331);
                        $("#33j").val(appraisalJson[i].value332);
                        $("#33bei").val(appraisalJson[i].value333);
                        $("#34z").val(appraisalJson[i].value341);
                        $("#34j").val(appraisalJson[i].value342);
                        $("#34bei").val(appraisalJson[i].value343);
                        $("#35z").val(appraisalJson[i].value351);
                        $("#35j").val(appraisalJson[i].value352);
                        $("#35bei").val(appraisalJson[i].value353);

                        $("#41z").val(appraisalJson[i].value411);
                        $("#41j").val(appraisalJson[i].value412);
                        $("#41bei").val(appraisalJson[i].value413);
                        $("#42z").val(appraisalJson[i].value421);
                        $("#42j").val(appraisalJson[i].value422);
                        $("#42bei").val(appraisalJson[i].value423);
                        $("#43z").val(appraisalJson[i].value431);
                        $("#43j").val(appraisalJson[i].value432);
                        $("#43bei").val(appraisalJson[i].value433);
                        $("#44z").val(appraisalJson[i].value441);
                        $("#44j").val(appraisalJson[i].value442);
                        $("#44bei").val(appraisalJson[i].value443);
                        $("#45z").val(appraisalJson[i].value451);
                        $("#45j").val(appraisalJson[i].value452);
                        $("#45bei").val(appraisalJson[i].value453);

                        $("#5z").val(appraisalJson[i].value51);
                        $("#5j").val(appraisalJson[i].value52);
                        $("#5bei").val(appraisalJson[i].value53);
                        return;
                    }else{
                        continue;
                    }
                }
                //没有找到
                alert(year+'年'+month+'月'+"还没有考评表！");
                $('input').val("");//置空
                return;
            }else{
                $('input').val("");//置空
                return;
            }
        }else {
            $('input').val("");//置空
            return;
        }
    }
    //table修改函数
    $('#alter').unbind('click').bind('click',function () {
        $('input').attr("disabled",false);
        alert('你现在可以修改/创建表格！');
    });

    //点击保存按钮将修改的数据保存到数据库中
    $('#save').unbind('click').bind('click',function () {
        $('.content,.remark').attr('disabled','disabled');
            //先判断数据库中是否有改用户、对应时间的记录
            if(year==tableYear&&month==tableMonth&&treeNodeInfo.id==tableID){
                //数据库中有该用户，将修改网页的表单值传入数据库中
                flag1 = 1;
                $.post("./conn3.php",{
                    id: tableID,
                    year: tableYear,
                    month:tableMonth,
                    flag:flag1,
                    VALUE111:$("#11z").val(),
                    VALUE112:$("#11j").val(),
                    VALUE113:$("#11bei").val(),
                    VALUE121:$("#12z").val(),
                    VALUE122:$("#12j").val(),
                    VALUE123:$("#12bei").val(),
                    VALUE131:$("#13z").val(),
                    VALUE132:$("#13j").val(),
                    VALUE133:$("#13bei").val(),
                    VALUE141:$("#14z").val(),
                    VALUE142:$("#14j").val(),
                    VALUE143:$("#14bei").val(),
                    VALUE151:$("#15z").val(),
                    VALUE152:$("#15j").val(),
                    VALUE153:$("#15bei").val(),

                    VALUE211:$("#21z").val(),
                    VALUE212:$("#21j").val(),
                    VALUE213:$("#21bei").val(),
                    VALUE221:$("#22z").val(),
                    VALUE222:$("#22j").val(),
                    VALUE223:$("#22bei").val(),
                    VALUE231:$("#23z").val(),
                    VALUE232:$("#23j").val(),
                    VALUE233:$("#23bei").val(),
                    VALUE241:$("#24z").val(),
                    VALUE242:$("#24j").val(),
                    VALUE243:$("#24bei").val(),
                    VALUE251:$("#25z").val(),
                    VALUE252:$("#25j").val(),
                    VALUE253:$("#25bei").val(),

                    VALUE311:$("#31z").val(),
                    VALUE312:$("#31j").val(),
                    VALUE313:$("#31bei").val(),
                    VALUE321:$("#32z").val(),
                    VALUE322:$("#32j").val(),
                    VALUE323:$("#32bei").val(),
                    VALUE331:$("#33z").val(),
                    VALUE332:$("#33j").val(),
                    VALUE333:$("#33bei").val(),
                    VALUE341:$("#34z").val(),
                    VALUE342:$("#34j").val(),
                    VALUE343:$("#34bei").val(),
                    VALUE351:$("#35z").val(),
                    VALUE352:$("#35j").val(),
                    VALUE353:$("#35bei").val(),

                    VALUE411:$("#41z").val(),
                    VALUE412:$("#41j").val(),
                    VALUE413:$("#41bei").val(),
                    VALUE421:$("#42z").val(),
                    VALUE422:$("#42j").val(),
                    VALUE423:$("#42bei").val(),
                    VALUE431:$("#43z").val(),
                    VALUE432:$("#43j").val(),
                    VALUE433:$("#43bei").val(),
                    VALUE441:$("#44z").val(),
                    VALUE442:$("#44j").val(),
                    VALUE443:$("#44bei").val(),
                    VALUE451:$("#45z").val(),
                    VALUE452:$("#45j").val(),
                    VALUE453:$("#45bei").val(),

                    VALUE51:$("#5z").val(),
                    VALUE52:$("#5j").val(),
                    VALUE53:$("#5bei").val()
                },function (data,status) {
                    alert("数据：\n"+data+"\n状态："+status);
                });
                 flag1 = 0;//复原
            }else{
                //没有找到，表明数据库中没有该用户，flag1=0
                //向数据库中添加新的记录，并在页面上显示
                $.post("./conn3.php",{
                    id: treeNodeInfo.id,
                    name:treeNodeInfo.name,
                    year: year,
                    month:month,
                    VALUE111:$("#11z").val(),
                    VALUE112:$("#11j").val(),
                    VALUE113:$("#11bei").val(),
                    VALUE121:$("#12z").val(),
                    VALUE122:$("#12j").val(),
                    VALUE123:$("#12bei").val(),
                    VALUE131:$("#13z").val(),
                    VALUE132:$("#13j").val(),
                    VALUE133:$("#13bei").val(),
                    VALUE141:$("#14z").val(),
                    VALUE142:$("#14j").val(),
                    VALUE143:$("#14bei").val(),
                    VALUE151:$("#15z").val(),
                    VALUE152:$("#15j").val(),
                    VALUE153:$("#15bei").val(),

                    VALUE211:$("#21z").val(),
                    VALUE212:$("#21j").val(),
                    VALUE213:$("#21bei").val(),
                    VALUE221:$("#22z").val(),
                    VALUE222:$("#22j").val(),
                    VALUE223:$("#22bei").val(),
                    VALUE231:$("#23z").val(),
                    VALUE232:$("#23j").val(),
                    VALUE233:$("#23bei").val(),
                    VALUE241:$("#24z").val(),
                    VALUE242:$("#24j").val(),
                    VALUE243:$("#24bei").val(),
                    VALUE251:$("#25z").val(),
                    VALUE252:$("#25j").val(),
                    VALUE253:$("#25bei").val(),

                    VALUE311:$("#31z").val(),
                    VALUE312:$("#31j").val(),
                    VALUE313:$("#31bei").val(),
                    VALUE321:$("#32z").val(),
                    VALUE322:$("#32j").val(),
                    VALUE323:$("#32bei").val(),
                    VALUE331:$("#33z").val(),
                    VALUE332:$("#33j").val(),
                    VALUE333:$("#33bei").val(),
                    VALUE341:$("#34z").val(),
                    VALUE342:$("#34j").val(),
                    VALUE343:$("#34bei").val(),
                    VALUE351:$("#35z").val(),
                    VALUE352:$("#35j").val(),
                    VALUE353:$("#35bei").val(),

                    VALUE411:$("#41z").val(),
                    VALUE412:$("#41j").val(),
                    VALUE413:$("#41bei").val(),
                    VALUE421:$("#42z").val(),
                    VALUE422:$("#42j").val(),
                    VALUE423:$("#42bei").val(),
                    VALUE431:$("#43z").val(),
                    VALUE432:$("#43j").val(),
                    VALUE433:$("#43bei").val(),
                    VALUE441:$("#44z").val(),
                    VALUE442:$("#44j").val(),
                    VALUE443:$("#44bei").val(),
                    VALUE451:$("#45z").val(),
                    VALUE452:$("#45j").val(),
                    VALUE453:$("#45bei").val(),

                    VALUE51:$("#5z").val(),
                    VALUE52:$("#5j").val(),
                    VALUE53:$("#5bei").val()
                },function (data,status) {
                    alert("数据：\n"+data+"\n状态："+status);
                });
                alert("创建成功！");
            }
        //动态刷新appraisalJson,并在页面上显示
        $.get("./conn2.php",function (data,status) {
            //data为object
            appraisalJson = data;
            console.log(appraisalJson);
            drawData();
        });
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
                    for(var i=0;i<appraisalJson.length;i++){
                        tableYear = appraisalJson[i].yearMonth.split('.')[0];
                        tableMonth = appraisalJson[i].yearMonth.split('.')[1];
                        tableID = appraisalJson[i].id;
                        if(year==tableYear&&month==tableMonth&&treeNodeInfo.id==tableID){
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
                                            {item:'个人素质','1':appraisalJson[i].value111,
                                                '2':appraisalJson[i].value121,
                                                '3':appraisalJson[i].value131,
                                                '4':appraisalJson[i].value141},
                                            {item:'工作态度','1':appraisalJson[i].value211,
                                                '2':appraisalJson[i].value221,
                                                '3':appraisalJson[i].value231,
                                                '4':appraisalJson[i].value241},
                                            {item:'专业知识','1':appraisalJson[i].value311,
                                                '2':appraisalJson[i].value321,
                                                '3':appraisalJson[i].value331,
                                                '4':appraisalJson[i].value341},
                                            {item:'工作能力','1':appraisalJson[i].value411,
                                                '2':appraisalJson[i].value421,
                                                '3':appraisalJson[i].value431,
                                                '4':appraisalJson[i].value441},
                                            // //第二张表的数据
                                            {item:'个人素质','合计':appraisalJson[i].value151},
                                            {item:'工作态度','合计':appraisalJson[i].value251},
                                            {item:'专业知识','合计':appraisalJson[i].value351},
                                            {item:'工作能力','合计':appraisalJson[i].value451}

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

            }
        });
    });

    //抖动动画
    jQuery.fn.shake = function (intShakes /*Amount of shakes*/, intDistance /*Shake distance*/, intDuration /*Time duration*/) {
        this.each(function () {
            var jqNode = $(this);
            jqNode.css({ position: 'relative' });
            for (var x = 1; x <= intShakes; x++) {
                jqNode.animate({ left: (intDistance * -1) }, (((intDuration / intShakes) / 4)))
                    .animate({ left: intDistance }, ((intDuration / intShakes) / 2))
                    .animate({ left: 0 }, (((intDuration / intShakes) / 4)));
            }
        });
        return this;
    };


    //树状导航栏搜索框业务
    $('#searchConfirm').unbind('click').bind('click',search)
    //搜索框回车进行搜索
    $('#searchContent').bind('keydown',function (event) {
        var event = window.event || arguments.callee.caller.arguments[0];
        if(event.keyCode == 13){
            search();
        }
    })
    //搜索框搜索函数
    function search(){
        let flag = false;
        var searchContent = $('#searchContent').val();
        //非数字字符串类型判断为以名字进行搜索
        if(typeof(searchContent) == 'string'&& !(/^\d+$/.test(searchContent))){
            ztreeJson.forEach(function (item) {
                if(searchContent == item.name){
                    //根据名字获取某个结点
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    var treeNode = zTree.getNodeByParam("name",searchContent);
                    //设置结点为选中状态
                    zTree.selectNode(treeNode);
                    //调用ztreeOnclick 函数使结点信息渲染到右侧表格
                    ztreeOnclick(event,'treeDemo',treeNode);
                    flag = true;
                }
            })
        }else if(/^\d+$/.test(searchContent)){        /*数组类型字符串以工号进行搜寻*/
            zNodes.forEach(function (item) {
                if(searchContent == item.工号){
                    //更加工号获取某个结点
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    var treeNode = zTree.getNodeByParam("工号",searchContent);
                    //设置结点为选中状态
                    zTree.selectNode(treeNode);
                    //调用ztreeOnclick 函数使结点信息渲染到右侧表格
                    ztreeOnclick(event,'treeDemo',treeNode);
                    flag = true;
                }
            })
        }
        if(flag == false){
            $('#searchContent').val('')
            $('#searchContent').attr('placeholder','请输入正确的名字或工号');
            $("#searchContent").shake(2, 10, 400);        /*调用抖动动画*/
        }
    }
});

