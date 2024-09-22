function Stop-ProcessByName {
    param (
        [string]$processName,
        [ref]$stoppedProcesses
    )

    $processes = Get-Process -Name $processName -ErrorAction SilentlyContinue
    if ($processes) {
        $processes | ForEach-Object {
            if ($stoppedProcesses.Value -notcontains $_.Id) {
                Write-Output "Stopping process $($_.Name) with ID $($_.Id)..."
                Stop-Process -Id $_.Id -Force
                $stoppedProcesses.Value += $_.Id
            }
        }
    } else {
        Write-Output "No process named $processName found."
    }
}

$stoppedProcesses = @()

# Stop Service Registry
Write-Output "Stopping Service Registry..."
Stop-ProcessByName "node" ([ref]$stoppedProcesses)

# Stop Auth Service
Write-Output "Stopping Auth Service..."
Stop-ProcessByName "node" ([ref]$stoppedProcesses)

# Stop API Service
Write-Output "Stopping API Service..."
Stop-ProcessByName "node" ([ref]$stoppedProcesses)

# Stop API Gateway
Write-Output "Stopping API Gateway..."
Stop-ProcessByName "node" ([ref]$stoppedProcesses)

# Stop Web Frontend
Write-Output "Stopping Web Frontend..."
Stop-ProcessByName "npm" ([ref]$stoppedProcesses)

Write-Output "All services stopped."