<?php

// File name

$filename = '';


if (isset($_FILES['file']['name']) && !empty($_FILES['file']['name'])) {
    $filename = $_FILES['file']['name'];

}
error_log('>>>>><my file'.$filename);

// Valid file extensions
$valid_extensions = array('jpg','jpeg','png',);

// File extension
$extension = pathinfo($filename, PATHINFO_EXTENSION);

// Check extension
if(in_array(strtolower($extension),$valid_extensions) ) {

// Upload file
    if(move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/'.$filename)){
        echo 1;
    }else{
        echo 0;
    }
}else{
    echo 0;
}

exit;
