<?php
/**
 * Created by PhpStorm.
 * User: 也钟意
 * Date: 2017/6/15
 * Time: 21:43
 */$servername="localhost";
$username="root";
$password="wozaic3221";

$newconn=new mysqli($servername,$username,$password,"yezhongyi");
if($newconn->connect_error){
    die("连接失败：".$newconn->connect_error);
}

$getall="SELECT* FROM zhushiqiu3";
$result=$newconn->query($getall);
$output=array();
if($result->num_rows>0){

    while($row=$result->fetch_assoc()){
        $datalist=array();
        $datalist['name']=$row['country_name'];
        $datalist['code']=$row['country_code'];
        $datalist['value']=json_decode($row['country_data']);
        $output[]=$datalist;
    }
    echo $_GET['callback'].'('.json_encode($output).')';
}
else{
    echo "0结果";
}
?>