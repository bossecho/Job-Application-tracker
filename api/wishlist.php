<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM wishlist ORDER BY created_at DESC');
    echo json_encode($stmt->fetchAll());
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
    $stmt = $pdo->prepare('INSERT INTO wishlist (company, position, priority, website, notes) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([
        $input['company'] ?? '',
        $input['position'] ?? '',
        $input['priority'] ?? 'Medium',
        $input['website'] ?? '',
        $input['notes'] ?? '',
    ]);
    echo json_encode(['id' => $pdo->lastInsertId()]);
    exit;
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
    $id = $input['id'] ?? 0;
    $stmt = $pdo->prepare('UPDATE wishlist SET company=?, position=?, priority=?, website=?, notes=? WHERE id=?');
    $stmt->execute([
        $input['company'] ?? '',
        $input['position'] ?? '',
        $input['priority'] ?? 'Medium',
        $input['website'] ?? '',
        $input['notes'] ?? '',
        $id,
    ]);
    echo json_encode(['ok' => true]);
    exit;
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? 0;
    $stmt = $pdo->prepare('DELETE FROM wishlist WHERE id = ?');
    $stmt->execute([$id]);
    echo json_encode(['ok' => true]);
    exit;
}

echo json_encode(['error' => 'Method not allowed']);
