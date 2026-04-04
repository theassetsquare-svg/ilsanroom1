#!/usr/bin/env python3
import sys
sys.path.insert(0, '/nix/store/fb6lfadl6w4k7fmxds7lks2jzvg9swlr-python3.11-pillow-10.2.0/lib/python3.11/site-packages')

from PIL import Image, ImageDraw, ImageFont

FONT_PATH = "/tmp/NotoSansKR-Black.otf"
WIDTH, HEIGHT = 1200, 1200
BG_COLOR = "#1a1a2e"
ACCENT = "#8B5CF6"
BAR_HEIGHT = 80

pages = [
    {"main": "신실장", "sub": "일산룸", "file": "og-home.png"},
    {"main": "신실장", "sub": "일산룸 초보자 가이드", "file": "og-guide.png"},
    {"main": "신실장", "sub": "일산룸 지역별 후기", "file": "og-review.png"},
]


def find_max_font_size(draw, text, font_path, max_width, max_size=500, min_size=20):
    for size in range(max_size, min_size, -2):
        font = ImageFont.truetype(font_path, size)
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        if tw <= max_width:
            return font, tw, bbox[3] - bbox[1]
    return ImageFont.truetype(font_path, min_size), 0, 0


def generate(page):
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Top bar
    draw.rectangle([0, 0, WIDTH, BAR_HEIGHT], fill=ACCENT)
    # Bottom bar
    draw.rectangle([0, HEIGHT - BAR_HEIGHT, WIDTH, HEIGHT], fill=ACCENT)

    # Decorative line below top bar
    draw.rectangle([0, BAR_HEIGHT, WIDTH, BAR_HEIGHT + 4], fill="#6D28D9")
    # Decorative line above bottom bar
    draw.rectangle([0, HEIGHT - BAR_HEIGHT - 4, WIDTH, HEIGHT - BAR_HEIGHT], fill="#6D28D9")

    target_width = int(WIDTH * 0.8)

    # Main text — 신실장 (HUGE)
    main_font, main_tw, main_th = find_max_font_size(
        draw, page["main"], FONT_PATH, target_width, max_size=500
    )

    # Sub text
    sub_font, sub_tw, sub_th = find_max_font_size(
        draw, page["sub"], FONT_PATH, target_width, max_size=160
    )

    # Vertical positioning: center both texts together
    total_h = main_th + sub_th + 40  # 40px gap
    start_y = (HEIGHT - total_h) // 2

    # Draw sub text (above main)
    sub_x = (WIDTH - sub_tw) // 2
    draw.text((sub_x, start_y), page["sub"], fill="#c4b5fd", font=sub_font)

    # Draw main text (big, centered)
    main_x = (WIDTH - main_tw) // 2
    main_y = start_y + sub_th + 40

    # Glow/shadow effect for main text
    for offset in [(3, 3), (-3, -3), (3, -3), (-3, 3), (0, 5)]:
        draw.text(
            (main_x + offset[0], main_y + offset[1]),
            page["main"],
            fill="#4C1D95",
            font=main_font,
        )

    draw.text((main_x, main_y), page["main"], fill="white", font=main_font)

    # Top bar text
    bar_font = ImageFont.truetype(FONT_PATH, 36)
    bar_text = "일산룸"
    bar_bbox = draw.textbbox((0, 0), bar_text, font=bar_font)
    bar_tw = bar_bbox[2] - bar_bbox[0]
    bar_th = bar_bbox[3] - bar_bbox[1]
    draw.text(
        ((WIDTH - bar_tw) // 2, (BAR_HEIGHT - bar_th) // 2 - 4),
        bar_text,
        fill="white",
        font=bar_font,
    )

    # Bottom bar — phone CTA
    bottom_text = "☎ 지금 바로 전화 예약"
    bottom_bbox = draw.textbbox((0, 0), bottom_text, font=bar_font)
    btw = bottom_bbox[2] - bottom_bbox[0]
    bth = bottom_bbox[3] - bottom_bbox[1]
    draw.text(
        ((WIDTH - btw) // 2, HEIGHT - BAR_HEIGHT + (BAR_HEIGHT - bth) // 2 - 4),
        bottom_text,
        fill="white",
        font=bar_font,
    )

    img.save(page["file"])
    print(f"Created: {page['file']} ({img.size[0]}x{img.size[1]})")


for p in pages:
    generate(p)

print("All OG images generated!")
