<?php
session_start();
$photoName = '';     //
$flag = isset($_POST['flag']) ? htmlspecialchars($_POST['flag']) : '';      //用来判断返回哪个数据
$data = array();   //用于存放从数据库获取的数据
$con = mysqli_connect('localhost','root','','oss');
$con -> set_charset("utf8");
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

switch ($flag){
//    case 0: getZtreeNode(); break;
    case 1: getPersonInfo();break;    //获取人员信息
    case 2: saveChangeInfo();break;   //保存修改的信息
    case 3: delOperation();break;     //删除操作
    case 4: addOperation();break;     //添加操作
    case 5: dropOperation();break;    //拖拽业务
//    工资管理界面php
    case 6: getPersonJobNum();break;   //获取工号
    case 7: importSalary();break;      //导入工资
    case 8: upPhoto();break;
    default: getZtreeNode();break;    //返回树节点数据
}


//当 flag=0 时执行返回树节点数据

//当 flag = 1 时，获取人员信息
$errorInfo = ['$errorInfo' => 'err'];
function getPersonInfo(){
    global $con,$data;
    $selectedPersonInfo = isset($_POST['id']) ? htmlspecialchars($_POST['id']) : '';
    if($selectedPersonInfo != 0){
        $personInfo = "SELECT * FROM oss_archivesmanagementtable where id='$selectedPersonInfo'";
//        工资
        $personSalary = "SELECT * FROM oss_wagemanagement where id='$selectedPersonInfo'";
        $rs = mysqli_query($con,$personInfo);
        $rsSalary = mysqli_query($con,$personSalary);
        if($rs && $rsSalary){
            $personInfo = new personInfo();
            while($row = $rs->fetch_assoc()){
                $personInfo -> name = $row['name'];
                $personInfo -> personIDNum = $row['personIDNum'];
                $personInfo -> gender = $row['gender'];
                $personInfo -> phoneNum = $row['phoneNum'];
                $personInfo -> jobNum = $row['jobNum'];
                $personInfo -> jobPosition = $row['jobPosition'];
                $personInfo -> school = $row['school'];
                $personInfo -> familyAdd_province = $row['familyAdd_province'];
                $personInfo -> familyAdd_city = $row['familyAdd_city'];
                $personInfo -> eduBackground = $row['eduBackground'];
                $personInfo -> nativePlace_province = $row['nativePlace_province'];
                $personInfo -> nativePlace_city = $row['nativePlace_city'];
                $personInfo -> politicsBackground = $row['politicsBackground'];
                $personInfo -> entryTime = $row['entryTime'];
                $personInfo -> id = $row['id'];
                $personInfo -> photo = './uploads/'.$row['photo'];
//                工资
            }
            while ($row = $rsSalary -> fetch_assoc()){
                $personInfo -> level = $row['level'];
                $personInfo -> highTechSub = $row['highTechSub'];
                $personInfo -> leaveDeductMoney = $row['leaveDeductMoney'];
                $personInfo -> basicMoney = $row['basicMoney'];
                $personInfo -> houseSub = $row['houseSub'];
                $personInfo -> breakRuleDeductMoney = $row['breakRuleDeductMoney'];
                $personInfo -> overTimeMoney = $row['overTimeMoney'];
                $personInfo -> trafficMoney = $row['trafficMoney'];
                $personInfo -> insuranceMoney = $row['insuranceMoney'];
                $personInfo -> salary = $row['salary'];
                $personInfo -> realSalary = $row['realSalary'];
                $data[] = $personInfo;
            }
            $personInfoJson = json_encode($data,JSON_UNESCAPED_UNICODE);
            echo $personInfoJson;
        }
    }else{
       error();
    }
//    echo $selectedPersonInfo;
}


