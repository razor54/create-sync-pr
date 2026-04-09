async function createBranch(octokit, context, branch) {
  try {
    await octokit.rest.repos.getBranch({
      ...context.repo,
      branch,
    });
  } catch (error) {
    if (error.status === 404) {
      await octokit.rest.git.createRef({
        ref: `refs/heads/${branch}`,
        sha: context.sha,
        ...context.repo,
      });
    } else {
      console.log("Error while creating new branch");
      throw error;
    }
  }
}

module.exports = createBranch;
