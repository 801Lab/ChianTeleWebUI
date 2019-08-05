$(function(){
	//登录界面JS
    $('#loginEyePassword').click(function () {
        let pass_type = $('input.password').attr('type');
        if (pass_type === 'password' ){
            $('input.password').attr('type', 'text');      //设置属性
            // $('.show_pass').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
            $('#loginEyePassword').attr('src','imgs/eyeOpen.png')
        } else {
            $('input.password').attr('type', 'password');
            // $('.show_pass').removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
            $('#loginEyePassword').attr('src','imgs/eyeClose.png')
        }
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
        // check: {
        //     enable: true
        // },
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

    var zNodes = JSON.parse(localStorage.getItem('cmts') || '[]');         /*从localStorage获取数据*/

    $(document).ready(function(){
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);  //初始化
    });

    
    // 添加新结点
    function addHoverDom(treeId, treeNode) {
        var newId = (new Date()).valueOf()                     //生产时间戳作为新节点的id
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
                    // zTree.addNodes(treeNode, {id:newId, pId:treeNode.id, name:$('#addInput').val()});
                    zNodes.push({id: newId,pId: treeNode.id,name: $('#addInput').val(),"身份证号":'',"性别": "","手机号": '', "工号": '', "岗位": '',
                        '毕业学校': '','家庭住址': {"省份": "省份", "市": '地级市'},"最高学历": '',"籍贯":{"省份": "省份","市": "地级市"},"政治面貌": '',"入职时间": ""});
                    localStorage.setItem('cmts',JSON.stringify(zNodes));
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

    //删除节点
    function beforeRemove(treeId, treeNode) {
        $("#modalDel").modal({});   //调用bootstrap模态框
        $('#modalBody').append("确定删除" + treeNode.name + "?");    //为模态框动态添加内容
        $('.close,.closeModal,#confirm').unbind('click').bind('click',function (event) {
            if(event.target.id == 'confirm'){
                var zTree = $.fn.zTree.getZTreeObj(treeId);
                zTree.removeNode(treeNode)
            }else if(event.target.class == 'close'){
                $('#modalBody').empty();  //点×时将模态框内容置空
            }
             $('#modalBody').empty();                /*取消、确认模态框时将模态框内容置空*/
            $('#modalDel').modal('toggle')          /*关闭模态框*/
        });
        return false;
    }
    //点击人员后将人员信息渲染到右边表格中
    function ztreeOnclick(event,treeId, treeNode){
        if(treeNode.level == 2){
            $('#name').val(treeNode.name);
            $('#idNumber').val(treeNode.身份证号);
            $('#genderSelect').val(treeNode.性别);
            $('#phoneNumber').val(treeNode.手机号);
            $('#jobNumber').val(treeNode.工号);
            $('#position').val(treeNode.岗位);
            $('#school').val(treeNode.毕业学校);
            $('#s_province').val(treeNode.家庭住址.省份);
            $('#s_city').append($('<option>', {
                text: treeNode.家庭住址.市,
                selected: true
            }));
            $('#eduBack').val(treeNode.最高学历);
            $('#s_province1').val(treeNode.籍贯.省份);
            $('#s_city1').append($('<option>', {
                text: treeNode.籍贯.市,
                selected: true
            }));
            $("input[type=radio][name=options]").val([treeNode.政治面貌]);
            $('#entryTime').val(treeNode.入职时间)

        //    工资导入界面的业务逻辑
            if($("#salarySlipTable").find("tr").length > 1){
                $("#salarySlipTable tr:last").remove();
            }
            $('#salarySlipTable').append(
                '<tr><td>'+ treeNode.工号 +'</td><td>'+ treeNode.name +'</td><td>'+ treeNode.工资.级别 +'</td><td>'+ treeNode.工资.高新技术补贴 +
                '</td><td>'+ treeNode.工资.请假扣款 +'</td><td>'+ treeNode.工资.基本薪酬 +'</td><td>'+ treeNode.工资.住房补贴 +'</td><td>'
                + treeNode.工资.违纪扣款 +'</td><td>'+ treeNode.工资.加班薪酬 +'</td><td>'+  treeNode.工资.交通补贴 +'</td><td>'+ treeNode.工资.五险一金
                +'</td><td>'+ treeNode.工资.应发工资 +'</td><td>'+ treeNode.工资.实发工资 +'</td></tr>'
            )
            checkedPeople = treeNode;
        }
    }

    //点击修改按钮实现表格可编辑
    $('#archivesChange').unbind('click').bind('click',function () {
        $('input').attr("disabled",false);
        $('select').attr('disabled',false);
    })
    //点击保存按钮将修改的数据保存到localStorage中
    $('#archivesSave').unbind('click').bind('click',function () {
        // 获取当前选中的结点
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        var currentNode = zTree.getSelectedNodes()[0];
        //遍历localstorage中的结点数据
        zNodes.forEach(function (eachObj) {
            // beforeRename;
            if(eachObj.id == currentNode.id){
                // console.log(eachObj.家庭住址.省份)
                eachObj.name = $('#name').val();
                eachObj.身份证号 = $('#idNumber').val();
                eachObj.性别 = $('#genderSelect').val();
                eachObj.手机号 = $('#phoneNumber').val();
                eachObj.工号 = $('#jobNumber').val();
                eachObj.岗位 = $('#position').val();
                eachObj.毕业学校 = $('#school').val();
                eachObj.家庭住址.省份 = $('#s_province').val();
                eachObj.家庭住址.市 = $('#s_city').val()
                eachObj.最高学历 = $('#eduBack').val();
                eachObj.籍贯.省份 = $('#s_province1').val();
                eachObj.籍贯.市 = $('#s_city1').val();
                eachObj.政治面貌 = $("input[type=radio][name=options]:checked").val();
                eachObj.入职时间 = $('#entryTime').val();
            }
        })
        $('#saveConfirm').unbind('click').bind('click',function () {
            localStorage.setItem('cmts',JSON.stringify(zNodes));
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);           //重新加载ztree树
            zTree.selectNode(currentNode);                      //设置结点为选中状态
            $('#modalSave').modal('toggle');
        })
        //设置不可编辑
        $('.main input').attr("disabled",true);
        $('select').attr('disabled',true);
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
    //将删除的结点移出zNodes，并保存至localstorage
    function onRemove(treeNode) {
       zNodes.forEach(function (item,index) {
           if(item.id == treeNode.id){
               zNodes.splice(index,1);        /*删除节点*/
           }
       })
        localStorage.setItem('cmts',JSON.stringify(zNodes));
    }

    //拖拽结点
    function zTreeBeforeDrop(treeId, treeNodes, targetNode, moveType){
        zNodes.forEach(function (item) {
            if(item.id == treeNodes[0].id){
                item.pId = targetNode.pId;
            }
        })
        localStorage.setItem('cmts',JSON.stringify(zNodes));
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


//    图片上传
    layui.use('upload', function(){
        var $ = layui.jquery
            ,upload = layui.upload;
        var uploadInst = upload.render({
            elem: '#upPhoto'
            ,url: '/upload/'
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

        //    工资管理界面点击确认导入后重新加载树状导航
        $('#importConfirm').unbind('click').bind('click',function () {
            var zNodes = JSON.parse(localStorage.getItem('cmts') || '[]');         /*从localStorage获取数据*/
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);        //重新加载数据
            $('#modalImport').modal('toggle');                           //关闭模态框
            // var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            // var currentNode = zTree.getSelectedNodes()[0];
            // zTree.selectNode(currentNode);                      //设置结点为选中状态
        })
        // //城市联动
         _init_area();
         _init_area1();
    });

});



//确认动画
