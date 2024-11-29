<?php

/* Extract Data function */
function extstres($content, $start, $end){
	if ((($content and $start) and $end)){
		$r = explode($start, $content);
			if (isset($r[1])){
				$r = explode($end, $r[1]);
				return $r[0];
			}
		return '';
	}
}

//$state_id_array=array("31","26","22","29","14","18","33","7","11","10","9","35","15","21","13","17","27","23","25","24","20","8","19","32","16","28","12","34","30");

$state_id_array=array("9");
$looking_for_array = array("1","2","13","3","14","15","4","6","10");

$city_id_array = array();
$location_id_array = array();
$curl = curl_init();
foreach ($state_id_array as $state_id) {

	curl_setopt_array($curl, array(
	  CURLOPT_URL => "https://www.whirlpoolindia.com/ajax_city_list.php?stateID=$state_id&b=02",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_SSL_VERIFYPEER => false,
	  CURLOPT_CUSTOMREQUEST => "GET",
	  CURLOPT_HTTPHEADER => array(
	    "accept: */*",
	    "cache-control: no-cache",
	    "connection: keep-alive",
	    "content-type: multipart/form-data; boundary=---011000010111000001101001",
	    "cookie: _ga=GA1.2.1330468871.1478756612; wpopup=10; hide=true; _gat=1; _gat_UA-3865239-1=1",
	    "host: www.whirlpoolindia.com",
	    "referer: https://www.whirlpoolindia.com/dealer-brand-locator",
	    "x-insight: activate",
	    "x-requested-with: XMLHttpRequest"
	  ),
	));

	$response_city_list = curl_exec($curl);
	$err_city_list = curl_error($curl);
	if ($err_city_list) {
	  echo "cURL Error (City List) #:" . $err_city_list;
	} else {

	  	$city_list_row = explode("</option>",$response_city_list);
	  	array_shift($city_list_row);
	  	array_pop($city_list_row);
	  	foreach($city_list_row as $ct){
	  		$city_id_clean = extstres($ct,'value="','" >');
	  		array_push($city_id_array, trim($city_id_clean));
	  	}

	  	//$city_id_array=array("125","97","126","123","651","111","140");

	  	foreach($city_id_array as $city){

			curl_setopt_array($curl, array(
			  CURLOPT_URL => "https://www.whirlpoolindia.com/ajax_city_list.php?cityID=$city&b=4",
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_SSL_VERIFYPEER => false,
			  CURLOPT_CUSTOMREQUEST => "GET",
			  CURLOPT_HTTPHEADER => array(
			    "accept: */*",
			    "cache-control: no-cache",
			    "connection: keep-alive",
			    "content-type: multipart/form-data; boundary=---011000010111000001101001",
			    "cookie: _ga=GA1.2.1330468871.1478756612; wpopup=10; hide=true; _gat=1; _gat_UA-3865239-1=1",
			    "host: www.whirlpoolindia.com",
			    "postman-token: 20a0c6f6-2358-f5f1-38dd-8e96d50e1537",
			    "referer: https://www.whirlpoolindia.com/dealer-brand-locator",
			    "x-insight: activate",
			    "x-requested-with: XMLHttpRequest"
			  ),
			));

			$response_location_list = curl_exec($curl);
			$err_location_list = curl_error($curl);

			if ($err_location_list) {
			  echo "cURL Error (Location List) #:" . $err_location_list;
			} else {
			  
			  	$location_list_row = explode("</option>",$response_location_list);
			  	array_shift($location_list_row);
			  	array_pop($location_list_row);
			  	foreach($location_list_row as $lc){
			  		$location_id_clean = extstres($lc,'value="','">');
			  		array_push($location_id_array, trim($location_id_clean));
			  	}

			  	//print_r($location_id_array);

			  	foreach($location_id_array as $location){

			  		foreach($looking_for_array as $looking_for){

						curl_setopt_array($curl, array(
						  CURLOPT_URL => "https://www.whirlpoolindia.com/dealer-brand-locator",
						  CURLOPT_RETURNTRANSFER => true,
						  CURLOPT_ENCODING => "",
						  CURLOPT_MAXREDIRS => 10,
						  CURLOPT_TIMEOUT => 30,
						  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
						  CURLOPT_CUSTOMREQUEST => "POST",
						  CURLOPT_POSTFIELDS => "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"category\"\r\n\r\n$looking_for\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"slState1\"\r\n\r\n$state_id\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"slCity1\"\r\n\r\n$city\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"slLocation1\"\r\n\r\n$location\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"clarify\"\r\n\r\ndealer_network\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"page\"\r\n\r\n1\r\n-----011000010111000001101001--",
						  CURLOPT_HTTPHEADER => array(
							    "accept: */*",
							    "cache-control: no-cache",
							    "connection: keep-alive",
							    "content-type: multipart/form-data; boundary=---011000010111000001101001",
							    "cookie: _ga=GA1.2.1330468871.1478756612; wpopup=10; hide=true; _gat=1; _gat_UA-3865239-1=1",
							    "host: www.whirlpoolindia.com",
							    "postman-token: d5b8bf3e-05fe-4c12-a553-8c8b694e272c",
							    "referer: https://www.whirlpoolindia.com/dealer-brand-locator",
							    "x-insight: activate",
							    "x-requested-with: XMLHttpRequest"
						  ),
						));
						$response = curl_exec($curl);
						$err = curl_error($curl);
						if ($err) {
						  echo "cURL Error (Looking for)#:" . $err;
						} else {
						  $body = $response;
								$d = new DOMDocument;
								libxml_use_internal_errors(true);
								$d->loadHTML($body);
								libxml_clear_errors();

								$x = new DOMXPath($d);
								if(($table = $x->query('//div[contains(@id, "searchContent")]'))) {
									for($j=0;$j<($table->length);$j++){
										$data = $d->saveHTML($table->item($j));	
									}
								}

								$file_handler = fopen('D:\\wamp\\www\\whr\\data\\'.$state_id.'_'.$city.'_'.$location.'_'.$looking_for.'.html', 'a') or die('Unable to open file!');
								fwrite($file_handler,$data);
						}
					}
			  	}
			}
		}

	}
}

echo "-----------DONE-------------";
//	fclose($json_file_handler);
?>