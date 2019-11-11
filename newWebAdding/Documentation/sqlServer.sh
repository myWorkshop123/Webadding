#!/bin/bash


docker container start be2d3a566de6

sudo docker exec -it sql1 "bash"

/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "papaPAPA123"
