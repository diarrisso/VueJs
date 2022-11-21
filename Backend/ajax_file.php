<?php

// File name

$filename ='';




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

    error_log('la size est :'.$file_size);
    error_log('la size est :'.$file_tmp);
    error_log('la size est :'.$image);
    error_log('la size est :'.$file_type);

    list( $width, $height , $file_type ) = getimagesize($file_tmp);
    error_log('image file'.$height);
    error_log('image file'.$width);

    $max_width=576;
    $max_height= 768;
    $quality = 10;

// Content type
    header('Content-Type: image/jpeg');
    # taller
    if ($height > $max_height) {
        $width = ($max_height / $height) * $width;
        $new_height = $max_height;
    }

    # wider
    if ($width > $max_width) {
        $height = ($max_width / $width) * $height;
        $new_width = $max_width;
    }

    switch ($file_type)
    {
        case 1: $im3 = imagecreatefrompng($file_tmp); break;
        case 2: $im3 = imagecreatefromjpeg($file_tmp);  break;
        default: return '';  break;
    }


    // Redimensionnement
    $image_p = imagecreatetruecolor($new_width, $new_height);
    imagecopyresampled($image_p, $im3, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

    // Affichage
    imagejpeg($image_p, null, 100);


    $imgResized = imagescale($im3 , $width, $height );
    error_log('IMAGSCAL RETOUR :  VALUE'.$imgResized );
    error_log('la largeur actuel de image '.$width);
    imagejpeg($imgResized, 'simplex.jpg', $quality);

     $dbh = getConnection();
     if ($dbh) {
         //$Base_64 = base64_encode(imagejpeg($imgResized, 'simplex.jpg'));
         $stmt = $dbh->prepare("INSERT INTO Blog.image ( image.file)  VALUES ('')");
         $stmt->execute();
     }
    imagedestroy($im3);
    imagedestroy($imgResized);


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
$max_height;

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
