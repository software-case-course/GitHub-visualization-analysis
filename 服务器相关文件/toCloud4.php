<?php
/**
 * Created by PhpStorm.
 * User: 也钟意
 * Date: 2017/6/14
 * Time: 17:09
 */
ini_set('max_execution_time', '0');
ini_set('user_agent','Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727;http://www.baidu.com)');
$lang=array("java","c","++","CSharp","python","javascript","php","swift","objective-c","R","visual-basic","html","css","Ruby");
$months=array('2017-01-01..2017-02-01','2017-02-01..2017-03-01','2017-03-01..2017-04-01','2017-04-01..2017-05-01','2017-05-01..2017-06-01');
$monthname=array('Jan','Feb,','Mar','Apr','May');
$output=array();
foreach ($lang as $value){
      foreach ($months as $value1){
        $url='https://api.github.com/search/repositories?q=created:'.$value1.'+language:'.$value;
        $get=file_get_contents($url);
        $array0=json_decode(json_decode(json_encode($get)),true);
        $target=(int)$array0['total_count'];
        $output[$value][]=$target;
        sleep(4);
    }
//    $data=array();
//    $url0='https://api.github.com/search/users?q=created:<2017-01-01+language:'.$value;
//    $get=file_get_contents($url0);
//    $array0=json_decode(json_decode(json_encode($get)),true);
//    $lastmonth=(int)$array0['total_count'];
//    sleep(5);
//    foreach ($months as $value1){
//        $url1='https://api.github.com/search/users?q=created:<2017-'.$value1.'-01+language:'.$value;
//        $get1=file_get_contents($url1);
//        $array1=json_decode(json_decode(json_encode($get1)),true);
//        $present=(int)$array1['total_count'];
//        $data[]=$present-$lastmonth;

//        $lastmonth=$present;
//        sleep(5);
//    }
//    $output[$value]=$data;
}

for($i=0;$i<5;$i++){
    $output["c/c++"][]=$output['c'][$i]+$output['++'][$i];
}
unset($output['c']);
unset($output['++']);

$lang1=array("java","c/c++","CSharp","python","javascript","php","swift","objective-c","R","visual-basic","html","css","Ruby");
foreach ($lang1 as $value1){
    $j=0;
    $array1=array();
    foreach($monthname as $value2){
        $array1[$value2]=$output[$value1][$j];
        $j++;
    }
    $output[$value1]=$array1;
}

$conn=mysqli_connect("localhost","root","wozaic3221","yezhongyi");
if(mysqli_connect_errno()){
    echo "连接失败".mysqli_connect_error();
}


foreach ($lang1 as $value3){
     mysqli_query($conn,"UPDATE zhushiqiu2 SET period_data="."'".json_encode($output[$value3])."'"." WHERE lang_name="."'".$value3."'");
}
print_r($output);
?>