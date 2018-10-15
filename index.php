<?php
/**
 * Created by PhpStorm.
 * User: shashank2104
 * Date: 10/14/18
 * Time: 8:53 PM
 */

$servername = "localhost";
$username = "root";
$password = "root";

// Create connection
//$conn = new mysqli($servername, $username, $password);

$conn = mysqli_connect($servername, $username, $password, 'testing');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = $_POST['data'];

switch ($_POST['method']) {
    case 'insert':
        insert($conn);
        break;
    case 'update':
        update($conn);
        break;
    case 'remove':
        remove($conn);
        break;
    default:
        break;
}

function insert ($conn) {
    $data = $_POST['data'];
    $sql = "INSERT INTO ajax_demo_table (Workcenter, PartNumber, Reason, RepairID) VALUES ('" . $data['Workcenter'] . "','" . $data['PartNumber'] . "','" . $data['Reason'] . "', '" . $data['RepairID'] . "')";
    $result = mysqli_query($conn, $sql);
    if($result) {
        echo $result;
    }
}
function update ($conn) {
    $data = $_POST['data'];
    $sql = "UPDATE ajax_demo_table SET Reason='" . $data['Reason'] . "' WHERE RepairID=" . $data['RepairID'];
    $result = mysqli_query($conn, $sql);
    if($result) {
        echo 'Updated entry successfully';
    }
}

function remove($conn) {
    $data = $_POST['data'];
    $sql = "DELETE FROM ajax_demo_table  WHERE RepairID=" . $data['RepairID'];
    $result = mysqli_query($conn, $sql);
    if($result) {
        echo 'Removed entry successfully';
    }
}
