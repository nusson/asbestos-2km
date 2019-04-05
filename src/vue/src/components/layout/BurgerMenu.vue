<docs>
# BurgerMenu
> Sticky burger menu

[todo] Create a open/close state with beautiful X animation

@author Sebastien Levy <sebastien@kffein.com>
</docs>

<script>
export default {
  name: 'BurgerMenu',
};
</script>

<template>
  <aside class="BurgerMenu">
    <div
      class="container"
      @click="$store.dispatch('Menu/OPEN_MENU')">
      <span class="line"/>
      <span class="line"/>
      <span class="line"/>
    </div>
  </aside>
</template>

<style lang="stylus" scoped>
  /**
   * TABLE OF CONTENT
   * --------
   *  - LAYOUT
   *  - DEBUG
   *  - NO_SCOPE
   */

  .BurgerMenu
    fixed right 0 left 0 top 0
    width 100%
    height 60px
    margin auto
    flexbox($row, $justify: flex-end, $align: center)
    z-index $z-index-navbar - 1
    pointer-events none
    &:hover
      .line
        &:first-of-type
          transform translateX(5px)
        &:last-of-type
          transform translateX(-5px)

  .container
    relative right 20px
    min-height 27px
    width 40px
    padding 5px
    display block
    cursor pointer
    pointer-events all
    background $c-white

  $topPos = 5px

    .line
      relative top $topPos left 0
      size 98% 2px
      display block
      background $c-black
      transition()
      &:first-of-type
        top 0

      &:last-of-type
        top $topPos * 2

  //  ===LAYOUT===

  //  ===DEBUG===
  [data-debug-mode="true"] .BurgerMenu
    //
</style>
