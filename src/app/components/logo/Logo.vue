<template>
  <div>
    <svg width="200" height="200">
      <polygon :points="points"></polygon>
      <circle cx="100" cy="100" r="90"></circle>
    </svg>
  </div>
</template>

<script>
  import * as _ from 'lodash';
  import {TweenLite} from 'gsap';

  export default {
    data() {
      const defaultSides = 6;
      const defaultStat = 100;
      let stats = [];
      for (let i = 0; i < defaultSides; i++) {
        stats.push(defaultStat);
      }
      let points = generatePoints(stats);

      return {
        stats: stats,
        points: points,
        sides: defaultSides,
        minRadius: 50,
        interval: null,
        updateInterval: 1000
      };
    },
    watch: {
      sides: function (newSides, oldSides) {
        let sidesDifference = newSides - oldSides;
        if (sidesDifference > 0) {
          for (let i = 1; i <= sidesDifference; i++) {
            this.stats.push(this.newRandomValue());
          }
        } else {
          let absoluteSidesDifference = Math.abs(sidesDifference);
          for (let i = 1; i <= absoluteSidesDifference; i++) {
            this.stats.shift();
          }
        }
      },
      /* TweenLite: an animation framework */
      stats: function (newStats) {
        TweenLite.to(
          this.$data,
          this.updateInterval / 1000,
          {
            points: generatePoints(newStats)
          }
        );
      },
      updateInterval: function () {
        this.resetInterval();
      }
    },
    mounted: function () {
      this.resetInterval();
    },
    methods: {
      randomizeStats: function () {
        let vm = this;
        this.stats = this.stats.map(function () {
          return vm.newRandomValue();
        });
      },
      newRandomValue: function () {
        return Math.ceil(this.minRadius + Math.random() * (100 - this.minRadius));
      },
      resetInterval: function () {
        let vm = this;
        clearInterval(this.interval);
        this.randomizeStats();
        this.interval = setInterval(function () {
          vm.randomizeStats();
        }, this.updateInterval);
      }
    }
  };

  function valueToPoint(value, index, total) {
    let x = 0;
    let y = -value * 0.9;

    let angle = Math.PI * 2 / total * index;
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    let tx = x * cos - y * sin + 100;
    let ty = x * sin + y * cos + 100;
    return {
      x: tx,
      y: ty
    };
  }


  function generatePoints(stats) {
    let total = stats.length;
    return _.map(stats, function (stat, index) {
      let point = valueToPoint(stat, index, total);
      return point.x + ',' + point.y;
    }).join(' ');
  }


</script>

<style lang="scss" scoped>
  $logo-color: #41B883;
  $circle-stroke-color: #35495E;

  svg {
    display: block;
  }

  polygon {
    fill: $logo-color;
  }

  circle {
    fill: transparent;
    stroke: $circle-stroke-color;
  }

  input[type='range'] {
    display: block;
    width: 100%;
    margin-bottom: 15px;
  }
</style>
