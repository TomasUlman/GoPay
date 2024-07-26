<?php

require_once __DIR__ . '/init-gopay.php';

$preauthorization = isset($_POST['preauthorization']) && $_POST['preauthorization'] == 'on';
$recurrence = null;
if (isset($_POST['recurrence']) && $_POST['recurrence'] == 'on') {
    $recurrence = [
        'recurrence_cycle' => $_POST['cycle'],
        'recurrence_period' => $_POST['period'],
        'recurrence_date_to' => $_POST['date_to']
    ];
}

$response = $gopay->createPayment([
    'payer' => [
        'contact' => [
            'first_name' => 'Test',
            'last_name' => 'Test',
            'email' => 'test@gopay.cz',
        ],
    ],
    'amount' => $_POST['amount'],
    'currency' => $_POST['currency'],
    'order_number' => '001',
    'callback' => [
        'return_url' => 'http://localhost:8000/index.html',
        // 'notification_url' => ''
    ],
    'preauthorization' => $preauthorization,
    'recurrence' => $recurrence,
]);

if ($response->hasSucceed()) {
    header("Location: {$response->json['gw_url']}");
    exit;
} else {
    header("Location: /../index.html?error=" . urlencode($response));
    exit();
}
