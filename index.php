<?php
    require_once "./config/config.php";
?>
<html lang="en">
  <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
      <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
    <meta charset="UTF-8">
    <title>ModConsultant</title>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Mod Consultant</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <a class="nav-item nav-link active" href="#">Mod Check <span class="sr-only">(current)</span></a>
                  <a class="nav-item nav-link" href="#">ModList Check</a>
                  <a class="nav-item nav-link" href="#">Browse Database</a>
                  <a class="nav-item nav-link" href="links.html">Useful Links</a>
                </div>
            </div>
        </nav>
  </head>
  <body style="background-color: lightgray">
    <h1 align="center">Welcome to the Modlist Checker!</h1>
      
    
      <div>
        <table id="modTable" class="table-striped" style="width:100%">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Mod Name</th>
                    <th>Steam Id</th>
                    <th>Tags</th>
                    <th>Notes</th>
                </tr>
            </thead>
           <?php
                $conn = new mysqli(Config::$dbHost, Config::$dbUser, Config::$dbPass, Config::$db);
            
                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }
                
                $sql = "SELECT * FROM Modlist";

                $result = $conn->query($sql);

                 while($row = mysqli_fetch_array($result))
                 {
                    echo "<tr>";
                     $cur = $row['Status'];
                        switch ($cur) {
                            case "0":
                                echo "<td><i class='fas fa-question'></i></td>";
                            case "1":
                                echo "<td><i class='fas fa-radiation'></i></td>";
                            case "2":
                                echo "<td><i class='fas fa-exclamation-triangle'></i></td>";
                            case "3":
                                echo "<td><i class='fas fa-exclamation'></i></td>";
                            case "4":
                                echo "<td><i class='fas fa-check'></i></td>";
                        }
                        echo "<td>" . $row['Mod name'] . "</td>";
                        echo "<td>" . $row['Steam id'] . "</td>";
                        echo "<td>" . $row['Tags'] . "</td>";
                        echo "<td>" . $row['Notes'] . "</td>";
                    echo "</tr>";
                 }
                echo "</table>";

                mysqli_close($conn);
            ?>
        </table>
      </div>
  </body>
  <script src="./consult.js"></script>
    <script src="js/main.js"></script>
</html>