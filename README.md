## Social media application for groundhoppers. In progress..

Structure

1. App
   Struktura Next.js do obsługi widoków oraz routingu.

2. Components
   Reużywalne komponenty front-endowe.

3. Core
   Najniższa warstwa architektury, która udostępnia swoje API wyższym rzędom oraz operuje tylko i wyłącznie bezpośrednio na tabelach.

4. Helpers
   Reużywalne funkcje pomocnicze.

5. Logic
   Funkcje obsługujące logikę biznesową. Moga być używane bezpośrednio w komponentach serwerowych lub w route API.

6. Prisma
   Konfiguracja Prismy oraz schemat modeli bazy danych.

7. Public
   Pliki statyczne używane w aplikacji.

8. Styles
   Ustandaryzowane style zgodne z biblioteką MUI oraz design system.

9. Types
   Typy i interfejsy używane funkcjach biznesowych, core oraz walidatorach.

10. Validation
    Funkcje walidacyjne wspólne (używane po stronie front-endu i w metodach biznesowych) oraz serwerowe (używane tylko w metodach biznesowych).
