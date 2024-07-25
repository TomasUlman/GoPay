<?php

require_once __DIR__ . '/../../../../autoload.php';

use GoPay\Definition\TokenScope;
use GoPay\Definition\Language;

$gopay = GoPay\payments([
    'goid' => $_POST['goid'],
    'clientId' => $_POST['clientid'],
    'clientSecret' => $_POST['clientsecret'],
    'gatewayUrl' => $_POST['url'],
    'scope' => TokenScope::ALL,
    'language' => Language::CZECH
]);

$id = $_POST['paymentID'];

$response = $gopay->refundPayment($id, $_POST['amount']);

if ($response->hasSucceed()) {
    header("Location: /../index.html?id=$id");
    exit();
} else {
    header("Location: /../index.html?error=" . urlencode($response));
    exit();
}