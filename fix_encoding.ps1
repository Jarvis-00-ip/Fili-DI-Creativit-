$files = Get-ChildItem "src/html/shop/candele/*.html"
foreach ($file in $files) {
    # Read as Windows-1252 or default to see if it fixes the interpretation?
    # No, if the bytes are already wrong, we must replace the wrong bytes/sequences.
    # Get-Content -Raw -Encoding UTF8 likely shows the garbled chars if it was written wrong.
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Replace common garbled sequences
    $newContent = $content.Replace('CreativitÃ', 'Creatività') `
                          .Replace('âœ¨', '✨') `
                          .Replace('â†', '←') `
                          .Replace('â‚¬', '€') `
                          .Replace('âœ‰ï¸', '✉️') `
                          .Replace('âœ‰', '✉️')

    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Fixed encoding in $($file.Name)"
    }
}
