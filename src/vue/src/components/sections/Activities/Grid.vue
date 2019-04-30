<!-- eslint-disable -->
<docs>
# SectionActivitiesGrid
> 

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<!-- eslint-enable -->

<script>
import { indexOf, each } from 'lodash';
import UiPicture from 'components/ui/Picture';
import { TimelineMax, TweenMax, Power0 } from 'gsap';
import { Scene } from 'scrollmagic';

export default {
  name: 'SectionActivitiesGrid',
  components: {
    UiPicture,
  },
  props: {
    items: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      actives: [],
      active: null,
    };
  },
  mounted() {
    this.initSMParralaxRight();
    // this.initSMPinCaption();
  },
  methods: {
    indexOf,
    toggle(index) {
      this.active = (this.active === index) ? null : index;

      // if (indexOf(this.actives, index) >= 0) {
      //   this.actives = without(this.actives, index);
      //   return;
      // }
      // this.actives.push(index);
    },
    initSMPinCaption() {
      each(this.$refs.Slide, (slide, index) => {
        // const caption = slide.querySelector('.caption');
        const title = slide.querySelector('.title');
        // const content = slide.querySelector('.content');
        // const content = slide.querySelectorAll('.title, .bg, .description');

        // TweenMax.set(content, { x: `${index % 2 ? -100 : 100}%` });
        // const tl = new TimelineMax()
        //   .set(title, { x: '100%' })
        //   .add('enter', 0)
        //   .add('leave', 1)
        //   .to(title, 0.8, {
        //     x: '0%',
        //     ease: Power0.easeNone,
        //   }, 'enter')
        //   .to(title, 0.8, {
        //     x: '100%',
        //     ease: Power0.easeNone,
        //   }, 'leave');


        const scene = new Scene({
          triggerElement: slide,
          duration: '50%',
          triggerHook: 0.95, // index % 2 === 0 ? 0.4 : 0.2,
          offset: 200,
        })
        .setPin(title)
        .on('enter', () => {
          // TweenMax.to(content, 0.4, { x: '0%' }, 0.1);
        });
        // .on('leave', () => {
        //   TweenMax.fromTo(content, 0.4, { x: '0%' }, { x: '100%' }, 0.05);
        // });

        this.$store.dispatch('ScrollMagic/ADD_SCENE', {
          scene,
          indicators: false,
        });
      });
    },
    initSMParralaxRight() {
      each(this.$refs.Slide, (slide, index) => {
        if (index % 2 === 0) return;

        const tl = new TimelineMax()
          .fromTo(slide, 0.8, {
            y: '0px',
          }, {
            y: '400px',
            ease: Power0.easeNone,
          }, 0);

        const scene = new Scene({
          triggerElement: slide,
          duration: '160%',
          triggerHook: 0.8,
        })
        .setTween(tl);

        this.$store.dispatch('ScrollMagic/ADD_SCENE', {
          scene,
          indicators: false,
        });
      });
    },
  },
};
</script>

<template>
  <ul
    class="SectionActivitiesGrid list">
    <li
      v-for="(item, index) in items"
      ref="Slide"
      :key="`grid-${index}`"
      class="item">
      <!-- :data-active="indexOf(actives, index)>=0" -->
      <figure
        :data-active="active === index"
        class="figure"
        @click="toggle(index)">
        <div class="background">
          <UiPicture
            v-bind="item.image"
            :full="true"
            class="picture"
            cover="cover" />
        </div>
        <caption class="caption">
          <div class="content">
            <h3
              class="title"
              v-text="item.title" />
            <p
              class="description -full _wysiwyg"
              v-html="item.description.full"/>
            <span class="bg"/>
          </div>
        </caption>
      </figure>
    </li>
  </ul>
</template>

<style lang="stylus" scoped>
  /**
  * TABLE OF CONTENT
  * --------
  *  - LAYOUT
  *  - DEBUG
  *  - NO_SCOPE
  */

  //  ===LAYOUT===
  .SectionActivitiesGrid
    safe-content()
    flexbox($align:flex-start,$justify:flex-start,$wrap:wrap)
    >.item
      flex 0 0 50%
      position relative
      overflow hidden
      &:nth-child(n+3)
        margin-top 40px
      &:nth-child(4)
        top 211px
      &:nth-child(6)
        top 422px
      +tablet()
        &:nth-child(n+3)
          margin-top 20px
        // &:nth-child(4)
        //   top (114px + 20px)
        // &:nth-child(6)
        //   top (228px + 20px)

      // &:nth-child(2)
      // &:nth-child(4)
      // &:nth-child(6)
      //   top 20vh
      // &:nth-child(4)
      //   top 40vh
      // &:nth-child(6)
      //   top 60vh

      max-width calc('50% - 20px')
      +tablet()
        max-width calc('50% - 10px')
      &:nth-child(even)
        responsive-prop(margin-left, $gutters)

      &:nth-child(even)
        .description
          margin-left 0
          margin-right auto
          transform translateX(-100%)
          padding-left 15px
        .title
          left 0 !important
        .caption
          // left 0 !important
      &:nth-child(odd)
        .figure
        .caption
          text-align right
        .description
          margin-right 0
          margin-left auto
          transform translateX(100%)
          padding-right 15px

  .figure
    width 100%
    position relative
    overflow hidden
    // height var(--viewport-height-no-header)
    height 80vh

  .background
    absolute 0

  .caption
    margin-right 0 !important
    position relative
    // display block
    display inline-block
    overflow hidden
    text-align left
    z-index 20
    // transform translateY(20vh)
    // margin-top 10vh !important
    margin-top 100px
    width 100%
    // background-color rgba($c-white, 0)
    // height 100%
    padding-bottom 40px
    // kff-transition()
    position relative
    // transition transform 0.6s easing('in-back')/*, background 0.6s easing('in-back') */
    // transition margin-top 0.6s easing('in-back')
    // &:before
    //   absolute 0
    //   background-color $c-white
    //   transform translateX(100%)
    //   // kff-transition(transform)
    //   transition all 0.6s easing('in-back')

  .title
    f-style(title)
    padding 15px
    display inline-block
    // display block
    background-color $c-white
    color $c-dark
    width 80%

  .description
    display inline-block
    width 80%
    padding 20px
    padding-top 0px
    margin-top -10px
    +desktop()
      padding 40px
      padding-top 5px
    f-style(text, card)
    color $c-dark
    opacity 0
    // max-width 500px
    margin-right auto
    text-align left
    // transform translateX(-50%)
    // transform translateY(20px)
    // background-color rgba($c-white, 0)
    background-color $c-white
    // kff-transition(all)
    transition all 0.6s easing('in-quad')

  .figure
    &[data-active]
    .no-touchevents &:hover
      // .caption
      //   // transform translateY(10vh)
      //   margin-top 10vh !important
      //   // background-color rgba($c-white, 1)
      //   transition margin-top 0.8s easing('out-expo') /*, background 0.8s easing('out-expo')*/
      // &:before
      //   transform translateX(0%)
      //   transition all 0.8s easing('out-expo')
      .description
        opacity 1
        transform translateX(0%) translateY(0%) !important
        // background-color rgba($c-white, 1)
        transition all 0.8s easing('out-expo')


  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionActivitiesGrid
    //
</style>
