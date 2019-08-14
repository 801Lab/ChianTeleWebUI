<?php
/**
 * Created by PhpStorm.
 * User: wujun
 * Date: 2018/8/8
 * Time: 14:07
 */

//创建数据库连接
$con = new mysqli("localhost","root","","oss");
//检测连接
if($con->connect_errno){
    die("连接失败:".$con->connect_errno);
}
//设置编码
$con->set_charset("utf8");
session_start();
header("Content-type:text/html;charset=utf-8");

//保存键传来的值
$year = isset($_POST['year']) ? htmlspecialchars($_POST['year']):'#';
$month = isset($_POST['month']) ? htmlspecialchars($_POST['month']):'#';
$id = isset($_POST['id']) ? htmlspecialchars($_POST['id']):999;
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']):'#';
$flag = isset($_POST['flag']) ? htmlspecialchars($_POST['flag']):2;

$VALUE111 = !empty($_POST['VALUE111']) ? htmlspecialchars($_POST['VALUE111']):999;
$VALUE112 = !empty($_POST['VALUE112']) ? htmlspecialchars($_POST['VALUE112']):999;
$VALUE113 = !empty($_POST['VALUE113']) ? htmlspecialchars($_POST['VALUE113']):'#';
$VALUE121 = !empty($_POST['VALUE121']) ? htmlspecialchars($_POST['VALUE121']):999;
$VALUE122 = !empty($_POST['VALUE122']) ? htmlspecialchars($_POST['VALUE122']):999;
$VALUE123 = !empty($_POST['VALUE123']) ? htmlspecialchars($_POST['VALUE123']):'#';
$VALUE131 = !empty($_POST['VALUE131']) ? htmlspecialchars($_POST['VALUE131']):999;
$VALUE132 = !empty($_POST['VALUE132']) ? htmlspecialchars($_POST['VALUE132']):999;
$VALUE133 = !empty($_POST['VALUE133']) ? htmlspecialchars($_POST['VALUE133']):'#';
$VALUE141 = !empty($_POST['VALUE141']) ? htmlspecialchars($_POST['VALUE141']):999;
$VALUE142 = !empty($_POST['VALUE142']) ? htmlspecialchars($_POST['VALUE142']):999;
$VALUE143 = !empty($_POST['VALUE143']) ? htmlspecialchars($_POST['VALUE143']):'#';
$VALUE151 = !empty($_POST['VALUE151']) ? htmlspecialchars($_POST['VALUE151']):999;
$VALUE152 = !empty($_POST['VALUE152']) ? htmlspecialchars($_POST['VALUE152']):999;
$VALUE153 = !empty($_POST['VALUE153']) ? htmlspecialchars($_POST['VALUE153']):'#';

$VALUE211 = !empty($_POST['VALUE211']) ? htmlspecialchars($_POST['VALUE211']):999;
$VALUE212 = !empty($_POST['VALUE212']) ? htmlspecialchars($_POST['VALUE212']):999;
$VALUE213 = !empty($_POST['VALUE213']) ? htmlspecialchars($_POST['VALUE213']):'#';
$VALUE221 = !empty($_POST['VALUE221']) ? htmlspecialchars($_POST['VALUE221']):999;
$VALUE222 = !empty($_POST['VALUE222']) ? htmlspecialchars($_POST['VALUE222']):999;
$VALUE223 = !empty($_POST['VALUE223']) ? htmlspecialchars($_POST['VALUE223']):'#';
$VALUE231 = !empty($_POST['VALUE231']) ? htmlspecialchars($_POST['VALUE231']):999;
$VALUE232 = !empty($_POST['VALUE232']) ? htmlspecialchars($_POST['VALUE232']):999;
$VALUE233 = !empty($_POST['VALUE233']) ? htmlspecialchars($_POST['VALUE233']):'#';
$VALUE241 = !empty($_POST['VALUE241']) ? htmlspecialchars($_POST['VALUE241']):999;
$VALUE242 = !empty($_POST['VALUE242']) ? htmlspecialchars($_POST['VALUE242']):999;
$VALUE243 = !empty($_POST['VALUE243']) ? htmlspecialchars($_POST['VALUE243']):'#';
$VALUE251 = !empty($_POST['VALUE251']) ? htmlspecialchars($_POST['VALUE251']):999;
$VALUE252 = !empty($_POST['VALUE252']) ? htmlspecialchars($_POST['VALUE252']):999;
$VALUE253 = !empty($_POST['VALUE253']) ? htmlspecialchars($_POST['VALUE253']):'#';

