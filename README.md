# PokeApi (За основу взято https://pokeapi.co/)

!! Подключить MongoDB в папке config/keys.js

Обращение к API .../PokeApi/

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

.../sort?limit=20&offset=0 - Сортировка, принимает данные:
  type: [{ ... }] - сортировка по типу,
  name: String - сортировка по имени,
  (name of stat)Less: Number - сортировка по указанной статистике (меньше чем переданное число),
  (name of stat)More: Number - сортировка по указанной статистике (больше чем переданное число)
  
