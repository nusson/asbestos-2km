<?php

/**
 * Enqueue scripts and styles.
 */
function twentynineteen_scripts() {

  $manifest = file_get_contents(get_stylesheet_directory() . "/dist/manifest.json");
  $assetsMap = json_decode($manifest, true);
  
  wp_enqueue_script('vendors', $assetsMap['vendors.js'], null, null, true );
  wp_enqueue_script('main', $assetsMap['main.js'], array('vendors'), null, true );
  
  if($assetsMap['main.css']){
    wp_enqueue_style('main-style', $assetsMap['main.css'], array(), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style('vendors-style', $assetsMap['vendors.css'], array(), wp_get_theme()->get( 'Version' ) );
  }
}
add_action( 'wp_enqueue_scripts', 'twentynineteen_scripts' );