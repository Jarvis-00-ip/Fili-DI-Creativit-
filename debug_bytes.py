
path = "src/html/bouquet-story.html"
with open(path, "rb") as f:
    data = f.read()

# Find "Pi" followed by something
index = data.find(b"Pi")
if index != -1:
    print(f"Bytes around 'Pi': {data[index:index+10].hex(' ')}")
else:
    print("Could not find 'Pi'")
