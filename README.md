# SIMPLO - zadání pro FE developera

Vytvořte ve [Vue.js](https://vuejs.org) jednoduchou SPA, která bude sloužit jako administrace. Aplikace bude obsahovat základní správu zákazníků a zákaznických skupin. Navržené rozhraní by mělo být založeno na [CRUD](https://www.codecademy.com/articles/what-is-crud) paradigmatu pro entity a používat JSON pro výměnu dat. Může se hodit [json-server](https://github.com/typicode/json-server). Data pro "API" by tedy také měla být uchovávána ve formě JSONu a aplikace requesty provádět asynchronně. O stav aplikace se bude starat knihovna [Vuex/Pinia](https://vuex.vuejs.org/) a o navigaci [Vue Router](https://router.vuejs.org)

Aplikace se bude skládat z následujících entit:

### Customer

Konkrétní zákazník. Pro tuto entitu vytvořte UI dle CRUD paradigmatu. Atributy zvolte dle libosti. Zákazník může patřit do 0-N zákaznických skupin. Detail není nutný, pokud budou všechna data editovatelná.

### CustomerGroup

Zákaznická skupina. Pro tuto entitu samostatné rozhraní vytvářet nemusíte.
Stačí, když si data předem nachystáte.

## Požadavky na funkcionalitu

 - Pro zákazníky vytvořte výpis ve formě tabulky, ve které půjde dynamicky vyhledávat.
 - Vhodným způsobem zajistěte, aby šlo zákazníka přiřadit do 0-N zákaznických skupin.
 - Pro komunikaci s "API" je nutné vytvořit service pro každou entitu.
 - Vstupy pro vytvoření/editaci entity musí být validovány, například pomocí knihovny [Vuelidate](https://vuelidate.js.org).

### Pro bonusové body

 - Použijte komponentovou knihovnu [Vuetify](https://vuetifyjs.com/en/). V tomto případě ovšem využijte validaci pomocí Vuetify.
 - Vytvořte rozhraní pro zákaznické skupiny.
 - Vytvořte model pro obě entity.
