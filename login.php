<?php
session_start();
$userName = isset($_POST['userName']) ? htmlspecialchars($_POST['userName']) : '';
$passWord = isset($_POST['passWord']) ? htmlspecialchars($_POST['passWord']) : '';
//var_dump($_POST);

//用户名不为空时连接数据库
if(!empty($userName)){
    $con = mysqli_connect('localhost','root','','oss');
    $con -> set_charset("utf8");
    if (!$con)
    {
        die('Could not connect: ' . mysqli_error($con));
    }
    $sql="SELECT * FROM OSS_logintable WHERE userName = '$userName'";
    $rs = mysqli_query($con,$sql);
    if($rs && $rs -> num_rows>0){
        $sqlPassWord = "SELECT passWord from OSS_logintable where userName = '$userName'";
        $rsPassWord = mysqli_query($con,$sqlPassWord);
        if($rsPassWord && $rsPassWord -> num_rows > 0 && judgePassWord()){
            $code = 200;
            $ret = Array('code' => $code);
            echo json_encode($ret,JSON_UNESCAPED_UNICODE);
        }else{
            $code = 1;
            $ret = Array('code' => $code);
            echo json_encode($ret,JSON_UNESCAPED_UNICODE);
        }
    }else{
        $code = 0;
        $ret = Array('code' => $code);
        echo json_encode($ret,JSON_UNESCAPED_UNICODE);
    }
}

//md5 密码判断
function judgePassWord(){
    global $passWord,$userName,$con;
//    如果$passWord只有字母或为空则直接返回false
    if( !is_numeric( $passWord ) ){
        return false;
    }
    $sql="SELECT passWord FROM OSS_logintable WHERE userName = '$userName'";
    $salt="SELECT salt FROM OSS_logintable WHERE userName = '$userName'";
    $resSalt = mysqli_query($con,$salt);
    $resPass = mysqli_query($con,$sql);
    $rowPassWord = $resPass -> fetch_assoc();
    $rowSalt = $resSalt -> fetch_assoc();
    return(md5($passWord + $rowSalt['salt']) == $rowPassWord['passWord']);
}

?>
