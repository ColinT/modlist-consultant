const input = document.querySelector('input');
if (!!input) {
  input.addEventListener('change', (event) => {
    if (!!input && !!input.files) {
      const file = input.files[0];
      // Read the file as plain text
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (event) => {
        if (!!event.target) {
          // Submit target result in XHR request
          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () { // Use non-arrow function for autobind
            if (this.readyState === 4 && this.status === 200) {
              document.querySelector('#results').innerHTML = convertJsonToHtmlTable(['steamId', 'modName', 'compatibility'], JSON.parse(xhr.responseText));
            }
          }
          // Find base url for different deployment environments
          const getUrl = window.location;
          const baseUrl = `${getUrl.protocol}//${getUrl.host}`;
          // Execute XHR request
          xhr.open('POST', `${baseUrl}/consult`);
          xhr.setRequestHeader('Content-Type', 'text/xml');
          xhr.send(event.target.result);
        }
      }
    }
  });
}

/**
 * Converts a json-like object into an HTML table
 * @param {string[]} keys The whitelisted keys to read from
 * @param {Object}   json The object to convert
 * @return {string}       HTML table as a string
 */
function convertJsonToHtmlTable(keys, json) {
  let table = '<table>';

  // Setup headers
  table += '<tr>';
  table += keys.reduce((accumulator, key) => accumulator + `<th>${key}</th>`, '');
  table += '</tr>';

  // Add a row for each item
  table += Object.values(json).reduce((accumulator, value) => accumulator + '<tr>' + keys.reduce((acc, key) => acc + `<td>${value[key] || ''}</td>`, '') + '</tr>', '');

  table += '</table>';
  return table;
}
