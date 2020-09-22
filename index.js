const fs = require("fs");
const core = require("@actions/core");
const showdown = require("showdown");
const mailer = require("@sendgrid/mail");
const { Octokit } = require("@octokit/action");

const fetchReleaseForEvent = async event => {
  if (event.deployment_status) {
    const octokit = new Octokit();

    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    const { data } = await octokit.request("GET /repos/:owner/:repo/releases/tags/:tag", {
      owner,
      repo,
      tag: event.deployment.ref,
    });

    return data;
  }

  return event.release;
};

async function run() {
  try {
    const release = await fetchReleaseForEvent(
      JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"))
    );

    if (!release) {
      return;
    }

    const email = {
      to: core.getInput("to"),
      from: core.getInput("from"),
      subject: Object.keys(release).reduce(
        (subject, key) => subject.replace(`{${key}}`, release[key]),
        core.getInput("subject")
      ),
      text: release.body,
      html: new showdown.Converter().makeHtml(release.body),
    };

    mailer.setApiKey(core.getInput("sendGridToken"));
    await mailer.send(email);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
