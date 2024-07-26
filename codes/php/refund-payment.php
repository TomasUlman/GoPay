<?php

require_once __DIR__ . '/init-gopay.php';

$id = $_POST['paymentID'];

$response = $gopay->refundPayment($id, $_POST['amount']);

if ($response->hasSucceed()) {
    header("Location: /../index.html?id=$id");
    exit();
} else {
    header("Location: /../index.html?error=" . urlencode($response));
    exit();
}