# CRUD Test script for SIGED-IA Documents API
# Requires development server running (npm run dev)

$baseUrl = "http://localhost:3000/api/documents"
Write-Host "--- Testing SIGED-IA CRUD Operations ---" -ForegroundColor Cyan

# 1. CREATE
Try {
    Write-Host "[1/4] Testing POST (Create)..." -NoNewline
    $body = @{ name = "Test Document.pdf"; type = "PDF"; date = "06/03/2026"; size = "500 KB" } | ConvertTo-Json
    $newDoc = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body -ContentType "application/json"
    $newId = $newDoc.id
    Write-Host " OK (Created ID: $newId)" -ForegroundColor Green
} Catch {
    Write-Host " FAIL (Error: $($_.Exception.Message))" -ForegroundColor Red
    exit
}

# 2. READ
Try {
    Write-Host "[2/4] Testing GET (Read)..." -NoNewline
    $docs = Invoke-RestMethod -Uri $baseUrl -Method Get
    if ($docs.id -contains $newId) {
        Write-Host " OK (Found document in list)" -ForegroundColor Green
    } else {
        Write-Host " FAIL (Document not found in list)" -ForegroundColor Red
    }
} Catch {
    Write-Host " FAIL" -ForegroundColor Red
}

# 3. UPDATE
Try {
    Write-Host "[3/4] Testing PATCH (Update)..." -NoNewline
    $updateBody = @{ name = "Updated Document Name.pdf" } | ConvertTo-Json
    $updatedDoc = Invoke-RestMethod -Uri "$baseUrl/$newId" -Method Patch -Body $updateBody -ContentType "application/json"
    if ($updatedDoc.name -eq "Updated Document Name.pdf") {
        Write-Host " OK (Name updated correctly)" -ForegroundColor Green
    } else {
        Write-Host " FAIL (Name mismatch: $($updatedDoc.name))" -ForegroundColor Red
    }
} Catch {
    Write-Host " FAIL" -ForegroundColor Red
}

# 4. DELETE
Try {
    Write-Host "[4/4] Testing DELETE (Delete)..." -NoNewline
    $response = Invoke-RestMethod -Uri "$baseUrl/$newId" -Method Delete
    Write-Host " OK ($($response.message))" -ForegroundColor Green
} Catch {
    Write-Host " FAIL" -ForegroundColor Red
}

Write-Host "--- CRUD Testing Complete ---" -ForegroundColor Cyan
