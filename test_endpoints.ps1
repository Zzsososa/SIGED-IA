# Test script for SIGED-IA Endpoints
# Note: You MUST have the development server running (npm run dev) for these tests to pass.

$baseUrl = "http://localhost:3000/api"

Write-Host "--- Testing SIGED-IA Endpoints ---" -ForegroundColor Cyan

# Test 1: Get Documents
Try {
    Write-Host "[1/2] Testing GET /api/documents..." -NoNewline
    $response = Invoke-RestMethod -Uri "$baseUrl/documents" -Method Get
    if ($response.Count -gt 0) {
        Write-Host " OK (Found $($response.Count) documents)" -ForegroundColor Green
    } else {
        Write-Host " FAIL (Empty list)" -ForegroundColor Red
    }
} Catch {
    Write-Host " FAIL (Error: $($_.Exception.Message))" -ForegroundColor Red
}

# Test 2: Login Simulation
Try {
    Write-Host "[2/2] Testing POST /api/auth/login..." -NoNewline
    $body = @{ email = "victor@siged.ia"; password = "admin123" } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $body -ContentType "application/json"
    if ($response.success -eq $true) {
        Write-Host " OK (Logged in as $($response.user.name))" -ForegroundColor Green
    } else {
        Write-Host " FAIL (Invalid login)" -ForegroundColor Red
    }
} Catch {
    Write-Host " FAIL (Error: $($_.Exception.Message))" -ForegroundColor Red
}

Write-Host "--- Testing Complete ---" -ForegroundColor Cyan
