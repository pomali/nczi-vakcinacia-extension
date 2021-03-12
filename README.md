# Lepšie NCZI formuláre pre očkovanie (a testovanie)

<p float="left">
<img src="screenshots/www.old.korona.gov.sk_covid-19-vaccination-form.php(Laptop%20with%20MDPI%20screen)%20(1).png" alt="Page with saved forms" width="250"/>

<img src="screenshots/www.old.korona.gov.sk_covid-19-vaccination-form.php(Laptop%20with%20MDPI%20screen)%20(2).png" alt="Page with save button" width="250"/>

<img src="screenshots/www.old.korona.gov.sk_covid-19-vaccination-form.php(Laptop%20with%20MDPI%20screen).png" alt="Page without saved forms" width="250"/>
</p>

# Published browser extensions

- <a href="https://chrome.google.com/webstore/detail/lep%C5%A1ia-nczi-registr%C3%A1cia/fniphkhigniidpeeogcnmhgcnhfnajbo">🐶 Google Chrome</a>
- <a href="https://addons.mozilla.org/en-US/developers/addon/lep%C5%A1ia-nczi-registr%C3%A1cia" >🦊 Mozilla Firefox</a>
- <a href="https://microsoftedge.microsoft.com/addons/detail/lep%C5%A1ia-o%C4%8Dkovacia-registr%C3%A1/agmbbpgilciclhjhcnfbgooggahldlob">🐠 Microsoft Edge</a>

# About extension / O rozšírení (sk)

Rozšírenie pridáva možnosť uloženia údajov o osobách do korona.gov.sk (NCZI) formulárov.

Pri prihlasovaní na očkovanie alebo testovanie si viete predvyplniť formulár, uložiť osobu a nabudúce ju vyplniť automaticky.

Údaje sú ukladané iba na váš počítač, nie sú nikam odosielané.

Viete si ich kedykoľvek vymazať priamo vo formulári alebo odstránením rozšírenia.

Zdrojový kód: https://github.com/pomali/nczi-vakcinacia-extension

# Features

- Save & Load forms on old.korona.gov.sk (v0.1+)
- Autofills "calendar" search from url fragment (hash) (v0.2+)
- Better labels and some tips
- Button to refresh only calendar (v0.3+)

# Why?

Why this instead of general purpose autofill?

> - I was trying to create more integrated experience, like if my grandma had to use it ... 🤨
> - General purpose extensions have problem with some fields since, the form page, is not any good.
> - There are some other quick wins possible with custom extension (look at features 🙂)

# Development installation

- Pull repo or download [zip](https://github.com/pomali/nczi-vakcinacia-extension/archive/v0.1.1.zip) from releases
- Open `chrome://extensions`
- Enable development mode
- "Load unpacked"

# Build

```
web-ext build -i "README.md" -i "screenshots" --source-dir ./nczi-vakcinacia-extension --overwrite-dest --filename nczi-vakcinacia-extension-0.2.zip
```

# Talk to me

https://twitter.com/_pomali

# Refresh button

Aktualizácia údajov na pozadí by Slavoj SANTA Hruška
