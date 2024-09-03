$PortArray = 5000, 5001, 5002, 5003

foreach ($Port in $PortArray) {
    Write-Output "Find process on port $Port"
    $PortFound = $false

    try {
        $PIDPort = (Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue).OwningProcess   
        $ProcessNamePort = (Get-Process -ID $PIDPort -ErrorAction SilentlyContinue).ProcessName
        Write-Output "PID: $PIDPort"
        Write-Output "Process Name: $ProcessNamePort"
        $PortFound = $true
        if ($ProcessNamePort -eq "Idle") {
            Write-Output "Process on port $Port is idle"
        }
    } catch {
        Write-Output "There is not a process running on port $Port"
    }

    if ($PortFound) {
        try {
            $Response = Read-Host "Do you want to stop the process on Port $Port ? (y / n)"
            if ($Response -eq "y") {
                stop-process $PIDPort -ErrorAction SilentlyContinue
                Write-Output "Process on port $Port was stopped"
            }
        } catch {
            Write-Output "There was an error stopping process on port $Port"
        }
    }

    Write-Output ""
}

# Shortcut to kill port 123
# stop-process (Get-NetTCPConnection -LocalPort 123).OwningProcess 