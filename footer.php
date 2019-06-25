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
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-139982006-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-139982006-1');
    </script>

    <!-- Facebook Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '302301660682184'); 
      fbq('track', 'PageView');
    </script>
    <noscript>
      <img height="1" width="1" 
      src="https://www.facebook.com/tr?id=302301660682184&ev=PageView
      &noscript=1"/>
    </noscript>
    <!-- End Facebook Pixel Code -->
    
    <?php wp_footer(); ?>
  </body>
</html>
