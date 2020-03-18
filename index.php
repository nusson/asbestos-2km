<?php

$about = file_get_contents(get_stylesheet_directory() . '/datas/about.json');
$activities = file_get_contents(get_stylesheet_directory() . '/datas/activities.json');
$athletes = file_get_contents(get_stylesheet_directory() . '/datas/athletes.json');
$contact = file_get_contents(get_stylesheet_directory() . '/datas/contact.json');
$crew = file_get_contents(get_stylesheet_directory() . '/datas/crew.json');
$event = file_get_contents(get_stylesheet_directory() . '/datas/event.json');
$hero = file_get_contents(get_stylesheet_directory() . '/datas/hero.json');
$partners = file_get_contents(get_stylesheet_directory() . '/datas/partners.json');
$whenAndWhere = file_get_contents(get_stylesheet_directory() . '/datas/whenAndWhere.json');

get_header();
?>
  <div class="PageHome">

    <section
      ref="SectionHero"
      data-anchor="hero"
      class="section -hero parallax">
      <section-hero
        ref="Hero"
        v-bind='<?php echo $hero; ?>'
        class="hero slide-effect">
      </section-hero>
    </section>

    <section-partners
      v-bind='<?php echo $partners; ?>'
      class="section -partners">
    </section-partners>

    <section-when-and-where
      v-bind='<?php echo $whenAndWhere; ?>'
      data-anchor="whenAndWhere"
      class="section -whenAndWhere">
    </section-when-and-where>

    <div
      class="trigger-sm-about"
      data-anchor="about"></div>

    <section
      ref="SectionAbout"
      class="section -about parallax">
      <section-about
        v-bind='<?php echo $about; ?>'
        class="about slide-effect">
      </section-about>
    </section>

    <section-event
      v-bind='<?php echo $event; ?>'
      data-anchor="event"
      class="section -event">
    </section-event>

    <section-activities
      v-bind='<?php echo $activities; ?>'
      data-anchor="activity"
      class="section -activities">
    </section-activities>

    <section-crew
      v-bind='<?php echo $crew; ?>'
      data-anchor="crew"
      class="section -crew">
    </section-crew>
    
    <section-guests
      v-bind='<?php echo $athletes; ?>'
      data-anchor="athletes"
      class="section -athletes">
    </section-guests>

    <section-contact
      v-bind='<?php echo $contact; ?>'
      data-anchor="contact"
      class="section -contact">
    </section-contact>

    <ui-lightbox
      class="lightbox"
      type="video">
      <ui-video
        ref="VideoMain"
        v-bind='<?php echo json_encode(json_decode($hero)->videos->main); ?>'
        :controls="true"
        :autoplay="false"
        :auto-stop-on-scroll="false"
        cover="contain"
        class="video"/>
    </ui-lightbox>
    
    <newsletter-poppin></newsletter-poppin>
  </div>

<?php
get_footer();
