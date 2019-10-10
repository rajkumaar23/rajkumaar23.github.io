<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
require_once 'simple_html_dom.php';
$html = file_get_html('https://www.amrita.edu/academics/curriculum');
// $head =  $html->find('head')[0];
$content = $html->find('#block-system-main');
foreach ($content[0]->find('a') as $item) {
    $item->href = 'https://www.amrita.edu' . $item->href;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>Curriculum - Amrita</title>
    <style>
        *{
            background-color:#262f35;
        }
        body{
            color : #ffffff;
        }
        a{
            color: #03a9f4;
        }
    </style>
</head>

<body>
    <div class="container mt-2">
        <?php
echo $content[0];
?>
    </div>
    </body>

</html>
