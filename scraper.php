<?php
// Database Configuration
$host = "localhost";
$username = "root";
$password = "";
$database = "scrapeddata";

// Connect to MySQL
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Include Simple HTML DOM Parser
require_once 'simple_html_dom.php';

// Target URL to scrape
$url = "https://www.websiteoutlook.com"; // Replace with the target URL

// Fetch HTML content using cURL
function fetchHTML($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // If HTTPS issues occur
    curl_setopt($ch, CURL_IPRESOLVE_V4, false); // If HTTPS issues occur
   
    $html = curl_exec($ch);
    if (curl_errno($ch)) {
        die("cURL error: " . curl_error($ch));
    }
    curl_close($ch);
    return $html;
}

// Fetch and parse HTML content
$htmlContent = fetchHTML($url);
$htmlDom = str_get_html($htmlContent);

if (!$htmlDom) {
    die("Failed to parse HTML");
}

// Extract and store data
$data = [];
foreach ($htmlDom->find('<table class="table table-striped table-condensed">') as $article) { // Adjust the selector as needed
    $title = $article->find('h2', 0)->plaintext ?? 'No title';
    $description = $article->find('p', 0)->plaintext ?? 'No description';
    $link = $article->find('a', 0)->href ?? '#';

    $data[] = [
        'title' => $title,
        'description' => $description,
        'url' => $link
    ];
}

// Insert data into MySQL
foreach ($data as $row) {
    $title = $conn->real_escape_string($row['title']);
    $description = $conn->real_escape_string($row['description']);
    $url = $conn->real_escape_string($row['url']);

    $sql = "INSERT INTO scraped_data (title, description, url) 
            VALUES ('$title', '$description', '$url')";

    if (!$conn->query($sql)) {
        echo "Error inserting data: " . $conn->error;
    }
}

echo "Scraping completed! Data has been saved.";
?>
