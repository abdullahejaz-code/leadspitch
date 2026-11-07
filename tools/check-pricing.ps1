Set-Location "C:\Users\BISMILLAH\OneDrive\Desktop\LeadsPitch"

$files = @(
    @{html='industries/agencies-business.html'; csv='reference-data/Agencies & Business Services - Sheet1.csv'},
    @{html='industries/automotive.html'; csv='reference-data/Automotive - Sheet1.csv'},
    @{html='industries/beauty-wellness.html'; csv='reference-data/beauty ans wellness plans - Sheet1.csv'},
    @{html='industries/construction.html'; csv='reference-data/Construction & Contractors - Sheet1.csv'},
    @{html='industries/events-leisure.html'; csv='reference-data/Events & Leisure - Sheet1.csv'},
    @{html='industries/food-beverage.html'; csv='reference-data/Food & Beverage Suppliers - Sheet1.csv'},
    @{html='industries/hotels-hospitality.html'; csv='reference-data/Hotels & Hospitality - Sheet1.csv'},
    @{html='industries/legal.html'; csv='reference-data/Lawers plans - Sheet1.csv'},
    @{html='industries/logistics.html'; csv='reference-data/logistics plans - Sheet1.csv'},
    @{html='industries/restaurants-cafes.html'; csv='reference-data/Restaurants & Cafés - Sheet1 (1).csv'}
)

$results = @()

