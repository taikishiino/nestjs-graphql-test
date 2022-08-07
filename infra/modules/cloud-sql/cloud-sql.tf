variable "target_region" {
  description = "デプロイするリージョン"
  type        = string
  default     = "asia-northeast1"
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database
resource "google_sql_database_instance" "nestjs-graphql-test-db" {
  name                = "nestjs-graphql-test-db"
  database_version    = "MYSQL_8_0"
  region              = var.target_region
  settings {
    tier              = "db-f1-micro"
  }

  deletion_protection = false # 検証で作成するため、あとで消したい
}

resource "google_sql_database" "nestjs-graphql-test-db" {
  name     = "nestjs_graphql_test_db"
  instance = google_sql_database_instance.nestjs-graphql-test-db.name
}

# ref: https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database_instance#attributes-reference
output "nestjs_graphql_test_db_connection_name" {
  value = google_sql_database_instance.nestjs-graphql-test-db.connection_name
}
