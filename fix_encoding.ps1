# fix.ps1

$baseDir = "assets\img"
$srcDir = "src"
$root = "c:\Users\Max\Documents\Fili-DI-Creativit-"
Set-Location $root

# Function to get mapping from current disk state
function Get-ImageMapping {
    $map = @{}
    $files = Get-ChildItem $baseDir -Recurse -File
    foreach ($f in $files) {
        # Calculate relative path from assets\img
        # $baseDir is assets\img
        # Full path: C:...\assets\img\cat\foo.jpg
        # Rel: cat\foo.jpg
        
        # We need URI style slashes for HTML
        $relPath = $f.FullName.Substring($((Get-Item $baseDir).FullName.Length + 1)).Replace("\", "/")
        $map[$f.Name] = $relPath
    }
    return $map
}

$imgMap = Get-ImageMapping
Write-Host "Found $($imgMap.Count) images."

$files = Get-ChildItem -Path $srcDir -Recurse -Include *.html, *.css, *.js
foreach ($file in $files) {
    # 1. Read content. 
    # Get-Content in PS 5.1 often faults to ANSI (Win-1252) or ASCII.
    # To detect, we can try reading as UTF8. 
    # Actually, simpler: Read as Default (ANSI/CP1252) usually works for legacy files.
    # But if it IS Utf-8, reading as ANSI breaks it (Ã©).
    
    # HEURISTIC:
    # Read as UTF-8. If it contains replacement character (U+FFFD), it might be ANSI.
    # BUT standard Get-Content -Encoding UTF8 might throw error or replace silently.
    
    # Best bet for mixed env:
    # Read as Byte array -> Try Decode UTF-8 -> If fail/invalid, Decode CP1252.
    
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $enc = [System.Text.Encoding]::UTF8
    $isUtf8 = $true
    
    try {
        # Check for BOM or validate
        # This preamble check is weak, let's just try to decode with Fallback that throws
        $utf8Throw = [System.Text.UTF8Encoding]::new($true, $true) # emit BOM, throw on invalid
        $content = $utf8Throw.GetString($bytes)
    }
    catch {
        $isUtf8 = $false
    }
    
    if (-not $isUtf8) {
        # Fallback to CP1252
        $cp1252 = [System.Text.Encoding]::GetEncoding(1252)
        $content = $cp1252.GetString($bytes)
        Write-Host "Detected ANSI/CP1252 for $($file.Name)"
    }
    
    $newContent = $content
    $modified = $false
    
    # 2. Update References
    foreach ($key in $imgMap.Keys) {
        $target = "assets/img/" + $key
        $replacement = "assets/img/" + $imgMap[$key]
        
        if ($target -eq $replacement) { continue }
        
        if ($newContent.Contains($target)) {
            $newContent = $newContent.Replace($target, $replacement)
            $modified = $true
        }
    }
    
    # 3. Save as UTF-8 (WITH BOM usually helping Windows apps, or NO BOM for web standard)
    # Standard web use: UTF-8 No BOM is best, but with meta charset utf-8, it's fine.
    # PowerShell 5.1 Set-Content -Encoding UTF8 adds BOM.
    # Use .NET to write UTF-8 without BOM if possible, or just standard UTF8.
    
    if ($modified -or (-not $isUtf8)) {
        # We write as UTF-8
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Saved $($file.Name) as UTF-8"
    }
}
