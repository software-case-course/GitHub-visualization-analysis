<?php
/**
 * Created by PhpStorm.
 * User: 也钟意
 * Date: 2017/6/11
 * Time: 16:03
 */
ini_set('max_execution_time', '0');
ini_set('user_agent','Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727;http://www.baidu.com)');
$lang=array("java","c","++","CSharp","python","javascript","php","swift","objective-c","R","visual-basic","html","css","Ruby");

$total='https://api.github.com/search/repositories?q=created:>2017-01-01';
$need=file_get_contents($total);
$array0=json_decode(json_decode(json_encode($need)),true);
$division=(int)$array0['total_count'];
echo "仓库总数：".$division;
echo "<br>";
//print_r ($array0['items'][1]['language']);

$array1=array();
$array1['c/c++']=0;

foreach ($lang as $value){
    $url='https://api.github.com/search/repositories?q=created:%3E2017-01-01+language:'.$value;
    $contents=file_get_contents($url);
    $obj=json_decode(json_encode($contents));
    $arr=json_decode($obj,true);
    $percentage=((int)$arr['total_count'])/$division;
    $percentage=round($percentage,3);
    if($value=="c" or $value=="++"){
        $array1['c/c++']+=$percentage;
    }else{
    $array1[$value]=$percentage;}
}

print_r($array1);

$lang1=array("java","c/c++","CSharp","python","javascript","php","swift","objective-c","R","visual-basic","html","css","Ruby");
$conn=mysqli_connect("localhost","root","wozaic3221","yezhongyi");
if(mysqli_connect_errno()){
    echo "连接失败".mysqli_connect_error();
}
foreach($lang1 as $value1){
echo "UPDATE zhushiqiu SET rep_percentage="."'".$array1[$value1]."'"." WHERE lang_name="."'".$value1."'";
echo "<br>";
    mysqli_query($conn,"UPDATE zhushiqiu SET rep_percentage="."'".$array1[$value1]."'"." WHERE lang_name="."'".$value1."'");
}

$conn->close();


?>