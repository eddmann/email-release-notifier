# Email Release Notifier

Used at [MyBuilder](https://www.mybuilder.com/) to notify the team upon successful deployment of a GitHub release.

## Usage

We use [Release Drafter](https://github.com/release-drafter/release-drafter) to compile the release notes based on merged pull requests.
Once this draft release has been published and a successful deployment has occurred, this GitHub Action is invoked which notifies the team via Email of the changes.

```yaml
name: Notify Team via Email about Release
on: deployment_status
jobs:
  notify:
    if: ${{ github.event.deployment_status.state == 'success' }}
    runs-on: ubuntu-20.04
    steps:
      - name: Notify Team
        uses: eddmann/email-release-notifier@v1
        with:
          to: to@email.com
          from: from@email.com
          sendGridToken: ${{ secrets.SENDGRID_API_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Alternatively, you can emit the notification upon the release being published.

```yaml
name: Notify Team via Email about Release
on:
  release:
    types: [published]
jobs:
  notify:
    runs-on: ubuntu-20.04
    steps:
      - name: Notify Team
        uses: eddmann/email-release-notifier@v1
        with:
          to: to@email.com
          from: from@email.com
          sendGridToken: ${{ secrets.SENDGRID_API_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
