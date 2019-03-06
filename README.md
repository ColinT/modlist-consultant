# Modlist Consultant
A web tool and API for checking mod compatibility with the [Rimworld Multiplayer Mod](https://github.com/Zetrith/Multiplayer) by [Zetrith](https://github.com/Zetrith).

##### Table of Contents  
[Usage](#usage)  
[Running Locally](#running-locally)  
[Contributing](#contributing)  
[Resources](#resources)  
[Contact](#contact)

## Usage
[User website](https://modlist-consultant.herokuapp.com/consult/consult.html) <-- Click here to use the tool!

To use the API:
`curl -d "@/path/to/ModsConfig.xml" -H "Content-Type: text/xml" -X POST https://modlist-consultant.herokuapp.com/consult`

Accepts `application/xml` or `text/xml`

Returns `application/json` in the format:
```ts
interface ResponseFormat {
  [steamId: string]: {
    steamId: string                  // The steamID of the mod
    modName: string                  // The name of the mod
    compatibility: CompatibilityType // Level of compatibility (enum)
  }
}

enum  Compatibility {
  Unknown, // (0) Compatibility for this mod is not tested
  No,      // (1) Not compatible
  Minor,   // (2) Some features working
  Major,   // (3) Most features working
  Full,    // (4) All features working
}
```
## Running Locally
You can host your own server at `http://localhost:3000` with the following steps.

### 1. Setup your .env
The .env file contains private credentials that cannot be shared on a repository. You will have to create a set of credentials for yourself. It has the following format
```env
G_SPREADSHEET_ID='<spreadsheetID>' # This should be 1jaDxV8F7bcz4E9zeIRmZGKuaX7d0kvWWq28aKckISaY
G_SPREADSHEET_CREDENTIALS='<secretKey>' # Stringified JSON of your Google Service Account Key
```
You must provide a [Google service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts) for two-legged OAuth2 with the Google Spreadsheets API. You can create one for free with usage limits.

### 2. Build and run the server
Install the dependencies. This will automatically build the project.
```
npm i
```
Then run the project.
```
npm start
```

To build the project manually without installing dependencies, use
```
npm run build
```
## Contributing
[Pull requests](https://github.com/ColinT/modlist-consultant/pulls) are welcome. Feel free to contact me if you would like some help.

## Resources
[Google spreadsheet data source](https://docs.google.com/spreadsheets/d/1jaDxV8F7bcz4E9zeIRmZGKuaX7d0kvWWq28aKckISaY) (Thank-you maintainers!)

[Rimworld Multiplayer Mod](https://github.com/Zetrith/Multiplayer) by [Zetrith](https://github.com/Zetrith)

[Rimworld Multiplayer Discord](https://discord.gg/S4bxXpv) You can find me here as ZenonX

## Contact
Please [file an issue](https://github.com/ColinT/modlist-consultant/issues), or contact me in the [Discord](https://discord.gg/S4bxXpv).