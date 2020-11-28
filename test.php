<?
@session_start();
$counter = intval(file_get_contents("counter.dat"));
if(!$_SESSION['jingyun'])
{
 $_SESSION['jingyun'] = true;
 $counter++;
 $fp = fopen("counter.dat","w");
 fwrite($fp, $counter);
 fclose($fp);
}
?>

总访问 <span style="font-size:14px; color:#FF6600" mce_style="font-size:14px; color:#FF6600"><?php echo "$counter";?></span> 次