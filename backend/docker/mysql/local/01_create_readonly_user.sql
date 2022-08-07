CREATE USER 'readonly_user'@'%' IDENTIFIED BY 'password';
GRANT SELECT ON *.* TO 'readonly_user'@'%';
