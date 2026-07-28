# BT · Main — постановка экрана (V46)

**Экран:** Main / вкладка «Бриллиант»  
**Референс:** [`BT/Main/index.html`](index.html) · exploration [`mockups/home-variants.html`](../../mockups/home-variants.html) (только V46)

## Структура (сверху вниз)

| # | Блок | UIKit | Детали |
|---|------|-------|--------|
| A | Top bar | UINavigation-like custom | Avatar ~36pt; buttons search, folder, phone |
| B | Новости | `UICollectionView` horizontal | Контент из блока новостей, card ~210×280, title + CTA |
| C | Scroll FX | `scrollViewDidScroll` | **shrink-dim** (ниже) |
| D | Separator | UILabel + lines | Текст «Сервисы», hairline слева/справа |
| E | Categories | `UIStackView` / table | 12 баннеров, photo bg, chevron |
| F | Tab bar | `UITabBar` | 4 tabs; selected = diamond |

## Stories / Новости carousel

- Orientation: horizontal
- Card size (mockup CSS `.rail-default`): **~210 × 280** pt, corner radius **22**, gap **10**
- Content: image cover + bottom gradient + title + CTA (без бейджей разделов)
- Assets: `mockups/assets/stories/*.jpg` (6 шт.)
- Snap: выравнивание по центру фокуса при скролле (FX считается от центра viewport)

## Эффект `shrink-dim`

Для каждой ячейки:

```
dist = |index − focus|
t = min(1, dist / 1.65)
curve = t²
scale = max(0.58, 1 − 0.45 × curve)
opacity = max(0.55, 1 − 0.25 × curve)
brightness = max(0.35, 1 − 0.7 × curve)
```

Обновлять на каждом `scrollViewDidScroll`. Brightness — через overlay/`CIFilter` или затемняющий слой.

## Categories

- Layout: vertical stack (`.layout-hero-list`)
- Row height: **~62** pt
- Список: Акции, Авиабилеты, Рестораны, Отели, Привилегии, Визы, ВНЖ, Туры, Медицина, Страхование, Сервисы, Авто

## Темы

Dark / Light (фон экрана, текст, sep) — как в мокапе `.phone-dark` / `.phone-light`.

## Acceptance criteria

- [ ] Горизонтальный скролл сторис с видимым shrink-dim на соседних карточках
- [ ] Разделитель «Сервисы» между rail новостей и списком категорий
- [ ] 12 категорий тапабельны
- [ ] Dark и Light соответствуют мокапу
- [ ] Tab bar: активна вкладка привилегий (diamond)