foreach ($f in $files) {
    $html = Get-Content $f.html -Raw
    $csv = Import-Csv $f.csv
    $fileName = [System.IO.Path]::GetFileNameWithoutExtension($f.html)
    
    # Extract product plan names from HTML
    $planPattern = 'product-plan[^>]*>([^<]+)<'
    $plans = [regex]::Matches($html, $planPattern) | ForEach-Object { $_.Groups[1].Value.Trim() }
    
    # Extract prices from HTML
    $pricePattern = 'product-price[^>]*>\$([0-9.]+)<'
    $prices = [regex]::Matches($html, $pricePattern) | ForEach-Object { '$' + $_.Groups[1].Value }
    
    # Extract stats (leads/emails alternating)
    $statPattern = 'product-stat-num[^>]*>([0-9.KkM+]+)<'
    $stats = [regex]::Matches($html, $statPattern) | ForEach-Object { $_.Groups[1].Value }
    
    # Extract buy links
    $linkPattern = 'href="(https://whop\.com/[^"]+)"'
    $links = [regex]::Matches($html, $linkPattern) | ForEach-Object { $_.Groups[1].Value }
    
    # Extract member prices
    $memberPattern = 'product-member[^>]*>\$([0-9.]+)<'
    $members = [regex]::Matches($html, $memberPattern) | ForEach-Object { '$' + $_.Groups[1].Value }
    
    # CSV data
    $csvPlans = $csv | ForEach-Object { $_.Plan.Trim() }
    $csvRegPrices = $csv | ForEach-Object { $_.'Regular Price' }
    $csvMemPrices = $csv | ForEach-Object { $_.'Member Price (40% OFF)' }
    $csvLinks = $csv | ForEach-Object { if($_.'Buy Link'){$_.'Buy Link'}elseif($_.'Buy link'){$_.'Buy link'}else{''} }
    $csvLeads = $csv | ForEach-Object {
        if($_.Leads){$_.Leads}
        elseif($_.'Business Records'){$_. 'Business Records'}
        elseif($_.'Monthly Records'){$_. 'Monthly Records'}
        elseif($_.'Monthly Business Records'){$_. 'Monthly Business Records'}
        elseif($_.'Monthly Lawyer Records'){$_. 'Monthly Lawyer Records'}
        else{''}
    }
    $csvEmails = $csv | ForEach-Object { $_.'Verified Emails' }
    
    Write-Host "========== $fileName ==========" -ForegroundColor Cyan
    Write-Host ""
    
    # One-time plans
    Write-Host "ONE-TIME PLANS:" -ForegroundColor Yellow
    $oneTimeCsv = $csv | Where-Object { $_.Plan -notmatch 'Monthly' }
    $oneTimeCount = $oneTimeCsv.Count
    $oneTimeHtmlPlans = $plans[0..($oneTimeCount-1)]
    $oneTimeHtmlPrices = $prices[0..($oneTimeCount-1)]
    $oneTimeHtmlMembers = $members[0..($oneTimeCount-1)]
    $oneTimeHtmlLinks = $links[0..($oneTimeCount-1)]
    $oneTimeHtmlStats = $stats[0..($oneTimeCount*2-1)]
    
    $i = 0
    foreach ($csvPlan in $oneTimeCsv) {
        $htmlPlan = if($i -lt $oneTimeHtmlPlans.Count){$oneTimeHtmlPlans[$i]}else{'MISSING'}
        $htmlPrice = if($i -lt $oneTimeHtmlPrices.Count){$oneTimeHtmlPrices[$i]}else{'MISSING'}
        $htmlMember = if($i -lt $oneTimeHtmlMembers.Count){$oneTimeHtmlMembers[$i]}else{'MISSING'}
        $htmlLink = if($i -lt $oneTimeHtmlLinks.Count){$oneTimeHtmlLinks[$i]}else{'MISSING'}
        
        $planMatch = if($htmlPlan -eq $csvPlan.Trim()){'MATCH'}else{"MISMATCH: HTML='$htmlPlan' CSV='$($csvPlan.Trim())'"}
        $priceMatch = if($htmlPrice -eq $csvRegPrices[$i]){'MATCH'}else{"MISMATCH: HTML='$htmlPrice' CSV='$($csvRegPrices[$i])'"}
        $memberMatch = if($htmlMember -eq $csvMemPrices[$i]){'MATCH'}else{"MISMATCH: HTML='$htmlMember' CSV='$($csvMemPrices[$i])'"}
        $linkMatch = if($htmlLink -eq $csvLinks[$i].Trim()){'MATCH'}else{"MISMATCH: HTML='$htmlLink' CSV='$($csvLinks[$i].Trim())'"}
        
        $status = 'OK'
        if($planMatch -ne 'MATCH' -or $priceMatch -ne 'MATCH' -or $memberMatch -ne 'MATCH' -or $linkMatch -ne 'MATCH'){
            $status = 'ERROR'
        }
        
        Write-Host "  Plan: $planMatch" -ForegroundColor $(if($planMatch -eq 'MATCH'){'Green'}else{'Red'})
        Write-Host "  Price: $priceMatch" -ForegroundColor $(if($priceMatch -eq 'MATCH'){'Green'}else{'Red'})
        Write-Host "  Member: $memberMatch" -ForegroundColor $(if($memberMatch -eq 'MATCH'){'Green'}else{'Red'})
        Write-Host "  Link: $linkMatch" -ForegroundColor $(if($linkMatch -eq 'MATCH'){'Green'}else{'Red'})
        Write-Host ""
        
        $results += [PSCustomObject]@{
            File = $fileName
            Section = 'One-Time'
            Plan = $csvPlan.Trim()
            PlanStatus = $planMatch
            PriceStatus = $priceMatch
            MemberStatus = $memberMatch
            LinkStatus = $linkMatch
            Overall = $status
        }
        
        $i++
    }
    
    # Monthly plans
    Write-Host "MONTHLY PLANS:" -ForegroundColor Yellow
    $monthlyCsv = $csv | Where-Object { $_.Plan -match 'Monthly' -or $_.Plan -match 'Starter|Growth|Professional|Business' }
    $monthlyCsv = $csv[$oneTimeCount..($csv.Count-1)]
    $monthlyCount = $monthlyCsv.Count
    $monthlyHtmlPlans = $plans[$oneTimeCount..($plans.Count-1)]
    $monthlyHtmlPrices = $prices[$oneTimeCount..($prices.Count-1)]
    $monthlyHtmlMembers = $members[$oneTimeCount..($members.Count-1)]
    $monthlyHtmlLinks = $links[$oneTimeCount..($links.Count-1)]
    
    $i = 0
    foreach ($csvPlan in $monthlyCsv) {
        $htmlPlan = if($i -lt $monthlyHtmlPlans.Count){$monthlyHtmlPlans[$i]}else{'MISSING'}
        $htmlPrice = if($i -lt $monthlyHtmlPrices.Count){$monthlyHtmlPrices[$i]}else{'MISSING'}
        $htmlLink = if($i -lt $monthlyHtmlLinks.Count){$monthlyHtmlLinks[$i]}else{'MISSING'}
        
        $planMatch = if($htmlPlan -eq $csvPlan.Trim()){'MATCH'}else{"MISMATCH: HTML='$htmlPlan' CSV='$($csvPlan.Trim())'"}
        $priceMatch = if($htmlPrice -eq $csvRegPrices[$i + $oneTimeCount]){'MATCH'}else{"MISMATCH: HTML='$htmlPrice' CSV='$($csvRegPrices[$i + $oneTimeCount])'"}
        $linkMatch = if($htmlLink -eq $csvLinks[$i + $oneTimeCount].Trim()){'MATCH'}else{"MISMATCH: HTML='$htmlLink' CSV='$($csvLinks[$i + $oneTimeCount].Trim())'"}
        
        $status = 'OK'
        if($planMatch -ne 'MATCH' -or $priceMatch -ne 'MATCH' -or $linkMatch -ne 'MATCH'){
            $status = 'ERROR'
        }
        
        Write-Host "  Plan: $planMatch" -ForegroundColor $(if($planMatch -eq 'MATCH'){'Green'}else{'Red'})
        Write-Host "  Price: $priceMatch" -ForegroundColor $(if($priceMatch -eq 'MATCH'){'Green'}else{'Red'})
        Write-Host "  Link: $linkMatch" -ForegroundColor $(if($linkMatch -eq 'MATCH'){'Green'}else{'Red'})
        Write-Host ""
        
        $results += [PSCustomObject]@{
            File = $fileName
            Section = 'Monthly'
            Plan = $csvPlan.Trim()
            PlanStatus = $planMatch
            PriceStatus = $priceMatch
            MemberStatus = 'N/A'
            LinkStatus = $linkMatch
            Overall = $status
        }
        
        $i++
    }
    
    Write-Host ""
}

Write-Host ""
Write-Host "========== SUMMARY ==========" -ForegroundColor Cyan
$errorCount = ($results | Where-Object { $_.Overall -eq 'ERROR' }).Count
$okCount = ($results | Where-Object { $_.Overall -eq 'OK' }).Count
Write-Host "Total checks: $($results.Count)"
Write-Host "Passed: $okCount" -ForegroundColor Green
Write-Host "Failed: $errorCount" -ForegroundColor $(if($errorCount -gt 0){'Red'}else{'Green'})

if($errorCount -gt 0){
    Write-Host ""
    Write-Host "ERRORS:" -ForegroundColor Red
    $results | Where-Object { $_.Overall -eq 'ERROR' } | ForEach-Object {
        Write-Host "  $($_.File) - $($_.Section) - $($_.Plan): $($_.PlanStatus) | $($_.PriceStatus) | $($_.LinkStatus)" -ForegroundColor Red
    }
}
