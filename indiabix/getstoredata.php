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

//////////// Start

function scrapeQuestions($html) {
    $dom = new DOMDocument;
    @$dom->loadHTML($html); // Suppress warnings from malformed HTML
    $xpath = new DOMXPath($dom);

    // Find all <p> tags (questions) and related data
    $questions = $xpath->query('//p');
    $data = [];
    foreach ($questions as $question) {       
        $text = trim($question->textContent);   
        if (preg_match('/^\d+\./', $text)) {
            // Get the following options (up to the next <p>)
            $options = [];
            $next = $question->nextSibling;

            while ($next && ($next->nodeName === '#text' || $next->nodeName === 'br')) {
                $next = $next->nextSibling;
            }

            while ($next && $next->nodeName === 'p') {
                $options[] = trim($next->textContent);
                $next = $next->nextSibling;
            }
            echo '--------<br/>';
            print_r($question);
            echo '--------<br/>';
            // Extract the answer and explanation
            $answerNode = $xpath->query(".//following-sibling::div[contains(@class, 'collapseomatic_content')]", $question);
            $answer = '';
            $explanation = '';

            if ($answerNode->length > 0) {
                $content = trim($answerNode[0]->textContent);
                if (preg_match('/^Answer:\s*(\w+)/', $content, $matches)) {
                    $answer = $matches[1];
                }

                if (preg_match('/Explanation:\s*(.+)/', $content, $matches)) {
                    $explanation = $matches[1];
                }
            }

            $data[] = [
                'question' => $text,
                'options' => $options,
                'answer' => $answer,
                'explanation' => $explanation,
            ];
        }
    }

    return $data;
}
/////////////////// End 

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
	//  CURLOPT_RESOLVE => ['www.indiabix.com:443:8.8.8.8'],   
	  CURLOPT_PROXY => null,   
	  CURLOPT_HTTPHEADER => array(
	    "cache-control: no-cache",
	    "content-type: multipart/form-data; boundary=---011000010111000001101001",
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Referer: https://www.indiabix.com',
	  ),
	));
    $html = curl_exec($ch);

	// $response = curl_exec($curl);
	// $err = curl_error($curl);


    if (curl_errno($ch)) {  
        global $pdo;      
        $pdo->query("UPDATE  `scraped_indiabix_links` set `status` =4 WHERE id=$id");
        header("Location: http://localhost/it/scraper/indiabix/getstoredata.php");
        die("cURL error: " . curl_error($ch));
    }

    curl_close($ch);    
    $data=trim(extstres($html,'<section class="section">','</section>')); 
    return $data;
}

