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

$state_id_array = array("32","12","34","9","10","28","5","1","16","18","3","29","26","7","11","13","17","15","31","33","20","30","23","6","24","27","2","14","35","21","4","25","8");

$curl = curl_init();
$city_id_array = array();
foreach ($state_id_array as $state_id) {
	$url = "http://www.voltasac.com/index.php?option=com_stlocator&view=seachresult&Itemid=25&st=".trim($state_id);
	$page = file_get_contents($url);
	$string = explode("</option>",$page);

	array_shift($string);
	array_pop($string);

	foreach ($string as $option) {
		$optionval = extstres($option,'<option value="','">');
		array_push($city_id_array, $optionval);
	}

	foreach($city_id_array as $city){

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "http://www.voltasac.com/index.php?option=com_stlocator&view=seachresult&Itemid=25",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "POST",
		  CURLOPT_POSTFIELDS => "Submit=Search&city_id=$city&state_id=$state_id",
		  CURLOPT_HTTPHEADER => array(
		    "accept: text/html, */*; q=0.01",
		    "accept-encoding: gzip, deflate, sdch",
		    "accept-language: en-US,en;q=0.8,hi;q=0.6",
		    "cache-control: no-cache",
		    "connection: keep-alive",
		    "content-type: application/x-www-form-urlencoded",
		    "cookie: d0ba8336c3a4ad7f6327f6946f267384=13ol1j908r7junnvppdogp3no1; _gat=1; _ga=GA1.2.2093866579.1478753821",
		    "host: www.voltasac.com",
		    "postman-token: 311d6c48-e189-6f0c-b6e7-18dadaa43738",
		    "referer: http://www.voltasac.com/index.php?option=com_stlocator&view=seachresult&Itemid=25",
		    "user-agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
		    "x-requested-with: XMLHttpRequest"
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);
		if ($err) {
		  echo "cURL Error #:" . $err;
		} else {
			$body = $response;
			$d = new DOMDocument;
			libxml_use_internal_errors(true);
			$d->loadHTML($body);
			libxml_clear_errors();

			$x = new DOMXPath($d);
				if(($table = $x->query('//div[contains(@class, "locate-address")]'))) {
					for($j=0;$j<($table->length);$j++){
						$data = $d->saveHTML($table->item($j));	
					}
				}
		$json_file_handler = fopen("D:\\wamp\\www\\voltas\\data\\".$state_id."_".$city.".html", "a") or die("Unable to open file!");
		fwrite($json_file_handler,$data);
		}

	}
	$city_id_array = array();
}

		curl_close($curl);
//	fclose($json_file_handler);


?>