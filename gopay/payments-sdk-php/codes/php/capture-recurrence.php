<?php

require_once __DIR__ . '/../../../../autoload.php';

use GoPay\Definition\TokenScope;
use GoPay\Definition\Language;
use GoPay\Definition\Payment\Currency;

$gopay = GoPay\payments([
    'goid' => $_POST['goid'],
    'clientId' => $_POST['clientid'],
    'clientSecret' => $_POST['clientsecret'],
    'gatewayUrl' => $_POST['url'],
    'scope' => TokenScope::ALL,
    'language' => Language::CZECH
]);

$id = $_POST['paymentID'];
$payment = [
    'amount' => $_POST['amount'],
    'currency' => $_POST['currency'],
    'order_number' => '123456',
    'order_description' => 'Test recurrence'
];

// Vlastní API call pro vytvoření následné platby
$response = $gopay->createRecurrence($id, $payment);

// Kontrola, zda vytvoření platby bylo úspěšné a získání těla API odpovědi
if ($response->hasSucceed()) {
    header("Location: {$response->json['gw_url']}");
    exit;
} else {
    header("Location: /../index.html?error=" . urlencode($response));
    exit();
}