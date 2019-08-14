# web_SSO
中国电信实习——单点登录系统
HTML+CSS+JS+PHP
操作步骤：
1、下载安装XAMPP(php模拟服务器) https://www.apachefriends.org/download.html
2、将oss.sql导入XAMPP或者自己本地的mysql数据库
3、打开XAMPP服务器和mysql
4、修改login.php 和 archiveManagement.php、conn.php、conn2.php、conn3.php文件
	将$con = mysqli_connect('localhost','root','','oss');改为自己的数据库信息
5、目前数据库存储的可登录的账户为：userName：佐助；passWord：1；userName：鸣人；passWord：2