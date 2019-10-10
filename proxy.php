<?php
require 'vendor/autoload.php';
define("HASH","da15ed816b71009461b3a1d5e4b0ec95");
if(isset($_POST['hash']) && $_POST['hash']==HASH){
if(isset($_POST['data'])){
    header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    $client=new \GuzzleHttp\Client();
    $res = $client->request('POST','http://ctf.cb.amrita.edu:4310/app/proxy.php',[
        'verify'=>false,
	'form_params'=>[
            'data'=>$_POST['data']]]
        );
    echo $res->getBody();
}else{
    echo "&#x1F595;";
}
}else{
	echo "&#x1F595;";
}
