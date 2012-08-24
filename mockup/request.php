<?php

 $app_id = '151681881541064';
 $app_secret = 'ced9f215768727d6bb10eefcc11ba5de';

  $token_url = "https://graph.facebook.com/oauth/access_token?" .
    "client_id=" . $app_id .
    "&client_secret=" . $app_secret .
    "&grant_type=client_credentials";

  $app_access_token = file_get_contents($token_url);

  $user_id = 'jakob.holmelund';

  $apprequest_url ="https://graph.facebook.com/" .
    $user_id .
    "/apprequests?message='INSERT_UT8_STRING_MSG'" . 
    "&data='INSERT_STRING_DATA'&"  .   
    $app_access_token . "&method=post";

  $result = file_get_contents($apprequest_url);
  echo "App Request sent?" . $result;
?>