<template>
  <div class="container">
    <svg width="150" height="150" viewBox="-0.1 -0.1 1.2 1.2">
      <path class="hexagon background" d="M0.4625 0.01165063509
                   a0.075 0.075 0 0 1 0.075 0
                   l0.3666729559 0.2116987298
                   a0.075 0.075 0 0 1 0.0375 0.06495190528
                   l0 0.4233974596
                   a0.075 0.075 0 0 1 -0.0375 0.06495190528
                   l-0.3666729559 0.2116987298
                   a0.075 0.075 0 0 1 -0.075 0
                   l-0.3666729559 -0.2116987298
                   a0.075 0.075 0 0 1 -0.0375 -0.06495190528
                   l0 -0.4233974596
                   a0.075 0.075 0 0 1 0.0375 -0.06495190528 Z" />  <path id="trace" class="hexagon trace" d="M0.4625 0.01165063509
                   a0.075 0.075 0 0 1 0.075 0
                   l0.3666729559 0.2116987298
                   a0.075 0.075 0 0 1 0.0375 0.06495190528
                   l0 0.4233974596
                   a0.075 0.075 0 0 1 -0.0375 0.06495190528
                   l-0.3666729559 0.2116987298
                   a0.075 0.075 0 0 1 -0.075 0
                   l-0.3666729559 -0.2116987298
                   a0.075 0.075 0 0 1 -0.0375 -0.06495190528
                   l0 -0.4233974596
                   a0.075 0.075 0 0 1 0.0375 -0.06495190528 Z" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 220px;
  }

  .hexagon {
    fill: none;
    stroke-width: 0.075;
    transition: fill 0.5s ease;
  }

  .background {
    stroke: white;
  }

  .trace {
    stroke: #0575E6;
    stroke-dasharray: 1 2;
    stroke-dashoffset: 2;
    stroke-linecap: round;
    animation: spin 1s ease-in-out infinite;

  }

  @keyframes spin {
    100% {
      stroke-dashoffset: -1;
    }
  }
</style>
