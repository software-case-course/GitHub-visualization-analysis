<?php
/**
 * Created by PhpStorm.
 * User: 也钟意
 * Date: 2017/6/15
 * Time: 23:06
 */
ini_set('max_execution_time', '0');
ini_set('user_agent','Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727;http://www.baidu.com)');
$lang=array("java","c","++","CSharp","python","javascript","php","swift","objective-c","R","visual-basic","html","css","Ruby");
 $output=array();
foreach ($lang as $value){
    $url1='https://api.github.com/search/repositories?q=stars:>1000+language:'.$value;
    $url2='https://api.github.com/search/repositories?q=forks:>1000+language:'.$value;
    $text=file_get_contents($url1);
    $arr=json_decode(json_decode(json_encode($text)),true);
    $output[$value]['stars']=(int)$arr['total_count'];
    sleep(3);
    $text=file_get_contents($url2);
    $arr=json_decode(json_decode(json_encode($text)),true);
    $output[$value]['forks']=(int)$arr['total_count'];
    sleep(3);
}

$output['c/c++']['stars']=$output['c']['stars']+$output['++']['stars'];
$output['c/c++']['forks']=$output['c']['forks']+$output['++']['forks'];
unset($output['c']);
unset($output['++']);
print_r($output);

$servername="localhost";
$username="root";
$password="wozaic3221";

$newconn=new mysqli($servername,$username,$password,"yezhongyi");
if($newconn->connect_error){
    die("连接失败：".$newconn->connect_error);
}

//$newsql="CREATE TABLE zhushiqiu4(
//lang_name VARCHAR(30) NOT NULL PRIMARY KEY ,
//lang_data VARCHAR(2000)
//)";
//if($newconn->query($newsql)===TRUE){
//    echo "表zhushiqiu3创建成功！";
//}
//else{
//    echo "创建数据表错误：".$newconn->error;
//}
//$stmt=$newconn->prepare("INSERT INTO zhushiqiu4 (lang_name,lang_data) VALUES (?,?)");
//$stmt->bind_param("ss",$lang_name,$lang_data);

$lang1=array("java","c/c++","CSharp","python","javascript","php","swift","objective-c","R","visual-basic","html","css","Ruby");
//foreach ($lang1 as $value3){
//    $lang_name=$value3;
//    $lang_data=json_encode($output[$value3]);
//    $stmt->execute();
//}
foreach ($lang1 as $value4){
    mysqli_query($newconn,"UPDATE zhushiqiu4 SET lang_data="."'".json_encode($output[$value4])."'"." WHERE lang_name="."'".$value4."'");
}
?>