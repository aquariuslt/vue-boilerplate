<template>
  <div class="workflow-container">
    <div>
      <svg class="workflow-svg" :width="width" :height="height">
        <!-- Background G-->
        <g>
          <!-- Links G-->
          <transition-group name="workflow-path-list" class="workflow-path-graph" tag="g">
            <path v-for="path in pathList"
                  v-bind:key="path"
                  v-bind:d="path.d"
                  class="workflow-path"></path>
          </transition-group>
          <!-- Node G -->
          <transition-group name="workflow-node-list" class="workflow-node-graph" tag="g">
            <circle v-for="node in nodeList"
                    v-bind:key="node"
                    v-bind:r="node.r"
                    v-bind:cx="node.cx"
                    v-bind:cy="node.cy"
                    v-bind:class="node.fillClass"
                    v-on:click="increase(node)"
                    class="workflow-node">
            </circle>
          </transition-group>
          <!-- Node Label -->
          <transition-group name="workflow-label-list" class="workflow-label-graph" tag="g">
            <text v-for="label in labelList"
                  v-bind:key="label"
                  v-bind:x="label.x"
                  v-bind:y="label.y"
                  class="workflow-label">
              {{label.text}}
            </text>
          </transition-group>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import {TweenLite} from 'gsap';

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
   * @param {Object} layout :the size of the main svg
   * @param {Object} workflowSchemaData
   * @return {Object} result :the result of nodeTree, depth as row-index
   * Calculate the transform about workflow schema data.
   * Using graph theory algorithm
   * */
  function calculateWorkflowLayout(layout, workflowSchemaData) {
    // build empty 2d graph as 0
    let nodes = workflowSchemaData.nodes;
    let links = workflowSchemaData.links;

    let nodesLength = nodes.length;
    let nodeIdMap = {};
    _.each(nodes, function (node, index) {
      nodeIdMap[node.id] = index;
    });
    let nodeIdGraph = _.map(new Array(nodesLength), function () {
      return _.map(new Array(nodesLength), function () {
        return 0;
      });
    });
    // construct graph data
    _.each(links, function (link) {
      let fromId = nodeIdMap[link.source];
      let toId = nodeIdMap[link.target];
      nodeIdGraph[fromId][toId] = 1;
    });
    // Using DFS Like search algorithm to build a depth tree.
    // As multi result will be calculated, we only choose the first one.
    let depthGraph = [];
    let currentDepth = 0;
    let currentDepthQueue = [];

    let clonedNodeIdGraph = _.clone(nodeIdGraph);
    let clonedNodes = _.clone(nodes);

    let nodeList = [];

    while (clonedNodes.length > 0) {
      depthGraph[currentDepth] = [];
      _.each(clonedNodes, function (node) {
        let nodeIndex = nodeIdMap[node.id];
        if (calculateInDegree(clonedNodeIdGraph, nodeIndex) === 0) {
          currentDepthQueue.push(node.id);
        }
      });
      _.each(currentDepthQueue, function (nodeId) {
          deleteNodeFromGraph(clonedNodeIdGraph, nodeIdMap[nodeId]);
          let removedNode = _.remove(clonedNodes, {id: nodeId});
          depthGraph[currentDepth] = depthGraph[currentDepth].concat(removedNode);
        }
      );
      currentDepthQueue = [];
      currentDepth++;
    }

    // calculate transform from nodeList
    let widthPerDepth = layout.width / depthGraph.length;
    _.each(depthGraph, function (currentDepthNodes, depth) {
      let depthNodeLength = currentDepthNodes.length;
      console.log('depth:', depth, 'nodes:', depthNodeLength);
      _.each(currentDepthNodes, function (node, nodeIndex) {
        let clonedNode = _.clone(node);
        clonedNode.r = 30;
        clonedNode.cx = widthPerDepth * depth + widthPerDepth / 2;
        clonedNode.cy = layout.height / (depthNodeLength * 2) + nodeIndex * (layout.height / (depthNodeLength));
        clonedNode.depth = depth;
        clonedNode.fillClass = calculateFillColorClass(clonedNode.r);
        nodeList.push(clonedNode);
      });
    });
    console.log('nodeList:', nodeList);

    // calculate path from to
    let clonedLinks = _.clone(links);
    let pathList = [];

    _.each(clonedLinks, function (link) {
      let pathDescription = '';
      let startNode = _.find(nodeList, {id: link.source});
      let endNode = _.find(nodeList, {id: link.target});
      let from = ['M', startNode.cx, startNode.cy].join(' ');
      let to = ['L', endNode.cx, endNode.cy].join(' ');
      pathDescription += ([from, to].join(' '));
      pathList.push({
        d: pathDescription
      });
    });

    // calculate label
    let labelList = [];
    _.each(nodeList, function (node) {
      let scaled = 3.5;
      let textLength = _.isUndefined(node.name) ? 0 : node.name.length * scaled;
      let textHeight = 3 * scaled;
      let label = {
        text: node.name,
        x: node.cx - textLength,
        y: node.cy + node.r + textHeight
      };
      labelList.push(label);
    });

    return {
      nodeList: nodeList,
      pathList: pathList,
      labelList: labelList
    };
  }

  function calculateInDegree(graph, nodeId) {
    let inDegree = 0;
    _.each(graph, function (row, index) {
      if (graph[index][nodeId] > 0) {
        inDegree++;
      }
    });
    return inDegree;
  }

  function deleteNodeFromGraph(graph, nodeId) {
    let graphLength = graph.length;
    for (let i = 0; i < graphLength; i++) {
      graph[nodeId][i] = 0;
    }
  }


  function calculateFillColorClass(level) {
    const warningLimit = 40;
    const dangerLimit = 50;
    let targetClassPrefix = 'workflow-node';

    if (level >= warningLimit && level < dangerLimit) {
      return targetClassPrefix + '-warning';
    }
    if (level >= dangerLimit) {
      return targetClassPrefix + '-danger';
    }

    return targetClassPrefix + '-normal';
  }


  export default{
    name: 'workflow',
    props: [
      'width',
      'height'
    ],
    data() {
      return {
        layout: {width: this.width, height: this.height},
        nodeList: [],
        pathList: [],
        labelList: []
      };
    },
    watch() {
    },
    mounted: function () {
      let {nodeList, pathList, labelList} = calculateWorkflowLayout(this.layout, sampleWorkflowSchemaData);
      this.nodeList = nodeList;
      this.pathList = pathList;
      this.labelList = labelList;
    },
    methods: {
      increase: function (workflowNode) {
        let originalRadius = workflowNode.r;
        let targetRadius = originalRadius + 5;

        let targetFillColorClass = calculateFillColorClass(workflowNode.r);

        TweenLite.to(
          workflowNode,
          1,
          {
            r: targetRadius,
            fillClass: targetFillColorClass
          }
        );
      },
      decrease: function () {
        console.log('decrease');
      }
    }
  };
