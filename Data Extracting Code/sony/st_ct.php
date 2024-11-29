<?php

/*$state_id_array=array("AN","AP","AR","AS","BR","CH","CG","DL","GA","GJ","HR","HP","JK","JH","KA","KL","MP","MH","MA","MG","MZ","NL","OR","PY","PB","RJ","TN","TG","TP","UT","UP","WB");*/

$state_id_array=array("AN","AP","AR","AS","BR","CH","CG","DL","GA","GJ","HR","HP","JK","JH","KA","KL","MP","MH","MA","MG","MZ","NL","OR","PY","PB","RJ","TN","TG","TP","UT","UP","WB");

/*$state_id_array = array("AN","AP");*/
$looking_for_array = array("10","20","30","40","50","60","70","80","90","110","120","130","140","150","170","180","250");
/*$looking_for_array = array("10","20");*/
$city_id_array = array();
$curl = curl_init();
foreach ($state_id_array as $state_id) {
	$url = "http://www.sony.co.in/support/RegionalDealerServiceAddressSelectionAjax.action?site=hp_en_IN_i&selObjName=state_province_id&selObjval=".$state_id."&expObjName=city_id&level=1&radioType=address&type=servicecenter";
	$page = file_get_contents($url);
	$city_array = explode(",",$page);

	foreach($city_array as $city){
		$ss = explode("=",$city);
		$cityID = $ss[0];
		//array_push($city_id_array,$cityID);


						foreach($looking_for_array as $looking_for){

							curl_setopt_array($curl, array(
							  CURLOPT_URL => "http://www.sony.co.in/support/ShowRegionalDealerShopsSubmitFormController.action?site=hp_en_IN_i&type=servicecenter&radioType=address&state_province_id=".$state_id."&city_id=".$cityID."&category1=".$looking_for."&category2=00",
							  CURLOPT_RETURNTRANSFER => true,
							  CURLOPT_ENCODING => "",
							  CURLOPT_MAXREDIRS => 10,
							  CURLOPT_TIMEOUT => 30,
							  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
							  CURLOPT_CUSTOMREQUEST => "POST",
							  CURLOPT_POSTFIELDS => "",
							  CURLOPT_HTTPHEADER => array(
							    "cache-control: no-cache",
							    "content-type: application/x-www-form-urlencoded"
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
								if(($table = $x->query('//span[contains(@class, "storeinforegional")]'))) {
									for($j=0;$j<($table->length);$j++){
										$data = $d->saveHTML($table->item($j));	
									}
								}

								$file_handler = fopen('D:\\wamp\\www\\sony\\data\\'.$state_id.'_'.$cityID.'_'.$looking_for.'.html', 'a') or die('Unable to open file!');
								fwrite($file_handler,$data);

							}
						}
	}
}

	

//	fclose($json_file_handler);
?>