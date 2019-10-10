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

$data = file_get_contents('http://intranet.cb.amrita.edu/CampusWifiStatus/CampusWifiStatus.php');
libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($data);
$dom->preserveWhiteSpace = false;
$header = $dom->getElementsByTagName('table');
$rows = $header->item(0)->getElementsByTagName('tr');
$json = array();
foreach ($rows as $row) {
    $columns = $row->getElementsByTagName('td');
    if (str_replace('\u00a0', '', json_encode($columns->item(1)->nodeValue)) == "\"\u2714\"") {
        $push = array('connection' => $columns->item(0)->nodeValue, 'status' => true);
    } else {
        $push = array('connection' => $columns->item(0)->nodeValue, 'status' => false);
    }

    array_push($json, $push);
}
header("Content-Type: application/json");
echo json_encode($json);
