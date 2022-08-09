variable "gcp_project_id" {
  description = "GCPのproject_idです"
  type        = string
}

# CloudRunを実行するサービスアカウント
resource google_service_account nestjs_graphql_test_app_runner {
  project = var.gcp_project_id
  account_id = "nestjs-graphql-test-app-runner"
  display_name = "Cloud Run Blog Training App Service Account"
}

# 編集者に追加
resource "google_project_iam_member" "nestjs_graphql_test_app_runner_member" {
  project = var.gcp_project_id
  role    = "roles/editor"
  member  = "serviceAccount:${google_service_account.nestjs_graphql_test_app_runner.email}"
}

# Cloud Run 起動者に追加
resource "google_project_iam_member" "cloud_runner_member" {
  project = var.gcp_project_id
  role    = "roles/run.invoker"
  member  = "serviceAccount:${google_service_account.nestjs_graphql_test_app_runner.email}"
}

resource "google_project_iam_member" "secret_accessor_member" {
  project = var.gcp_project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.nestjs_graphql_test_app_runner.email}"
}

output "nestjs_graphql_test_app_runner_service_account" {
  value = google_service_account.nestjs_graphql_test_app_runner.email
}
