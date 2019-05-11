<?php
// @include 'admin-ajax.php';

/**
 * Enqueue scripts and styles.
 */
function twentynineteen_scripts() {

  $manifest = file_get_contents(get_stylesheet_directory() . "/dist/manifest.json");
  $assetsMap = json_decode($manifest, true);
  
  wp_enqueue_script('vendors', $assetsMap['vendors.js'], null, null, true );
  wp_enqueue_script('main', $assetsMap['main.js'], array('vendors'), null, true );
  wp_localize_script( 'main', 'wp_ajax',
          array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
  
  if(isset($assetsMap['main.css'])){
    wp_enqueue_style('main-style', $assetsMap['main.css'], array(), wp_get_theme()->get( 'Version' ) );
  }
  if(isset($assetsMap['vendors.css'])){
    wp_enqueue_style('vendors-style', $assetsMap['vendors.css'], array(), wp_get_theme()->get( 'Version' ) );
  }
}
add_action( 'wp_enqueue_scripts', 'twentynineteen_scripts' );

function contact() {
  if(!isset($_POST['email'])){
    echo 0;
    exit;
  }

  $fullname = $_POST['fullname'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  $to = 'hussonicolas@gmail.com';
  $subject = 'CONTACT - lesfunambulesmodernes';

  $message = "
    <strong>from: </strong>".$fullname." - ".$email."
    <br>
    <br>".$message;
  $mail = wp_mail($to, $subject, $message);

  echo $mail;
  exit;
}
add_action( 'wp_ajax_contact', 'contact' );
add_action( 'wp_ajax_nopriv_contact', 'contact' );

/**
* Filter the mail content type.
*/
function wpdocs_set_html_mail_content_type() {
   return 'text/html';
}
add_filter( 'wp_mail_content_type', 'wpdocs_set_html_mail_content_type' );