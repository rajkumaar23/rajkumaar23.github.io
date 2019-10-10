<!DOCTYPE html>
<html>
<head>
	<title>
		Exams FAQ from Intranet
	</title>
	 <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <style type="text/css">
    	body{
    		background: #bbdefb;
		font-family: 'Lato', sans-serif;
    	}
    </style>
</head>
<body>
<?php
$html=file_get_contents('https://intranet.cb.amrita.edu/?q=exam');
$dom = new DOMDocument();
$dom->loadHTML($html);

foreach($dom->getElementsByTagName('a') as $a) {
    if ($a->hasAttribute('href') 
        AND strpos($href = trim($a->getAttribute('href')), 'mailto:') === 0) {

         $textNode = $dom->createTextNode(substr($href, 7));
         $parent = $a->parentNode;
         $parent->insertBefore($textNode, $a);
         $parent->removeChild($a); 

    }   
}

$xpath = new DOMXPath($dom);
$result = '';
foreach($xpath->evaluate('//div[@class="field-item even"]/node()') as $childNode) {
  $result .= $dom->saveHtml($childNode);
}

foreach($xpath->evaluate('//div[@id="copyright"]/node()') as $childNode) {
  $copy .= $dom->saveHtml($childNode);
}

echo ($result);
//echo $copy;
?>
</body>
</html>



