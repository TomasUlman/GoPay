<?php

require_once __DIR__ . '/init-gopay.php';

$id = $_POST['paymentID'];

$response = $gopay->voidAuthorization($id);

// Kontrola, zda bylo volání úspěšné a získání těla API odpovědi
if ($response->hasSucceed()) {
    header("Location: /../index.html?id=$id");
    exit;
} else {
    header("Location: /../index.html?error=" . urlencode($response));
    exit();
}