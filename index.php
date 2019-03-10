<html lang="en">
  <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <meta charset="UTF-8">
    <title>Consultant</title>
  </head>
  <body style="background-color: lightgray">
    <h1 align="center">Welcome to the Modlist Checker!</h1>
    <div>
      <span>Instructions! Upload <code>ModsConfig.xml</code> then hit the Check! button and get the results below!</span><br/><br/>
      <div class="input-group">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04">
            <label class="custom-file-label" for="inputGroupFile04">ModConfig.xml goes here!</label>
          </div>
          <div class="input-group-append">
            <button class="btn btn-outline-info" type="button" id="inputGroupFileAddon04" onclick="checkModList(inputGroupFile04)">Check!</button>
          </div>
      </div>
    </div>
    <div id="results"></div>
  </body>
  <script src="./consult.js"></script>
</html>