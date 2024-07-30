import type { CliOptions } from "dt-app";

const config: CliOptions = {
  environmentUrl: "<enter your environment url here>",
  icon: "src/assets/app-icon.png",
  app: {
    name: "GitHub Actions Profiler Sample",
    version: "1.7.0",
    description: "Sample app to analyze GitHub Actions workflows and optimize software development",
    id: "my.github.actions.profiler",
    scopes: [
      {
        name: "storage:metrics:read",
        comment:
          "this was added by the default template. We should check in the end if we actually need this.",
      },
      { name: "storage:events:read", comment: "we need this to fetch github data from workflows" },
      {
        name: "storage:events:write",
        comment: "we need this scope so the serverless function can write events to grail",
      },
      {
        name: "storage:bizevents:read",
        comment: "We need this scope to read bizevents from Grail"
      },
      {
        name: "storage:buckets:read",
        comment: "We need this scope to read bizevents from Grail"
      }
    ],
  },
};

module.exports = config;
