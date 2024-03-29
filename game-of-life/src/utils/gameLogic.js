export const computeNextGenerationWithAges = (grid, cellDeadIteration) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const nextGrid = grid.map(arr => [...arr]);
  const nextcellDeadIteration = cellDeadIteration.map(arr => [...arr]);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = grid[i][j];
      let liveNeighbors = 0;

      // Check all eight possible neighbors
      for (let I = -1; I <= 1; I++) {
        for (let J = -1; J <= 1; J++) {
          if (I === 0 && J === 0) continue;
          const newRow = i + I;
          const newCol = j + J;
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            liveNeighbors += grid[newRow][newCol];
          }
        }
      }

      // Apply the Game of Life rules
      if (cell === 1) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          nextGrid[i][j] = 0;
          nextcellDeadIteration[i][j] = -1;
        }
      } else if (cell === 0) {
        if (liveNeighbors === 3) {
          nextGrid[i][j] = 1;
        } else if (cellDeadIteration[i][j] < 0) {
          nextcellDeadIteration[i][j]--;
        }
      }
    }
  }

  return { nextGrid, nextcellDeadIteration };
};


export const createClusteredGrid = (rows, cols, clusterCount = 5, clusterRadius = 3, chanceOfLife = 0.05) => {
  let grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));

  // Helper function to get a random integer between min and max
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < clusterCount; i++) {
    // Random center for the cluster
    const centerRow = randomInt(clusterRadius, rows - clusterRadius - 1);
    const centerCol = randomInt(clusterRadius, cols - clusterRadius - 1);

    // Activate cells in a radius around the center
    for (let row = centerRow - clusterRadius; row <= centerRow + clusterRadius; row++) {
      for (let col = centerCol - clusterRadius; col <= centerCol + clusterRadius; col++) {
        if (row >= 0 && row < rows && col >= 0 && col < cols) {
          const distance = Math.sqrt((row - centerRow) ** 2 + (col - centerCol) ** 2);
          if (distance <= clusterRadius) {
            grid[row][col] = Math.random() < chanceOfLife ? 1 : 0;
          }
        }
      }
    }
  }

  return grid;
};