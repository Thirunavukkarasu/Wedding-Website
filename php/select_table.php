<?php
include 'datalogin.php';

$rows = array();
$sql = 'SELECT Name,Email_ID,Album_Name,Song_Name FROM request_song';

mysql_select_db('anjuweds_srini');
$result = mysql_query( $sql, $conn );
if(!$result)
{
  die('Could not get data: ' . mysql_error());
}

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    $rows[] = array('Name' => $row["Name"],'Email_ID' => $row["Email_ID"],'Album_Name' => $row["Album_Name"],'Song_Name' => $row["Song_Name"]);
}
$json = json_encode($rows);

echo $json;

mysql_free_result($result);
mysql_close($conn);
?>