<?php

// File name

$filename = '';


if (isset($_FILES['file']['name']) && !empty($_FILES['file']['name'])) {
    $image = $_FILES['file']['name'];
    $file_name = $_FILES['file']['name'];
    $file_size = $_FILES['file']['size'];
    $file_tmp = $_FILES['file']['tmp_name'];
    $file_type = $_FILES['file']['type'];

    $servername = 'localhost:3306';
    $username = 'root';
    $password = 'root';
    $dbname = 'vujs';


    error_log('>>>>><my file 1'.$image);
     $dbh = getConnection();
     if ($dbh) {
         $Base_64 = base64_encode($file_name);
         $stmt = $dbh->prepare("INSERT INTO Blog.image ( image.file)  VALUES ('$Base_64')");
         $stmt->execute();
     }



// Valid file extensions
    $valid_extensions = array('jpg','jpeg','png',);

// File extension
    $extension = pathinfo($filename, PATHINFO_EXTENSION);

// Check extension
    /*if(in_array(strtolower($extension),$valid_extensions) ) {
        $image = $_FILES['file']['name'];
        $image_temp =$_FILES['file']['tmp_name'];
        $target='/Applications/XAMPP/xamppfiles/htdocs/FormVue/uploads/'.basename($_FILES['file']['name']);
        error_log('>>>>><my file 2'.$image);
        $destination = $_SERVER['DOCUMENT_ROOT'].'/FormVue/uploads/' . $image_temp;
        $res = move_uploaded_file($image_temp, $destination);*/

        // Upload file
        /* if(move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/'.$filename)){*/
        /*if (move_uploaded_file($image_temp, "$target") ){*/
        /*if ($res) {
            echo 1;
        } else{
            echo 'errer;';
            error_log('>>>>><my file 3'.$image);
        }
    }*/
}
exit;

/**
 * @return PDO
 */
function getConnection()
{


    $servername = 'localhost:3306';
    $username = 'root';
    $password = 'root';
    $options = [
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false
    ];

    try {
        $conn = new PDO("mysql:host=$servername;dbname=Blog", $username, $password, $options);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //echo "Connected successfully";
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
    return $conn;

}
