<?php
//echo("Congratulations!\n");
//$cmd = system("python cgi.py",$ret);
//json_decode($cmd);
//echo (json_last_error()==JSON_ERROR_NONE);
//
//echo json_encode($cmd);
//echo("ret is $ret  ");
$url='http://www.videocardbenchmark.net/gpu_value.html';
$html = file_get_contents($url);
//$subpattern='/<a href=\"[\S]+\"([\s\S]*)<\/a>/'
$pattern = '/<td class=\"chart\">([\s\S]*)<\/td>/';
preg_match_all($pattern, $html, $matches);
var_dump($matches[1]);

?>