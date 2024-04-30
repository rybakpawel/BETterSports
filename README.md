## Social media application for groundhoppers. In progress..

Structure

1. Actions

    - business:
      Funkcje biznesowe wykorzystywane bezpośrednio w konkretnych endpointach. Mogą zawierać w sobie wiele walidacji oraz funkcji technicznych (core). // być może logika funkcji biznesowych będzie implementowana bezpośrednio w 'api/<nazwa-operacji-biznesowej>/route.ts' żeby nie powielać kolejnych warstw
    - core:
      Najniższa warstwa architektury, która udostępnia swoje api wyższym rzędom oraz operuje tylko i wyłącznie bezpośrednio na tabelach.
    - validation:
      Funkcje walidacyjne używane tylko w metodach biznesowych, przed operacjami technicznymi.
    - view
      Funkcje wykorzystywane na poziomie widoków. // zobaczymy czy zasadne będzie ich wydzielanie z widoków do osobnego katalogu

2. App
   Struktura Next.js do obsługi widoków oraz routingu.

3. Components
   Reużywalne komponenty front-endowe.

4. Prisma
   Konfiguracja Prismy oraz schemat modeli bazy danych.

5. Public
   Pliki statyczne używane w aplikacji.
