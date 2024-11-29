<?php
/*
"29">Andaman &amp; nicobar
"1">Andhra pradesh
"2">Arunachal pradesh
"3">Assam
"4">Bihar
"30">Chandigarh
"5">Chhattisgarh
"31">Dadar and nagar haveli
"32">Daman and diu
"33">Delhi
"6">Goa
"7">Gujarat
"8">Haryana
"9">Himachal pradesh
"10">Jammu and kashmir
"11">Jharkhand
"12">Karnataka
"13">Kerala
"34">Lakshadeep
"14">Madhya pradesh
"15">Maharashtra
"16">Manipur
"17">Meghalaya
"18">Mizoram
"19">Nagaland
"20">Odisha
"35">Pondicherry
"21">Punjab
"22">Rajasthan
"23">Sikkim
"24">Tamil nadu
"36">Telangana
"25">Tripura
"26">Uttar pradesh
"37">Uttarakhand
"27">Uttaranchal
"28">West bengal*/


$stateID = array("1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37");

$cityid = array();

foreach ($stateID as $state) {
	$url = "http://www.jci-hitachi.in/service/list-city/?id=$state";
	$page = file_get_contents($url);
	$city_json_array = json_decode($page);

	foreach ($city_json_array as $city_ja) {
		array_push($cityid, array("name"=>"$city_ja->name","id"=>$city_ja->id));
	}
}

echo "<pre>";
print_r($cityid);
echo "</pre>";

?>