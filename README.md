# TaxiBookingNx

## Install node_modules
- run `yarn install`

## Create database in user-service
- in `user-service terminal`
- run `npx prisma migrate dev --preview-feature` to migrate database
- start database browser control: `npx prisma studio`

## Start micro-service
- user-service: `yarn nx serve user-service`
- auth-service: `yarn nx serve auth-service`
- driver-app: `yarn nx serve driver-app`
- web portal: `yarn nx serve web-portal`


