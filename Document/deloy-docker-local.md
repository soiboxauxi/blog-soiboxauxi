- dotnet dev-certs https -ep %USERPROFILE%\\.aspnet\https\aspnetapp.pfx
  -p { password }
- dotnet dev-certs https --trust
- docker build -t apicore -f .\APICore\Dockerfile .
- docker run --rm -it -p 8080:80 -p 8081:443
  -e ASPNETCORE_URLS="https://+;http://+" -e ASPNETCORE_HTTPS_PORT=8081
  -e ASPNETCORE_Kestrel**Certificates**Default**Password="{ password } "
  -e ASPNETCORE_Kestrel**Certificates**Default**Path=/https/aspnetapp.pfx
  -v \$ENV:USERPROFILE\.aspnet\https:/https/ apicore

> %USERPROFILE% => \$ENV:USERPROFILE (Powershell)

| Lệnh | Giải thích                               |
| ---- | ---------------------------------------- |
| rm   | remove container                         |
| it   | khởi động (item tag) {image_id/name:tag} |
| name | {container_name}                         |
