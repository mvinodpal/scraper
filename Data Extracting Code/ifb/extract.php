<?php

	$url = "D:\wamp\www\ifb\row.html";

	$page = "";

	$body = file_get_contents($url);
	$d = new DOMDocument;
	libxml_use_internal_errors(true);
	$d->loadHTML($body);
	libxml_clear_errors();

	$x = new DOMXPath($d);
	if(($table = $x->query('//li[contains(@class, "store")]'))) {
		for($j=0;$j<($table->length);$j++){
			$page .= $d->saveHTML($table->item($j));	
			$page .= "<br><hr><br>";
		}
	}

	$json_file_handler = fopen("D:\wamp\www\ifb\clean.html", "a") or die("Unable to open file!");
	fwrite($json_file_handler,$page);

	fclose($json_file_handler);

?>