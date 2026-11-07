# Verifies every checkout page loads the Whop Elements script (the legacy loader.js embed is dead)
# and that every plan it references is still visible/purchasable on Whop.
$root = Split-Path $PSScriptRoot -Parent
$pages = @(Get-ChildItem (Join-Path $root 'industries') -Filter *.html) + @(Get-Item (Join-Path $root 'bundles.html'))

$fail = 0
$ids = @{}
foreach ($p in $pages) {
    $html = Get-Content $p.FullName -Raw
    if ($html -notmatch 'cdn\.whop\.com/elements') { Write-Host "FAIL $($p.Name): Elements script missing"; $fail++ }
    if ($html -match 'WhopCheckout|js\.whop\.com/static') { Write-Host "FAIL $($p.Name): dead legacy Whop loader"; $fail++ }
    [regex]::Matches($html, 'plan_[A-Za-z0-9]+') | ForEach-Object { $ids[$_.Value] = $p.Name }
}

foreach ($id in $ids.Keys) {
    try {
        $plan = Invoke-RestMethod "https://api.whop.com/api/v1/plans/$id" -TimeoutSec 20
        if ($plan.visibility -ne 'visible') { Write-Host "FAIL $($ids[$id]): $id visibility=$($plan.visibility)"; $fail++ }
    } catch {
        Write-Host "FAIL $($ids[$id]): $id not found on Whop"
        $fail++
    }
}

if ($fail) { Write-Host "$fail problem(s)" } else { Write-Host "OK: $($pages.Count) checkout pages use Whop Elements, $($ids.Count) plans visible" }
exit $fail
