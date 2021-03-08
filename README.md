# Lepšie NCZI formuláre pre očkovanie (a testovanie)


![Filled out](screenshots/www.old.korona.gov.sk_covid-19-vaccination-form.php(Laptop%20with%20MDPI%20screen)%20(1).png)


![Filled out](screenshots/www.old.korona.gov.sk_covid-19-vaccination-form.php(Laptop%20with%20MDPI%20screen).png)



![Filled out](screenshots/www.old.korona.gov.sk_covid-19-vaccination-form.php(Laptop%20with%20MDPI%20screen)%20(2).png)


# Development installation

- Pull repo
- Open `chrome://extensions`
- Enable development mode
- "Load unpacked"


# Build

```
web-ext build -i "README.md" -i "screenshots" --source-dir ./nczi-vakcinacia-extension --overwrite-dest --filename nczi-vakcinacia-extension-0.1.1.zip
```