// Function to extract all links from HTML
function extractData($html, $base_url) {
    global $pdo;
    // Extract the title

    

    $response_locality_title_array = explode('<li class="breadcrumb-item">', $html);   
     $title = @trim(extstres($html, '<h1 class="flex-wrap w-100 add-color">', "</h1>")); 
     $title1 = @trim(extstres($response_locality_title_array[2], '">', "</a>"));
     $title2 = @trim(extstres($response_locality_title_array[3], '">', "</a>")); 
     $title3 = @trim(extstres($response_locality_title_array[4], '">', "</a>"));  
     $title4 = @trim(extstres($response_locality_title_array[4], 'aria-current="page">', "</li>"));

    //  echo '<pre/>';
    // print_r($response_locality_title_array);
    // die("hhhhhhhhhhh");

    // Split the HTML content to parse questions
   // $html = str_replace('<p>a)', 'a)', $html);
    $response_locality_array = explode('<div class="bix-div-container">', $html);
//     echo '<pre/>';
//    print_r($response_locality_array);
//    die("hhhhhhhhhhh");

    foreach ($response_locality_array as $rla) {
       // $question = trim(extstres($rla, '. ', "<br />"));
        $question = trim(extstres($rla, '<div class="bix-td-qtxt table-responsive w-100">', "</div>"));
        $question = str_replace('<a href="#direction"><b>direction</b></a>', '', $question);
        $qescode = trim(extstres($rla, '</p>', "a)"));
        $qescode = "";
        $o1 = trim(extstres($rla, '<div class="flex-wrap">', "</div>"));
        $o2 = trim(extstres($rla, 'tdOptionDt_B_', "</div>"));
        $o2 = @trim(extstres($o2, '<div class="flex-wrap">', "', '"));
        $o3 = trim(extstres($rla, 'tdOptionDt_C_', "</div>"));
        $o3 = @trim(extstres($o3, '<div class="flex-wrap">', "', '"));
        $o4 = trim(extstres($rla, 'tdOptionDt_D_', "</div>"));
        $o4 = @trim(extstres($o4, '<div class="flex-wrap">', "', '"));
        $o5 = trim(extstres($rla, 'tdOptionDt_E_', "</div>"));
        $o5 = @trim(extstres($o5, '<div class="flex-wrap">', "', '"));
        $a = trim(extstres($rla, 'value="', '">'));
        $explanation = trim(extstres($rla, '<div class="bix-ans-description table-responsive">', '</div>'));

        // Check if essential fields are not empty
        if ($question != '' && $o1 != '' && $a != '') {
            // Debugging SQL string (for logs or troubleshooting)
            $sql = "INSERT INTO `scraped_indiabix_data` (`url`, `title`,`title1`,`title2`,`title3`,`title4`, `qes`, `o1`, `o2`, `o3`, `o4`,`o5`, `ans1`, `explanation`,`qescode`) 
                    VALUES ('$base_url', '$title', '$title1', '$title2', '$title3', '$title4', '$question', '$o1', '$o2', '$o3', '$o4','$o5', '$a', '$explanation','$qescode')";
                   
            echo '<br/>kkkkkkkk<hr/>--------------' . $sql . ' kkkkkk<br/><br/>';

            // Prepare and execute the statement securely
            $stmt = $pdo->prepare("INSERT INTO scraped_indiabix_data 
                (`url`, `title`,`title1`,`title2`,`title3`,`title4`, `qes`, `o1`, `o2`, `o3`, `o4`,`o5`, `ans1`, `explanation`,`qescode`) 
                VALUES (:url, :title,:title1,:title2,:title3,:title4, :qes, :o1, :o2, :o3, :o4,:o5, :ans1, :explanation, :qescode)");

            // Bind parameters to the query
            $stmt->bindParam(':url', $base_url);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':title1', $title1);
            $stmt->bindParam(':title2', $title2);
            $stmt->bindParam(':title3', $title3);
            $stmt->bindParam(':title4', $title4);
            $stmt->bindParam(':qes', $question);
            $stmt->bindParam(':o1', $o1);
            $stmt->bindParam(':o2', $o2);
            $stmt->bindParam(':o3', $o3);
            $stmt->bindParam(':o4', $o4);
            $stmt->bindParam(':o5', $o5);
            $stmt->bindParam(':ans1', $a);
            $stmt->bindParam(':explanation', $explanation);
            $stmt->bindParam(':qescode', $qescode);

            // Execute the prepared statement
            try {
                $stmt->execute();
            } catch (PDOException $e) {
                echo "Error inserting data: " . $e->getMessage();
            }
        }
    }
}


// Function to resolve relative URLs
function resolveRelativeUrl($relative_url, $base_url) {
    return rtrim($base_url, '/') . '/' . ltrim($relative_url, '/');
}

// Function to store links in the database
function storeLinks($pdo, $links) {
    $stmt = $pdo->prepare("INSERT INTO scraped_indiabix_links (url) VALUES (:url)");

    foreach ($links as $link) {
        try {
            $stmt->execute([':url' => $link]);
            echo "Saved: $link\n";
        } catch (PDOException $e) {
            echo "Failed to save $link: " . $e->getMessage() . "\n";
        }
    }
}
$result = $pdo->query("select * from `scraped_indiabix_links` where `status` =0  order by id asc LIMIT 1");
$rows = $result->fetchAll();
$id=0;
$url="";
foreach($rows as $row) {
    $id=$row['id'];
    $url=trim($row['url']);
    $pdo->query("UPDATE  `scraped_indiabix_links` set `status` =3 WHERE id=$id");
}
echo '<h1>'.$id.':::'.$url.'</h1>';

// Main logic
//$website_url = "https://www.indiabix.com/logical-reasoning/logical-deduction/"; // Replace with the target URL
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
sleep(5);
//header("Location: http://localhost/it/scraper/indiabix/getstoredata.php?".$id);
ob_end_flush();
?>
<script>
  window.location.href = "http://localhost/it/scraper/indiabix/getstoredata.php?id=1";
</script>
