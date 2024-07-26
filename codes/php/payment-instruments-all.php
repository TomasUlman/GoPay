<?php

require_once __DIR__ . '/init-gopay.php';

$response = $gopay->getPaymentInstrumentsALL($_POST['goid']);


if ($response->hasSucceed()) {
    $responseBody = $response->json;
    header("Location: /../index.html?validCredentials=yes");
    exit();
} else {
    header("Location: /../index.html?error=" . urlencode($response));
    exit();
}