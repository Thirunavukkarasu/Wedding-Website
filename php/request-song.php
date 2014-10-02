<?php
include 'datalogin.php';
// check if fields passed are empty
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['album_name'])	        ||
   empty($_POST['song_name'])		||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$album_name = $_POST['album_name'];
$song_name = $_POST['song_name'];

$sql="INSERT INTO request_song".
     "(Name,Email_ID,Album_Name,Song_Name)".
     "VALUES ('$name','$email_address','$album_name','$song_name')";
mysql_select_db('anjuweds_srini');
$retval = mysql_query( $sql, $conn );
if(! $retval )
{
  die('Could not enter data: ' . mysql_error());
}
echo "Entered data successfully\n";
mysql_close($conn);

return true;			
?>