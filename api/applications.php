<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM applications ORDER BY created_at DESC');
    echo json_encode($stmt->fetchAll());
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
    $stmt = $pdo->prepare('INSERT INTO applications (company, position, location, salary, status, applied, notes) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([
        $input['company'] ?? '',
        $input['position'] ?? '',
        $input['location'] ?? '',
        $input['salary'] ?? '',
        $input['status'] ?? 'Submitted',
        $input['applied'] ?? null,
        $input['notes'] ?? '',
    ]);
    echo json_encode(['id' => $pdo->lastInsertId()]);
    exit;
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
    $id = $input['id'] ?? 0;
    $stmt = $pdo->prepare('UPDATE applications SET company=?, position=?, location=?, salary=?, status=?, applied=?, notes=? WHERE id=?');
    $stmt->execute([
        $input['company'] ?? '',
        $input['position'] ?? '',
        $input['location'] ?? '',
        $input['salary'] ?? '',
        $input['status'] ?? 'Submitted',
        $input['applied'] ?? null,
        $input['notes'] ?? '',
        $id,
    ]);
    echo json_encode(['ok' => true]);
    exit;
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? 0;
    $stmt = $pdo->prepare('DELETE FROM applications WHERE id = ?');
    $stmt->execute([$id]);
    echo json_encode(['ok' => true]);
    exit;
}

echo json_encode(['error' => 'Method not allowed']);
