import os

base_dir = r"assets\img"
src_dir = r"src"
root_dir = os.getcwd()

def get_image_mapping(base_path):
    # filename -> generic path relative to assets/img
    # actually we need full relative path from root or match by filename
    # Strategy: strict filename matching.
    # Map: "foo.jpg" -> "cateogry/foo.jpg"
    
    mapping = {}
    
    # We need to walk the CURRENT structure of assets/img
    for root, dirs, files in os.walk(base_path):
        for f in files:
            # Get path relative to assets/img
            rel_dir = os.path.relpath(root, base_path)
            if rel_dir == ".":
                # File is in root assets/img (shouldn't be many left if organized)
                rel_path = f
            else:
                rel_path = os.path.join(rel_dir, f).replace("\\", "/")
            
            mapping[f] = rel_path
            
    return mapping

def fix_and_update():
    img_map = get_image_mapping(base_dir)
    print(f"Found {len(img_map)} images to map.")
    
    # Files to process
    extensions = ['.html', '.css', '.js']
    
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, file)
                
                # 1. Read with encoding detection
                content = None
                encoding_used = "utf-8"
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except UnicodeDecodeError:
                    try:
                        with open(file_path, 'r', encoding='cp1252') as f:
                            content = f.read()
                        encoding_used = "cp1252"
                    except Exception as e:
                        print(f"FAILED to read {file_path}: {e}")
                        continue
                
                # 2. Update References
                new_content = content
                modified = False
                
                # Naive replace: find "assets/img/oldname.jpg" etc
                # We need to be careful not to double replace or replace partials
                # But since we are going from flat -> nested, strict filename match is tricky
                # User had `assets/img/foo.jpg`. We want `assets/img/category/foo.jpg`.
                # We also need to handle `../../assets/img/foo.jpg`.
                
                # Regex might be safer, but simple string replace of `assets/img/filename` works
                # IF the filename is unique.
                # Assuming filenames are unique enough or we rely on `assets/img/` prefix.
                
                for filename, new_rel_path in img_map.items():
                    # We look for the pattern: "assets/img/" + filename
                    # Note: old files had "assets/img/foo.jpg"
                    # We want to replace it with "assets/img/category/foo.jpg"
                    # But we MUST ensure we don't match if it's already "assets/img/category/foo.jpg" (idempotency)
                    
                    target = f"assets/img/{filename}"
                    replacement = f"assets/img/{new_rel_path}"
                    
                    if target == replacement:
                        continue
                        
                    if target in new_content:
                        new_content = new_content.replace(target, replacement)
                        modified = True
                        
                # 3. Write back as UTF-8
                if modified or encoding_used != "utf-8":
                     # Even if not modified by images, if we read as cp1252, we save as utf-8 to fix encoding
                     try:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {file} (from {encoding_used})")
                     except Exception as e:
                        print(f"Error writing {file_path}: {e}")

if __name__ == "__main__":
    fix_and_update()
