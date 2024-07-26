<?php

require_once __DIR__ . '/init-gopay.php';

$response = $gopay->getStatus($_POST['paymentID']);

if ($response->hasSucceed()) {
    header("Location: /../index.html?status=" . urlencode($response));
    exit();
} else {
    header("Location: /../index.html?error=" . urlencode($response));
    exit();
}
