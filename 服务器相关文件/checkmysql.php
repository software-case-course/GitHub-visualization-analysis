<?php
/**
 * Created by PhpStorm.
 * User: 也钟意
 * Date: 2017/6/5
 * Time: 1:02
 */
header("Content-type:text/html;charset=utf-8");

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
//$newsql="CREATE TABLE zhushiqiu(
//lang_name VARCHAR(30) NOT NULL PRIMARY KEY ,
//rep_percentage VARCHAR(30) ,
//user_percentage VARCHAR(30)
//)";
//if($newconn->query($newsql)===TRUE){
//    echo "表languages创建成功！";
//}
//else{
//    echo "创建数据表错误：".$newconn->error;
//}

//$stmt=$newconn->prepare("INSERT INTO zhushiqiu (lang_name,rep_percentage,user_percentage) VALUES (?, ?, ?)");
//$stmt->bind_param("sss",$lang_name,$rep_percentage,$user_percentage);

//$arr=array("java","c/c++","CSharp","python","javascript","php","swift","objective-c","R","visual-basic","html","css","Ruby");
//
//foreach ($arr as $value){
//    $lang_name=$value;
//    $rep_percentage="";
//    $user_percentage="";
//    $stmt->execute();
//}
//echo "初始化完成";

//$stmt->close();
//$newconn->close();

$getall="SELECT* FROM zhushiqiu";
$result=$newconn->query($getall);
$arr=array();
$datalist=array();
if($result->num_rows>0){

    while($row=$result->fetch_assoc()){
// echo $row["lang_name"];
//        echo "<br>";
//        echo $row["rep_percentage"];
//        echo "<br>";
//        echo $row["user_percentage"];
//        echo "<br>";

//        $arr=array($row["rep_percentage"],$row["user_percentage"]);
//        $datalist[$row["lang_name"]]=$arr;
          $datalist["lang_name"]=$row["lang_name"];
          $datalist["rep_percentage"]=$row["rep_percentage"];
          $datalist["user_percentage"]=$row["user_percentage"];
          $arr[]=$datalist;
    }
//print_r ($arr);
//echo json_encode($datalist);
$output=array();
$output["data"]=$arr;
//echo json_encode($output);
echo $_GET['callback'].'('.json_encode($output).')';
    
}
else{
    echo "0结果";
}
?>