//当 flag = 2 时保存修改的信息
function saveChangeInfo(){
    global  $con;
    $id = isset($_POST['id']) ? htmlspecialchars($_POST['id']) : '';
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $personIDNum = isset($_POST['personIDNum']) ? htmlspecialchars($_POST['personIDNum']) : '';
    $gender = isset($_POST['gender']) ? htmlspecialchars($_POST['gender']) : '';
    if($gender == '男'){
        $gender = 1;
    }else{
        $gender = 0;
    }
    $phoneNum = isset($_POST['phoneNum']) ? htmlspecialchars($_POST['phoneNum']) : '';
    $jobNum = isset($_POST['jobNum']) ? htmlspecialchars($_POST['jobNum']) : '';
    $jobPosition = isset($_POST['jobPosition']) ? htmlspecialchars($_POST['jobPosition']) : '';
    $school = isset($_POST['school']) ? htmlspecialchars($_POST['school']) : '';
    $familyAdd_province = isset($_POST['familyAdd_province']) ? htmlspecialchars($_POST['familyAdd_province']) : '';
    $familyAdd_city = isset($_POST['familyAdd_city']) ? htmlspecialchars($_POST['familyAdd_city']) : '';
    $eduBackground = isset($_POST['eduBackground']) ? htmlspecialchars($_POST['eduBackground']) : '';
    $nativePlace_province = isset($_POST['nativePlace_province']) ? htmlspecialchars($_POST['nativePlace_province']) : '';
    $nativePlace_city = isset($_POST['nativePlace_city']) ? htmlspecialchars($_POST['nativePlace_city']) : '';
    $politicsBackground = isset($_POST['politicsBackground']) ? htmlspecialchars($_POST['politicsBackground']) : '';
    $entryTime = isset($_POST['entryTime']) ? htmlspecialchars($_POST['entryTime']) : '';

    $updateSql = "UPDATE oss_archivesmanagementtable SET
                    name='$name',personIDNum='$personIDNum',gender='$gender',phoneNum= '$phoneNum',jobNum= '$jobNum',
                    jobPosition='$jobPosition',school='$school',familyAdd_province='$familyAdd_province',familyAdd_city='$familyAdd_city',
                    eduBackground='$eduBackground',nativePlace_province='$nativePlace_province',nativePlace_city='$nativePlace_city',
                    politicsBackground='$politicsBackground',entryTime='$entryTime'
                WHERE id='$id'";
    if(mysqli_query($con,$updateSql)){
        getZtreeNode();
    }
}

//删除操作
function delOperation(){
    global $con;
    $delPersonId = isset($_POST['id']) ? htmlspecialchars($_POST['id']) : '';
    $delDeptId = isset($_POST['deptId']) ? htmlspecialchars($_POST['deptId']) : '';
//    如果删除的是部门
    if($delPersonId == 0){
//        在 oss_archivesmanagementtable 表中删除部门下所有的人
        $delAllArchivePerson = "DELETE FROM oss_archivesmanagementtable WHERE id in (SELECT id FROM oss_depart WHERE deptPid in (SELECT deptId FROM oss_depart where deptPid = '$delDeptId'))";
//        在 oss_wagemanagement 表中删除部门下所有的人
        $delAllWagePerson = "DELETE FROM oss_wagemanagement WHERE id in (SELECT id FROM oss_depart WHERE deptPid in (SELECT deptId FROM oss_depart where deptPid = '$delDeptId'))";
//        在 oss_depart 表中删除部门里面所有的人
        $delAllDepartPerson = "DELETE FROM oss_depart WHERE id in (SELECT id FROM oss_depart WHERE deptPid in (SELECT deptId FROM oss_depart where deptPid = '$delDeptId'))";
//        在 oss_depart 表中删除部门里面所有的班组
        $delAllClass = "DELETE FROM oss_depart WHERE deptId in (SELECT deptId FROM oss_depart WHERE deptPid = '$delDeptId')";
//        在 oss_depart 表中删除部门
        $delDepart = "DELETE FROM oss_depart WHERE deptId = '$delDeptId'";
        if(mysqli_query($con,$delAllArchivePerson) && mysqli_query($con,$delAllDepartPerson) && mysqli_query($con,$delAllClass) && mysqli_query($con,$delDepart) && $delAllWagePerson){
            getZtreeNode();
        }
    }else if($delPersonId == 1){          //    如果删除的是班组
//        在 oss_archivesmanagementtable 表中删除班组下所有的人
        $delAllArchivePerson = "DELETE FROM oss_archivesmanagementtable WHERE id in (SELECT id FROM oss_depart WHERE deptPid = '$delDeptId')";
//        在 oss_wagemanagement 表中删除班组下所有的人
        $delAllWagemanagementPerson = "DELETE FROM oss_wagemanagement WHERE id in (SELECT id FROM oss_depart WHERE deptPid = '$delDeptId')";
//        在 oss_depart 表中删除班组里面所有的人
        $delAllDepartPerson = "DELETE FROM oss_depart WHERE id in (SELECT id FROM oss_depart WHERE deptPid = '$delDeptId')";
//        在 oss_depart 表中删除班组
        $delClass = "DELETE FROM oss_depart WHERE deptId = '$delDeptId'";
        if(mysqli_query($con,$delAllArchivePerson) && mysqli_query($con,$delAllDepartPerson) && mysqli_query($con,$delClass) && mysqli_query($con,$delAllWagemanagementPerson)){
            getZtreeNode();
        }
    }else{                   //如果删除的是人
        $delPersonInfoSql = "DELETE FROM oss_archivesmanagementtable WHERE id='$delPersonId'";
        $delWagementPersonInfoSql = "DELETE FROM oss_wagemanagement WHERE id='$delPersonId'";
        $delDeptSql = "DELETE FROM oss_depart WHERE id='$delPersonId'";
        if(mysqli_query($con,$delPersonInfoSql) && mysqli_query($con,$delDeptSql) && mysqli_query($con,$delWagementPersonInfoSql)){
            getZtreeNode();
        }
    }
}

