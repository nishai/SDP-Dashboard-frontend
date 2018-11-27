
<!--

Sidebar that is capable of displaying an extras screen.

heavily modified version of:
https://lyollix.github.io/vue-slideout-panel-demo/

The above was retarded, convoluted and an absolute mess.

-->

<template>
  <aside>

    <!-- BACKGROUND -->
    <transition name="fade">
      <div v-if="active" class="panel-blackout" @click="_onBackgroundClick"></div>
    </transition>

    <!-- SLIDEOUT PANEL -->
    <transition
      name="slide-out"
      @enter="_onTransitionContainerEnter"
      @after-leave="_onTransitionContainerAfterLeave"
      @before-enter="_onTransitionContainerBeforeEnter"
      @after-enter="_onTransitionContainerAfterEnter"
    >
      <div v-if="active" ref="container" class="panel-container panel-transform" :style="styleContainer">

        <!-- MAIN PANE - transition needed if showing extra pane, but hiding this pane -->
          <aside ref="main" class="panel-pane panel-transform" :style="styleMain" :class="classesMain" @click="_onMainPaneClick">
            <!-- BLACKOUT -->
            <transition name="fade">
              <div v-if="parentsDisabled" class="panel-pane-blackout"/>
            </transition>
            <!-- CONTENT -->
            <section class="panel-pane-content">
              <slot/>
            </section>
            <footer v-if="$slots.footer" class="panel-pane-footer">
              <slot name="footer">
                <!--<a @click.prevent="close"> Close </a>-->
                <!--<a v-if="activeExtra" @click.prevent="closeExtra"> Close Extra </a>-->
                <!--<a v-else @click.prevent="openExtra"> Open Extra </a>-->
              </slot>
            </footer>
          </aside>

        <!-- EXTRA PANEL -->
          <aside ref="extra" class="panel-pane panel-transform" :style="styleExtra">
            <section class="panel-pane-content">
              <slot name="extra"/>
            </section>
            <footer v-if="$slots.extraFooter" class="panel-pane-footer">
              <slot name="extraFooter">
                <!--<a @click.prevent="closeExtra"> Close </a>-->
              </slot>
            </footer>
          </aside>

      </div>
    </transition>

  </aside>
</template>

<script>

export default {
  name: 'v-slideout',

  props: {
    active: Boolean,
    activeExtra: Boolean,
    /* width */
    width: { type: String, default: '80%' },
    widthPane: { type: String, default: '65%' },
    widthPaneExtra: { type: String, default: '35%' },
    /* disabling */
    disableParents: Boolean,
  },

  data() {
    return {
      /* fix animations */
      delayedOpenExtra: false,
    };
  },

  watch: {
    active(value) {
      if (value) { this.open(); } else { this.close(); }
    },
    activeExtra(value) {
      if (value) { this.openExtra(); } else { this.closeExtra(); }
    },
  },

  computed: {
    /* style & classes */
    parentsDisabled() { return this.activeExtra && this.disableParents; },
    styleContainer() { return { width: this.width }; },
    styleMain() { return { width: this.widthPane }; },
    styleExtra() { return { width: this.widthPaneExtra }; },
    classesMain() { return { 'disabled': this.parentsDisabled }; },
  },

  methods: {

    open() {
      this.$emit('update:active', true);
      this.$emit('open');
    },

    openExtra() {
      if (this.isEntering) {
        /* If the user clicks to quickly on a chart */
        this.delayedOpenExtra = true;
      } else {
        this.$refs.container.style.right = '0';
        this.$emit('update:activeExtra', true);
        this.$emit('openExtra');
      }
    },

    close() {
      this.$emit('update:active', false);
      this.$emit('close');
    },

    closeExtra() {
      if (this.$refs.container) {
        this.$refs.container.style.right = `${-this.$refs.extra.offsetWidth}px`;
      }
      this.$emit('update:activeExtra', false);
      this.$emit('closeExtra');
    },

    /**
     * make sure that when the extras screen is closed,
     * that the main pane still moves with the resize.
     */
    _handleResize() {
      if (!this.$refs.container) { return; }
      this.$refs.container.style.right = (this.activeExtra || !this.$refs.extra) ? '0' : `${-this.$refs.extra.offsetWidth}px`;
    },

    _onBackgroundClick(event) {
      let canceled = false;
      this.$emit('beforeClose', () => { canceled = true; }, event);
      if (!canceled) {
        this.close();
      }
    },

    _onMainPaneClick(event) {
      if (this.parentsDisabled) {
        let canceled = false;
        this.$emit('beforeCloseExtra', () => { canceled = true; }, event);
        if (!canceled) {
          this.closeExtra();
        }
      }
    },

    /**
     * Force the extras pane state to update when first
     * opened based on this.activeExtra
     */
    _onTransitionContainerEnter() {
      if (!this.activeExtra) {
        this.closeExtra();
      }
    },

    /**
     * Reset after closing, done here
     * otherwise animation is jittery.
     */
    _onTransitionContainerAfterLeave() {
      if (this.activeExtra) {
        this.closeExtra();
      }
    },

    _onTransitionContainerBeforeEnter() {
      this.isEntering = true;
    },
    _onTransitionContainerAfterEnter() {
      this.isEntering = false;
      if (this.delayedOpenExtra && this.active) {
        this.openExtra();
      }
      this.delayedOpenExtra = false;
    },
  },

  /* when the component's life begins */
  created() {
    window.addEventListener('resize', this._handleResize);
    this._handleResize();
  },

  /* when the component's life ends */
  destroyed() {
    window.removeEventListener('resize', this._handleResize);
  },

};
</script>


<style scoped>

.panel-blackout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  background-color: rgba(0, 0, 0, .3);
}

.panel-container {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 3000;
  box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.panel-pane {
  position: relative;
  display: inline-block;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* programatically set */
.panel-pane.disabled * {
  pointer-events: none;
}

/* programatically set */
.panel-pane-blackout {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .2);
  width: 100%;
  height: 100%;
}


.panel-pane-content {
  height: 100%;
  overflow: auto;
}

.panel-pane-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

/* define animations for transition component */
.panel-transform {
  transition-timing-function: ease;
  transition-duration: 0.8s;
}

.slide-out-enter-active, .slide-out-leave-active {
  transition: transform .8s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.slide-out-enter, .slide-out-leave-to {
  transform: translateX(100%);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s ease-in;
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.bg-transparent {
  background-color: transparent !important;
}
</style>
