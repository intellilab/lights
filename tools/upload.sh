#!/bin/sh
rsync -r dist -e ssh -v --delete vps:/root/Git/lights/
ssh vps "supervisorctl restart lights"
