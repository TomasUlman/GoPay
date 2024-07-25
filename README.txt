Testování platební brány GoPay

Popis:
Projekt "Testování platební brány GoPay" je nástroj pro testování různých funkcionalit platební brány GoPay na localhost serveru. Tento projekt umožňuje simulovat různé platební operace, jak v testovacím, tak v produkčním prostředí.

Funkcionality: 
Vytvoření platby, Opakovaná platba, Předautorizovaná platba, Dotaz na stav platby, Refundace, Stržení opakované platby, Stržení předautorizované platby, Zrušení opakované platby, Zrušení předautorizované platby, Nastavení (ikona ozubeného kolečka): Otevře okno pro zadání credentials, přepnutí mezi testovacím a produkčním prostředím a validaci credentials.

Spuštění projektu: 
Projekt lze spustit souborem RUN.bat (gopay\payments-sdk-php\codes), který nejprve spustí php na localhost serveru port: 8000 (je tedy třeba doplnit v něm správnou cestu k souboru php.exe), poté otevře projekt v Google Chrome. Případně lze spustit jiným způsobem na localhostu.

Interakce s formulářem: 
Klikněte na tlačítko ve formuláři podle požadované operace (vytvoření platby, refundace, atd.). Podle id tlačítka se odešle formulář a vyvolá příslušný PHP skript.

Přesměrování: 
Po přesměrování bude odpověď API předána v URL parametru. Parametry budou zpracovány a zobrazena podstatná data.

Zdrojové kódy:
Zdrojové kódy se nacházejí v adresáři: gopay\payments-sdk-php\codes. 