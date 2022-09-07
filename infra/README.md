# Terrform

## gcloud
```bash
$ gcloud config configurations list
$ gcloud config configurations activate nestjs-graphql-test
$ gcloud config set core/account <GoogleCloudのメールアドレス>
$ gcloud auth login
# ~/.config/gcloud/application_default_credentials.json.db生成
$ gcloud auth application-default login
```

## Setup
```bash
$ ./tf.sh init
$ ./tf.sh plan
$ ./tf.sh apply
```

## Destory
```bash
$ ./tf.sh destroy
```
