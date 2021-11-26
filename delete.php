<?php 


    if(isset($_GET['file'])){
        unlink($_GET['file']);
        if(file_exists($_GET['file'])){
            unlink($_GET['file']);
            $msg = "Image Deleted Successfully";
        }else{
            $msg = "Image Doesn't Exist";
        }
        header('Location:index.php?message='.$msg);

    }
