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

// Level 1 get all available states. 
$state_array = array("Kerala");

// Level 2 get state wise cities.
$page = "";
foreach($state_array as $state){
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => "http://www.daikinindia.com/getcityplaza/".trim(urlencode($state)),
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "GET",
	  CURLOPT_HTTPHEADER => array(
	    "cache-control: no-cache",
	    "content-type: multipart/form-data; boundary=---011000010111000001101001"
	  ),
	));

	$response = curl_exec($curl);
	$err = curl_error($curl);
	//curl_close($curl);

	if ($err) {
  		echo "city cURL Error #:" . $err;
	} else {
  		
		$response_array = explode("</option>",$response);

		array_shift($response_array); // Removes Select option
		array_pop($response_array); // Removes last empty option
		$state_wise_city_array = array();
		foreach($response_array as $response_a){
			$optionvalue=trim(extstres($response_a,"='","'>"));
			array_push($state_wise_city_array,$optionvalue);
		}


		//Level 3 get city wise locality.
		$state_wise_city_array = array('Cochin');

		foreach($state_wise_city_array as $city){
			$curl_city = curl_init();
			curl_setopt_array($curl_city, array(
			  CURLOPT_URL => "http://www.daikinindia.com/getlocalityplaza/".trim(urlencode($city)),
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 30,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "POST",
			  CURLOPT_HTTPHEADER => array(
			    "cache-control: no-cache",
			    "content-type: multipart/form-data; boundary=---011000010111000001101001"
			  ),
			));

			$response_locality = curl_exec($curl_city);
			$response_err = curl_error($curl_city);

			//curl_close($curl_city);

			if ($response_err) {
			  echo "locality cURL Error #:" . $response_err;
			} else {

				$response_locality_array = explode("</option>",$response_locality);

				array_shift($response_locality_array); // Removes Select option
				array_pop($response_locality_array); // Removes last empty option
				$city_wise_locality_array = array();
				foreach($response_locality_array as $rla){
					$optionvalue_locality=trim(extstres($rla,"='","'>"));
					array_push($city_wise_locality_array,$optionvalue_locality);
				}

				foreach($city_wise_locality_array as $locality){
					$url = 'http://www.daikinindia.com/products-services/daikin-dealer-locator';
					$body = 'state='.trim($state).'&city='.trim($city).'&locality='.trim($locality);
					$options = array('method' => 'POST',
					'content' => $body,
					'header' => 'Content-type: application/x-www-form-urlencoded');
					$context = stream_context_create(array('http' => $options));
					$string .= file_get_contents($url, false, $context);	
				}

				$filename =  $state . "_" . $city;
	 			$fh = fopen('D:\\wamp\\www\\daikin\\data\\'.$filename.'.html', 'a') or die('Unable to open file!');
				fwrite($fh,$string);
				$string = "";
			}
		}
	}
}



?>