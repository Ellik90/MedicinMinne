MedicinMinnesAppen // MMA

# Medicinminnesappen

Det här är en mobilapplikation utvecklad med React Native för att hantera medicinering och medicinpåminnelser för användare och för anhöriga så flera parter kan känna sig bekväma vid en användares medicinintag!

## Bygga och köra projektet

1. Klona projektet från GitHub-repot: [https://github.com/Ellik90/MedicinMinne.git]

2. Installera alla projektets beroenden genom att köra följande kommando i terminalen: npm install 

3. Starta appen genom att köra: npm start eller npx expo start


Det kommer att öppna Expo Developer Tools i din webbläsare, och du kan starta appen på en Android- eller iOS-enhet/simulator genom att följa anvisningarna.

## Skärmar och navigering

- `Hem`: Startsida där användaren kan logga in eller registrera sig.
- `Registrering`: Skärm för att registrera en ny användare med personlig information.
- `Inloggning`: Skärm för att logga in med användarnamn och lösenord.
- `Användarsidan`: Huvudskärm efter inloggning med användarens information.
- `Fotobibliotek`: Skärm för att hantera användarens bilder.
- `MedicationInfoScreen`: Skärm för att visa medicininformation/ går ej att uppdatera medicin än.
- `MedicationNote`: Skärm för att visa en specifik medicinpåminnelse med ID.
- `Kamera`: Skärm för att ta och använda bilder för medicininformation.
- `Notiser`: Skärm för att visa en lista över aktiva medicinpåminnelser.

## Krav uppfyllda

- Implementerad navigering med React-native Navigation.
- Inloggning och registrering av användare.
- Ta bilder med enhetens kamera och använda dem i appen.
- Visning av medicininformation och medicinpåminnelser.
- extern modul Async-storage används för att spara och hantera data.
- Tar in ett web API från läkemedelsverket för att få medicininformation


## Krav för godkänt

1.[x]  Projektet använder minst 4 stycken RN-komponenter och minst 4 stycken Expo
komponenter.
2.[x] De utvalda komponenterna MÅSTE antecknas i README filen tillsammans med en
lista över genomförda krav.
3.[x] React Navigation används för att skapa en bättre upplevelse i appen.
4.[x] Git & GitHub har använts
5.[x] Projektmappen innehåller en README.md fil - (läs ovan för mer info)
6.[x] Uppgiften lämnas in i tid!
7.[x] Muntlig presentation är genomförd

## Krav för väl godkänt:

1.[x] Alla punkter för godkänt är uppfyllda
2.[x] Ytterligare en valfri extern modul används i projektet.
3.[x] Appen ska prata med ett Web-API för att hämta data.
4.[] Appen ska laseras på en Appstore (Deadline samma dag som kursen slutar) Kommer upp inom kort

## React-native komponenter 
- View
- Text
- TextInput
- TouchableOpacity
- StyleSheet
- FlatList
- Image
- Button
- ScrollView
- Pressable

## Expo komponenter
- Notifications
- ImagePicker
- Camera
- Picker
- Sms

## MappStruktur
Koden är uppdelad i olika mappar för att separera olika delar av funktionaliteten, tex Contexts, components, Screens, och Navigation. Detta gör det enklare att hitta specifik kod när du behöver göra ändringar.

