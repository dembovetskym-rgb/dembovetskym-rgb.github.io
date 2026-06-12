#!/usr/bin/env python3
"""Обновляет data/rating.json из страницы организации в Яндекс Картах."""

import json
import re
import urllib.request
from datetime import date
from pathlib import Path

ORG_URL = "https://yandex.by/maps/org/peskostruy/58582240539/"
OUT = Path(__file__).resolve().parent.parent / "data" / "rating.json"


def fetch_rating():
    req = urllib.request.Request(ORG_URL, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=20).read().decode("utf-8", errors="ignore")

    rating_match = re.search(r'ratingValue" content="([\d.]+)', html)
    reviews_match = re.search(r'reviewCount" content="(\d+)"', html)

    if not rating_match:
        raise RuntimeError("Не удалось найти рейтинг на странице Яндекс Карт")

    data = {
        "rating": float(rating_match.group(1)),
        "reviews": int(reviews_match.group(1)) if reviews_match else 0,
        "source": ORG_URL,
        "updated": date.today().isoformat(),
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Сохранено: рейтинг {data['rating']}, отзывов {data['reviews']}")


if __name__ == "__main__":
    fetch_rating()
