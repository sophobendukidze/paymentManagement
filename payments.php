<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once('class.db.php');
require_once('class.response.php');
$action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_STRING);
if (isset($action)) {
    $dbObj = new MySQL();
    if ($action == 'addPayment') {

        $responseObj = new Response();

        $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
        $amount = filter_input(INPUT_POST, 'amount', FILTER_SANITIZE_NUMBER_FLOAT);
        $date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_STRING);
        $date = date("Y-m-d", strtotime($date));
        $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_NUMBER_INT);
        $comment = filter_input(INPUT_POST, 'comment', FILTER_SANITIZE_STRING);
        $res = $dbObj->RUNQUERY("INSERT INTO payments (title, amount, date, category_id, comment) VALUES ('" . $title . "', '" . $amount . "', '".$date."', '" . $category . "', '" . $comment . "')", [],false);
        if ($res) {
            $responseObj->setSuccess();
        }

      echo  $responseObj->toJson();
    }

    if ($action == 'getPayments') {
        $itemNum = filter_input(INPUT_POST, 'itemNum', FILTER_SANITIZE_NUMBER_INT);
        $limit = '';
        if($itemNum>0){
            $limit = ' LIMIT '.$itemNum;
        }
        $query = 'SELECT payments.id, title, amount,category_id,  date, comment, category FROM payments
INNER JOIN categories ON payments.category_id = categories.id
order by payments.id desc '.$limit.'';
        $dbObj->RUNQUERY($query);
        $results = array();
        $row = $dbObj->ROWS;
        for ($i = 0; $i < count($row); $i++) {
            $date = date_create($row[$i]['date']);
            array_push($results,
                array(
                    "id" => $row[$i]['id'],
                    "title" => $row[$i]['title'],
                    "amount" => $row[$i]['amount'],
                    "date" => date_format($date, 'l jS F Y'),
                    "comment" => $row[$i]['comment'],
                    "category" => $row[$i]['category'],
                    "category_id"=> $row[$i]['category_id'],
                )
            );
        }
        //$results['sum'] = $sum;
        echo json_encode($dbObj->ROWS);
    }

    if ($action == 'filterPayment') {
        $post = filter_input_array(INPUT_POST);
        $search = '';
        if ($post['searchInputVal'] != '') {
            $search.=" AND title LIKE '%".$post['searchInputVal']."%'";
        }
        $post['categories'] = substr($post['categories'], 1);
        $explodeCat = explode('/', $post['categories']);
        $countExplode = count(array_filter($explodeCat));
        if ($countExplode > 0) {
            if ($countExplode == 1) {
                $cat = str_replace('/', '', $post['categories']);
                $search = $search . " AND category_id='".$cat."'";
            } else {
                $categoryArr = '(';
                foreach ($explodeCat as $key=>$val) {
                    $categoryArr = $categoryArr.$val.',';
                }
                $categoryArr = substr($categoryArr, 0, -1);
                $categoryArr = $categoryArr . ')';
                $search = $search . " AND category_id in ".$categoryArr;
            }

        }

        if($post['fromDate']!='' && $post['toDate']!=''){
            $search = $search . " AND date between '".$post['fromDate']."' AND '".$post['toDate']."'";
        }
        if($post['fromAmount']!='' && $post['toAmount']!=''){
            $search = $search . " AND amount between '".$post['fromAmount']."' AND '".$post['toAmount']."'";
        }

        if(!empty($search)){
            $search = 'WHERE 1=1 '.$search;
        }

        $query = "SELECT payments.id, title, amount, date, comment, category FROM payments INNER JOIN categories ON payments.category_id = categories.id ".$search." order by payments.id desc";
        $dbObj->RUNQUERY($query);
        $results = array();
        $row = $dbObj->ROWS;
        for ($i = 0; $i < count($row); $i++) {
            $date = date_create($row[$i]['date']);
            array_push($results,
                array(
                    "id" => $row[$i]['id'],
                    "title" => $row[$i]['title'],
                    "amount" => $row[$i]['amount'],
                    "date" =>  date_format($date, 'l jS F Y'),
                    "comment" => $row[$i]['comment'],
                    "category" => $row[$i]['category'],
                )
            );
        }
        echo json_encode($dbObj->ROWS);

    }

    if($action=='chartByMonth'){
        $query = 'SELECT sum(amount) as sumAmount, MONTHNAME(date) as monthDate FROM payments GROUP BY MONTH(date)';
        $dbObj->RUNQUERY($query);
        $results = array();
        $row = $dbObj->ROWS;
        $months = array();
        $sum = array();
        for ($i = 0; $i < count($row); $i++) {
            array_push($months, $row[$i]['monthDate']);
            array_push($sum, $row[$i]['sumAmount']);
        }

        array_push($results,
            array(
                "sumAmount" => $sum,
                "monthDate" => $months
            )
        );
        echo json_encode($results);

    }

    if($action == 'chartByCategory'){
        $query = 'SELECT sum(amount) as sumAmount, category FROM payments inner join categories on category_id = categories.id GROUP BY category';
        $dbObj->RUNQUERY($query);
        $results = array();
        $row = $dbObj->ROWS;
        $category = array();
        $sum = array();
        for ($i = 0; $i < count($row); $i++) {
            array_push($category, $row[$i]['category']);
            array_push($sum, $row[$i]['sumAmount']);
        }

        array_push($results,
            array(
                "sumAmount" => $sum,
                "category" => $category
            )
        );
        echo json_encode($results);

    }
}
