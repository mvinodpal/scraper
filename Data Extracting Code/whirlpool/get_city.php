<?php
error_reporting(E_ALL);
/* Extract Data function */
function extstres($content, $start, $end)
{
if ((($content and $start) and $end))
{
$r = explode($start, $content);
if (isset($r[1]))
{
$r = explode($end, $r[1]);
return $r[0];
}
return '';
}}

$state_id = array("8","17","7","12","22","29","26","2","4","19","28","20","23","24","25","18","3","1","10","11","9","13","15","21","27","30","6","14","16","5");

$string = "";
$string_1 = "";

//level 1 extraction
$url = 'https://videoconworld.com/storelocator/index/city';

foreach ($state_id as $state) {
	$body = 'state='.$state;
	$options = array('method' => 'POST',
	'content' => $body,
	'header' => 'Content-type: application/x-www-form-urlencoded');
	$context = stream_context_create(array('http' => $options));
	$string .= file_get_contents($url, false, $context);

	//level 2 extraction
	$string_str=explode('</option>',$string);
	array_pop($string_str);
	$state_wise_city_array = array();
	foreach($string_str as $str){
		$optionvalue=extstres($str,'="','"');
		array_push($state_wise_city_array,$optionvalue);
	}

	foreach($state_wise_city_array as $city_id){
		$url_1 = 'https://videoconworld.com/storelocator/index/address';
		$body_1 = 'state='.$state.'&city='.$city_id;
		$options_1 = array('method' => 'POST',
			'content' => $body_1,
			'header' => 'Content-type: application/x-www-form-urlencoded');
		$context_1 = stream_context_create(array('http' => $options_1));
		$string_1 .= file_get_contents($url_1, false, $context_1);
	}

	echo $string_1 . "<br>";
}
	fclose($file_handler);
?>