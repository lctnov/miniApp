module.exports = {
  apps: [
    {
      name: "mini_app",
      script: "src/server.js",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
      watch: false,
      max_memory_restart: "200M",
    },
  ],
};