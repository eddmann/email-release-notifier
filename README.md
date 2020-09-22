# Email Release Notifier

## Upon Release

```yaml
name: Notifiy Team via Email about Release
on:
  release:
    types: [published]
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
    - name: Notifiy Team via Email about Release
      uses: eddmann/email-release-notifier@v1
      with:
        to: to@email.com
        from: from@email.com
        sendGridToken: ${{ secrets.SENDGRID_API_TOKEN }}
```

## Upon Successful Deployment

```yaml
name: Notifiy Team via Email about Release
on:
  deployment_status
jobs:
  notify:
    if: ${{ github.event.deployment_status.state == 'success' }}
    runs-on: ubuntu-latest
    steps:
    - name: Notifiy Team via Email about Release
      uses: eddmann/email-release-notifier@v1
      with:
        to: to@email.com
        from: from@email.com
        sendGridToken: ${{ secrets.SENDGRID_API_TOKEN }}
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