//flag = 4 时添加人员或者班级的操作
function addOperation(){
    global $con;
    $id = isset($_POST['id']) ? htmlspecialchars($_POST['id']): '';
    $deptId = isset($_POST['deptId']) ? htmlspecialchars($_POST['deptId']) : '';
    $deptPid = isset($_POST['deptPid']) ? htmlspecialchars($_POST['deptPid']) : '';
    $deptName = isset($_POST['deptName']) ? htmlspecialchars($_POST['deptName']) : '';
//    echo $deptId;
    if($id == 0){
        $insertDepart = 'INSERT INTO oss_depart (id,deptId,deptPid,deptName,isOpen) VALUES (1,'.$deptId.','.$deptPid.',"'.$deptName.'","false")';
        if(mysqli_query($con,$insertDepart)){
            getZtreeNode();
        }
    }else{
        $maxId = "select max(id) from oss_depart";
        $nextId = mysqli_query($con,$maxId);
        $row = $nextId -> fetch_assoc();
        $ids = $row['max(id)']+1;
        $insertDeptPeople = 'INSERT INTO oss_depart (id,deptId,deptPid,deptName,isOpen) VALUES ('.$ids.','.$deptId.','.$deptPid.',"'.$deptName.'","false")';
        $insertIntoArchivePeople = 'INSERT INTO oss_archivesmanagementtable (id,name) VALUES ('.$ids.',"'.$deptName.'")';
        $insertIntoWagementPeople = 'INSERT INTO oss_wagemanagement (id,name) VALUES ('.$ids.',"'.$deptName.'")';
        if(mysqli_query($con,$insertDeptPeople) && mysqli_query($con,$insertIntoArchivePeople) && mysqli_query($con,$insertIntoWagementPeople)){
            getZtreeNode();
        }
    }
}


//flag == 5 拖拽业务
function dropOperation(){
    global $con;
    $id = isset($_POST['id']) ? htmlspecialchars($_POST['id']) : '';
    $deptPid = isset($_POST['deptPid']) ? htmlspecialchars($_POST['deptPid']) : '';
    $changePid = "UPDATE oss_depart set deptPid = '$deptPid' WHERE deptId = '$id'";
    if(mysqli_query($con,$changePid)){
        echo 'chenggongle';
    }else{
        error();
    }
}

//flag = 0 获取ztreeNode
function getZtreeNode(){
    global $con,$data;
    $treeNodeSql = 'SELECT * FROM oss_depart';
    $rs = mysqli_query($con,$treeNodeSql);
    if($rs){
        while ($row = $rs->fetch_assoc()){
            $treeNode = new treeNode();
            $treeNode -> id = $row['deptId'];
            $treeNode -> pId = $row['deptPid'];
            $treeNode -> name = $row['deptName'];
            $treeNode -> open = $row['isOpen'];
            $treeNode -> personId = $row['id'];
            $data[] = $treeNode;
        }
        $treeNodeJson = json_encode($data,JSON_UNESCAPED_UNICODE);
        echo $treeNodeJson;
    }
}

