# videoCreator customization, 2026-10-25. Keeps upstream packaging verification.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if ($env:OS -ne 'Windows_NT') { throw 'Run this script on Windows x64.' }
foreach ($tool in @('node', 'pnpm', 'go', 'git')) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) { throw "Missing prerequisite: $tool" }
}
function Invoke-Checked {
    param([string[]]$CommandArgs)
    & pnpm @CommandArgs
    if ($LASTEXITCODE -ne 0) { throw "pnpm failed: $CommandArgs" }
}
$env:OPENCREATOR_DESKTOP_OFFICIAL_BUILD = '0'
$env:OPENCREATOR_DESKTOP_TARGET_PLATFORM = 'win32'
$env:OPENCREATOR_DESKTOP_TARGET_ARCH = 'x64'
$env:CSC_IDENTITY_AUTO_DISCOVERY = 'false'
# Release provenance requires a Git checkout. Initialize a local snapshot when using the ZIP.
if (-not (Test-Path '.git')) {
    & git init
    if ($LASTEXITCODE -ne 0) { throw 'git init failed' }
    & git add .
    if ($LASTEXITCODE -ne 0) { throw 'git add failed' }
    & git -c user.name='videoCreator Local Build' -c user.email='local-build@example.invalid' commit -m 'Initialize videoCreator source based on OpenCreator v3.2.9'
    if ($LASTEXITCODE -ne 0) { throw 'Local source snapshot failed' }
}
Invoke-Checked -CommandArgs @('install', '--frozen-lockfile')
Invoke-Checked -CommandArgs @('--filter', '@opencreator/protocol', 'build')
Invoke-Checked -CommandArgs @('--filter', '@opencreator/config', 'test')
Invoke-Checked -CommandArgs @('desktop:dist')
Invoke-Checked -CommandArgs @('--filter', '@opencreator/desktop', 'e2e:package:smoke')
Write-Host 'Build and smoke checks passed. Installer: apps/desktop/release/videoCreator-3.2.9-win-x64.exe'
