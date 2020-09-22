#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-nanoserver-1903 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-nanoserver-1903 AS build
WORKDIR /src
COPY ["APICore/APICore.csproj", "APICore/"]
COPY ["Application/APICore.Application/APICore.Application.csproj", "Application/APICore.Application/"]
COPY ["Domain/APICore.Domain/APICore.Domain.csproj", "Domain/APICore.Domain/"]
COPY ["Domain/APICore.Domain.Core/APICore.Domain.Core.csproj", "Domain/APICore.Domain.Core/"]
COPY ["Infrastructure/CrossCutting/APICore.Infrastructure.CrossCutting.IoC/APICore.Infrastructure.CrossCutting.IoC.csproj", "Infrastructure/CrossCutting/APICore.Infrastructure.CrossCutting.IoC/"]
COPY ["Infrastructure/CrossCutting/APICore.Infrastructure.CrossCutting.Indentity/APICore.Infrastructure.CrossCutting.Indentity.csproj", "Infrastructure/CrossCutting/APICore.Infrastructure.CrossCutting.Indentity/"]
COPY ["Infrastructure/CrossCutting/APICore.Infrastructure.CrossCutting.Indentity.MongoDb/APICore.Infrastructure.CrossCutting.Indentity.MongoDb.csproj", "Infrastructure/CrossCutting/APICore.Infrastructure.CrossCutting.Indentity.MongoDb/"]
COPY ["Infrastructure/Data/APICore.Infrastructure.Data/APICore.Infrastructure.Data.csproj", "Infrastructure/Data/APICore.Infrastructure.Data/"]
COPY ["Infrastructure/CrossCutting/APICore.Infrastructure.CrossCutting.Bus/APICore.Infrastructure.CrossCutting.Bus.csproj", "Infrastructure/CrossCutting/APICore.Infrastructure.CrossCutting.Bus/"]
RUN dotnet restore "APICore/APICore.csproj"
COPY . .
WORKDIR "/src/APICore"
RUN dotnet build "APICore.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "APICore.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "APICore.dll"]