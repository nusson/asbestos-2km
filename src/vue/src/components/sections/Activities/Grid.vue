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
    // this.initSMParralaxRight();
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
              class="description _wysiwyg"
              v-html="item.description"/>
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
    // flexbox($align:flex-start,$justify:flex-start,$wrap:wrap)
    >.item
      position relative
      .figure
        flexbox(row)
        .background
          flex 0 0 55%
      &:not(:first-child)
        margin-top 40px
        +tablet()
          margin-top 20px
      &:nth-child(odd)
        .caption
          margin-left 40px
          +tablet()
            margin-left 20px
      &:nth-child(even)
        .figure
          flex-direction row-reverse
        .caption
          margin-right 40px
          +tablet()
            margin-right 20px

  .figure
    width 100%
    position relative
    flexbox(row)

  .background
    ratio-box(4/3)
    width 100%

  .caption
    margin-right 0 !important
    position relative
    display inline-block
    overflow hidden
    text-align left
    z-index 20
    // margin-top 20px
    width 100%
    position relative

  .title
    f-style(title, h3)
    display inline-block
    background-color $c-white
    color $c-dark
    width 80%

  .description
    display inline-block
    width 80%
    responsive-prop(margin-top, 10px 5px)
    f-style(text, card)
    color $c-dark
    text-align left


  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .SectionActivitiesGrid
    //
</style>
