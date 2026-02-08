from math import pow

def relative_luminance(r, g, b):
    r = r / 255
    g = g / 255
    b = b / 255

    r = r / 12.92 if r <= 0.03928 else pow((r + 0.055) / 1.055, 2.4)
    g = g / 12.92 if g <= 0.03928 else pow((g + 0.055) / 1.055, 2.4)
    b = b / 12.92 if b <= 0.03928 else pow((b + 0.055) / 1.055, 2.4)

    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast_ratio(color1, color2):
    lum1 = relative_luminance(*color1)
    lum2 = relative_luminance(*color2)

    lighter = max(lum1, lum2)
    darker = min(lum1, lum2)

    return (lighter + 0.05) / (darker + 0.05)

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

backgrounds = ['#ffffff', '#fce8f6']
text_colors = ['#120813', '#c45bd4', '#78278b', '#e8e1e9']

results = []
for bg in backgrounds:
    for text in text_colors:
        bg_rgb = hex_to_rgb(bg)
        text_rgb = hex_to_rgb(text)
        ratio = contrast_ratio(bg_rgb, text_rgb)
        results.append((bg, text, ratio))

        print(f"Background: {bg}, Text: {text}, Contrast Ratio: {ratio:.2f}")

        if ratio >= 7:
            print("Passes WCAG AAA for normal text")
        elif ratio >= 4.5:
            print("Passes WCAG AA for normal text and AAA for large text")
        else:
            print("Fails WCAG standards")

# Save results to a file
with open("contrast_results.txt", "w") as f:
    for bg, text, ratio in results:
        f.write(f"Background: {bg}, Text: {text}, Contrast Ratio: {ratio:.2f}\n")