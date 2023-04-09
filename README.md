# Mind Map Creator

Это приложение помогает строить диаграммы, в которых
есть возможность детализации составных частей диаграмм.

Например, у нас есть диаграмма "Архитектура" внутри 
могут быть узлы MVC MVP MVVM и каждый узел может быть
ссылкой на независимую диаграмму, которая подробнее раскрывает тему узла

[Демо на Netlify](https://main--heroic-dragon-b8712a.netlify.app/demo)

# Составляющие диаграмм
## Типы

Типы в системе - это классы узлов диаграмм. Типы переносятся на диаграмму
путем перетаскивания на область либо двойным кликом. На диаграмму
можно добавлять множество узлов одного типа. Кнопка "Добавить тип"
создает новый тип с помощью модального окна создания типа, в которое
встроен SVG редактор.

## Объекты

Объекта - это экземпляры какого-то типа, представляющие конкретный
узел диаграммы. У объекта может быть описание, название и настройка
является ли объект ссылкой или нет.

## Связи

Между объектами диаграммы можно создавать связи, для создания связи
в левом нижнем углу есть кнопка сделать связь. После создания связи 
можно удалять связи в дровере настроек объекта.

## Дополнительные возможности
### Настройки диаграммы
### Диаграмма текстом
### Поиск
