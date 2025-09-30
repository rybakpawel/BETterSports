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

6. Mappers
   Funkcje mapujące typy własne (domenowe) na generowane typy Prismy

7. Prisma
   Konfiguracja Prismy oraz schemat modeli bazy danych.

8. Public
   Pliki statyczne używane w aplikacji.

9. Styles
   Ustandaryzowane style zgodne z biblioteką MUI oraz design system.

10. Types
    Typy i interfejsy używane funkcjach biznesowych, core oraz walidatorach. // prawdopodobnie do usunięcia

11. Validation
    Funkcje walidacyjne wspólne (używane po stronie front-endu i w metodach biznesowych) oraz serwerowe (używane tylko w metodach biznesowych).

Workflow

1. Warstwa kliencka z form-hook i zastosowanymi walidatorami 'common'
2. API jako konektor pomiędzy logiką biznesową, a klientem
3. Funkcje biznesowe
4.
5.
6.
