function Load-EnvFile {
    param (
        [string]$filePath
    )

    if (Test-Path $filePath) {
        Get-Content $filePath | ForEach-Object {
            if ($_ -and $_ -notmatch '^#') {
                $keyValue = $_ -split '='
                if ($keyValue.Length -eq 2) {
                    $envName = $keyValue[0].Trim()
                    $envValue = $keyValue[1].Trim()
                    [System.Environment]::SetEnvironmentVariable($envName, $envValue)
                }
            }
        }
    }
}

# Start Service Registry
Write-Output "Starting Service Registry..."
Load-EnvFile "service-registry\.env"
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "service-registry/app.js"
Start-Sleep -Seconds 5

# Start Auth Service
Write-Output "Starting Auth Service..."
Load-EnvFile "auth-service\.env"
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "auth-service/server.js"
Start-Sleep -Seconds 5

# Start API Service
Write-Output "Starting API Service..."
Load-EnvFile "api-service\.env"
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "api-service/server.js"
Start-Sleep -Seconds 5

# Start API Gateway
Write-Output "Starting API Gateway..."
Load-EnvFile "api-gateway\.env"
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "api-gateway/app.js"

# Start Web Frontend
Write-Output "Starting Web Frontend..."
Load-EnvFile "web-front\.env"
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run serve" -WorkingDirectory "web-front"

Write-Output "All services started."