<?php
ini_set('user_agent','Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727;http://www.baidu.com)');
$url='https://api.github.com/search/repositories?q=created:%3E2017-01-01+language:java';
$contents=file_get_contents($url);
//$newobj=json_encode($contents);
//echo (json_last_error()==JSON_ERROR_NONE);
$obj=json_decode(json_encode($contents));
//echo $obj;
$arr=json_decode($obj,true);
echo "你要的数据：".$arr['total_count'];
echo "<br>";
echo "<br>";
echo "<br>";
print_r($arr);

?>