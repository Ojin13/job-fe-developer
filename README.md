# SIMPLO - zadání pro FE developera

Vytvořte jednoduchou webovou aplikaci, která bude sloužit jako administrace. Aplikace bude obsahovat základní správu zákazníků a zákaznických skupin.
Navržené rozhraní by mělo být založeno na [CRUD](https://www.codecademy.com/articles/what-is-crud) paradigmatu pro entity a používat JSON pro výměnu dat.

## Požadavky na funkcionalitu

### 📦 Entity
- **Customer** - hlavní entita s libovolnými atributy (např. jméno, e-mail, telefon, poznámka...).
                Pro tuto entitu vytvořte UI dle CRUD paradigmatu. Zákazník může patřit do 0-N zákaznických skupin.
                Detail není nutný, pokud budou všechna data editovatelná.
- **CustomerGroup** - skupina zákazníků. Pro tuto entitu samostatné rozhraní vytvářet nemusíte, stačí, když si data předem nachystáte.

### 🔧 Funkce
- Přehled zákazníků ve formě tabulky, s možností dynamického vyhledávání
- Vhodným způsobem zajistěte, aby šlo zákazníka přiřadit do 0-N zákaznických skupin
- Pro každou entitu vytvořte:
  - Service vrstvu pro komunikaci s API
  - Datový model

### ⚙️ Architektura
- Správa stavu aplikace pomocí knihovny [Pinia](https://pinia.vuejs.org/)
- Asynchronní komunikace s "backendem" pomocí REST API v JSON formátu
- Pro pojmenování css tříd využijte [BEM](https://getbem.com/introduction/)


## Varianty implementace

### Vue SPA
Vytvořte single-page aplikaci pomocí [Vue.js](https://vuejs.org) a [Vue Router](https://router.vuejs.org/). Pro simulovaný backend použijte [json-server](https://github.com/typicode/json-server)
a data uchovávejte v JSON formátu.

### Nuxt (SSR)
V případě, že ovládáte [Nuxt.js](https://nuxt.com), zvolte tuto variantu. Vytvořte aplikaci, která bude využívat SSR (server-side rendering)
a bude mít stejnou funkcionalitu. Simulovaný backend realizujte pomocí vlastního jednoduchého API v [Nuxt server routes](https://nuxt.com/docs/guide/directory-structure/server).
Pro ukládání dat na serveru použijte [`useStorage()`](https://nitro.build/guide/storage).


## 🎯 Pro bonusové body
 - Použijte TypeScript
 - Vytvořte rozhraní pro zákaznické skupiny
 - Přidejte validaci formulářů pomocí knihovny [VeeValidate](https://vee-validate.logaretm.com/v4/) a [Zod](https://zod.dev)
