<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since 1.0.0
 */

$navigation = file_get_contents(get_stylesheet_directory() . '/datas/navigation.json');

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<meta name="fragment" content="!">
	<?php wp_head(); ?>
	<title>Slackfest Asbestos 2Km</title>
	<meta name="keywords" content="Slackfest, highline, slackline, record, 2km, asbestos, quebec, montreal, canada, funambules, funambules modernes, mine, juillet, 2019, 2.0" />
	<meta name="description" content="Le plus grand événement de Highline au Canada. La deuxième édition prendra place du 25 au 27 Juillet 2019 aux abords du puits minier Jeffrey à Asbestos." />
	<meta property="fb:app_id" content="416724898878853" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://lesfunambulesmodernes.com" />
	<meta property="og:title"  content="Slackfest Asbestos 2Km" />
	<meta property="og:description" content="Le plus grand événement de Highline au Canada. La deuxième édition prendra place du 25 au 27 Juillet 2019 aux abords du puits minier Jeffrey à Asbestos." />
	<meta property="og:image" content="http://lesfunambulesmodernes.com/wp-content/uploads/static/facebook.jpg" />
</head>
<body <?php body_class(); ?>>
  <?php /* wp_body_open(); */ ?>
	
	<div id="App" class="site">
		<!-- <the-test></the-test> -->
		<the-header :navigation='<?php echo $navigation; ?>'></the-header>