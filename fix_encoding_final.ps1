$files = Get-ChildItem "src/html/shop/candele/*.html"

# Correct Unicode Characters
$u_agrava    = [string][char]0x00E0 # à
$u_sparkles  = [string][char]0x2728 # ✨
$u_arrow     = [string][char]0x2190 # ←
$u_euro      = [string][char]0x20AC # €
$u_envelope  = [string][char]0x2709 + [char]0xFE0F # ✉️

# Garbled Sequences (UTF-8 bytes interpreted as Windows-1252)
# ✨ = E2 9C A8 -> â œ ¨
$bad_sparkles = [string][char]0x00E2 + [char]0x009C + [char]0x00A8

# ← = E2 86 90 -> â † [90]
$bad_arrow = [string][char]0x00E2 + [char]0x0086 + [char]0x0090

# € = E2 82 AC -> â ‚ ¬
$bad_euro = [string][char]0x00E2 + [char]0x0082 + [char]0x00AC

# ✉️ = E2 9C 89 EF B8 8F -> â œ ‰ ï ¸ [8F]
$bad_envelope_full = [string][char]0x00E2 + [char]0x009C + [char]0x0089 + [char]0x00EF + [char]0x00B8 + [char]0x008F
$bad_envelope_short = [string][char]0x00E2 + [char]0x009C + [char]0x0089

foreach ($file in $files) {
    $path = $file.FullName
    $content = Get-Content $path -Raw -Encoding UTF8
    
    # 1. Fix "Creativit..."
    # We use regex to find "Creativit" followed by anything up to "<", closing tag, or newline
    # And replace with "Creatività"
    # Actually, simpler: replace "Creativit" + [char]0xC3 + [char]0xA0 (if it exists)
    # The view_file output showed "CreativitÃ".
    # Ã = C3. NBSP = A0.
    
    $bad_creativit = "Creativit" + [char]0x00C3 + [char]0x0083 # Wait, view_file showed Ã (C3 83 in UTF8, but viewed as C3).
    # If file is UTF8, and we read as UTF8, we get correct chars IF they are correct.
    # They are NOT correct. They are "Ã" (C3 83) followed by something.
    
    # Let's just use regex match "Creativit.{1,4}" to catch the garbage
    # Patterns like "Fili di Creativit..."
    $content = $content -replace "Fili\s+di\s+Creativit[^<]*", ("Fili di Creativit" + $u_agrava)

    # 2. Fix Symbols
    $content = $content.Replace($bad_sparkles, $u_sparkles)
    $content = $content.Replace($bad_arrow, $u_arrow)
    $content = $content.Replace($bad_euro, $u_euro)
    $content = $content.Replace($bad_envelope_full, $u_envelope)
    $content = $content.Replace($bad_envelope_short, $u_envelope)
    
    # Last fallback for single envelope char if needed (E2 9C 89)
    # Already covered by bad_envelope_short

    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Host "Processed $($file.Name)"
}
