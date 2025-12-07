# CHECK IN - Pull latest changes from GitHub
# Run this when you START working on a device

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CHECK IN - Getting latest from GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check for uncommitted changes first
$status = git status --porcelain
if ($status) {
    Write-Host "WARNING: You have local changes that might be overwritten!" -ForegroundColor Yellow
    Write-Host "Local changes:" -ForegroundColor Yellow
    git status --short
    Write-Host ""
    $response = Read-Host "Do you want to stash these changes before pulling? (y/n)"
    if ($response -eq 'y') {
        Write-Host "Stashing local changes..." -ForegroundColor Yellow
        git stash push -m "Auto-stash before checkin"
    }
}

Write-Host "Pulling latest changes from GitHub..." -ForegroundColor Green
git pull origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "CHECK IN COMPLETE!" -ForegroundColor Green
    Write-Host "You now have the latest code from GitHub." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "CHECK IN FAILED!" -ForegroundColor Red
    Write-Host "There may be conflicts or connection issues." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

