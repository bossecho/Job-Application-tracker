<?php
require_once __DIR__ . '/db.php';

$stmt = $pdo->query('SELECT * FROM applications ORDER BY applied DESC');
$applications = $stmt->fetchAll();

$stats = [
    'total' => count($applications),
    'pending' => 0,
    'interviews' => 0,
    'rejected' => 0,
    'hired' => 0,
];

$recent = [];
foreach ($applications as $application) {
    $status = $application['status'];
    if ($status === 'Submitted' || $status === 'Assessment') {
        $stats['pending']++;
    } elseif ($status === 'Interview') {
        $stats['interviews']++;
    } elseif ($status === 'Rejected') {
        $stats['rejected']++;
    } elseif ($status === 'Hired') {
        $stats['hired']++;
    }

    $recent[] = [
        'company' => $application['company'],
        'position' => $application['position'],
        'status' => $status,
        'date' => $application['applied'] ? date('M j', strtotime($application['applied'])) : 'N/A',
    ];
}

$progress = [];
$days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
foreach ($days as $day) {
    $progress[] = ['day' => $day, 'applications' => 0];
}

foreach ($applications as $application) {
    if (empty($application['applied'])) continue;
    $index = (int) date('w', strtotime($application['applied'])) - 1;
    if ($index < 0) $index = 6;
    $progress[$index]['applications'] += 1;
}

$upcoming = [];
foreach ($applications as $application) {
    if ($application['status'] === 'Interview') {
        $upcoming[] = [
            'company' => $application['company'],
            'position' => $application['position'],
            'date' => 'Next Week',
            'time' => '10:00 AM',
        ];
    }
}

if (empty($upcoming)) {
    $upcoming[] = [
        'company' => 'No interviews yet',
        'position' => 'Add an interview to see it here',
        'date' => '—',
        'time' => '—',
    ];
}

echo json_encode([
    'stats' => $stats,
    'recent' => array_slice($recent, 0, 5),
    'progress' => $progress,
    'upcoming' => array_slice($upcoming, 0, 3),
]);
