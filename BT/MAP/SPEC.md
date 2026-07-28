# BT · MAP — постановка «привилегии рядом»

**Референс:** [`BT/MAP/index.html`](index.html) · exploration [`mockups/map-nearby.html`](../../mockups/map-nearby.html)

## Контекст

Вкладка сервисов / карта (в мокапе активен map). Карта показывает привилегии **рядом** (не лояльность/заказы). Рекомендуемый SDK: **Yandex MapKit**.

## Режимы

1. **Карта** (dark / light) — canvas + pins + chips + radius + bottom sheet
2. **Список** (dark / light) — тот же segment, список точек
3. **Selected pin** — акцент пина + карточка детали / CTA

## UI-блоки (разметка на light-телефонах)

### Карта
| Зона | Компонент |
|------|-----------|
| A | Top bar · segment · locate |
| B | Map · pins · cluster |
| C | Filter chips |
| D | Radius + bottom sheet |
| E | List row anatomy |
| F | Tab bar |

### Список
| Зона | Компонент |
|------|-----------|
| A | Top bar · segment (Список) |
| B | Meta «Рядом · 5 км» + город |
| C | Filter chips |
| D | Вертикальный список |
| E | Row: photo · name · км · address |
| F | Tab bar |

### Выбранный пин
| Зона | Компонент |
|------|-----------|
| A | Top bar · segment |
| B | Map + selected pin |
| C | Filter chips |
| D | Detail card |
| E | CTA |
| F | Tab bar |

## List row

- Слева: thumbnail
- Центр: title + subtitle (категория · км)
- Справа: address

## Acceptance criteria

- [ ] Segment переключает Карта ↔ Список
- [ ] Пины и cluster на карте; тап → selected state + card
- [ ] Фильтры chips сужают выдачу
- [ ] Dark / Light
- [ ] Sheet не перекрывает tab bar критично (безопасные отступы)
