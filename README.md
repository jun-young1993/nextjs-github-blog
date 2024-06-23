
<img width="1434" alt="스크린샷 2024-06-23 오전 12 38 06" src="https://github.com/jun-young1993/Obsidian/assets/102360897/7d1ed6bd-815d-427c-9299-c00df29fac2d">
<img width="721" alt="스크린샷 2024-06-23 오전 12 30 57" src="https://github.com/jun-young1993/Obsidian/assets/102360897/e879cfe6-fd23-4661-bdcd-9ca1cbab996b">

## Demo
#### [Move To Demo](https://nextjs-github-blog.vercel.app)
#### [Juny Blog](https://juny.blog)

Next.js-Github-Blog Kit
---
>  Get a Git Personal acess token and create a blog in juns 5 minutes.
- Get Git Personal Token
  > to get a 'gitPersonalToken' click the link
  > 	https://github.com/settings/tokens
> A project created to use with Obsidian...🤣
# intro
---
> It is configured using GitHub as a CMS and the Git REST API.

# Setup
- [Move To Quick Config](https://www.juny.blog/markdown-viewer/blog/docs/nextjs-github-blog/Quick%20Config.md)

## Prerequisite
- Node.js 18.17 or latest
## Installation
### 1. Fork And Clone this repo
#### Version Sync
1. git add remote
```shell
git remote add blog https://github.com/jun-young1993/nextjs-github-blog.git
```
2. git fetch blog
```shell
git fetch blog
```
3. git merge remote
```shell
git merge blog/main
```
4. From now on...
```shell
git fetch blog 
...
git merge blog/main
```
### 2. package install
```shell
npm install
```
### 3. config
```shell
cp ./github.blog.config.ts.example cp./github.blog.config.ts
```

# Deploy Vercel
[Move To Deploying a next.js project to vercel](https://www.juny.blog/markdown-viewer/blog/Develop/Next.js/Deploying%20a%20next.js%20project%20to%20vercel.md)