$VALUE311 = !empty($_POST['VALUE311']) ? htmlspecialchars($_POST['VALUE311']):999;
$VALUE312 = !empty($_POST['VALUE312']) ? htmlspecialchars($_POST['VALUE312']):999;
$VALUE313 = !empty($_POST['VALUE313']) ? htmlspecialchars($_POST['VALUE313']):'#';
$VALUE321 = !empty($_POST['VALUE321']) ? htmlspecialchars($_POST['VALUE321']):999;
$VALUE322 = !empty($_POST['VALUE322']) ? htmlspecialchars($_POST['VALUE322']):999;
$VALUE323 = !empty($_POST['VALUE323']) ? htmlspecialchars($_POST['VALUE323']):'#';
$VALUE331 = !empty($_POST['VALUE331']) ? htmlspecialchars($_POST['VALUE331']):999;
$VALUE332 = !empty($_POST['VALUE332']) ? htmlspecialchars($_POST['VALUE332']):999;
$VALUE333 = !empty($_POST['VALUE333']) ? htmlspecialchars($_POST['VALUE333']):'#';
$VALUE341 = !empty($_POST['VALUE341']) ? htmlspecialchars($_POST['VALUE341']):999;
$VALUE342 = !empty($_POST['VALUE342']) ? htmlspecialchars($_POST['VALUE342']):999;
$VALUE343 = !empty($_POST['VALUE343']) ? htmlspecialchars($_POST['VALUE343']):'#';
$VALUE351 = !empty($_POST['VALUE351']) ? htmlspecialchars($_POST['VALUE351']):999;
$VALUE352 = !empty($_POST['VALUE352']) ? htmlspecialchars($_POST['VALUE352']):999;
$VALUE353 = !empty($_POST['VALUE353']) ? htmlspecialchars($_POST['VALUE353']):'#';

$VALUE411 = !empty($_POST['VALUE411']) ? htmlspecialchars($_POST['VALUE411']):999;
$VALUE412 = !empty($_POST['VALUE412']) ? htmlspecialchars($_POST['VALUE412']):999;
$VALUE413 = !empty($_POST['VALUE413']) ? htmlspecialchars($_POST['VALUE413']):'#';
$VALUE421 = !empty($_POST['VALUE421']) ? htmlspecialchars($_POST['VALUE421']):999;
$VALUE422 = !empty($_POST['VALUE422']) ? htmlspecialchars($_POST['VALUE422']):999;
$VALUE423 = !empty($_POST['VALUE423']) ? htmlspecialchars($_POST['VALUE423']):'#';
$VALUE431 = !empty($_POST['VALUE431']) ? htmlspecialchars($_POST['VALUE431']):999;
$VALUE432 = !empty($_POST['VALUE432']) ? htmlspecialchars($_POST['VALUE432']):999;
$VALUE433 = !empty($_POST['VALUE433']) ? htmlspecialchars($_POST['VALUE433']):'#';
$VALUE441 = !empty($_POST['VALUE441']) ? htmlspecialchars($_POST['VALUE441']):999;
$VALUE442 = !empty($_POST['VALUE442']) ? htmlspecialchars($_POST['VALUE442']):999;
$VALUE443 = !empty($_POST['VALUE443']) ? htmlspecialchars($_POST['VALUE443']):'#';
$VALUE451 = !empty($_POST['VALUE451']) ? htmlspecialchars($_POST['VALUE451']):999;
$VALUE452 = !empty($_POST['VALUE452']) ? htmlspecialchars($_POST['VALUE452']):999;
$VALUE453 = !empty($_POST['VALUE453']) ? htmlspecialchars($_POST['VALUE453']):'#';

