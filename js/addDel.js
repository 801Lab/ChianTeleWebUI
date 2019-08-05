$(function(){
    //添加班组
    $('.addClass').unbind('click').bind('click',function () {
        var self = $(this).parent().parent().parent();
        addClass(self)
    })

    //添加人员
    $('.addPerson').unbind('click').bind('click',function (event) {
        var self = $(this).parent().parent().parent();
        addPerson(self)
    })
    //删除人员
    $('.del').bind('click',function () {
        var self = $(this).parent().parent()
        Del(self)
    })

    //添加部门
    $('.addDepart').unbind('click').bind('click',function () {
        var self = $(this).parent().parent().parent();
        $('#confim').unbind('click').bind('click',function () {
            var time = String((new Date()).valueOf())
            var idName = '#'+ time
            var name = $('#departNameText').val()
            $('#departNameText').val('')
            self.before(`<div class="panel panel-primary collapseFive_Inner">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a data-toggle="collapse" data-parent="#Inner"
                                           href=${idName}>
                                            ${name}
                                        </a>
                                    </h4>
                                </div>

                                <div id=${time} class="panel-collapse collapse ">
                                    <div class="panel-group" >
                                        <div class="panel-body">
                                            <!--2层嵌套折叠-->
                                            <div class="panel panel-primary collapseFive_Inner">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title" style="text-align: center">
                                                        <a href="#" data-toggle="modal" data-target="#myModal" class = "addClass">添加</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`)
            //为新添加的班组中的添加按钮添加绑定事件
            $('.addClass').unbind('click').bind('click',function () {
                var self = $(this).parent().parent().parent();
                addClass(self)
            })
            // $('#confim').unbind('click')
            $('#myModal').modal('toggle')          /*关闭模态框*/
        })
    })


    //添加班组
    function addClass(self) {
        $('#confim').unbind('click').bind('click',function () {
            var time = String((new Date()).valueOf())
            var idName = '#'+ time
            var name = $('#departNameText').val()
            $('#departNameText').val('')
            self.before(`<div class="panel panel-primary collapseFive_Inner">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a data-toggle="collapse" data-parent="#Inner"
                                           href=${idName}>
                                            ${name}
                                        </a>
                                    </h4>
                                </div>

                                <div id=${time} class="panel-collapse collapse ">
                                    <div class="panel-group" >
                                        <div class="panel-body">
                                            <!--2层嵌套折叠-->
                                            <div class="panel panel-primary collapseFive_Inner">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title" style="text-align: center">
                                                        <a href="#" data-toggle="modal" data-target="#myModal" class = "addPerson">添加</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`)
            //为新添加的班组中的添加按钮添加绑定事件
            $('.addPerson').unbind('click').bind('click',function (event) {
                var self = $(this).parent().parent().parent();
                addPerson(self)
            })
            // $('#confim').unbind('click')
            $('#myModal').modal('toggle')          /*关闭模态框*/
        })
    }

//    添加人员 三层嵌套
    function addPerson(self) {
        $('#confim').unbind('click').bind('click',function () {
            var time = String((new Date()).valueOf())
            var idtime = '#'+ time
            var name = $('#departNameText').val()
            $('#departNameText').val('')
            self.before(`<div class="panel panel-primary collapseFive_Inner">
<!--                                                <div class="panel-heading">-->
                                                    <h4 class="panel-title panel-body" style="text-align: center">
                                                    <img src="imgs/person.png" alt="" class = "personalIcon">
                                                        <a href="#">${name}</a>
                                                            <img src="imgs/delete.png" alt="delIcon"
                                                                     data-toggle="modal" data-target="#myModaDel" class = "del" id = ${idtime}>
                                                    </h4>
<!--                                                </div>-->
                                            </div>`)
            //为新添加的人员绑定删除事件
            $('.del').unbind('click').bind('click',function () {
                var self = $(this).parent().parent()
                Del(self)
            })
            // $('#confim').unbind('click')
            $('#myModal').modal('toggle')          /*关闭模态框*/
        })
    }

//    删除
  function Del(self) {
        $('#confimDel').unbind('click').bind('click',function () {
            // console.log('querenshanchula')
            self.remove()
            // $('#confimDel').unbind('')
            $('#myModaDel').modal('toggle')          /*关闭模态框*/
        })
    }

//    取消模态框 将input内容置空
    $('#off').unbind('click').bind('click',function () {
        $('#departNameText').val('')
    })

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
    })
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //常规用法
        laydate.render({
            elem: '#entryTime'
        });
    })
   })

//确认动画
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
    //城市联动
    _init_area()
    _init_area1()

    //尝试设计点击背景展开
    // $('.panel-heading').click(function () {
    //     console.log('hahha')
    // })
    // $('.panel-heading').click(function () {
    //     console.log('hahha')
    // })
});