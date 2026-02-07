$files = Get-ChildItem "src/html/shop/candele/*.html"

# Define garbled sequences based on UTF-8 bytes read as Windows-1252
$sparkles = [string][char]0x00E2 + [char]0x009C + [char]0x00A8 # âœ¨
$arrow = [string][char]0x00E2 + [char]0x0086 + [char]0x0090    # â†
$euro = [string][char]0x00E2 + [char]0x0082 + [char]0x00AC     # â‚¬
$bad_a = [string][char]0x00C3 + [char]0x00A0                    # Ã + NBSP (or similar)
$envelope_start = [string][char]0x00E2 + [char]0x009C + [char]0x0089 # âœ‰

foreach ($file in $files) {
    # Read file content
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Replace known artifacts
    # Use generic replacement for Creativit... to be safe
    $newContent = $content -replace "Creativit[^<]+", "Creatività"
    
    # Direct string replacements for symbols
    $newContent = $newContent.Replace($sparkles, "✨") `
                             .Replace($arrow, "←") `
                             .Replace($euro, "€") `
                             .Replace("âœ‰ï¸", "✉️") `
                             .Replace("âœ‰", "✉️")

    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Fixed $($file.Name)"
    }
}
