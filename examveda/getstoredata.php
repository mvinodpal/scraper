<?php
ob_start();
setcookie("langcookie", "cookiedata");
error_reporting(E_ALL);
ini_set("display_errors", 1);
// Database credentials
$host = 'localhost';
$db = 'scrapeddata';
$user = 'root';
$pass = '';

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}


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

// Function to scrape data using cURL
function scrapeWebsite($url,$id) {

    $ch = curl_init();

	curl_setopt_array($ch, array(
	  CURLOPT_URL => $url,
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 60,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "GET",
	  CURLOPT_SSL_VERIFYHOST => 0,
	  CURLOPT_SSL_VERIFYPEER => 0,   
	//  CURLOPT_RESOLVE => ['www.examveda.com:443:8.8.8.8'],   
	  CURLOPT_PROXY => null,   
	  CURLOPT_HTTPHEADER => array(
	    "cache-control: no-cache",
	    "content-type: multipart/form-data; boundary=---011000010111000001101001",
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Referer: https://www.examveda.com',
	  ),
	));
    $html = curl_exec($ch);

	// $response = curl_exec($curl);
	// $err = curl_error($curl);


    if (curl_errno($ch)) {  
        global $pdo;      
        $pdo->query("UPDATE  `scraped_links` set `status` =4 WHERE id=$id");
        header("Location: http://localhost/it/scraper/examveda/getstoredata.php");
        die("cURL error: " . curl_error($ch));
    }

    curl_close($ch);
    $data=trim(extstres($html,'<div class="breadcrumbs">','<!-- Question Page Middle -->'));
    return $data;
}

// Function to extract all links from HTML
function extractData($html, $base_url) {
    global $pdo;   
   // $i=0;  
    $title=trim(extstres($html,'<h1>',"</h1>"));
    $response_locality_array = explode('<article class="question single-question question-type-normal">',$html);    
    foreach($response_locality_array as $rla){ 
       $i=trim(extstres($rla,'<input type="radio" name="poll-radio-','"'));    
       if(!$i){$i=0;}  
       $question=trim(extstres($rla,'<div class="question-main">',"</div>"));
       $o1=trim(extstres($rla,'<label for="poll-'.$i.'-1">',"</label>"));
       $o2=trim(extstres($rla,'<label for="poll-'.$i.'-2">',"</label>"));
       $o3=trim(extstres($rla,'<label for="poll-'.$i.'-3">',"</label>"));
       $o4=trim(extstres($rla,'<label for="poll-'.$i.'-4">',"</label>"));
       $a=trim(extstres($rla,'value="','"'));        
     $sql = "INSERT INTO `scraped_examveda_data` (`url`, `title`,`qes`, `o1`, `o2`, `o3`, `o4`,  `ans1`) VALUES ('$base_url', '$title','$question', '$o1', '$o2', '$o3', '$o4',  '$a')"; 
     if($question !='' && $o1 !='' ){
    echo '<hr/>--------------'.$sql;  
    $stmt = $pdo->prepare("INSERT INTO scraped_examveda_data (`url`, `title`, `qes`, `o1`, `o2`, `o3`, `o4`, `ans1`) 
    VALUES (:url, :title, :qes, :o1, :o2, :o3, :o4, :ans1)");

    $stmt->bindParam(':url', $base_url);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':qes', $question);
    $stmt->bindParam(':o1', $o1);
    $stmt->bindParam(':o2', $o2);
    $stmt->bindParam(':o3', $o3); // Corrected the parameter name
    $stmt->bindParam(':o4', $o4);
    $stmt->bindParam(':ans1', $a);

    $stmt->execute();
     }
   //  $i++;
    }
    
    print_r($response_locality_array);

    // die("333333");
    // $dom = new DOMDocument();
    // @$dom->loadHTML($html);

    // $xpath = new DOMXPath($dom);
    // $links = $xpath->query("//a[@href]");
    // $extractedLinks = [];

    // foreach ($links as $link) {
    //     $href = $link->getAttribute('href');

    //     // Convert relative URLs to absolute URLs
    //     $absoluteUrl = filter_var($href, FILTER_VALIDATE_URL) ? $href : resolveRelativeUrl($href, $base_url);

    //     if (!empty($absoluteUrl)) {
    //         $extractedLinks[] = $absoluteUrl;
    //     }
    // }

    // return array_unique($extractedLinks);
}

// Function to resolve relative URLs
function resolveRelativeUrl($relative_url, $base_url) {
    return rtrim($base_url, '/') . '/' . ltrim($relative_url, '/');
}

// Function to store links in the database
function storeLinks($pdo, $links) {
    $stmt = $pdo->prepare("INSERT INTO scraped_links (url) VALUES (:url)");

    foreach ($links as $link) {
        try {
            $stmt->execute([':url' => $link]);
            echo "Saved: $link\n";
        } catch (PDOException $e) {
            echo "Failed to save $link: " . $e->getMessage() . "\n";
        }
    }
}
$result = $pdo->query("select * from `scraped_links` where `status` =5  order by id asc LIMIT 1");
$rows = $result->fetchAll();
$id=0;
$url="";
foreach($rows as $row) {
    $id=$row['id'];
    $url=trim($row['url']);
    $pdo->query("UPDATE  `scraped_links` set `status` =3 WHERE id=$id");
}
echo '<h1>'.$id.':::'.$url.'</h1>';

// Main logic
//$website_url = "https://www.examveda.com/arithmetic-ability/practice-mcq-question-on-average/"; // Replace with the target URL
$website_url = $url; // Replace with the target URL
echo $website_url;

// Step 1: Scrape the website
$html = scrapeWebsite($website_url,$id);

// Step 2: Extract all links
$links = extractData($html, $website_url);

// Step 3: Store links in the database
//storeLinks($pdo, $links);
$output = [];
$returnCode = 0;
exec('ipconfig /flushdns', $output, $returnCode);
sleep(20);
//header("Location: http://localhost/it/scraper/examveda/getstoredata.php?".$id);
ob_end_flush();
?>
<script>
    window.location.href = "http://localhost/it/scraper/examveda/getstoredata.php?id=1";
</script>
