<?php
/**
 * Created by PhpStorm.
 * User: 也钟意
 * Date: 2017/6/15
 * Time: 2:30
 */
ini_set('max_execution_time', '0');
ini_set('user_agent','Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727;http://www.baidu.com)');

$countries=array('China','USA','Russia','UK','France','Germany','Japan','Korea','India','Australia','Italy');
$ctycode=array('CN','US','RU','GB','FR','DE','JP','KR','IN','AU','IT');
$lang=array("java","c","++","CSharp","python","javascript","php","swift","objective-c","R","visual-basic","html","css","Ruby");

$output=array();

foreach ($countries as $nation){
    $array0=array();
    foreach($lang as $value){
        $url='https://api.github.com/search/users?q=location:'.$nation.'+language:'.$value;
        $get=file_get_contents($url);
        $arr=json_decode(json_decode(json_encode($get)),true);
        $data=(int)$arr['total_count'];
        $array0[$value]=$data;
        sleep(4);
    }
    $array0['c/c++']=$array0['c']+$array0['++'];
    unset($array0['c']);
    unset($array0['++']);
    $output[$nation]=$array0;
}
print_r($output);


$servername="localhost";
$username="root";
$password="wozaic3221";

$newconn=new mysqli($servername,$username,$password,"yezhongyi");
if($newconn->connect_error){
    die("连接失败：".$newconn->connect_error);
}

//$newsql="CREATE TABLE zhushiqiu3(
//country_name VARCHAR(30) NOT NULL PRIMARY KEY ,
//country_code VARCHAR(30),
//country_data VARCHAR(2000)
//)";
//if($newconn->query($newsql)===TRUE){
//    echo "表zhushiqiu3创建成功！";
//}
//else{
//    echo "创建数据表错误：".$newconn->error;
//}

//$stmt=$newconn->prepare("INSERT INTO zhushiqiu3 (country_name,country_code,country_data) VALUES (?,?,?)");
//$stmt->bind_param("sss",$country_name,$country_code,$anotherdata);

//for($i=0;$i<sizeof($countries);$i++){
//    $country_name=$countries[$i];
//    $country_code=$ctycode[$i];
//    $anotherdata=json_encode($output[$country_name]);
//    $stmt->execute();
//}

foreach ($countries as $cntry){
    mysqli_query($newconn,"UPDATE zhushiqiu3 SET country_data="."'".json_encode($output[$cntry])."'"." WHERE country_name="."'".$cntry."'");
}
//$array=explode(",",$text);
// print_r($array);
//$count=array();
//for($i=1;$i<sizeof($array);$i+=4){
//    $count[]=str_replace(array("'","name",":","\r","\n","\t"," "),"",$array[$i]);
//}
//
//print_r($count);
//print_r(json_decode($array[167]));
//for($i=2;$i<sizeof($array);$i+=5){
//    echo $array[$i];
//
//}
//$arr=json_decode(json_encode($text));
////print_r($arr);
//$arr1=json_decode($arr);
//echo $arr1;
?>