<?php
/**
 * Created by PhpStorm.
 * User: 也钟意
 * Date: 2017/6/15
 * Time: 0:19
 */
$servername="localhost";
$username="root";
$password="wozaic3221";

$newconn=new mysqli($servername,$username,$password,"yezhongyi");
if($newconn->connect_error){
    die("连接失败：".$newconn->connect_error);
}

$getall="SELECT* FROM zhushiqiu2";
$result=$newconn->query($getall);
$datalist=array();
if($result->num_rows>0){

    while($row=$result->fetch_assoc()){
        $datalist[$row['lang_name']]=json_decode($row['period_data']);
    }
    echo $_GET['callback'].'('.json_encode($datalist).')';
}
else{
    echo "0结果";
}