//flag = 6 获取工号
function getPersonJobNum(){
    global $con;
    $id = isset($_POST['id']) ? htmlspecialchars($_POST['id']) : '';
    $jobNum = "SELECT jobNum from oss_wagemanagement WHERE id = '$id'";
    $rs = mysqli_query($con,$jobNum);
    if($rs){
        $row = $rs -> fetch_assoc();
        echo $row['jobNum'];
    }
}

//flag = 7 导入工资
function importSalary(){
    global $con;
    $checkedNodes = $_POST['checkedNodes'];
    $checkedProperty = $_POST['checkedProperty'];
    $selPerJobNum = $_POST['selectedPersonJobNum'];
    for($j = 0;$j < count($checkedNodes);$j++){
        $id = $checkedNodes[$j];
//        echo $selPerJobNum;
        for($i = 0;$i < count($checkedProperty); $i++){
            echo $id;
            switch ($checkedProperty[$i]){
                case '级别': $inportSalary = "UPDATE oss_wagemanagement set level = (SELECT level FROM oss_wagemanagement where jobNum = '$selPerJobNum') WHERE jobNum = '$id'";
                    rsImportSalary($inportSalary);
                    break;
                case '高新技术补贴': $inportSalary = "UPDATE oss_wagemanagement set highTechSub = (SELECT highTechSub FROM oss_wagemanagement where jobNum = '$selPerJobNum') WHERE jobNum = '$id'";
                    rsImportSalary($inportSalary);
                    break;
                case '请假扣款': $inportSalary = "UPDATE oss_wagemanagement set leaveDeductMoney = (SELECT leaveDeductMoney FROM oss_wagemanagement where jobNum = '$selPerJobNum') WHERE jobNum = '$id'";
                    rsImportSalary($inportSalary);
                    break;
                case '基本薪酬': $inportSalary = "UPDATE oss_wagemanagement set basicMoney = (SELECT basicMoney FROM oss_wagemanagement where jobNum = '$selPerJobNum') WHERE jobNum = '$id'";
                    rsImportSalary($inportSalary);
                    break;
                case '住房补贴': $inportSalary = "UPDATE oss_wagemanagement set houseSub = (SELECT houseSub FROM oss_wagemanagement where jobNum = '$selPerJobNum') WHERE jobNum = '$id'";
                    rsImportSalary($inportSalary);
                    break;
                case '违纪扣款': $inportSalary = "UPDATE oss_wagemanagement set breakRuleDeductMoney = (SELECT breakRuleDeductMoney FROM oss_wagemanagement where jobNum = '$selPerJobNum') WHERE jobNum = '$id'";
                    rsImportSalary($inportSalary);
                    break;
                case '加班薪酬': $inportSalary = "UPDATE oss_wagemanagement set overTimeMoney = (SELECT overTimeMoney FROM oss_wagemanagement where jobNum = '$selPerJobNum') WHERE jobNum = '$id'";
                    rsImportSalary($inportSalary);
                    break;
                case '交通补贴': $inportSalary = "UPDATE oss_wagemanagement set trafficMoney = (SELECT trafficMoney FROM oss_wagemanagement where jobNum = '$selPerJobNum') WHERE jobNum = '$id'";
                    rsImportSalary($inportSalary);
                    break;
                case '五险一金': $inportSalary = "UPDATE oss_wagemanagement set insuranceMoney = (SELECT insuranceMoney FROM oss_wagemanagement where jobNum = '$selPerJobNum') WHERE jobNum = '$id'";
                    rsImportSalary($inportSalary);
                    break;
                case '应发工资': $inportSalary = "UPDATE oss_wagemanagement set salary = (SELECT salary FROM oss_wagemanagement where jobNum = '$selPerJobNum') WHERE jobNum = '$id'";
                    rsImportSalary($inportSalary);
                    break;
                case '实发工资': $inportSalary = "UPDATE oss_wagemanagement set realSalary = (SELECT realSalary FROM oss_wagemanagement where jobNum = '$selPerJobNum') WHERE jobNum = '$id'";
                    rsImportSalary($inportSalary);
                    break;
                default: break;
            }
        }
    }
//    $inportSalary = "UPDATE oss_wagemanagement set level = (SELECT level FROM oss_wagemanagement where id = 1001) WHERE id = 1016;";
//    echo ($checkedNodes[0]);
}

