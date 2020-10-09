# PokeApi (За основу взято https://pokeapi.co/)

!! Подключить MongoDB в папке config/keys.js

Обращение к API .../PokeApi/, 

Роуты:

- Обслуживание:

.../getAllPokemons - 
Создание в базе короткой информации о покемонах (id, name);
.../getPokemonsStats - 
Создание в базе полной информации о покемонах (id, name, types, hp,
attack, defense, specialAttack, specialDefense, speed);

- Получение информации:

.../getPokemonsData?limit=20&offset=0 - 
Получение краткоой информации о покемонах;
.../getStatOf/id?limit=20&offset=0 - 
Получение полной информации о покемонах;

- Сортировка:

.../sort - Сортировка, в body можно отправить (все фильтры отправлять в одном масиве):
  typeFilter: ["nameoftype"]
  statsFilter: {nameofstat: {from: number, to: number}}
  nameFilter: {name: "nameofpokemon"}
  
  где нужно подставить свои nameoftype - искаемый тип или типы покемонов, nameofstat - искаемый промежуток статистик покемона(можно ввести только значение from или to,
  nameofpokemon - поиск совпадений по имени.
  
