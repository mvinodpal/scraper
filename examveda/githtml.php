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

// Function to scrape data using cURL
function scrapeWebsite($url,$id) {
    // $ch = curl_init();
    // curl_setopt($ch, CURLOPT_URL, $url);
    // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    // curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');

    // $html = curl_exec($ch);

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
        $pdo->query("UPDATE  `scraped_links` set `status` =8 WHERE id=$id");
        die("cURL error: " . curl_error($ch));
    }

    curl_close($ch);
    print_r($html);
    return $html;
}

// Function to extract all links from HTML
function extractLinks($html, $base_url) {
    $dom = new DOMDocument();
    @$dom->loadHTML($html);

    $xpath = new DOMXPath($dom);
    $links = $xpath->query("//a[@href]");
    $extractedLinks = [];

    foreach ($links as $link) {
        $href = $link->getAttribute('href');

        // Convert relative URLs to absolute URLs
        $absoluteUrl = filter_var($href, FILTER_VALIDATE_URL) ? $href : resolveRelativeUrl($href, $base_url);

        if (!empty($absoluteUrl)) {
            $extractedLinks[] = $absoluteUrl;
        }
    }

    return array_unique($extractedLinks);
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
$result = $pdo->query("select * from `scraped_links` where `status` =0  order by id asc LIMIT 1");
$rows = $result->fetchAll();
$id=0;
$url="";
foreach($rows as $row) {
    $id=$row['id'];
    $url=trim($row['url']);
    $pdo->query("UPDATE  `scraped_links` set `status` =2 WHERE id=$id");
}
echo '<h1>'.$id.':::'.$url.'</h1>';

// Main logic
//$website_url = "https://www.examveda.com/"; // Replace with the target URL
$website_url = $url; // Replace with the target URL
echo $website_url;

// Step 1: Scrape the website
$html = scrapeWebsite($website_url,$id);

// Step 2: Extract all links
$links = extractLinks($html, $website_url);

// Step 3: Store links in the database
storeLinks($pdo, $links);
$output = [];
$returnCode = 0;
exec('ipconfig /flushdns', $output, $returnCode);
sleep(20);
//header("Location: http://localhost/it/scraper/examveda/githtml.php?".$id);
ob_end_flush();
?>
<script>
    window.location.href = "http://localhost/it/scraper/examveda/githtml.php?id=1";
</script>
