# CHECK OUT - Push all changes to GitHub
# Run this when you FINISH working on a device

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CHECK OUT - Sending changes to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if there are any changes to commit
$status = git status --porcelain
if (-not $status) {
    Write-Host "No changes to commit. Your code is already synced!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to continue..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 0
}

# Show what will be committed
Write-Host "Changes to be synced:" -ForegroundColor Yellow
git status --short
Write-Host ""

# Ask for commit message
$commitMessage = Read-Host "Enter a commit message (or press Enter for auto-message)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $commitMessage = "Sync changes - $timestamp"
}

Write-Host ""
Write-Host "Staging all changes..." -ForegroundColor Green
git add .

Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "$commitMessage"

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "CHECK OUT COMPLETE!" -ForegroundColor Green
    Write-Host "All your changes are now on GitHub." -ForegroundColor Green
    Write-Host "You can now safely switch to another device." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "CHECK OUT FAILED!" -ForegroundColor Red
    Write-Host "Try running 'checkin' first to get latest changes." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

