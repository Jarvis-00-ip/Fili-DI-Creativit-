$files = Get-ChildItem "src/html/shop/candele/*.html"

# Safe Correct Chars
$u_agrava = [string][char]0x00E0
$u_sparkles = [string][char]0x2728
$u_arrow = [string][char]0x2190
$u_euro = [string][char]0x20AC
$u_envelope = [string][char]0x2709 + [char]0xFE0F

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Fix Creativita' (C3 A0 -> 00C3 00A0)
    $content = $content.Replace(("Creativit" + [char]0x00C3 + [char]0x00A0), ("Creativit" + $u_agrava))

    # Fix Sparkles (E2 9C A8 -> 00E2 0153 00A8)
    $bad_sparkles_1 = [string][char]0x00E2 + [char]0x0153 + [char]0x00A8 # Windows-1252 mapping
    $bad_sparkles_2 = [string][char]0x00E2 + [char]0x009C + [char]0x00A8 # Latin-1 mapping
    $content = $content.Replace($bad_sparkles_1, $u_sparkles).Replace($bad_sparkles_2, $u_sparkles)
    
    # Fix Arrow (E2 86 90 -> 00E2 2020 0090)
    $bad_arrow_1 = [string][char]0x00E2 + [char]0x2020 + [char]0x0090
    $bad_arrow_2 = [string][char]0x00E2 + [char]0x0086 + [char]0x0090
    $content = $content.Replace($bad_arrow_1, $u_arrow).Replace($bad_arrow_2, $u_arrow)

    # Fix Euro (E2 82 AC -> 00E2 201A 00AC)
    $bad_euro_1 = [string][char]0x00E2 + [char]0x201A + [char]0x00AC
    $bad_euro_2 = [string][char]0x00E2 + [char]0x0082 + [char]0x00AC
    $content = $content.Replace($bad_euro_1, $u_euro).Replace($bad_euro_2, $u_euro)
    
    # Fix Envelope (E2 9C 89 -> 00E2 0153 2030)
    # Also handle full E2 9C 89 EF B8 8F (Envelope + VS16)
    # EF B8 8F -> 00EF 00B8 008F (or 017D etc)
    # Since 8F is undefined in 1252, it maps to 008F usually
    $bad_env_1 = [string][char]0x00E2 + [char]0x0153 + [char]0x2030
    $bad_env_2 = [string][char]0x00E2 + [char]0x009C + [char]0x0089
    
    # Replace just the envelope part, leave the VS16 garbage or replace it too if we find it
    $content = $content.Replace($bad_env_1, $u_envelope).Replace($bad_env_2, $u_envelope)
    
    # Remove lingering VS16 garbage if it exists next to envelope (EF B8 8F)
    $vs16_garbage = [string][char]0x00EF + [char]0x00B8 + [char]0x008F
    $content = $content.Replace($vs16_garbage, "")

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Processed $($file.Name)"
}
