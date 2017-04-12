<template>
  <div class="workflow-container">
    <div>
      <svg class="workflow-svg" :width="width" :height="height">
        <!-- Background G-->
        <g>
          <!-- Node G -->
          <g>

          </g>
          <!-- Links G-->
          <g>

          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';

  let sampleWorkflowSchemaData = {
    nodes: [
      {
        id: 'stand-up-meeting',
        name: 'Stand Up Meeting'
      },
      {
        id: 'coding',
        name: 'Coding'
      }
    ],
    links: [
      {
        source: 'stand-up-meeting',
        target: 'coding'
      }
    ]
  };

  /**
   * @param {object} layout :the size of the main svg
   * @param {object} workflowSchemaData
   * Calculate the transform about workflow schema data.
   * Using graph theory algorithm
   * */
  function calculateNodeTransform(layout, workflowSchemaData) {
    console.log('calculating layout:', layout);
    console.log('calculating workflow schema:', workflowSchemaData);

    // build empty 2d graph as 0
    let nodes = workflowSchemaData.nodes;
    let nodesLength = nodes.length;
    let nodeIdMap = {};
    _.each(nodes, function (node, index) {
      nodeIdMap[node.id] = index;
    });
    console.log('init nodeIdMap:', nodeIdMap);
    let nodeIdGraph = _.map(new Array(nodesLength), function () {
      return _.map(new Array(nodesLength), function () {
        return 0;
      });
    });
    // construct graph data
    let links = workflowSchemaData.links;
    _.each(links, function (link) {
      let fromId = nodeIdMap[link.source];
      let toId = nodeIdMap[link.target];
      nodeIdGraph[fromId][toId] = 1;
    });
    console.log('nodeIdGraph with data:', nodeIdGraph);
  }

  export default{
    name: 'workflow',
    props: [
      'width',
      'height'
    ],
    data() {
      return {
        layout: {width: this.width, height: this.height}
      };
    },
    watch() {
    },
    mounted: function () {
      calculateNodeTransform(this.layout, sampleWorkflowSchemaData);
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>
  $workflow-content-background-color: #dbdbdb;

  .workflow-container {
    display: -webkit-flex;
    display: flex;
     -webkit-align-items: center;
    align-items: center;
     -webkit-justify-content: center;
    justify-content: center;
  }

  .workflow-svg {
    background: $workflow-content-background-color;
  }

  /**
    * TODO: Should be pre process to safe,warning,danger
    */
  $workflow-node-content-color: #41B883;
  .workflow-node {
    fill: $workflow-node-content-color;
    border: black 2px;
  }
</style>


