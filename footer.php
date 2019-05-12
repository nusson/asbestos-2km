<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since 1.0.0
 */

$social = file_get_contents(get_stylesheet_directory() . '/datas/social.json');
?>
      <the-footer
        v-if="loaded"
        :social='<?php echo $social; ?>'
        class="footer">
      </the-footer>

      <the-loader v-if="!loaded"></the-loader>

      <component
        :is="'style'"
        v-html="dynamicStyles">
      </component>

    </div><!-- App -->
    <?php wp_footer(); ?>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-139982006-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-139982006-1');
    </script>
  </body>
</html>
