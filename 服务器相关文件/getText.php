<?php
/**
 * Created by PhpStorm.
 * User: 也钟意
 * Date: 2017/6/5
 * Time: 1:02
 */

//$arr=array('c++'=>'50%','java'=>'60%','python'=>'40%','php'=>'30%');
//echo json_encode($arr);
//echo "<br>";
$servername="localhost";
$username="root";
$password="wozaic3221";

//$conn=mysqli_connect($servername,$username,$password);
//if(!$conn){
//die("Connection failed:".mysqli_connect_error());
//}
//else{
//echo "connection success!";}
//$sql="CREATE DATABASE yezhongyi";
//if(mysqli_query($conn,$sal)){
//    echo "数据库创建成功";
//}
//else{
//    echo "数据库创建发生错误:".mysqli_error($conn);
//}
//mysqli_close($conn);
$newconn=new mysqli($servername,$username,$password,"yezhongyi");
if($newconn->connect_error){
    die("连接失败：".$newconn->connect_error);
}
$newsql="CREATE TABLE zhushiqiu(
lang_name VARCHAR(30) NOT NULL PRIMARY KEY ,
rep_percentage VARCHAR(30) ,
user_percentage VARCHAR(30) 
)";
if($newconn->query($newsql)===TRUE){
    echo "表languages创建成功！";
}
else{
    echo "创建数据表错误：".$newconn->error;
}

$stmt=$newconn->prepare("INSERT INTO zhushiqiu (lang_name,rep_percentage,user_percentage) VALUES (?, ?, ?)");
$stmt->bind_param("sss",$lang_name,$rep_percentage,$user_percentage);

$arr=array("java","c/c++","CSharp","python","javascript","php","swift","objective-c","R","visual-basic","html","css","Ruby");

foreach ($arr as $value){
    $lang_name=$value;
    $rep_percentage="";
    $user_percentage="";
    $stmt->execute();
}
echo "初始化完成";

$stmt->close();
$newconn->close();

//$getall="SELECT* FROM languages";
//$result=$newconn->query($getall);
//if($result->num_rows>0){
//    $datalist="";
//    while($row=$result->fetch_assoc()){
//        $datalist.=$row["name"].":".$row["percentage"]." , ";
//    }
//    echo $datalist;
//}
//else{
//    echo "0结果";
//}
?>