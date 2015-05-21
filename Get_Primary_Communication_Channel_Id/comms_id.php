<?php
 require_once './Requests/library/Requests.php'; //change this
    

    ini_set("display_errors", 1);
    ini_set('auto_detect_line_endings', TRUE);
    Requests::register_autoloader();
    $headers = array('Authorization' => 'Bearer Token'); // Change the token
    $file = fopen('users.csv','r');
    $directory = 'communication_ids';
    $dirMode = 0777;
    
if (!file_exists($directory)) {

      mkdir($directory, $dirMode, true);
}
  if (!file_exists($directory.'/'.'communication_ids.csv'))

{
    $outputcompleted = fopen($directory.'/'.'communication_ids.csv','w+');
   

}

else {

    $outputcompleted = fopen($directory.'/'.'communication_ids.csv','a');


}
  
fputcsv($outputcompleted,array('email','communication_id'));

while(($line = fgetcsv($file)) !== False){
        ini_set('max_execution_time', 0); //300 seconds = 5 minutes
        $url = 'https://someschool.instructure.com/api/v1/users/sis_user_id:'.$line[0].'/communication_channels'; //change the URL
        $res = Requests::get($url, $headers);
        $res_json = json_decode($res->body);



    foreach ($res_json as $item) {

        $line = array($item->address, $item->id);



        fputcsv($outputcompleted,$line);
        
     print_r($line);

   



}



}

ini_set('auto_detect_line_endings',FALSE);

fclose($outputcompleted);