</script>

<style lang="scss" scoped>
  $workflow-content-background-color: #DBDBDB;

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

  .workflow-node-graph {
    transition: 1s;
  }

  $workflow-normal-color: #41B883;
  $workflow-warning-color: #b88207;
  $workflow-danger-color: #b82800;

  .workflow-node {
    &-normal {
      fill: $workflow-normal-color !important;;
    }
    &-warning {
      fill: $workflow-warning-color !important;
    }
    &-danger {
      fill: $workflow-danger-color !important;;
    }
  }

  $workflow-node-content-color: #41B883;
  .workflow-node {
    stroke: #FFFFFF;
    stroke-width: 2px;
    fill: $workflow-node-content-color;
    border: black 2px;
  }

  .workflow-path-graph {

  }

  $workflow-path-content-color: #FFFFFF;
  .workflow-path {
    stroke: $workflow-path-content-color;
    stroke-width: 3px;
    fill: $workflow-path-content-color;
  }

  .workflow-label {
    font-size: 14px;
    font-weight: lighter;
    fill: #000000;
  }

  /* Vue Transition Part */

  /* Workflow Node*/
  .workflow-node-list-enter-active,
  .workflow-node-list-leave-active {
    transition: all 1s;
  }

  .workflow-node-list-enter,
  .workflow-node-list-leave-active {
    opacity: 0;
  }

  /* Workflow Path */
  .workflow-path-list-enter-active,
  .workflow-path-list-leave-active {
    opacity: 0;
    transition: 1s;
  }

  .workflow-path-list-enter,
  .workflow-path-list-leave-active {

  }

  .workflow-label-list-enter-active,
  .workflow-label-list-leave-active {
    opacity: 0;
    transition: 1s;
  }


</style>


