$(function(){
    //登录界面JS
    $('#loginEyePassword').click(function () {
        let pass_type = $('input#password').attr('type');
        if (pass_type === 'password' ){
            $('input#password').attr('type', 'text');      //设置属性
            // $('.show_pass').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
            $('#loginEyePassword').attr('src','imgs/eyeOpen.png')
        } else {
            $('input#password').attr('type', 'password');
            // $('.show_pass').removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
            $('#loginEyePassword').attr('src','imgs/eyeClose.png')
        }
    })

    //用户名输入框获得焦点后隐藏“用户名错误”
    $('#loginUserText').focus(function () {
        $('#userNameError').css('visibility','hidden');
        $('#passWordError').css('visibility','hidden');
    })
    //用户名输入框获得焦点后隐藏“密码错误”
    $('#password').focus(function () {
        $('#passWordError').css('visibility','hidden');
        $('#loginEyePassword').css('visibility','visible');
    })

    //登录按钮
    $('#loginBut').click(function () {
        $.ajax({
            type: 'POST',
            url: './login.php',
            // contentType: 'application/json;charset=utf-8',
            dataType:'json',
            data:{
                'userName':$('#loginUserText').val(),
                'passWord':$('#password').val().replace(/[^0-9]/gi,'')           //将密码中的非数字类型去掉
            },
            async:false,
            success:function (data) {
                switch (data.code) {
                    //用户名错误
                    case 0:$('#userNameError').css('visibility','visible')
                        break;
                    //密码错误
                    case 1:
                        $('#loginEyePassword').css('visibility','hidden')
                        $('#passWordError').css('visibility','visible')
                        // console.log(data.result);
                        break;
                    default:  window.location.href = './archivesManagement.html'
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        })
    })

    //档案管理界面JS
    var curMenu = null, zTree_Menu = null;
    var setting = {
        view: {
            showIcon: false,
            showLine: false,
            selectedMulti: false,
            dblClickExpand: false,
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
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
            // onRemove:zTreeOnRemove
            // showRemoveBtn: setRemoveBtn,         //设置结点删除按钮
        },
        callback: {
            beforeClick: beforeClick,
            beforeRemove: beforeRemove,
            onClick: ztreeOnclick,
            beforeDrop: zTreeBeforeDrop            //拖拽函数
            // beforeRename: beforeRename
        }
    };

    var zNodes ;     /*定义全局变量，用来生成树*/

    //从数据库获取数据
    $.ajax({
        type: 'POST',
        url: './archiveManagement.php',
        dataType: 'json',
        async:false,
        data:{
            'flag': 0
        },
        success:function (data) {
            zNodes = data;              //为zNode赋值
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    })

    $(document).ready(function(){
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);  //初始化
    });

    
    // 添加新结点
    function addHoverDom(treeId, treeNode) {
        var newId = parseInt(((new Date()).valueOf())/1000);         //生产时间戳作为新节点的id
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId //id
            + "' title='添加' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if (btn) btn.bind("click", function(){
            $("#modalAdd").modal({});        //调用添加模态框
            $('.closeModal,#modalAddconfirm').unbind('click').bind('click',function (event) {
                if(event.target.id == 'modalAddconfirm'){
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    //尝试使用 ajax 添加结点
                    $.ajax({
                        type: 'POST',
                        url: './archiveManagement.php',
                        dataType: 'json',
                        async: false,
                        data: {
                            'id': treeNode.personId,
                            'deptId': newId,
                            'deptPid': treeNode.id,
                            'deptName': $('#addInput').val(),
                            'flag': 4
                        },
                        success:function (data) {
                            zNodes = data;
                            // console.log(data);
                        },
                        error:function () {
                            alert('操作失败llll');
                        }
                    })
                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);           //重新加载ztree树
                    zTree.selectNode(zTree.getNodeByParam("id",newId ),true);                      //设置结点为选中状态
                    ztreeOnclick(event,'treeDemo',zTree.getNodeByParam("id",newId ));                //将被选中的结点信息渲染到右边表格
                }
                $('#addInput').val('')
                $('#modalAdd').modal('toggle')          /*关闭模态框*/
            })
            return false;
        });
    }


    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    }

    //单击展开
    function beforeClick(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.expandNode(treeNode);
    }
    var checkedPeople;

    //点击人员后将人员信息渲染到右边表格中
    function ztreeOnclick(event,treeId, treeNode){
        //尝试从oss_archivesmanagementtable表中获取一个人的记录
        var selectedPersonInfo;
        $.ajax({
            type: 'POST',
            url: './archiveManagement.php',
            dataType: 'json',
            async: false,
            data: {
                'id': treeNode.personId,
                'flag': 1
            },
            success:function (data) {
                selectedPersonInfo = data;
            },
            error:function () {
                alert('错误了！');
            }
        })
        if(treeNode.level == 2){
            $('#name').val(selectedPersonInfo[0].name);
            $('#idNumber').val(selectedPersonInfo[0].personIDNum);
            if(selectedPersonInfo[0].gender == 1){
                $('#genderSelect').val('男');
            }else{
                $('#genderSelect').val('女');
            }
            $('#phoneNumber').val(selectedPersonInfo[0].phoneNum);
            $('#jobNumber').val(selectedPersonInfo[0].jobNum);
            $('#position').val(selectedPersonInfo[0].jobPosition);
            $('#school').val(selectedPersonInfo[0].school);
            $('#s_province').val(selectedPersonInfo[0].familyAdd_province);
            $('#s_city').append($('<option>', {
                text: selectedPersonInfo[0].familyAdd_city,
                selected: true
            }));
            // console.log(selectedPersonInfo)
            $('#eduBack').val(selectedPersonInfo[0].eduBackground);
            $('#s_province1').val(selectedPersonInfo[0].nativePlace_province);
            $('#s_city1').append($('<option>', {
                text: selectedPersonInfo[0].nativePlace_city,
                selected: true
            }));
            $("input[type=radio][name=options]").val([selectedPersonInfo[0].politicsBackground]);
            $('#entryTime').val(selectedPersonInfo[0].entryTime)
            $('#demo1').attr('src', selectedPersonInfo[0].photo); //图片链接（base64）


        //    工资导入界面的业务逻辑
            if($("#salarySlipTable").find("tr").length > 1){
                $("#salarySlipTable tr:last").remove();
            }
            $('#salarySlipTable').append(
                '<tr><td>'+ selectedPersonInfo[0].jobNum +'</td><td>'+ selectedPersonInfo[0].name +'</td><td>'+ selectedPersonInfo[0].level +'</td><td>'+ selectedPersonInfo[0].highTechSub +
                '</td><td>'+ selectedPersonInfo[0].leaveDeductMoney +'</td><td>'+ selectedPersonInfo[0].basicMoney +'</td><td>'+ selectedPersonInfo[0].houseSub +'</td><td>'
                + selectedPersonInfo[0].breakRuleDeductMoney +'</td><td>'+ selectedPersonInfo[0].overTimeMoney +'</td><td>'+  selectedPersonInfo[0].trafficMoney +'</td><td>'+ selectedPersonInfo[0].insuranceMoney
                +'</td><td>'+ selectedPersonInfo[0].salary +'</td><td>'+ selectedPersonInfo[0].realSalary +'</td></tr>'
            )
            // checkedPeople = treeNode;
        }
    }

    //点击修改按钮实现表格可编辑
    $('#archivesChange').unbind('click').bind('click',function () {
        $('input').attr("disabled",false);
        $('select').attr('disabled',false);
        $('#upPhoto').attr('disabled',false);
    })
    //点击保存按钮将修改的数据保存到数据库中
    $('#archivesSave').unbind('click').bind('click',function () {
        // 获取当前选中的结点
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        var currentNode = zTree.getSelectedNodes()[0];

        //尝试修改数据库中的数据
        $('#saveConfirm').unbind('click').bind('click',function () {
            $.ajax({
                type: 'POST',
                url: './archiveManagement.php',
                dataType: 'json',
                async: false,
                data:{
                    'name': $('#name').val(),
                    'personIDNum': $('#idNumber').val(),
                    'gender': $('#genderSelect').val(),
                    'phoneNum': $('#phoneNumber').val(),
                    'jobNum': $('#jobNumber').val(),
                    'jobPosition': $('#position').val(),
                    'school': $('#school').val(),
                    'familyAdd_province': $('#s_province').val(),
                    'familyAdd_city': $('#s_city').val(),
                    'eduBackground': $('#eduBack').val(),
                    'nativePlace_province': $('#s_province1').val(),
                    'nativePlace_city': $('#s_city1').val(),
                    'politicsBackground': $("input[type=radio][name=options]:checked").val(),
                    'entryTime': $('#entryTime').val(),
                    'id': currentNode.personId,
                    'flag': 2
                },
                success:function (data) {
                    zNodes = data;
                },
                error:function () {
                    alert('失败了');
                }
            })
            $('#modalSave').modal('toggle');
        })
        $('.main input').attr("disabled",true);
        $('select').attr('disabled',true);
        $('#upPhoto').attr('disabled',true);
    })


    //删除节点操作
    function beforeRemove(treeId, treeNode) {
        $("#modalDel").modal({});   //调用bootstrap模态框
        $('#modalBody').append("确定删除" + treeNode.name + "?");       //为模态框动态添加内容
        $('.close,.closeModal,#confirm').unbind('click').bind('click',function (event) {
            if(event.target.id == 'confirm'){
                var zTree = $.fn.zTree.getZTreeObj(treeId);
                zTree.removeNode(treeNode);
                onRemove(treeNode);
            }else if(event.target.class == 'close'){
                $('#modalBody').empty();
            }
            $('#modalBody').empty();                /*关闭模态框时将模态框内容置空*/
            $('#modalDel').modal('toggle')          /*关闭模态框*/
            return true;
        })
        return false;
    }
    //将删除的结点从数据库中删除
    function onRemove(treeNode) {
        console.log(treeNode.personId);
        $.ajax({
            type: 'POST',
            url: './archiveManagement.php',
            dataType: 'json',
            async: false,
            data:{
                'id': treeNode.personId,
                'deptId': treeNode.id,
                'flag': 3
            },
            success:function (data) {
                zNodes = data;
            },
            error:function () {
                alert('删除失败');
            }
        })
    }

    //拖拽结点
    function zTreeBeforeDrop(treeId, treeNodes, targetNode, moveType){
        // console.log(treeNodes[0].id)
        $.ajax({
            type: 'POST',
            url: './archiveManagement.php',
            async: false,
            data:{
                'id': treeNodes[0].id,
                'deptPid': targetNode.pId,
                'flag': 5
            },
            success:function(data){
                console.log(data);
            },
            error:function () {
                alert('操作失败');
            }
        })
        // zNodes.forEach(function (item) {
        //     if(item.id == treeNodes[0].id){
        //         item.pId = targetNode.pId;
        //     }
        // })
        // localStorage.setItem('cmts',JSON.stringify(zNodes));
    }

    //树状导航栏搜索框业务
    $('#searchConfirm').unbind('click').bind('click',search)
    //搜索框回车进行搜索
    $('#searchContent').bind('keydown',function (event) {
        var event = window.event || arguments.callee.caller.arguments[0];
        if(event.keyCode == 13){
            search();
        }
    })

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
    }



    //搜索框搜索函数
    function search(){
        console.log(zNodes);
        let flag = false;
        var searchContent = $('#searchContent').val();
        //非数字字符串类型判断为以名字进行搜索
        if(typeof(searchContent) == 'string'&& !(/^\d+$/.test(searchContent))){
            zNodes.forEach(function (item) {
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
                if(searchContent == item.personId){
                    //更加工号获取某个结点
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    var treeNode = zTree.getNodeByParam("personId",searchContent);
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

//    图片上传
    layui.use('upload', function(){
        var $ = layui.$
            ,upload = layui.upload;
        var uploadInst = upload.render({
            elem: '#upPhoto'
            ,url: './archiveManagement.php'
            ,method: 'POST'
            ,accept: 'images'
            // ,auto: false
            // ,bindAction: '#archivesSave'
            ,data:{
                'flag': 8,
                'id': function () {
                    try {
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                        var currentNode = zTree.getSelectedNodes()[0];
                        return currentNode.personId;
                    }catch (e) {
                        alert('未选择人员')
                    }
                }
            }
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    $('#demo1').attr('src', result); //图片链接（base64）
                });
            }
            ,done: function(res){
                //如果上传失败
                if(res.code > 0){
                    return layer.msg('上传失败');
                }
                //上传成功
                console.log(res)
            }
        });
    });
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //常规用法
        laydate.render({
            elem: '#entryTime'
        });
    });

    layui.use('jquery', function(){
        var $ = layui.$;
        //演示动画
        $('.site-doc-icon .layui-anim').on('click', function(){
            var othis = $(this), anim = othis.data('anim');
            // 停止循环
            if(othis.hasClass('layui-anim-loop')){
                return othis.removeClass(anim);
            }
            othis.removeClass(anim);
            setTimeout(function(){
                othis.addClass(anim);
            });
            // 恢复渐隐
            if(anim === 'layui-anim-scaleSpring'){
                setTimeout(function(){
                    othis.removeClass(anim);
                }, 1300);
            }
        });
        // //城市联动
         _init_area();
         _init_area1();
    });

});



//确认动画
