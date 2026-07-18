<?php
require_once __DIR__ . '/db.php';

$stmt = $pdo->query('SELECT * FROM applications ORDER BY applied ASC');
$applications = $stmt->fetchAll();

$statusCounts = [
    'Submitted' => 0,
    'Interview' => 0,
    'Rejected' => 0,
    'Hired' => 0,
    'Assessment' => 0,
    'Job Offer' => 0,
];

$companyCounts = [];
$monthlyCounts = [];
$monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

foreach ($monthNames as $month) {
    $monthlyCounts[] = ['month' => $month, 'applications' => 0];
}

foreach ($applications as $application) {
    $status = $application['status'];
    if (isset($statusCounts[$status])) {
        $statusCounts[$status]++;
    }

    $company = $application['company'];
    if (!isset($companyCounts[$company])) {
        $companyCounts[$company] = 0;
    }
    $companyCounts[$company]++;

    if (!empty($application['applied'])) {
        $monthIndex = (int) date('n', strtotime($application['applied'])) - 1;
        if (isset($monthlyCounts[$monthIndex])) {
            $monthlyCounts[$monthIndex]['applications']++;
        }
    }
}

$statusData = [
    ['name' => 'Submitted', 'value' => $statusCounts['Submitted']],
    ['name' => 'Interview', 'value' => $statusCounts['Interview']],
    ['name' => 'Rejected', 'value' => $statusCounts['Rejected']],
    ['name' => 'Hired', 'value' => $statusCounts['Hired']],
];

arsort($companyCounts);
$topCompanies = [];
foreach (array_slice($companyCounts, 0, 4, true) as $company => $count) {
    $topCompanies[] = ['company' => $company, 'count' => $count];
}

$recentActivity = [];
foreach (array_slice($applications, -4) as $application) {
    $status = $application['status'];
    if ($status === 'Hired') {
        $recentActivity[] = ['text' => '🎉 Hired by ' . $application['company']];
    } elseif ($status === 'Rejected') {
        $recentActivity[] = ['text' => '❌ Rejected by ' . $application['company']];
    } elseif ($status === 'Interview') {
        $recentActivity[] = ['text' => '📅 Interview scheduled at ' . $application['company']];
    } else {
        $recentActivity[] = ['text' => '✅ Applied to ' . $application['company']];
    }
}

$total = count($applications);
$interviews = $statusCounts['Interview'];
$successRate = $total > 0 ? round(($statusCounts['Hired'] / $total) * 100) : 0;
$rejections = $statusCounts['Rejected'];

echo json_encode([
    'summary' => [
        'total' => $total,
        'interviews' => $interviews,
        'successRate' => $successRate,
        'rejections' => $rejections,
    ],
    'statusData' => $statusData,
    'monthlyData' => $monthlyCounts,
    'topCompanies' => $topCompanies,
    'recentActivity' => $recentActivity,
]);
