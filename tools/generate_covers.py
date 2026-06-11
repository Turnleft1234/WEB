#!/usr/bin/env python3
"""Generate local bitmap cover art for the static site.

The script intentionally uses only the Python standard library so the project
can be rebuilt on a clean machine without downloading image dependencies.
"""

from __future__ import annotations

import math
import os
import random
import struct
import zlib

WIDTH = 640
HEIGHT = 400
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "assets", "covers")

# new-king-awakening.png and reign-of-terror.png are sourced from资料站 pages.


def clamp(value: float) -> int:
    return max(0, min(255, int(value)))


def mix(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(clamp(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_canvas(top: tuple[int, int, int], bottom: tuple[int, int, int], accent: tuple[int, int, int]) -> list[list[list[int]]]:
    rng = random.Random(sum(top) * 17 + sum(bottom) * 23 + sum(accent) * 31)
    rows: list[list[list[int]]] = []
    for y in range(HEIGHT):
        row: list[list[int]] = []
        fy = y / (HEIGHT - 1)
        base = mix(top, bottom, fy)
        for x in range(WIDTH):
            fx = x / (WIDTH - 1)
            glow = max(0.0, 1.0 - math.hypot(fx - 0.72, fy - 0.28) * 1.9)
            grain = rng.randint(-7, 7)
            color = mix(base, accent, glow * 0.36)
            row.append([clamp(color[0] + grain), clamp(color[1] + grain), clamp(color[2] + grain), 255])
        rows.append(row)
    return rows


def blend(canvas: list[list[list[int]]], x: int, y: int, color: tuple[int, int, int, int]) -> None:
    if not (0 <= x < WIDTH and 0 <= y < HEIGHT):
        return
    src_a = color[3] / 255
    dst = canvas[y][x]
    inv = 1 - src_a
    canvas[y][x] = [
        clamp(color[0] * src_a + dst[0] * inv),
        clamp(color[1] * src_a + dst[1] * inv),
        clamp(color[2] * src_a + dst[2] * inv),
        255,
    ]


def rect(canvas: list[list[list[int]]], x: int, y: int, w: int, h: int, color: tuple[int, int, int, int]) -> None:
    for yy in range(max(0, y), min(HEIGHT, y + h)):
        for xx in range(max(0, x), min(WIDTH, x + w)):
            blend(canvas, xx, yy, color)


def circle(canvas: list[list[list[int]]], cx: int, cy: int, radius: int, color: tuple[int, int, int, int]) -> None:
    r2 = radius * radius
    for y in range(max(0, cy - radius), min(HEIGHT, cy + radius + 1)):
        for x in range(max(0, cx - radius), min(WIDTH, cx + radius + 1)):
            if (x - cx) * (x - cx) + (y - cy) * (y - cy) <= r2:
                blend(canvas, x, y, color)


def line(canvas: list[list[list[int]]], x1: int, y1: int, x2: int, y2: int, width: int, color: tuple[int, int, int, int]) -> None:
    steps = max(abs(x2 - x1), abs(y2 - y1), 1)
    for step in range(steps + 1):
        t = step / steps
        x = round(x1 + (x2 - x1) * t)
        y = round(y1 + (y2 - y1) * t)
        circle(canvas, x, y, width, color)


def polygon(canvas: list[list[list[int]]], points: list[tuple[int, int]], color: tuple[int, int, int, int]) -> None:
    min_x = max(0, min(p[0] for p in points))
    max_x = min(WIDTH - 1, max(p[0] for p in points))
    min_y = max(0, min(p[1] for p in points))
    max_y = min(HEIGHT - 1, max(p[1] for p in points))
    for y in range(min_y, max_y + 1):
        intersections: list[float] = []
        for i, (x1, y1) in enumerate(points):
            x2, y2 = points[(i + 1) % len(points)]
            if (y1 <= y < y2) or (y2 <= y < y1):
                t = (y - y1) / (y2 - y1)
                intersections.append(x1 + (x2 - x1) * t)
        intersections.sort()
        for i in range(0, len(intersections), 2):
            if i + 1 >= len(intersections):
                continue
            start = max(min_x, math.ceil(intersections[i]))
            end = min(max_x, math.floor(intersections[i + 1]))
            for x in range(start, end + 1):
                blend(canvas, x, y, color)


def glow_circle(canvas: list[list[list[int]]], cx: int, cy: int, radius: int, color: tuple[int, int, int]) -> None:
    for r in range(radius, 2, -5):
        alpha = int(12 + 110 * (1 - r / radius))
        circle(canvas, cx, cy, r, (*color, alpha))


def sparkles(canvas: list[list[list[int]]], seed: int, color: tuple[int, int, int]) -> None:
    rng = random.Random(seed)
    for _ in range(58):
        x = rng.randint(24, WIDTH - 24)
        y = rng.randint(24, HEIGHT - 24)
        size = rng.randint(1, 4)
        alpha = rng.randint(85, 170)
        line(canvas, x - size, y, x + size, y, 1, (*color, alpha))
        line(canvas, x, y - size, x, y + size, 1, (*color, alpha))


def loot_forge() -> list[list[list[int]]]:
    c = make_canvas((35, 43, 54), (13, 17, 25), (232, 92, 59))
    glow_circle(c, 420, 122, 148, (244, 156, 59))
    polygon(c, [(54, 338), (228, 252), (608, 320), (548, 386), (110, 386)], (8, 12, 20, 180))
    rect(c, 260, 220, 122, 24, (32, 40, 49, 240))
    polygon(c, [(292, 176), (354, 176), (384, 220), (250, 220)], (69, 76, 85, 245))
    rect(c, 304, 244, 34, 92, (46, 51, 61, 255))
    polygon(c, [(238, 334), (412, 334), (456, 370), (194, 370)], (20, 26, 34, 235))
    for x, y, w, h, col in [
        (138, 150, 70, 96, (80, 199, 210, 230)),
        (455, 170, 74, 100, (229, 72, 89, 230)),
        (384, 116, 56, 78, (243, 190, 82, 230)),
    ]:
        rect(c, x, y, w, h, (255, 255, 255, 28))
        rect(c, x + 7, y + 7, w - 14, h - 14, col)
        rect(c, x + 14, y + 18, w - 28, 8, (255, 255, 255, 80))
    for i in range(16):
        circle(c, 92 + i * 18, 334 + (i % 3) * 7, 9, (236, 186, 69, 220))
    sparkles(c, 11, (255, 219, 126))
    return c


def starfall_raid() -> list[list[list[int]]]:
    c = make_canvas((9, 16, 37), (20, 28, 48), (82, 201, 196))
    glow_circle(c, 470, 116, 168, (88, 198, 230))
    for cx, cy, r in [(112, 84, 22), (210, 58, 10), (514, 262, 18), (92, 268, 14)]:
        circle(c, cx, cy, r, (255, 255, 255, 28))
        circle(c, cx, cy, max(2, r // 3), (255, 255, 255, 130))
    polygon(c, [(266, 202), (404, 150), (508, 215), (396, 248)], (211, 224, 230, 238))
    polygon(c, [(366, 155), (452, 103), (436, 182)], (91, 119, 156, 230))
    polygon(c, [(312, 206), (236, 236), (280, 250)], (246, 95, 86, 220))
    line(c, 250, 230, 84, 322, 4, (255, 166, 74, 170))
    line(c, 448, 120, 554, 68, 3, (125, 229, 218, 160))
    for x, y in [(140, 300), (176, 324), (214, 306), (534, 300)]:
        polygon(c, [(x - 24, y), (x, y - 20), (x + 28, y), (x + 12, y + 24), (x - 20, y + 18)], (95, 89, 104, 235))
    sparkles(c, 22, (159, 240, 230))
    return c


def rootcraft() -> list[list[list[int]]]:
    c = make_canvas((30, 82, 71), (14, 41, 37), (233, 172, 69))
    glow_circle(c, 188, 112, 150, (247, 191, 92))
    polygon(c, [(0, 284), (172, 220), (326, 268), (478, 218), (640, 288), (640, 400), (0, 400)], (27, 67, 48, 245))
    for x, h in [(72, 130), (132, 180), (538, 158), (586, 118), (468, 144)]:
        rect(c, x, 190 - h // 2, 22, h, (58, 51, 42, 255))
        circle(c, x + 12, 176 - h // 2, 48, (52, 124, 82, 230))
        circle(c, x - 14, 198 - h // 2, 34, (44, 102, 71, 230))
    for x, y, r, col in [
        (270, 292, 30, (92, 188, 116)),
        (326, 268, 22, (227, 177, 73)),
        (376, 302, 28, (83, 169, 185)),
    ]:
        circle(c, x, y, r, (*col, 230))
        circle(c, x - 8, y - 8, r // 3, (255, 255, 255, 90))
    line(c, 430, 290, 506, 228, 7, (181, 114, 57, 230))
    polygon(c, [(498, 216), (548, 200), (530, 238)], (216, 222, 206, 235))
    sparkles(c, 33, (241, 205, 120))
    return c


def neon_crypt() -> list[list[list[int]]]:
    c = make_canvas((25, 21, 49), (9, 12, 25), (235, 63, 124))
    for i in range(10):
        y = 236 + i * 16
        line(c, 74 - i * 10, y, 574 + i * 10, y, 1, (90, 212, 220, 55))
    for x in range(96, 580, 64):
        line(c, x, 228, x - 92, 390, 1, (90, 212, 220, 48))
    glow_circle(c, 322, 174, 124, (237, 73, 140))
    polygon(c, [(250, 94), (396, 94), (434, 248), (214, 248)], (20, 25, 42, 232))
    rect(c, 282, 126, 82, 122, (54, 34, 77, 242))
    circle(c, 322, 186, 56, (236, 76, 145, 150))
    circle(c, 322, 186, 30, (82, 219, 214, 140))
    for x, y in [(176, 250), (446, 270), (238, 306), (394, 326)]:
        rect(c, x, y, 54, 38, (82, 219, 214, 95))
        rect(c, x + 7, y + 7, 40, 24, (236, 76, 145, 140))
    sparkles(c, 44, (255, 132, 184))
    return c


def mech_hunt() -> list[list[list[int]]]:
    c = make_canvas((57, 64, 75), (22, 27, 33), (226, 83, 62))
    polygon(c, [(0, 294), (128, 252), (242, 286), (358, 244), (516, 280), (640, 238), (640, 400), (0, 400)], (28, 33, 39, 245))
    glow_circle(c, 458, 120, 146, (226, 88, 62))
    rect(c, 288, 122, 92, 98, (35, 43, 51, 248))
    rect(c, 262, 208, 144, 38, (46, 55, 64, 248))
    rect(c, 284, 246, 28, 86, (39, 47, 57, 248))
    rect(c, 356, 246, 28, 86, (39, 47, 57, 248))
    line(c, 278, 154, 188, 108, 8, (46, 55, 64, 248))
    line(c, 392, 154, 502, 96, 8, (46, 55, 64, 248))
    circle(c, 332, 162, 25, (91, 206, 209, 175))
    line(c, 502, 96, 596, 74, 3, (255, 187, 73, 195))
    for x, y in [(174, 322), (448, 302), (520, 334)]:
        rect(c, x, y, 54, 32, (202, 154, 74, 225))
        circle(c, x + 14, y + 30, 8, (17, 21, 26, 240))
        circle(c, x + 42, y + 30, 8, (17, 21, 26, 240))
    sparkles(c, 55, (255, 175, 90))
    return c


def relic_farm() -> list[list[list[int]]]:
    c = make_canvas((92, 119, 103), (38, 61, 56), (218, 172, 66))
    glow_circle(c, 498, 92, 132, (244, 205, 104))
    polygon(c, [(0, 236), (152, 202), (326, 228), (484, 194), (640, 224), (640, 400), (0, 400)], (62, 102, 73, 238))
    for i in range(7):
        y = 254 + i * 22
        line(c, 38, y, 602, y - 18, 2, (227, 188, 91, 80))
    for x, y in [(164, 288), (246, 262), (424, 274), (506, 246)]:
        polygon(c, [(x, y - 32), (x + 34, y), (x, y + 34), (x - 34, y)], (218, 175, 77, 220))
        circle(c, x, y, 14, (92, 213, 186, 140))
    rect(c, 284, 146, 76, 100, (116, 100, 82, 230))
    polygon(c, [(248, 148), (396, 148), (360, 116), (284, 116)], (154, 136, 103, 235))
    rect(c, 314, 184, 18, 62, (42, 50, 48, 230))
    sparkles(c, 66, (251, 219, 141))
    return c


def community_cache() -> list[list[list[int]]]:
    c = make_canvas((35, 48, 63), (19, 27, 36), (118, 198, 143))
    rect(c, 96, 78, 448, 250, (232, 237, 224, 230))
    rect(c, 118, 100, 404, 206, (52, 66, 77, 255))
    for x, y, col in [
        (148, 128, (235, 87, 87)),
        (276, 126, (80, 202, 196)),
        (400, 132, (238, 184, 75)),
        (190, 222, (126, 119, 220)),
        (354, 222, (88, 170, 111)),
    ]:
        rect(c, x, y, 92, 64, (*col, 230))
        circle(c, x + 12, y + 12, 5, (255, 255, 255, 170))
        line(c, x + 20, y + 24, x + 76, y + 24, 2, (255, 255, 255, 88))
        line(c, x + 20, y + 40, x + 62, y + 40, 2, (255, 255, 255, 70))
    line(c, 100, 78, 544, 328, 2, (255, 255, 255, 42))
    sparkles(c, 77, (192, 240, 207))
    return c


def write_png(path: str, canvas: list[list[list[int]]]) -> None:
    raw = b"".join(b"\x00" + b"".join(bytes(pixel) for pixel in row) for row in canvas)

    def chunk(name: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + name + data + struct.pack(">I", zlib.crc32(name + data) & 0xFFFFFFFF)

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", WIDTH, HEIGHT, 8, 6, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(raw, 9))
    png += chunk(b"IEND", b"")
    with open(path, "wb") as handle:
        handle.write(png)


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    covers = {
        "loot-forge.png": loot_forge(),
        "starfall-raid.png": starfall_raid(),
        "rootcraft.png": rootcraft(),
        "neon-crypt.png": neon_crypt(),
        "mech-hunt.png": mech_hunt(),
        "relic-farm.png": relic_farm(),
        "community-cache.png": community_cache(),
    }
    for filename, canvas in covers.items():
        write_png(os.path.join(OUT_DIR, filename), canvas)
        print(f"generated assets/covers/{filename}")


if __name__ == "__main__":
    main()
