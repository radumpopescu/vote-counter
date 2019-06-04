<?php
header('Content-Type: application/json');

$servername = "";
$username = "root";
$password = "";
$dbname = "vot";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}   

if ($_GET['add']) {
	if (!$_GET['member']) {
		echo json_encode(['error'=> 'No member']);
		die();
	}
	$member = $_GET['member'];
	$sql = "INSERT INTO `voturi` (`member`) VALUES ('$member')";
	$result = $conn->query($sql);
	$last_id = $conn->insert_id;
	$sql = "SELECT * FROM `voturi` WHERE `id`='$last_id'";
	$result = $conn->query($sql);
	echo json_encode ($result->fetch_assoc());
	die();
}

if ($_GET['remove']) {
	if (!$_GET['id']) {
		echo json_encode(['error'=> 'No id']);
		die();
	}
	$id = $_GET['id'];
	$sql = "DELETE from `voturi` where id = '$id';";
	$result = $conn->query($sql);
	
	echo json_encode (['ok']);
	die();
}

$sql = "SELECT * FROM voturi";
$result = $conn->query($sql);
$rows = [];
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
}
echo json_encode($rows);

$conn->close();

?>