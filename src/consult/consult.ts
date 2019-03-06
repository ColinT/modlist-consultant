/**
 * Main function of modlist-consultant: Checks the spreadsheet for mod
 * compatibility based on an uploaded 'ModsConfig.xml'.
 */

import express = require('express');
const router = express.Router();

import xml2js = require('xml2js');
const parseString = xml2js.parseString;

const { promisify } = require('util');

// Pre-fetch spreadsheet since its reference is reusable
// @ts-ignore
import GoogleSpreadsheet = require('google-spreadsheet');
const credentials = JSON.parse(process.env.G_SPREADSHEET_CREDENTIALS as string);
const doc = new GoogleSpreadsheet(process.env.G_SPREADSHEET_ID);

enum Compatibility {
  Unknown,
  No,
  Minor,
  Major,
  Full
};

router.post('/', async (req, res) => {

  // Check request MIME type
  const acceptableTypes = ['application/xml', 'text/xml'];
  if (!req.headers['content-type'] || !acceptableTypes.includes(req.headers['content-type'])) {
    res.status(415).send('Unsupported Media Type: must be "application/xml" or "text/xml"');
    return;
  }
  if (!req.accepts('json')) {
    res.status(406).send('Not Acceptable');
    return;
  }

  // Parse XML into a JS Object
  const xmlObj = await new Promise<any>((resolve, reject) => {
    parseString(req.body, (error, result) => {
      if (!!error) reject(error);
      resolve(result);
    });
  });

  // Get all active mods
  const modIgnore = ['Core', 'Multiplayer']; // Mods to ignore
  const activeModSteamIds: string[] = xmlObj.ModsConfigData.activeMods[0].li
    .filter((id: string) => !modIgnore.includes(id));

  // Initialize google spreadsheet auth and sanity check metadata
  await promisify(doc.useServiceAccountAuth)(credentials); // Authenticate with service account; The sheet is not published to the web (requires OAuth)
  const info = await promisify(doc.getInfo)();
  console.log(`Loaded doc: ` + info.title + ` by ` + info.author.email)
  const sheet = info.worksheets[0]
  console.log(
    `sheet 1: ` + sheet.title + ` ` + sheet.rowCount + `x` + sheet.colCount
  );

  // Grab every mod steam id on the sheet so we can search through it
  // TODO combine requests
  // steam ids are in C3:C${sheet.rowCount}
  const steamIdCells = await promisify(sheet.getCells)({'min-row': 3, 'max-row': sheet.rowCount, 'min-col': 3, 'max-col': 3});
  // mod names are in B3:B${sheet.rowCount}
  const modNameCells = await promisify(sheet.getCells)({'min-row': 3, 'max-row': sheet.rowCount, 'min-col': 2, 'max-col': 2});
  // compatibility status are in A3:A${sheet.rowCount}
  const compatibilityCells = await promisify(sheet.getCells)({'min-row': 3, 'max-row': sheet.rowCount, 'min-col': 1, 'max-col': 1});
  
  // Construct the response value and send it
  // TODO optimize search algorithm with sorted copies to reduce lookup complexity
  const compatibilityDictionary: {[steamId: string]: { steamId: string, modName: string, compatibility: Compatibility }}
  = activeModSteamIds.reduce((accumulator, steamId) => {
    // For each activeModSteamId, check if there is a listing from the spreadsheet
    let compatibility = Compatibility.Unknown; // Default to unknown
    let modName = 'Not found';
    for (const cell of steamIdCells) {
      if (cell.value === steamId) {
        compatibility = compatibilityCells[cell.row-3].value;
        modName = modNameCells[cell.row-3].value;
      }
    }
    return {...accumulator, [steamId]: {steamId, modName, compatibility}};
  }, {});
  res.status(200).type('application/json').send(compatibilityDictionary);
  return;
});

module.exports = router;