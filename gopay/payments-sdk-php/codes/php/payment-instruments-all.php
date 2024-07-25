<?php

require_once __DIR__ . '/../../../../autoload.php';

use GoPay\Definition\Language;

$gopay = GoPay\payments([
    'goid' => $_POST['goid'],
    'clientId' => $_POST['clientid'],
    'clientSecret' => $_POST['clientsecret'],
    'gatewayUrl' => $_POST['url'],
    'language' => Language::CZECH
]);

$response = $gopay->getPaymentInstrumentsALL($_POST['goid']);


if ($response->hasSucceed()) {
    $responseBody = $response->json;
    header("Location: /../index.html?validCredentials=yes");
    exit();
} else {
    header("Location: /../index.html?error=" . urlencode($response));
    exit();
}