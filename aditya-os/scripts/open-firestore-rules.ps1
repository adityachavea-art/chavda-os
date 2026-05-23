$rulesPath = Join-Path $PSScriptRoot "..\firestore.rules"
$rules = Get-Content $rulesPath -Raw
Set-Clipboard -Value $rules
Write-Host "firestore.rules copied to clipboard."
Start-Process "https://console.firebase.google.com/project/chavda-os/firestore/rules"
Write-Host "Paste in Firebase Console and click Publish."
