<?php
require_once __DIR__ . '/db.php';

$sql = <<<SQL
CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  location VARCHAR(255) DEFAULT '',
  salary VARCHAR(100) DEFAULT '',
  status VARCHAR(100) NOT NULL DEFAULT 'Submitted',
  applied DATE DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  priority VARCHAR(50) NOT NULL DEFAULT 'Medium',
  website VARCHAR(500) DEFAULT '',
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SQL;

$pdo->exec($sql);

$seedCheck = $pdo->query("SELECT COUNT(*) as count FROM applications")->fetch();
if ((int) $seedCheck['count'] === 0) {
    $stmt = $pdo->prepare('INSERT INTO applications (company, position, location, salary, status, applied, notes) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $seedData = [
        ['Wilcon Depot', 'IT Support', 'Quezon City', '₱22000', 'Interview', '2026-07-15', 'Follow-up scheduled'],
        ['Accenture', 'Associate Software Engineer', 'Makati', '₱35000', 'Rejected', '2026-07-12', 'Needs stronger portfolio'],
        ['JPMC', 'Fraud Specialist', 'Taguig', '₱30000', 'Assessment', '2026-07-10', 'Online assessment pending'],
        ['Concentrix', 'Technical Support', 'Cebu', '₱18000', 'Submitted', '2026-07-09', 'Awaiting confirmation'],
        ['Google', 'Support Engineer', 'Remote', '₱45000', 'Hired', '2026-06-28', 'Offer accepted'],
        ['IBM', 'Cloud Support', 'Mandaluyong', '₱28000', 'Interview', '2026-06-20', 'Interview scheduled'],
    ];

    foreach ($seedData as $row) {
        $stmt->execute($row);
    }
}

$wishlistCheck = $pdo->query("SELECT COUNT(*) as count FROM wishlist")->fetch();
if ((int) $wishlistCheck['count'] === 0) {
    $wishlistStmt = $pdo->prepare('INSERT INTO wishlist (company, position, priority, website, notes) VALUES (?, ?, ?, ?, ?)');
    $wishlistSeed = [
        ['Microsoft', 'Customer Support Engineer', 'High', 'https://careers.microsoft.com', 'Great fit for support background'],
        ['Amazon', 'Operations Analyst', 'Medium', 'https://www.amazon.jobs', 'Watch for opening this month'],
        ['Shopify', 'Product Support Specialist', 'High', 'https://www.shopify.com/careers', 'Strong product support focus'],
    ];

    foreach ($wishlistSeed as $row) {
        $wishlistStmt->execute($row);
    }
}

echo json_encode(['ok' => true, 'message' => 'Database initialized with sample data']);
