
import * as core from "@actions/core";
import * as github from "@actions/github";

async function main(): Promise<void> {
  try {
    core.info("MergeMemo started successfully!");

    const { eventName, payload } = github.context;

    core.info(`Event received: ${eventName}`);

    if (
      eventName === "pull_request" &&
      payload.pull_request?.merged === true
    ) {
      core.info("A pull request was merged!");
      core.info(`PR #${payload.pull_request.number}`);
    } else if (
      eventName === "issues" &&
      payload.action === "closed"
    ) {
      core.info("An issue was closed!");
      core.info(`Issue #${payload.issue?.number}`);
    } else {
      core.info("No relevant GitHub event detected.");
    }
  } catch (error) {
    core.setFailed(
      error instanceof Error ? error.message : String(error)
    );
  }
}

main();