//上传图片
function upPhoto(){
    global $con,$photoName;
    $allowedExts = array("gif", "jpeg", "jpg", "png");
    $temp = explode(".", $_FILES["file"]["name"]);
    $extension = end($temp);
    if ((($_FILES["file"]["type"] == "image/gif")
            || ($_FILES["file"]["type"] == "image/jpeg")
            || ($_FILES["file"]["type"] == "image/jpg")
            || ($_FILES["file"]["type"] == "image/pjpeg")
            || ($_FILES["file"]["type"] == "image/x-png")
            || ($_FILES["file"]["type"] == "image/png"))
        /*&& ($_FILES["file"]["size"] < 20000)*/
        && in_array($extension, $allowedExts))
    {
        if ($_FILES["file"]["error"] > 0)
        {
//            echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
            error();
        } else
        {
            $id = isset($_POST['id']) ? htmlspecialchars($_POST['id']) : '';
            $photoName =  time().  '.' .explode('.',$_FILES["file"]["name"])[1];  // 为上传的图片用时间戳重命名
            move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/" . $photoName);   //将图片保存到 uploads 文件夹中
            $isExist = "SELECT photo FROM oss_archivesmanagementtable where id = '$id'";
            $rsIsExist = mysqli_query($con,$isExist);
            $rowIsExist = $rsIsExist -> fetch_assoc();
//            判断数据库内原来是否有文件，有的话先删除在添加
            if($rowIsExist['photo'] != ''){
                $existPhoto = 'uploads/'.$rowIsExist['photo'];
                unlink($existPhoto);
                $upLoadImg = "UPDATE oss_archivesmanagementtable SET photo = '$photoName' where id = '$id'";
                if(mysqli_query($con,$upLoadImg)){
                    success();
                }
//                error();
            }else{
                $upLoadImg = "UPDATE oss_archivesmanagementtable SET photo = '$photoName' where id = '$id'";
                if(mysqli_query($con,$upLoadImg)){
                    success();
                }
            }
        }
    } else {
        error();
    }
}
//失败之后的回调函数
function error(){
    $msgInfo = new msg();
    $msgInfo -> massage = '操作失败';
    $data = $msgInfo;
    $msgInfo = json_encode($data,JSON_UNESCAPED_UNICODE);
    echo $msgInfo;
}

function success(){
    global $photoName;
    $msgInfo = new msg();
    $msgInfo -> massage = '操作成功'.$photoName;
    $data = $msgInfo;
    $msgInfo = json_encode($data,JSON_UNESCAPED_UNICODE);
    echo $msgInfo;
}

//导入工资函数
function rsImportSalary($inportSalary){
    global $con;
    $rs = mysqli_query($con,$inportSalary);
    if(!$rs){
        echo '导入出错';
    }else{
        echo '操作成功啦';
    }
}
//树节点类
class treeNode{
    public $id;
    public $pId;
    public $name;
    public $open;
    public $personId;         //保存数据库表中的id 信息，ztree已经使用id保留字
}

//个人信息类
class personInfo{
    public $name;
    public $personIDNum;
    public $gender;
    public $phoneNum;
    public $jobNum;
    public $jobPosition;
    public $school;
    public $familyAdd_province;
    public $familyAdd_city;
    public $eduBackground;
    public $nativePlace_province;
    public $nativePlace_city;
    public $politicsBackground;
    public $entryTime;
    public $id;
    public $photo;
//    工资信息
    public $level;
    public $highTechSub;
    public $leaveDeductMoney;
    public $basicMoney;
    public $houseSub;
    public $breakRuleDeductMoney;
    public $overTimeMoney;
    public $trafficMoney;
    public $insuranceMoney;
    public $salary;
    public $realSalary;
}
class msg{
    public $massage;
}
?>