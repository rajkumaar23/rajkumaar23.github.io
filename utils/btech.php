<?php
/**
 * MIT License
 *
 * Copyright (c) 2019 RAJKUMAR S
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

if($_SERVER['REQUEST_METHOD']=='GET'  && $_GET['hash']=="da15ed816b71009461b3a1d5e4b0ec95"){
 header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');   
 $param=isset($_GET['q']) ? $_GET['q'] : 'invalid';

    switch ($param){
        case 'ae'   : $url="https://www.amrita.edu/program/btech-aero-space-engineering"; break;
        case 'che'  : $url="https://www.amrita.edu/program/btech-chemical-engineering"; break;
        case 'cvi'  : $url="https://www.amrita.edu/program/btech-civil-engineering"; break;
        case 'cse'  : $url="https://www.amrita.edu/program/btech-computer-science-and-engineering"; break;
        case 'ece'  : $url="https://www.amrita.edu/program/btech-electronics-and-communication-engineering"; break;
        case 'eie'  : $url="https://www.amrita.edu/program/btech-electronics-and-instrumentation-engineering"; break;
        case 'me'   : $url="https://www.amrita.edu/program/btech-mechanical-engineering"; break;
        case 'eee'  : $url="https://www.amrita.edu/program/btech-electrical-and-electronics-engineering"; break;
    }

    switch ($param){
        case 'ae'   :
        case 'che'  :
        case 'cvi'  :
        case 'cse'  :
        case 'eee'  :
        case 'ece'  :
        case 'me'   :
        case 'eie'  :third($url); break;
        default     :invalidParam();
    }
}else{
    header("HTTP/1.1 404");
    exit();
}

function invalidParam(){
    ?>
    <head>
        <title>Curriculum - B.Tech</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css" />
    <link href="https://fonts.googleapis.com/css?family=Mali" rel="stylesheet">
    <style type="text/css">
        *{
            font-family: 'Mali', cursive;
        }
    </style>
    </head>
    <body>
        <section class="hero is-dark is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        B.Tech Curriculum for Amrita University in JSON
      </h1>
      <h2 class="subtitle">
        Brought to you from amrita.edu by <a class="button is-small is-link" href="https://rajkumaar.co.in">Rajkumar</a>
      </h2>
    </div>
  </div>
</section>
<section class="section">
     <div class="container">
             <aside class="menu">
              <p class="menu-label">
                Courses Available
              </p>
              <ul class="menu-list">
                 <li><a href="?q=cse">Computer Science and Engineering</a></li>
                <li> <a href="?q=ece">Electrical and Communication Engineering</a></li>
                <li>      <a href="?q=eee">Electrical and Electronics Engineering</a></li>
                <li>      <a href="?q=eie">Electronics and Instrumentation Engineering</a></li>
                <li>      <a href="?q=me">Mechanical Engineering</a></li>
                <li>      <a href="?q=ae">Aerospace Engineering</a></li>
                <li>      <a href="?q=che">Chemical Engineering</a></li>
                <li>      <a href="?q=cvi">Civil Engineering</a></li>
              </ul>
              
            </aside>
        </div>
</section>
</body>
<footer class="footer has-background-white"> 
    <div class="content has-text-centered">
        <p>
            Content Copyrights - <a href="https://amrita.edu">Amrita Vishwa Vidyapeetham</a>
        </p>
    <p>
 &copy; Copyright <?php echo date('Y'); ?> <a href="https://rajkumaar.co.in">Rajkumar</a>
    </p>
  </div>
</footer>
    <?php
}


/**
 * One of the three ways to scrape curriculum from amrita.edu
 * @param $url
 */
function first($url){
    $page = file_get_contents($url);

    $dom=new DOMDocument();
    $dom->loadHTML($page);
    $xpath = new \DOMXpath($dom);
    $articles = $xpath->query('//div[@class="table-responsive"]');
    $result=array();
    foreach($articles as $container) {
        $header=$container->getElementsByTagName('tr');
        $cur=array();
        foreach ($header as $head){
            $arr=array();
            $column=$head->getElementsByTagName('td');
            foreach ($column as $col){
                array_push($arr,$col->nodeValue);
            }
            array_push($cur,$arr);
        }
        array_push($result,$cur);
    }
    $json_res=array();
    foreach ($result as $res){
        for ($i=0;$i<sizeof($res[0]);++$i)
        {
            $semesters=array();
            for($j=1;$j<sizeof($res);++$j){
                array_push($semesters,$res[$j][$i]);

            }
            array_push($json_res,$semesters);
        }
    }
    header("Content-Type: application/json");
    $json_res= str_replace('\u00a0','',json_encode($json_res));
    $json_res=str_replace('\n','',$json_res);
    $json_res=str_replace('\t','',$json_res);
    echo $json_res;
}


/**
 * One of the three ways to scrape curriculum from amrita.edu
 * @param $url
 */
function second($url){
    $page = file_get_contents($url);

    $dom=new DOMDocument();
    $dom->loadHTML($page);

    $semesters=array();
    $titles=$dom->getElementsByTagName('th');
    foreach ($titles as $title){
        //echo $title->nodeValue."<br>";
        array_push($semesters,"");
    }


    $result=array();


    $k=0;
    $contents=$dom->getElementsByTagName('td');
    foreach ($contents as $content){
        $list=$content->getElementsByTagName('ul');
        foreach($list as $item){
            $each_sem=array();
            $rows=$content->getElementsByTagName('li');
            array_push($each_sem,$semesters[$k++]);
            $c=0;
            foreach ($rows as $row){
                //echo $row->nodeValue."<br>";
                array_push($each_sem,$row->nodeValue);
            }
            array_push($result,$each_sem);
            //echo "<br>";
        }
    }

    header("Content-Type: application/json");
    $json_res= str_replace('\u00a0','',json_encode($result));
    $json_res=str_replace('\n','',$json_res);
    $json_res=str_replace('\t','',$json_res);
    echo $json_res;


}

/**
 * One of the three ways to scrape curriculum from amrita.edu
 * @param $url
 */
function third($url){
    $page = file_get_contents($url);

 $dom=new DOMDocument();
 $dom->loadHTML($page);

$result=$dom->getElementsByTagName('tbody');

$count=0;
$json_res=array();
foreach ($result as $res) {
    if($count>7) break;
    $tr=$res->getElementsByTagName('tr');
    $c=-1;
    $temp=array();
    foreach ($tr as $t) {
        $c++;
        if($c==1 || $c==0)
            continue;
        if($c>11)
            break;
        if($c==(sizeof($tr)-1))
            break;
        $td=$t->getElementsByTagName('td');
        if(strcmp(json_encode($td[0]->nodeValue),"\u00a0")==0)
            continue;
        else if(isset($td[2]->nodeValue) && !substr_count($td[2]->nodeValue,'Total'))
        array_push($temp, trim($td[2]->nodeValue));
        
        
    }
        //echo "<hr>";
        array_push($json_res, $temp);
    $count++;
}

header("Content-Type: application/json");
$json_res= str_replace('\u00a0','',json_encode($json_res));
$json_res=str_replace('\n','',$json_res);
$json_res=str_replace('\t','',$json_res);
echo $json_res;
}
