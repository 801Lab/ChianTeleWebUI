<?php
/**
 * Created by PhpStorm.
 * User: wujun
 * Date: 2018/8/7
 * Time: 10:54
 */
////url末端的q参数
//$q = isset($_GET["q"]) ? intval($_GET["q"]) : '';

//创建数据库连接
    $con = new mysqli("localhost","root","","oss");
    //检测连接
    if($con->connect_errno){
        die("连接失败:".$con->connect_errno);
    }
    //设置编码
    $con->set_charset("utf8");
    mysqli_options($con,MYSQLI_OPT_INT_AND_FLOAT_NATIVE,true);  //获取数据库数据类型
    session_start();



    //sql语句
    $sql = "SELECT * FROM department";
    //获得结果集
    $result = $con->query($sql);
    //创建空数组
    $data_arr = array();
    if($result->num_rows>0){
    //输出数据
        while ($row = $result->fetch_assoc()){
            $row["open"] = $row["open"]===1;  //将数据库的tinyint转换为bool型
            $data_arr[] = $row;
        }
    }else{
        echo "表中没有结果";
    }
    header('Content-Type:application/json'); //php发送json对象
    echo json_encode($data_arr);   //发送对象数组



