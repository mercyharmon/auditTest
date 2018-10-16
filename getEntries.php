<?php
/**
 * Created by PhpStorm.
 * User: mercyharmon
 * Date: 10/14/18
 * Time: 9:57 PM
 */

$servername = "localhost";
$username = "root";
$password = "root";

// Create connection
//$conn = new mysqli($servername, $username, $password);

$conn = mysqli_connect($servername, $username, $password, 'testing');

$sql = "SELECT Workcenter, PartNumber, Reason, RepairID FROM ajax_demo_table";

$result = mysqli_query($conn, $sql);

//Copy result into a associative array
$json = array();
while($row = mysqli_fetch_array($result)) {
    $json[] = $row;
}
echo json_encode($json);
mysqli_close($conn);