$VALUE51 = !empty($_POST['VALUE51']) ? htmlspecialchars($_POST['VALUE51']):999;
$VALUE52 = !empty($_POST['VALUE52']) ? htmlspecialchars($_POST['VALUE52']):999;
$VALUE53 = !empty($_POST['VALUE53']) ? htmlspecialchars($_POST['VALUE53']):'#';

//SQL语句
$tableDate = $year.'.'.$month;
if($flag==1){
    $sql = "UPDATE appraisal SET
value111=$VALUE111,value112=$VALUE112,value113='$VALUE113',
value121=$VALUE121,value122=$VALUE122,value123='$VALUE123',value131=$VALUE131,value132=$VALUE132,value133='$VALUE133',
value141=$VALUE141,value142=$VALUE142,value143='$VALUE143',value151=$VALUE151,value152=$VALUE152,value153='$VALUE153',

value211=$VALUE211,value212=$VALUE212,value213='$VALUE213',
value221=$VALUE221,value222=$VALUE222,value223='$VALUE223',value231=$VALUE231,value232=$VALUE232,value233='$VALUE233',
value241=$VALUE241,value242=$VALUE242,value243='$VALUE243',value251=$VALUE251,value252=$VALUE252,value253='$VALUE253',

value311=$VALUE311,value312=$VALUE312,value313='$VALUE313',
value321=$VALUE321,value322=$VALUE322,value323='$VALUE323',value331=$VALUE331,value332=$VALUE332,value333='$VALUE333',
value341=$VALUE341,value342=$VALUE342,value343='$VALUE343',value351=$VALUE351,value352=$VALUE352,value353='$VALUE353',

value411=$VALUE411,value412=$VALUE412,value413='$VALUE413',
value421=$VALUE421,value422=$VALUE422,value423='$VALUE423',value431=$VALUE431,value432=$VALUE432,value433='$VALUE433',
value441=$VALUE441,value442=$VALUE442,value443='$VALUE443',value451=$VALUE451,value452=$VALUE452,value453='$VALUE453',

value51=$VALUE51,value52=$VALUE52,value53='$VALUE53' WHERE id = $id AND yearMonth = $tableDate";
    $con->query($sql);
    echo $sql."\n";
}else{
    $sql = "INSERT INTO appraisal VALUES ($id,'$name','$tableDate',$VALUE111,$VALUE112,'$VALUE113',
$VALUE121,$VALUE122,'$VALUE123',$VALUE131,$VALUE132,'$VALUE133',
$VALUE141,$VALUE142,'$VALUE143',$VALUE151,$VALUE152,'$VALUE153',

$VALUE211,$VALUE212,'$VALUE213',
$VALUE221,$VALUE222,'$VALUE223',$VALUE231,$VALUE232,'$VALUE233',
$VALUE241,$VALUE242,'$VALUE243',$VALUE251,$VALUE252,'$VALUE253',

$VALUE311,$VALUE312,'$VALUE313',
$VALUE321,$VALUE322,'$VALUE323',$VALUE331,$VALUE332,'$VALUE333',
$VALUE341,$VALUE342,'$VALUE343',$VALUE351,$VALUE352,'$VALUE353',

$VALUE411,$VALUE412,'$VALUE413',
$VALUE421,$VALUE422,'$VALUE423',$VALUE431,$VALUE432,'$VALUE433',
$VALUE441,$VALUE442,'$VALUE443',$VALUE451,$VALUE452,'$VALUE453',

$VALUE51,$VALUE52,'$VALUE53')";
    $con->query($sql);
    echo $sql."\n";
}
echo "保存成功";