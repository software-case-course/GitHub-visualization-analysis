<?php
/**
 * Created by PhpStorm.
 * User: 也钟意
 * Date: 2017/6/12
 * Time: 15:29
 */
ini_set('max_execution_time', '0');
ini_set('user_agent','Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727;http://www.baidu.com)');
$lang=array("R","visual-basic","html","css","Ruby");

$usertotal='https://api.github.com/search/users?q=created:<2017-01-01';
$get=file_get_contents($usertotal);
$array2=json_decode(json_decode(json_encode($get)),true);
$division2=(int)$array2['total_count'];
echo "仓库总数：".$division2;
echo "<br>";


$array3=array();


foreach($lang as $value){
    $url2='https://api.github.com/search/users?q=created:<2017-01-01+language:'.$value;
    $contents=file_get_contents($url2);
    $obj=json_decode(json_encode($contents));
    $arr=json_decode($obj,true);
    $percentage=((int)$arr['total_count'])/$division2;
    $percentage=round($percentage,3);
    
        $array3[$value]=$percentage;
}

print_r($array3);


$conn=mysqli_connect("localhost","root","wozaic3221","yezhongyi");
if(mysqli_connect_errno()){
    echo "连接失败".mysqli_connect_error();
}
foreach($lang as $value1){
    mysqli_query($conn,"UPDATE zhushiqiu SET user_percentage="."'".$array3[$value1]."'"." WHERE lang_name="."'".$value1."'");
}

$conn->close();
?>